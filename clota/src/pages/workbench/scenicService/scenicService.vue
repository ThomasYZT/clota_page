<!--
内容：景区服务工作台
作者：djc
日期：
-->

<template>
    <div class="workbench-main">
        <div class="overview-data clearfix">
            <!--今日入园人数-->
            <overview-data :label-name="$t('今日入园人数')"
                      :label-rate="itemsData.checkVisitorNum.rate"
                      :label-num="itemsData.checkVisitorNum.value"
                      :icon="'icon-person-num'"
                      :icon-color="'#F7C002'"
                      :label-curve="itemsData.checkVisitorNum.sign">
            </overview-data>
            <!--今日订单数量-->
            <overview-data :label-name="$t('今日订单数量')"
                      :label-rate="itemsData.orderNum.rate"
                      :label-num="itemsData.orderNum.value"
                      :icon="'icon-quantity'"
                      :icon-color="'#FB7A89'"
                      :label-curve="itemsData.orderNum.sign">
            </overview-data>
            <!--今日订单金额-->
            <overview-data :label-name="$t('今日订单金额')"
                      :label-rate="itemsData.orderAmount.rate"
                      :label-num="itemsData.orderAmount.value"
                      :icon="'icon-money-amount'"
                      :icon-color="'#03CC7F'"
                      :label-curve="itemsData.orderAmount.sign">
            </overview-data>
            <!--未处理通知-->
            <overview-data :label-name="$t('未处理通知')"
                      :label-num="itemsData.workBackNum.value"
                      :icon="'icon-untreated'"
                      :icon-color="'#479FF8'"><!--require('@/assets/images/icon-abnormal.svg')-->
            </overview-data>
        </div>
        <div class="quota-info">
            <!--门票业绩指标-->
            <!--业态经营占比-->
        </div>
        <div class="quota-info placement-bottom-left">
            <!--今日营业状况-->
            <business-situation></business-situation>
            <!--待处理事项-->
            <pending-matters></pending-matters>
        </div>
    </div>
</template>
<script>
    import overviewData from '../components/overviewData.vue';
    import pendingMatters from '../components/pendingMatters.vue';
    import businessSituation from './components/businessSituation.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            overviewData,
            businessSituation,
            pendingMatters,
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
        overflow: auto;

        &:after {
            background: transparent;
        }

        .quota-info {
            overflow: auto;
            margin-top: 15px;
            height: 310px;
        }

        .placement-bottom-left {
            width: unquote('calc(100% - 425px)');
        }
    }
</style>
