<!--我的产品-->

<template>
    <div class="product-info">
        <div class="date-list">
            <span>{{$t('colonSetting',{ key : $t('selectPlayDate') })}}</span>
            <span class="date-area" @click="choseDate">
            {{productDate}}
            <span class="iconfont icon-arrow-right"></span>
            </span>
        </div>
        <div class="area-info">
            <popover placement="bottom">
                <div slot="content" class="popover-demo-content">
                    {{marketOrgAddress | contentFilter}}
                </div>
                <span :class="$style.addInfo">{{$t('colonSetting',{ key : $t('address') })}}{{marketOrgAddress | contentFilter}}</span>
            </popover>
        </div>
        <div class="product-list">
            <scroll-wrap :item-data="productListData"
                         @pull-down="onPullingDown"
                         @pull-up="onPullingUp">
                <template v-for="(item,index) in productListData">
                    <product-list :key="index"
                                  :product-info="item"
                                  @show-notice="showProductNoticeMethod(item)"
                                  @click.native="toOrderTicket(item)">
                    </product-list>
                </template>
            </scroll-wrap>
        </div>
        <div v-transfer-dom>
            <popup v-model="showProductNotice" :class="$style.wrap">
                <div :class="$style.popupBody">
                    <div :class="$style.head">
                        <span :class="$style.known" @click="showProductNotice = false">{{$t('isee')}}</span>
                        {{$t('ticketInfo')}}
                    </div>
                    <div :class="$style.content">
                        <div :class="$style.productTitle">{{currentProductInfo.productName | contentFilter}}</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('productExplain') })}}</div>
                        <div :class="$style.notice">{{currentProductInfo.productDes | contentFilter}}</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('ticketInfo') })}}</div>
                        <div :class="$style.notice" v-html="currentProductInfo.buyTicketNotes"></div>
                    </div>
                    <div :class="$style.footer">
                        <span :class="$style.price">
                            {{$t('colonSetting',{ key : $t('commission') })}}{{ currentProductInfo.salary | moneyFilter(2,'¥') | contentFilter }}
                        </span>
                        <span :class="$style.commission">
                            {{$t('colonSetting',{ key : $t('sellingPrice') })}}{{ currentProductInfo.salePrice | moneyFilter(2,'¥') | contentFilter }}
                        </span>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import productList from './components/product-list';
    import scrollWrap from '@/components/scroll/scrollWrap';
    import ajax from '@/marketing/api/index';
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                //查看产品日期
                productDate : new Date().format('yyyy-MM-dd'),
                //产品列表数据
                productListData : [],
                //显示购票须知
                showProductNotice : false,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前查看产品的明细
                currentProductInfo : {}
            };
        },
        components : {
            productList,
            scrollWrap
        },
        methods : {
            /**
             * 选择日期
             */
            choseDate () {
                this.$vux.datetime.show({
                    cancelText : this.$t('cancel'),
                    confirmText : this.$t('confirm'),
                    format : 'YYYY-MM-DD',
                    value : this.productDate,
                    startDate : new Date().format('yyyy-MM-dd'),
                    onConfirm : (val) => {
                        this.productDate = val;
                        this.getProductListInfo();
                    }
                });
            },
            /**
             * 下拉刷新
             * @param{Function} callback 下拉完的回调函数
             */
            onPullingDown (callback) {
                this.getProductListInfo().finally(() => {
                    callback();
                });
            },
            /**
             * 上拉刷新
             * @param{Function} callback 下拉完的回调函数
             */
            onPullingUp (callback) {
                this.pageSize += 10;
                this.getProductListInfo().finally(() => {
                    callback();
                });
            },
            /**
             * 显示购票须知详情
             * @param data
             */
            showProductNoticeMethod (data) {
                this.currentProductInfo = data;
                this.showProductNotice = true;
            },
            /**
             * 获取产品信息
             */
            getProductListInfo () {
                return ajax.post('market_queryMarketSaleProductList',{
                    playDate : this.productDate,
                    marketTypeId : this.marketTypeId,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.productListData = res.data ? res.data.data : [];
                    } else {
                        this.productListData = [];
                    }
                });
            },
            /**
             * 重新获取位置信息
             */
            getLocation () {
                this.$store.commit('marketUpdateIsGettingLocation',true);
            },
            /**
             *
             * 下订单
             * @param{Object} productInfo 产品信息
             */
            toOrderTicket (productInfo) {
                this.$router.push({
                    name : 'salesManCreateOrder',
                    params : {
                        productDetail : productInfo,
                        playDate : this.productDate
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                marketTypeId : 'marketTypeId',
                marketOrgAddress : 'marketOrgAddress',
            })
        },
        created () {
            this.getProductListInfo();
        },
        beforeDestroy () {
            this.$vux.datetime.hide();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-info{
        @include block_outline();
        background: #f2f3f4;

        .date-list{
            @include block_outline($height : 40px);
            line-height: 40px;
            font-size: $font_size_16px;
            color: #353B48;
            padding-left: 14px;
            background: $color_fff;

            .date-area{
                display: inline-block;
            }

            .icon-arrow-right{
                display: inline-block;
                transform: rotate(90deg);
                font-size: $font_size_13px;
                color: #8395A7;
            }
        }

        .area-info{
            @include block_outline($height : 30px);
            line-height: 30px;
            padding-left: 14px;
            //@include overflow_tip();
        }

        .re-get-location{
            color: $color_err;
        }

        .product-list{
            @include block_outline($height : unquote('calc(100% - 65px)'));

            .flex-box{
                background: transparent;
            }
        }
    }
</style>
<style module>
    .popupBody{
        width: 100%;
        height: 400px;
        background: #fff;
    }
    .head{
        width: 100%;
        height: 44px;
        background: #F5F6F8;
        position: relative;
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        color: #666666;
    }
    .known{
        position: absolute;
        right: 10px;
        font-size: 15px;
        color: #046FDB;
    }
    .content{
        height: 318px;
        overflow: auto;
        padding: 0 24px;
    }
    .content::after{
        content : '';
        display: block;
        width: 100%;
        height: 20px;
    }
    .productTitle{
        text-align: center;
        height: 46px;
        padding: 19px 0 5px 0;
        line-height: 22px;
        font-size: 15px;
        color: #333333;
    }
    .productNotice{
        height: 30px;
        font-size: 15px;
        color: #333333;
        padding-bottom: 9px;
        margin-top: 14px;
    }
    .notice{
        font-size: 12px;
        color: #999999;
        word-break: break-all;
        white-space: pre-line;
    }
    .footer{
        height: 38px;
        background: #F5F6F8;
        line-height: 38px;
        text-align: right;
    }
    .price{
        color: #F7981C;
    }
    .commission{
        color: #046FDB;
        margin-left: 20px;
        padding-right: 10px;
    }
    .addInfo{
        white-space: nowrap;
    }
    .wrap{
        overflow: hidden;
    }
</style>
