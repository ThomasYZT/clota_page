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
                           :label-rate="itemsData.orderVisitorNum ? itemsData.orderVisitorNum.rate : 0"
                           :label-num="itemsData.orderVisitorNum ? itemsData.orderVisitorNum.value : 0"
                           :icon="'icon-person-num'"
                           :icon-color="'#F7C002'"
                           :label-curve="itemsData.orderVisitorNum ? itemsData.orderVisitorNum.sign : ''">
            </overview-data>
            <!--今日预定数量-->
            <overview-data :label-name="$t('todayReserveQty')"
                           :label-rate="itemsData.orderAuditedNum ? itemsData.orderAuditedNum.rate : 0"
                           :label-num="itemsData.orderAuditedNum ? itemsData.orderAuditedNum.value : 0"
                           :icon="'icon-quantity'"
                           :icon-color="'#FB7A89'"
                           :label-curve="itemsData.orderAuditedNum ? itemsData.orderAuditedNum.sign : ''">
            </overview-data>
            <!--今日订单金额-->
            <overview-data :label-name="$t('todayOrderAmount')"
                           :label-rate="itemsData.orderAuditedAmount ? itemsData.orderAuditedAmount.rate : 0"
                           :label-num="itemsData.orderAuditedAmount ? itemsData.orderAuditedAmount.value : 0"
                           :icon="'icon-money-amount'"
                           :icon-color="'#03CC7F'"
                           :label-curve="itemsData.orderAuditedAmount ? itemsData.orderAuditedAmount.sign : ''">
            </overview-data>
            <!--未处理通知-->
            <overview-data :label-name="$t('pendingMatters')"
                           :label-num="itemsData.workBackNum ? itemsData.workBackNum.value : 0"
                           :icon="'icon-untreated'"
                           :icon-color="'#479FF8'"
                           :show-rate="false">
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
            };
        },
        created () {
            this.getPartnerQuota();
        },
        methods : {
            getPartnerQuota () {
                ajax.post('workbench-queryPartnerWorkbenchOptions',{
                    date : new Date().format('yyyy-MM-dd')
                }).then((res) => {
                    if (res.success && res.data) {
                        this.itemsData = res.data;
                    } else {
                        this.itemsData = {
                            orderVisitorNum : {},
                            orderAuditedAmount : {},
                            orderAuditedNum : {},
                            workBackNum : {},
                        };
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
        margin: 0 auto;

        @media screen and (max-width: 1500px) {
            @at-root {
                .workbench-main{
                    width: calc(100% - 60px);
                }
            }
        }
        @media screen and (min-width: 1500px) {
            @at-root {
                .workbench-main{
                    width: 85%;
                }
            }
        }

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
            min-height: 450px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            overflow: auto;
        }

        .placement-bottom-left {
            width: unquote('calc(100% - 425px)');
            float: left;
        }
    }
</style>
