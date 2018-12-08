<!--游客下单-->

<template>
    <div class="tourist-order">
        <date-head
            :active-date="activeDate"
            @show-date-modal="chooseDateShow = true"
            @change-active-date="changeAciveDate">
        </date-head>
        <div class="address-tips">
            <span class="address"> {{$t('colonSetting',{ key : $t('地址') })}}{{marketLocationInfo | contentFilter}}</span>
            <span class="re-get-location" @click="getLocation">
                <span class="iconfont icon-fresh" :class="{ 'rotate' : marketIsGettingLocation }"></span>
                <span class="label">{{$t('重新获取')}}</span>
            </span>
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
                 :title="$t('提示')"
                 :confirm-text="$t('confirm')"
                 :show-cancel-button="false"
                 @on-confirm="confirmShow = false">
            <p style="text-align:center;">{{ $t('请先获取当前地理位置信息，否则无法下单！') }}</p>
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
                confirmShow : false
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
                return ajax.post('market_queryMarketProductsForVisitor',{
                    playDate : this.activeDate.format('yyyy-MM-dd'),
                    marketUserId : '1070973507824914432',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data.data : [];
                    } else {
                        this.productList = [];
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
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                marketIsGettingLocation : 'marketIsGettingLocation',
                marketLocationInfo : 'marketLocationInfo',
            })
        },
        created () {
            this.queryProductList();
        }
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
                max-width: calc(100% - 95px);
                text-overflow: clip;
                overflow-x: auto;
            }

            .re-get-location{
                line-height: 30px;
                width: 90px;
                padding-left: 5px;
                color: $color_yellow;

                .icon-fresh{
                    padding-top: 4px;
                    vertical-align: middle;
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
