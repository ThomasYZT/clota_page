<!--订单列表-->

<template>
    <div class="order-list">
        <ul class="head">
            <li class="order-type"
                :class="{'active' : activeTap === 'ticket'}"
                @click="changeTap('ticket')">
                <span class="iconfont icon-ticket">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                </span>
                <span class="label">{{$t('ticket')}}</span>
            </li>
            <li class="order-type"
                :class="{'active' : activeTap === 'catering'}"
                @click="changeTap('catering')">
                <span class="iconfont icon-catering">
                <span class="path1"></span><span class="path2"></span>
                </span>
                <span class="label">{{$t('catering')}}</span>
            </li>
            <li class="order-type"
                :class="{'active' : activeTap === 'commodity'}"
                @click="changeTap('commodity')">
              <span class="iconfont icon-commodity">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                </span>
                <span class="label">{{$t('commodity')}}</span>
            </li>
            <li class="order-type"
                :class="{'active' : activeTap === 'hotel'}"
                @click="changeTap('hotel')">
                <span class="iconfont icon-hotel">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
                </span>
                <span class="label">{{$t('hotel')}}</span>
            </li>
        </ul>
        <!--订单列表-->
        <div
            class="order-list-info"
            v-if="orderList.length > 0">
            <scroll ref="scroll"
                    :data="orderList"
                    :scrollbar="scrollbar"
                    :pullDownRefresh="pullDownRefreshObj"
                    :pullUpLoad="pullUpLoadObj"
                    @pullingDown="onPullingDown"
                    @pullingUp="onPullingUp">
                <div class="order-info"
                     v-for="item in orderList"
                     :key="item.id">
                    <div class="order-title">{{item.orderName | contentFilter}}</div>
                    <div class="num">{{$t('num')}}：{{item.orderProductNum}}</div>
                    <div class="price">{{$t('totalPrice')}}：{{item.amount | moneyFilter(2,'￥') | contentFilter}}</div>
                    <div class="hr"></div>
                    <div class="to-detail">
                        <span class="for-detail" @click="toOrderDetail(item)">{{$t('toDetail')}}</span>
                    </div>
                </div>
            </scroll>
        </div>
        <!--无数据显示-->
        <no-data class="page-no-data" >
        </no-data>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    import noData from '@/components/noData/index.vue';
    import Scroll from '../../components/scroll/scroll';
    export default {
        components : {
            noData,
            Scroll
        },
        data () {
            return {
                //订单列表
                orderList : [],
                //当前订单的类型
                activeTap : 'ticket',
                //是否显示滚动条
                scrollbar : false,
                //下拉刷新配置
                pullDownRefreshObj : {
                    //临界值
                    threshold : 90,
                    //刷新完成bubble停留的位置
                    stop : 40,
                    //设置加载和加载中显示的文字
                    txt : 'freshComplete'
                },
                //上拉加载配置
                pullUpLoadObj : {
                    //临界值
                    threshold : 20,
                    //设置加载和加载中显示的文字
                    txt : { more : 'loading', noMore : 'noMoreData' }
                },
                //分页设置
                pageSetting : {
                    pageNo : 1,
                    pageSize : 10
                }
            };
        },
        methods : {
            /**
             * 跳转到订单详情
             * @param data
             */
            toOrderDetail (data) {
                this.$router.push({
                    name : 'orderDetail',
                    params : {
                        orderId : data.id,
                        orderNo : data.orderNo,
                    }
                });
            },
            /**
             * 获取会员订单信息
             */
            queryMemberOrder () {
                ajax.post('queryMemberOrder',{
                    cardId : this.userInfo.cardId,
                    productType : this.activeTap,
                    ...this.pageSetting
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            if ( res.data.data.length >= this.pageSetting.pageNo * (this.pageSetting.pageSize - 10) && res.data.data.length <= this.pageSetting.pageNo * this.pageSetting.pageSize) {
                                this.orderList = res.data ? res.data.data : [];
                            } else {
                                this.orderList = res.data ? res.data.data : [];
                                this.refresh();
                                this.pageSetting.pageSize -= 10;
                            }
                        } else {
                            this.orderList = [];
                        }
                    } else {
                        this.orderList = [];
                        this.$vux.toast.text(this.$t('getDataFailure'));
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                this.queryMemberOrder();
            },
            /**
             * 切换tap类别
             * @param tapType
             */
            changeTap (tapType) {
                this.activeTap = tapType;
                this.queryMemberOrder();
            },
            /**
             * 下拉刷新操作
             */
            onPullingDown () {
                this.pageSetting = {
                    pageNo : 1,
                    pageSize : 10
                };
                this.queryMemberOrder();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp () {
                this.pageSetting.pageSize += 10;
                this.queryMemberOrder();
            },
            //强制刷新scroll
            refresh () {
                this.$refs.scroll.forceUpdate();
            }
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-list{
        @include block_outline();
        background: rgba(242,243,244,1);

        .head{
            @include block_outline($height : 85px);
            background: $color_fff;
            display: flex;
            flex-direction: row;

            .order-type{
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0.5;

                .iconfont{
                    font-size: 23px;
                }

                &.active{
                    opacity: 1;
                }

                .icon-alipay{
                    @include block_outline(23px,23px,false);
                    font-size: 23px;
                }

                .label{
                    font-size: $font_size_12px;
                    color: #353B48;
                    margin-top: 10px;
                }
            }
        }

        .page-no-data,
        .order-list-info{
            @include block_outline($height : unquote('calc(100% - 85px)'));
        }

        .order-list-info{
            overflow: auto;
        }

        .order-info{
            margin-top: 8px;
            @include block_outline($height : 139px);
            background: $color_fff;
            padding: 9px 0;

            .order-title{
                @include block_outline($height : 30px);
                font-size: $font_size_14px;
                color: #4A4A4A;
                padding: 5px 14px;
                @include overflow_tip();
            }

            .num,
            .price{
                @include block_outline($height : 21);
                padding: 4px 14px;
                font-size: $font_size_12px;
                color: #8E9091;
                line-height: 17px;
            }

            .hr{
                @include block_outline(unquote('calc(100% - 14px)'),0.5px);
                margin-top: 10px;
                background:#E8E8E8;
                padding-left: 14px;
                margin-left: 14px;
            }

            .to-detail{
                @include block_outline($height : 40px);
                text-align: right;
                padding: 9.5px 14px 0 0;

                .for-detail{
                    @include block_outline(60px,21px);
                    border: 1px solid #F7981C;
                    border-radius: 4px;
                    font-size: $font_size_12px;
                    color:#F7981C ;
                    padding: 2.5px 7px;
                }
            }
        }
    }
</style>
