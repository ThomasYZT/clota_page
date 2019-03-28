<!--游客下单-->

<template>
    <div class="tourist-order">
        <date-head
            :active-date="activeDate"
            @show-date-modal="chooseDateShow = true"
            @change-active-date="changeAciveDate">
        </date-head>
        <div class="address-tips">
            <span class="address">
                <popover placement="bottom">
                    <div slot="content" class="popover-demo-content">
                       {{sceneAddress | contentFilter}}
                    </div>
                    <span>{{$t('colonSetting',{ key : $t('address') })}}{{sceneAddress | contentFilter}}</span>
                </popover>
            </span>
            <!--<span class="re-get-location" @click="getLocation">-->
                <!--<span class="iconfont icon-fresh" :class="{ 'rotate' : marketIsGettingLocation }"></span>-->
                <!--<span class="label">{{$t('重新获取')}}</span>-->
            <!--</span>-->
        </div>
        <div class="product-list">
            <scroll-wrap :item-data="productList"
                         @pull-down="onPullingDown"
                         @pull-up="onPullingUp">
                <template v-for="(item,index) in productList">
                    <product-info :product-info="item"
                                  :key="index"
                                  :active-date="activeDate"
                                  @show-notice="showProductNoticeMethod"
                                  @create-order-warning="confirmShow = true">
                    </product-info>
                </template>
            </scroll-wrap>
        </div>
        <!--购票须知模态框-->
        <ticket-notice :choosedProductInfo="choosedProductInfo"
                       v-model="showProductNotice">
        </ticket-notice>
        <!--日期选择模态框-->
        <full-date-modal v-model="chooseDateShow"
                         :active-date="activeDate"
                         @choose-day="changeAciveDate">
        </full-date-modal>

        <!--未获取地理位置信息下单报错提示框-->
        <confirm v-model="confirmShow"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :cancel-text="$t('cancel')"
                 :show-cancel-button="false"
                 @on-confirm="confirmShow = false">
            <p style="text-align:center;">{{ $t('cannotCreateOrderWithoutPosition') }}</p>
        </confirm>
    </div>
</template>

<script>
    import dateHead from './components/dateHead';
    import scrollWrap from '@/components/scroll/scrollWrap.vue';
    import productInfo from './components/product-info';
    import fullDateModal from './components/fullDateModal';
    import ajax from '@/marketing/api/index';
    import { mapGetters } from 'vuex';
    import ticketNotice from './components/ticketNotice';

    export default {
        data () {
            return {
                cardType : 2,
                //产品列表
                productList : [],
                //显示购票须知
                showProductNotice : false,
                //选择日期模态框是否显示
                chooseDateShow : false,
                //当前激活日期
                activeDate : new Date(),
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //选择的产品信息
                choosedProductInfo : {},
                //是否显示提示框
                confirmShow : false,
                //景区地址
                sceneAddress : ''
            };
        },
        components : {
            dateHead,
            scrollWrap,
            productInfo,
            fullDateModal,
            ticketNotice
        },
        methods : {
            /**
             * 显示购票须知详情
             * @param{Object} data 订单信息
             */
            showProductNoticeMethod (data) {
                this.showProductNotice = true;
                this.choosedProductInfo = data;
            },
            /**
             * 查询游客订单信息
             */
            queryProductList () {
                return ajax.postWithoutToken('market_queryMarketProductsForVisitor',{
                    playDate : this.activeDate.format('yyyy-MM-dd'),
                    marketUserId : this.marketUserId,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data.modelPagedList.data : [];
                        document.title = res.data ? res.data.orgName : '';
                        this.sceneAddress = res.data ? res.data.orgAddress : '';
                        this.$store.commit('marketUpdateOrgId',res.data ? res.data.orgId : '');
                        //如果景区设置了地理位置信息需要获取游客位置信息
                        if (res.data && res.data.setPosition) {
                            this.$store.commit('marketUpdateIsGettingLocation',true);
                        }
                    } else {
                        this.productList = [];
                        this.sceneAddress = '';
                        document.title = '';
                        this.$store.commit('marketUpdateOrgId','');
                    }
                });
            },
            /**
             * 下拉刷新
             * @param{Function} callback 刷新完成回调
             */
            onPullingDown (callback) {
                this.queryProductList().finally(() => {
                    callback();
                });
            },
            /**
             * 上拉刷新
             * @param{Function} callback 刷新完成回调
             */
            onPullingUp (callback) {
                this.queryProductList().finally(() => {
                    callback();
                });
            },
            /**
             * 更新日期
             * @param{Date} date 要更新的日期
             */
            changeAciveDate (date) {
                this.activeDate = date;
                this.queryProductList();
            },
            /**
             * 获取地理位置信息
             */
            getLocation () {
                this.$store.commit('marketUpdateIsGettingLocation',true);
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.marketUserId) {
                    this.$store.commit('marketUpdateMarketUserId',params.marketUserId);
                }
                this.queryProductList();
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                marketIsGettingLocation : 'marketIsGettingLocation',
                marketLocationInfo : 'marketLocationInfo',
                marketUserId : 'marketUserId',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
        },
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .tourist-order{
        @include block_outline();
        background: #f2f3f4;

        .address-tips{
            @include block_outline($height : 30px);
            padding-left: 14px;
            font-size: $font_size_14px;
            color: #8395A7;
            @include overflow_tip();

            .address{
                line-height: 30px;
                display: inline-block;
                text-overflow: clip;
                overflow-x: auto;
                float: left;
            }

            .re-get-location{
                line-height: 30px;
                width: 90px;
                padding-left: 5px;
                color: $color_yellow;
                float: left;

                .icon-fresh{
                    vertical-align: text-top;
                    transition: all 0.3s;
                    transform: rotate(360deg);

                    &.rotate{
                        transform: rotate(60deg);
                        transition: all 0.3s;
                    }

                    &::before{
                        color: $color_yellow;
                        vertical-align: middle;
                    }
                }
            }
        }

        .product-list{
            @include block_outline($height : unquote('calc(100% - 83px)'));
        }
    }
</style>
