<!--订单详情-->

<template>
    <div class="order-detail">
        <bread-crumb-head
            :locale-router="$t('orderDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="order-info">
            <!--订单表头信息-->
            <order-info :order-type='orderType'>
            </order-info>
            <!--产品信息-->
            <product-info>
            </product-info>
            <!--游客信息 -->
            <tourist-info :order-type='orderType'>
            </tourist-info>
            <!-- 导游信息 -->
            <guid-com v-if="orderType === 'team'">
            </guid-com>
            <!-- 司机信息 -->
            <driver-com v-if="orderType === 'team'">
            </driver-com>
            <!--分销商信息-->
            <div class="distributor-info">
                <div class="info-title">分销商信息</div>
                <ul class="multiple">
                    <li class="list" >
                        <div class="info-list1">
                            <span class="info-key">一级分销商：</span>
                            <span class="info-val">小小星星旅行社</span>
                        </div>
                        <div class="info-list2">
                            <span class="info-key">二级分销商：</span>
                            <span class="info-val">华益旅行社</span>
                        </div>
                        <div class="info-list3">
                            <span class="info-key">三级分销商：</span>
                            <span class="info-val">无</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--支付信息-->
            <div class="distributor-info">
                <div class="info-title">支付信息</div>
                <ul class="multiple">
                    <li class="list" >
                        <div class="info-list1">
                            <span class="info-key">支付状态：</span>
                            <span class="info-val">已支付</span>
                        </div>
                        <div class="info-list2">
                            <span class="info-key">支付方式：</span>
                            <span class="info-val">账户</span>
                        </div>
                        <div class="info-list3">
                            <span class="info-key">支付时间：</span>
                            <span class="info-val">2016-10-26 10:23:00</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!--核销信息-->
            <verify-pro :order-type='orderType'>
            </verify-pro>
            <!--短消息-->
            <sms-info v-if="orderType === 'custom'">
            </sms-info>
            <!--退票信息-->
            <refund-ticket  v-if="orderType === 'custom'">
            </refund-ticket>
            <!--操作日志-->
            <operate-log>
            </operate-log>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import orderInfo from './orderDetailChild/orderInfo';
    import productInfo from './orderDetailChild/productInfo';
    import touristInfo from './orderDetailChild/touristInfo';
    import smsInfo from './orderDetailChild/smsInfo';
    import refundTicket from './orderDetailChild/refundTicket';
    import operateLog from './orderDetailChild/operateLog';
    import verifyPro from './orderDetailChild/verifyPro';
    import guidCom from './orderDetailChild/guide.vue';
    import driverCom from './orderDetailChild/driver.vue';
    export default {
        components :{
            breadCrumbHead,
            orderInfo,
            productInfo,
            touristInfo,
            smsInfo,
            refundTicket,
            operateLog,
            verifyPro,
            guidCom,
            driverCom
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('order'),
                        router: {
                            name: 'order'
                        }
                    }
                ],
                //订单类型
                orderType : 'team'
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.orderType){
                    this.orderType = params.orderType;
                }else{
                    this.$router.push({
                        name : 'order'
                    });
                }
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-detail{
        @include block_outline();

        .order-info{
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            overflow: auto;
            padding: 20px 50px 0 50px;

            .distributor-info{

                .info-title{
                    @include block_outline($height : 49px);
                    padding-top: 24px;
                    line-height: 25px;
                    font-size: $font_size_16px;
                    color: $color_333;
                }

                .multiple {
                    @include block_outline($height: auto);

                    .list {
                        @include block_outline(auto);
                        min-height: 30px;
                        overflow: auto;
                        padding: 4px 0;
                        line-height: 22px;

                        .info-list1,
                        .info-list3,
                        .info-list2 {
                            display: flex;
                            flex-direction: row;
                            float: left;
                            font-size: $font_size_14px;
                            /*align-items: center;*/

                            .info-key {
                                @include block_outline(auto, 100%,false);
                                color: $color_333;

                                &.fix-key{
                                    width: 120px;
                                    text-align: left;
                                }
                            }

                            .info-val {
                                flex: 1;
                                @include overflow_tip(auto, auto);
                                color: $color_666;

                                .reset-pass{
                                    color: $color_blue;
                                    font-size: $font_size_12px;
                                    margin-left: 10px;
                                    display: inline-block;
                                    cursor: pointer;
                                }
                            }
                        }

                        .info-list1 {
                            @include block_outline(30%, auto);
                        }

                        .info-list2 {
                            @include block_outline(30%, auto);
                            padding-left: 15px;
                        }

                        .info-list3{
                            @include block_outline(40%, auto);
                            padding-left: 15px;
                        }

                    }
                }
            }

        }
    }
</style>
