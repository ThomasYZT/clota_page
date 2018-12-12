<!--
内容：景区服务工作台
作者：djc
日期：
-->

<template>
    <div class="workbench-main">
        <div class="overview-data clearfix">
            <!--今日入园人数-->
            <overview-data :label-name="$t('todayVisitorNum')"
                      :label-rate="itemsData.checkVisitorNum.rate"
                      :label-num="itemsData.checkVisitorNum.value"
                      :icon="'icon-person-num'"
                      :icon-color="'#F7C002'"
                      :label-curve="itemsData.checkVisitorNum.sign">
            </overview-data>
            <!--今日订单数量-->
            <overview-data :label-name="$t('todayOrderNum')"
                      :label-rate="itemsData.orderNum.rate"
                      :label-num="itemsData.orderNum.value"
                      :icon="'icon-quantity'"
                      :icon-color="'#FB7A89'"
                      :label-curve="itemsData.orderNum.sign">
            </overview-data>
            <!--今日订单金额-->
            <overview-data :label-name="$t('todayOrderAmount')"
                      :label-rate="itemsData.orderAmount.rate"
                      :label-num="itemsData.orderAmount.value"
                      :icon="'icon-money-amount'"
                      :icon-color="'#03CC7F'"
                      :label-curve="itemsData.orderAmount.sign">
            </overview-data>
            <!--未处理通知-->
            <overview-data :label-name="$t('unHandledNotice')"
                      :label-num="itemsData.workBackNum.value"
                      :icon="'icon-untreated'"
                      :icon-color="'#479FF8'">
            </overview-data>
        </div>
        <div class="quota-info-top">
            <!--门票业绩指标-->
            <ticket-performance></ticket-performance>
            <!--业态经营占比-->
            <trade-proportion></trade-proportion>
        </div>
        <div class="quota-info-bottom">
            <div class="placement-bottom-left">
                <!--今日营业状况-->
                <business-situation></business-situation>
                <!--待处理事项-->
                <pending-matters style="width: 42%; padding-left: 15px; float: left"></pending-matters>
            </div>

            <!--畅销产品-->
            <popular-product></popular-product>
        </div>
    </div>
</template>
<script>
    import overviewData from '../components/overviewData.vue';
    import pendingMatters from '../components/pendingMatters.vue';
    import businessSituation from './components/businessSituation.vue';
    import popularProduct from './components/popularProduct.vue';
    import tradeProportion from './components/tradeProportion.vue';
    import ticketPerformance from './components/ticketPerformance.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            overviewData,
            businessSituation,
            pendingMatters,
            popularProduct,
            tradeProportion,
            ticketPerformance,
        },
        props : {},
        data () {
            return {
                //顶部各项数据
                itemsData : {
                    //入园人数
                    checkVisitorNum : {},
                    //订单金额
                    orderAmount : {},
                    //订单数量
                    orderNum : {},
                    //未处理通知
                    workBackNum : {},
                }
            }
        },
        computed : {},
        created () {
            this.getScenicQuota();
        },
        mounted () {
        },
        watch : {},
        methods : {
            getScenicQuota () {
                ajax.post('workbench-queryScenicWorkbenchOptions',{
                    date : new Date().format('yyyy-MM-dd')
                }).then((res) => {
                    if (res.success && res.data) {
                        this.itemsData = res.data;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .workbench-main {
        @include block_outline();
        @include padding_place();
        width: 80%;
        margin: 0 auto;

        &:after {
            background: transparent;
        }

        .quota-info-top,
        .quota-info-bottom {
            padding: 15px 15px 0 15px;
            background-color: $color_fff;
        }
        .quota-info-top {
            margin-top: 15px;
            height: 340px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .quota-info-bottom {
            padding-bottom: 15px;
            height: 340px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        .placement-bottom-left {
            width: unquote('calc(100% - 425px)');
        }
    }
</style>
