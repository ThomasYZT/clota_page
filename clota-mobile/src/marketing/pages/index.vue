<!--全民分销系统-->

<template>
    <div class="marketing">
        <div class="view-content" :class="{ 'full-height' : !showTabbar }">
            <router-view>

            </router-view>
        </div>
        <tabbar v-if="showTabbar" @on-item-click="toRouter">
            <tabbar-item badge="2"
                         :selected="selectedTabbar === 'product'"
                         @on-item-click="toRouter('marketingProduct')">
                <div slot="icon">
                    <img v-if="selectedTabbar === 'product'"
                         slot="icon"
                         class="tabbar-img"
                         src="../../assets/images/icon-product-tabbar-selected.svg">
                    <img v-else
                         slot="icon"
                         class="tabbar-img"
                         src="../../assets/images/icon-product-tabbar.svg">
                </div>
                <span slot="label">产品</span>
            </tabbar-item>
            <tabbar-item show-dot
                         :selected="selectedTabbar === 'order'"
                         @on-item-click="toRouter('marketingOrder')">
                <img v-if="selectedTabbar === 'order'"
                     slot="icon"
                     class="tabbar-img"
                     src="../../assets/images/icon-order-tabbar-selected.svg">
                <img v-else
                     slot="icon"
                     class="tabbar-img"
                     src="../../assets/images/icon-order-tabbar.svg">
                <span slot="label">订单</span>
            </tabbar-item>
            <tabbar-item :selected="selectedTabbar === 'mine'"
                         @on-item-click="toRouter('marketingOwnerCenter')">
                <img v-if="selectedTabbar === 'mine'"
                     slot="icon"
                     class="tabbar-img"
                     src="../../assets/images/icon-own-tabbar-selected.svg">
                <img v-else
                     slot="icon"
                     class="tabbar-img"
                     src="../../assets/images/icon-own-tabbar.svg">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '@/marketing/api/index';
    export default {
        data () {
            return {};
        },
        methods : {
            /**
             * 跳转到对应的路由页面
             * @param{String} routerName
             */
            toRouter (routerName) {
                this.$router.replace({
                    name : routerName
                });
            },
            /**
             * 获取微信配置
             */
            getWxConfig () {
                if (this.isWeixin) {
                    ajax.post('getWxConfig',{
                        url : window.location.origin
                    }).then(res => {
                        if (res.success) {
                            this.$wechat.config({
                                debug : true,
                                appId : res.data.appId,
                                timestamp : res.data.timestamp,
                                nonceStr : res.data.nonceStr,
                                signature : res.data.signature,
                                jsApiList : [
                                    'chooseImage',
                                    'getLocalImgData',
                                    'uploadImage',
                                    'addCard',
                                    'getLocation'
                                ]
                            });
                            this.$wechat.error(() => {
                                this.$store.commit('updateWeixinConfig',false);
                            });
                        }
                    });
                }
            }
        },
        created () {
            this.getWxConfig();
        },
        computed : {
            //是否显示底部tab栏
            showTabbar () {
                return this.$route && this.$route.meta && !this.$route.meta.hideTabbar;
            },
            //选择的底部菜单栏
            selectedTabbar () {
                return this.$route && this.$route.meta ? this.$route.meta.menuBar : '';
            },
            ...mapGetters({
                isWeixin : 'isWeixin'
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .marketing{
        @include block_outline();

        .tabbar-img{
            @include block_outline(25px,25px);
        }

        .view-content{
            @include block_outline($height : unquote('calc(100% - 53px)'));

            &.full-height{
                height: 100%;
            }
        }

        /deep/ .weui-tabbar{
            background: $color_fff;
        }
    }
</style>
