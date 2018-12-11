<!--全民分销系统-->

<template>
    <div class="marketing">
        <el-amap :plugin="plugin"
                 v-if="marketIsGettingLocation"
                 class="amap-demo">
        </el-amap>
        <div class="view-content" :class="{ 'full-height' : !showTabbar }">
            <router-view>
            </router-view>
        </div>
        <tabbar v-if="showTabbar" @on-item-click="toRouter">
            <tabbar-item :selected="selectedTabbar === 'product'"
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
            <tabbar-item :selected="selectedTabbar === 'order'"
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
        <loading
            v-transfer-dom
            :show="marketIsGettingLocation"
            :text="$t('获取位置信息中')">
        </loading>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '@/marketing/api/index';
    export default {
        data () {
            let self = this;
            return {
                plugin : [{
                    enableHighAccuracy : true,//是否使用高精度定位，默认:true
                    pName : 'Geolocation',
                    events : {
                        init (o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.$store.commit('updateLocationInfo',{
                                        location : result.formattedAddress,
                                        longitude : result.position.lng,
                                        latitude : result.position.lat,
                                    });
                                    self.$nextTick();
                                } else {
                                    self.$store.commit('updateLocationInfo',{
                                        location : '',
                                        longitude : '',
                                        latitude : '',
                                    });
                                }
                                self.$store.commit('marketUpdateIsGettingLocation',false);
                            });
                        }
                    }
                }]
            };
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
                                // debug : true,
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
                isWeixin : 'isWeixin',
                marketIsGettingLocation : 'marketIsGettingLocation',
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .marketing{
        @include block_outline();

        .amap-demo{
            display: none;
        }

        .tabbar-img{
            @include block_outline(20px,20px);
            margin-top: 5px;
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
