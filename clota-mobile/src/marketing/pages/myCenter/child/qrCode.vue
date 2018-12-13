<!--扫码购票-->

<template>
    <div class="qr-code">
        <div class="code-img">
            <qrcode
                ref="qrCode"
                :value="qrCodeInfo"
                :size="200"
                type="img"
                @click.native="showPreImage">
            </qrcode>
            <div class="re-get-qrcode" v-if="!haveUserInfo">
                <span @click="getQrcode">{{$t('重新获取')}}</span>
            </div>
        </div>
        <div class="scene-name">{{companyName}}</div>
        <div class="buy-ticket-tips">{{$t('扫码购票入口')}}</div>
        <!--预览图片-->
        <previewer
            v-transfer-dom
            class="ticket-qr-code-preview"
            :options="options"
            :list="prevList"
            ref="previewer">
        </previewer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
	export default {
		data () {
			return {
                //预览图片列表
                prevList : [],
                options : {
                    getThumbBoundsFn : () => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        thumbnail = this.$refs.qrCode.$el;
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                }
            };
		},
		methods : {
            /**
             * 二维码放大
             */
            showPreImage () {
                this.prevList = [
                    {
                        src : this.$refs.qrCode.imgData,
                        w : 240,
                        h : 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 重新获取二维码参数
             */
            getQrcode () {
                this.$store.dispatch('marketGetUserInfo').then(res => {
                    this.$store.dispatch('marketGetLoginData');
                });
            }
        },
        computed : {
            ...mapGetters({
                companyName : 'companyName',
                marketUserInfo : 'marketUserInfo',
            }),
            //二维码链接信息
            qrCodeInfo () {
                return location.origin + this.$router.options.base + '/marketing/tourist?marketUserId=' + this.marketUserInfo.id;
            },
            //是否保存了用户信息
            haveUserInfo () {
                return this.marketUserInfo && this.marketUserInfo.id;
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .qr-code{
        @include block_outline();
        background: $color_fff;

        .code-img{
            position: relative;
            @include block_outline(200px,263px);
            padding-top: 63px;
            margin: 0 auto;

            .re-get-qrcode{
                @include absolute_pos(absolute,63px,0,0,0);
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                color: $color_fff;
                font-size: $font_size_16px;
            }
        }

        .scene-name{
            @include block_outline($height : 23px);
            line-height: 23px;
            margin-top: 17px;
            font-size: $font_size_16px;
            color: #353B48;
            text-align: center;
            @include overflow_tip();
        }

        .buy-ticket-tips{
            margin-top: 6px;
            font-size: $font_size_12px;
            color: $color_999;
            text-align: center;
            @include overflow_tip();
        }
    }
</style>
<style>
    .ticket-qr-code-preview .pswp__bg{
        background: #f0f0f0;
    }
</style>
