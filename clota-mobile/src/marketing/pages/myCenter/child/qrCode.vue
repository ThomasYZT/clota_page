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
            @include block_outline(200px,263px);
            padding-top: 63px;
            margin: 0 auto;
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
