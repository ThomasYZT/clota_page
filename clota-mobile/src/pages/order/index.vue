<!--订单列表-->

<template>
    <div class="order-list">
        <ul class="head">
           <li class="order-type"
               v-for="(item,i) in orderTapList"
               :key="i"
               :class="{'active' : activeTap === item}">
               <span class="iconfont icon-alipay"></span>
               <span class="label">{{$t(item)}}</span>
           </li>
        </ul>
        <!--订单列表-->
        <div class="order-info" v-for="item in orderList" :key="item.id">
            <div class="order-title">暂时没有订单名字</div>
            <div class="num">{{$t('num')}}：{{item.amount}}</div>
            <div class="price">{{$t('totalPrice')}}：{{item.amount | moneyFilter(2,'￥') | contentFilter}}</div>
            <div class="hr"></div>
            <div class="to-detail">
                <span class="for-detail" @click="toOrderDetail(item)">{{$t('toDetail')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                pageNo : 1,
                pageSize : 10,
                //订单列表
                orderList : [],
                //当前订单的类型
                activeTap : 'ticket',
                //订单类型列表
                orderTapList : [
                    'ticket',
                    'repase',
                    'commodity',
                    'hotel',
                ]
            }
        },
        methods: {
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
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.success){
                        this.orderList = res.data ? res.data.data : [];
                    }else{
                        this.orderList = [];
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                this.queryMemberOrder();
            }
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
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
