<!--
内容：产品明细
作者：
日期：
-->

<template>
    <div class="product-detail">
        <div class="block-title">{{$t('产品明细')}}</div>
        <div class="table-top">
            <!--产品名称-->
            <span>{{$t('productName')}}：{{baseInfo.productName | contentFilter}}</span>
            <!--产品单价-->
            <span style="margin-left: 40px;">{{$t('settlePrice')}}：{{baseInfo.price | contentFilter}}</span>
            <div class="audit-btn">
                <Button type="primary"
                        style="width: 88px; margin-right: 5px;"
                        :disabled="!moduleInfo || reqOrderTickets.length<1"
                        @click="showAuditModal('pass')">{{$t('通过')}}
                </Button>
                <Button type="error"
                        style="width: 88px; background-color: #EB6751;"
                        :disabled="!moduleInfo || reqOrderTickets.length<1"
                        @click="showAuditModal('reject')">{{$t('全部驳回')}}
                </Button>
            </div>
        </div>
        <!--产品列表-->
        <table-com
            :table-com-min-height="300"
            :ofsetHeight="170"
            :show-pagination="false"
            :column-data="columnData"
            :table-data="moduleInfo"
            :border="true"
            @selection-change="changeSelection">
            <el-table-column
                slot="column0"
                slot-scope="row"
                :label="row.title"
                fixed="left"
                type="selection"
                :width="row.width"
                :min-width="row.minWidth"
                :selectable="handleSelectable">
            </el-table-column>
            <el-table-column
                slot="column9"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate-btn blue" @click="">{{$t('details')}}</span>
                </template>
            </el-table-column>
        </table-com>
        <div class="table-bottom">
            <i class="iconfont icon-note"></i>
            <ul>
                <li>{{$t('未取票')}}：<b>{{Number(baseInfo.quantity) - Number(baseInfo.quantityPicked)}}</b></li>
                <li>{{$t('已取票')}}：<b>{{baseInfo.quantityPicked | contentFilter}}</b></li>
                <li>{{$t('未核销')}}：<b>{{Number(baseInfo.quantity) - Number(baseInfo.quantityVerified)}}</b></li>
                <li>{{$t('已核销')}}：<b>{{baseInfo.quantityVerified | contentFilter}}</b></li>
                <li>{{$t('已退票')}}：<b>{{baseInfo.quantityRefunded | contentFilter}}</b></li>
                <li>{{$t('已改签')}}：<b>{{baseInfo.quantityRescheduled | contentFilter}}</b></li>
            </ul>
            <div class="reserve-num">{{$t('已改签')}}：<b>{{baseInfo.quantity | contentFilter}}</b></div>
        </div>
        <!--审核确认弹框-->
        <confirm-audit-modal ref="confirmAuditModal"
                             :base-info="baseInfo"
                             :visitor-info="visitorInfo"
                             @on-audit-confirmed="onAuditConfirmed">
        </confirm-audit-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {productListHead} from '../auditCenter/auditConfig';
    import ajax from '@/api/index';
    import confirmAuditModal from '../auditCenter/child/confirmAuditModal.vue';

    export default {
        components: {tableCom, confirmAuditModal},
        props: {
            moduleInfo: {
                type: Array,
                default() {
                    return [];
                }
            },
            baseInfo: Object,
            visitorInfo: Object,
        },
        data() {
            return {
                //表头配置
                columnData : productListHead,
                // 已勾选的数据
                chosenRowData: [],
                //发起申请的产品
                reqOrderTickets: [],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {
            moduleInfo(val, oldVal) {
                if (val.length>0) {
                    this.getReqOrderTickets();
                }
            }
        },
        methods: {
            /**
             * 获取发起申请的产品
             */
            getReqOrderTickets() {
                let bulkDetail = JSON.parse(sessionStorage.getItem(this.$route.name));
                if (bulkDetail && bulkDetail.rowData && this.moduleInfo) {
                    this.reqOrderTickets = this.moduleInfo.filter(item => {
                        return bulkDetail.rowData.reqOrderTicketIds.includes(item.id);
                    }) || [];
                }
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.chosenRowData = selection;
            },
            /**
             * 弹出审核确认的模态框
             **/
            showAuditModal(auditType) {

                this.$refs['confirmAuditModal'].show({
                    productList: this.reqOrderTickets,
                    passList: this.chosenRowData,
                    type: auditType
                });
            },
            /**
             * 根据判断每个产品的id是否在发起申请订单里，来设置CheckBox 是否可以勾选
             * @param row   // 行数据
             * @param index // 序号
             */
            handleSelectable(row, index) {
                let bulkDetail = JSON.parse(sessionStorage.getItem(this.$route.name));
                if (bulkDetail && bulkDetail.rowData) {
                    return bulkDetail.rowData.reqOrderTicketIds.includes(row.id);
                }
            },
            /**
             * 单个订单审核
             * @param auditParams   单个订单审核的传参
             */
            onAuditConfirmed(auditParams) {
                ajax.post('auditSingleOrderProduct', auditParams).then(res => {
                    if(res.success){
                        this.$refs['confirmAuditModal'].hide();
                        this.$Message.success(this.$t('审核结果确认成功'));
                        this.$emit('confirm-audit', auditParams.visitorProductId);
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .block-title {
        padding: 15px 0;
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
    }

    .table-top {
        .audit-btn {
            float: right;
        }
    }

    .table-bottom {
        margin-top: 10px;
        padding: 0 16px;
        background: $color_E8F7FF;
        border: 1px solid rgba(0,130,213,0.50);
        border-radius: 4px;

        .icon-note {
            color: $color_blue;
        }
        ul {
            display: inline-block;
            margin-left: 15px;
            vertical-align: middle;
            > li {
                float: left;
                margin-right: 40px;
                line-height: 30px;
                color: rgba(0,0,0,0.65);
                b {
                    color: #000;
                }
            }
        }
        .reserve-num {
            float: right;
            margin-right: 14px;
            color: $color_red;
            line-height: 30px;
        }
    }

    .blue {
        color: $color_blue;
    }
</style>
