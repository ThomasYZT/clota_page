<!--我的订单-->

<template>
    <div class="order">
        <div class="title">
            <span class="time">
                 <span class="start-date" @click="chooseStartDate">{{startDate | contentFilter}}</span>
                <span class="iconfont icon-arrow-right"></span>
            </span>
            <span class="zhi">{{$t('to')}}</span>
            <span class="time">
                 <span class="end-date" @click="chooseEndDate">{{endDate | contentFilter}}</span>
                <span class="iconfont icon-arrow-right"></span>
            </span>
            <div class="bar"></div>
            <span class="product-filter" @click="productFilterShow = true">
                <span :class="{ 'text-filter' : choosedProductInfo.filter(item => item.productId !== 'all').length > 0 }">{{$t('product')}}</span>
                <img v-if="choosedProductInfo.filter(item => item.productId !== 'all').length > 0" class="filter" src="../../../assets/images/icon-filter-activated.svg" alt="">
                <img v-else class="filter" src="../../../assets/images/icon-filter.svg" alt="">
            </span>
        </div>
        <div class="tab-wrap">
            <!--卡包tap列表-->
            <tab v-model="tabSelected">
                <tab-item
                    v-for="(item,i) in tapInfo"
                    :key="i"
                    @on-item-click="selectCard(i)">
                    {{$t(item.name)}}{{$t('bracketSetting',{ content : item.count })}}
                </tab-item>
            </tab>
        </div>
        <div class="content">
            <swiper dots-position="center"
                    v-model="cardType"
                    :class="{'no-top-padding' : tapInfo.length < 2}"
                    v-if="tapInfo.length > 0"
                    :threshold="100"
                    :aspect-ratio="10"
                    :show-dots="false"
                    @on-index-change="cardTypeChange">
                <swiper-item>
                    <tab-item-list :data="allOrderInfo"
                                   @pull-down="pullDown($event,'')"
                                   @pull-up="pullUp($event,'')">
                    </tab-item-list>
                </swiper-item>
                <swiper-item>
                    <tab-item-list :data="noDepositInfo"
                                   :show-radio="true"
                                   @pull-down="pullDown($event,'no_withdraw')"
                                   @pull-up="pullUp($event,'no_withdraw')"
                                   @fresh-data="pullDown($event,'no_withdraw')">
                    </tab-item-list>
                </swiper-item>
                <swiper-item>
                    <tab-item-list :data="depositInfo"
                                   @pull-down="pullDown($event,'withdraw')"
                                   @pull-up="pullUp($event,'withdraw')">
                    </tab-item-list>
                </swiper-item>
            </swiper>
        </div>
        <!--产品列表筛选-->
        <product-filter v-model="productFilterShow"
                        :data="productList"
                        :default-choosed-data="choosedProductInfo"
                        @set-choosed-product="getChoosedProduct">
        </product-filter>
    </div>
</template>

<script>
    import tabItemList from './components/tab-item-list';
    import ajax from '@/marketing/api/index';
    import productFilter from './components/productFilter';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //选择的菜单
                tabSelected : 0,
                //菜单列表
                tapInfo : [
                    {
                        name : this.$t('all'),
                        count : '0'
                    },
                    {
                        name : this.$t('noWithdrawal'),
                        count : '0'
                    },
                    {
                        name : this.$t('withdrawal'),
                        count : '0'
                    }
                ],
                //开始日期
                startDate : '',
                // startDate : new Date().addMonths(-1).format('yyyy-MM-dd'),
                //结束日期
                endDate : '',
                // endDate : new Date().format('yyyy-MM-dd'),
                cardType : 0,
                //全部订单信息
                allOrderInfo : [],
                //已提现订单
                depositInfo : [],
                //未提现订单
                noDepositInfo : [],
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //产品筛选条件是否显示
                productFilterShow : false,
                //选择的产品筛选数据
                choosedProductInfo : [
                    {
                        productName : this.$t('all'),
                        productId : 'all'
                    }
                ],
                //可筛选的产品列表
                productList : []
            };
        },
        components : {
            tabItemList,
            productFilter
        },
        methods : {
            /**
             * 选择了某个菜单
             * @param{Number} item tap菜单序列号
             */
            selectCard (item) {
                this.cardType = item;
            },
            /**
             * 卡包类型改变
             * @param{Number} index 卡包序号
             */
            cardTypeChange (index) {
                this.tabSelected = index;
                if (index === 0) {
                    this.queryOrderInfo('');
                } else if (index === 1) {
                    this.queryOrderInfo('no_withdraw');
                } else if (index === 2) {
                    this.queryOrderInfo('withdraw');
                }
            },
            /**
             * 选择开始日期
             */
            chooseStartDate () {
                this.$vux.datetime.show({
                    cancelText : this.$t('cancel'),
                    confirmText : this.$t('confirm'),
                    format : 'YYYY-MM-DD',
                    value : this.startDate,
                    endDate : this.endDate,
                    onConfirm : (val) => {
                        this.startDate = val;
                        this.cardTypeChange(this.tabSelected);
                        this.updateStorgeInfo({
                            startDate : this.startDate,
                            endDate : this.endDate,
                            choosedProductInfo : this.choosedProductInfo
                        });
                    }
                });
            },
            /**
             * 选择结束日期
             */
            chooseEndDate () {
                this.$vux.datetime.show({
                    cancelText : this.$t('cancel'),
                    confirmText : this.$t('confirm'),
                    format : 'YYYY-MM-DD',
                    value : this.endDate,
                    startDate : this.startDate,
                    onConfirm : (val) => {
                        this.endDate = val;
                        this.cardTypeChange(this.tabSelected);
                        this.updateStorgeInfo({
                            startDate : this.startDate,
                            endDate : this.endDate,
                            choosedProductInfo : this.choosedProductInfo
                        });
                    }
                });
            },
            /**
             * 查询我的订单信息
             * @param{String} withdrawStatus 提现状态
             */
            queryOrderInfo (withdrawStatus) {
                return ajax.post('market_queryMyMarkOrderList',{
                    startBuyDate : this.startDate,
                    endBuyDate : this.endDate,
                    pageNo : this.pageNo,
                    withdrawStatus : withdrawStatus,
                    pageSize : this.pageSize,
                    productId : this.choosedProductInfo.filter(item => item.productId !== 'all').map(item => item.productId)
                }).then(res => {
                    if (res.success) {
                        //全部
                        if (withdrawStatus === '') {
                            this.allOrderInfo = res.data ? res.data.data : [];
                        } else if (withdrawStatus === 'withdraw') {//未提现
                            this.depositInfo = res.data ? res.data.data : [];
                        } else {//已提现
                            this.noDepositInfo = res.data ? res.data.data : [];
                        }
                    } else {
                        this.allOrderInfo = [];
                        this.depositInfo = [];
                        this.noDepositInfo = [];
                    }
                }).finally(() => {
                    this.queryOrderCount();
                });
            },
            /**
             * 下拉刷新
             * @param{Function} callback 加载完成回调函数
             * @param{String} withdrawStatus 提现状态
             */
            pullDown (callback,withdrawStatus) {
                this.queryOrderInfo(withdrawStatus).finally(() => {
                    callback();
                });
            },
            /**
             * 上拉加载
             * @param{Function} callback 加载完成回调函数
             * @param{String} withdrawStatus 提现状态
             */
            pullUp (callback,withdrawStatus) {
                this.pageSize += 10;
                this.queryOrderInfo(withdrawStatus).finally(() => {
                    callback();
                });
            },
            /**
             * 获取选择的产品信息
             * @param{Array} productData 选择的产品信息
             */
            getChoosedProduct (productData) {
                this.choosedProductInfo = productData;
                this.cardTypeChange(this.tabSelected);
                this.updateStorgeInfo({
                    startDate : this.startDate,
                    endDate : this.endDate,
                    choosedProductInfo : this.choosedProductInfo
                });
            },
            /**
             * 查询所有产品信息
             */
            queryProductInfo () {
                ajax.post('market_getUserProducts').then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data : [];
                    } else {
                        this.productList = [];
                    }
                });
            },
            /**
             * 查询订单统计信息
             */
            queryOrderCount () {
                ajax.post('market_getOrderCount').then(res => {
                    if (res.success) {
                        this.tapInfo[0]['count'] = res.data ? res.data.totalCount : '';
                        this.tapInfo[1]['count'] = res.data ? res.data.noWithdraw : '';
                        this.tapInfo[2]['count'] = res.data ? res.data.withDraw : '';
                    } else {
                        this.tapInfo[0]['count'] = 0;
                        this.tapInfo[1]['count'] = 0;
                        this.tapInfo[2]['count'] = 0;
                    }
                });
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.startDate = params.startDate ? params.startDate : new Date().addMonths(-1).format('yyyy-MM-dd');
                    this.endDate = params.endDate ? params.endDate : new Date().format('yyyy-MM-dd');
                    this.choosedProductInfo = params.choosedProductInfo ? params.choosedProductInfo : [
                        {
                            productName : this.$t('all'),
                            productId : 'all'
                        }
                    ];
                } else {
                    this.startDate = new Date().addMonths(-1).format('yyyy-MM-dd');
                    this.endDate = new Date().format('yyyy-MM-dd');
                }
                this.queryOrderInfo('');
                this.queryProductInfo();
            }
        },
        beforeDestroy () {
            this.$vux.datetime.hide();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .order{
        @include block_outline();
        background: #f2f3f4;

        .title{
            @include block_outline($height : 40px);
            line-height: 40px;
            padding-left: 12px;
            padding-right: 12px;
            font-size: $font_size_16px;
            color: $color_333;
            background: $color_fff;
            display: flex;
            flex-direction: row;

            .bar{
                flex: 1;
                position: relative;

                &:before{
                    content : '';
                    @include block_outline(0.5px,15px);
                    @include absolute_pos(absolute,$left : 50%,$top : 13px);
                    background:  #E1E1E1;
                }
            }

            .zhi{
                padding: 0 10px;
            }

            .icon-arrow-right{
                display: inline-block;
                transform: rotate(90deg);
                font-size: $font_size_13px;
                color: #8395A7;
            }

            .product-filter{
                display: inline-block;
                float: right;
                font-size: $font_size_14px;
                color: $color_333;

                .text-filter{
                    color: $color_red;
                }

                &:before{
                    @include absolute_pos(absolute,$top : 5px);
                    @include block_outline(0.5px,15px);
                    background: #E1E1E1;
                }

                .filter{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    vertical-align: middle;
                    float: right;
                    margin-top: 13px;
                }
            }
        }
        .tab-wrap{
            background: $color_fff;
        }
        /deep/ .vux-tab-ink-bar{
            background: #046FDB;
            height: 2px!important;
        }

        /deep/ .vux-tab-selected{
            color: #046FDB!important;
        }

        .content{
            height: calc(100% - 80px);

            /deep/ .vux-slider,
            /deep/ .vux-swiper-item,
            /deep/ .vux-swiper{
                height: 100%!important;
            }
        }
    }
</style>
