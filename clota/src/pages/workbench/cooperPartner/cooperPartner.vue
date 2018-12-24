<!--
内容：合作伙伴工作台
作者：djc
日期：
-->

<template>
    <div class="workbench-main">
        <div class="overview-data clearfix">
            <!--今日预定人数-->
            <overview-data :label-name="$t('todayReserveNum')"
                           :label-rate="itemsData.orderVisitorNum.rate"
                           :label-num="itemsData.orderVisitorNum.value"
                           :icon="'icon-person-num'"
                           :icon-color="'#F7C002'"
                           :label-curve="itemsData.orderVisitorNum.sign">
            </overview-data>
            <!--今日预定数量-->
            <overview-data :label-name="$t('todayReserveQty')"
                           :label-rate="itemsData.orderAuditedNum.rate"
                           :label-num="itemsData.orderAuditedNum.value"
                           :icon="'icon-quantity'"
                           :icon-color="'#FB7A89'"
                           :label-curve="itemsData.orderAuditedNum.sign">
            </overview-data>
            <!--今日订单金额-->
            <overview-data :label-name="$t('todayOrderAmount')"
                           :label-rate="itemsData.orderAuditedAmount.rate"
                           :label-num="itemsData.orderAuditedAmount.value"
                           :icon="'icon-money-amount'"
                           :icon-color="'#03CC7F'"
                           :label-curve="itemsData.orderAuditedAmount.sign">
            </overview-data>
            <!--未处理通知-->
            <overview-data :label-name="$t('unHandledNotice')"
                           :label-num="itemsData.workBackNum.value"
                           :icon="'icon-untreated'"
                           :icon-color="'#479FF8'">
            </overview-data>
        </div>
        <div class="quota-info-top">
            <!--经营状况-->
            <operation-state></operation-state>
            <!--游客来源-->
            <tourist-source></tourist-source>
        </div>
        <div class="quota-info-bottom">
            <div class="placement-bottom-left">
                <!--分业态经营状况-->
                <differ-operation-state
                    :ajax-url="'workbench-getOrderAmountGroupByProductType'"
                    :card-title="'operateByProductType'"
                    :table-head="productTypeOperateHead"
                    style="padding-right: 7px;">
                </differ-operation-state>
                <!--分产品经营状况-->
                <differ-operation-state
                    :ajax-url="'workbench-getOrderAmountGroupByProductName'"
                    :card-title="'operateByProductName'"
                    :table-head="productNameOperateHead"
                    style="padding-left: 7px;">
                </differ-operation-state>
            </div>

            <!--待处理事项-->
            <pending-matters style="width: 410px; float: right;"></pending-matters>
        </div>
    </div>
</template>
<script>
    import overviewData from '../components/overviewData.vue';
    import pendingMatters from '../components/pendingMatters.vue';
    import operationState from './components/operationState.vue';
    import touristSource from './components/touristSource.vue';
    import differOperationState from './components/differOperationState.vue';
    import ajax from '@/api/index';
    import { productTypeOperateHead, productNameOperateHead } from '../workbenchConfig';

    export default {
        components : {
            overviewData,
            pendingMatters,
            operationState,
            touristSource,
            differOperationState,
        },
        props : {},
        data () {
            return {
                //顶部各项数据
                itemsData : {
                    //今日预定人数
                    orderVisitorNum : {},
                    //今日订单金额
                    orderAuditedAmount : {},
                    //今日预定数量
                    orderAuditedNum : {},
                    //未处理通知
                    workBackNum : {},
                },
                productTypeOperateHead : productTypeOperateHead,
                productNameOperateHead : productNameOperateHead,
            }
        },
        computed : {},
        created () {
            this.getPartnerQuota();
        },
        mounted () {
        },
        watch : {},
        methods : {
            getPartnerQuota () {
                ajax.post('workbench-queryPartnerWorkbenchOptions',{
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
            height: 340px;
            margin-top: 15px;
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
