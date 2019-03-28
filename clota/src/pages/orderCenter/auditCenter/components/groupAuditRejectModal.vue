<template>
    <!--审核驳回-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="single-org" v-if="!orderData.isBatch && orderData.items.length>0">
                <!--下单企业-->
                <span style="float: left;margin-right: 60px;">
                    {{$t('orderOrg')}}：
                    <span class="org-name" v-w-title="orderData.items[0].orderOrgName">
                        {{orderData.items[0].orderOrgName | contentFilter}}
                    </span>
                </span>
                <!--游玩日期-->
                <span>{{$t('playDate')}}：
                    <!--<span class="org-name">{{orderData.items[0] ? new Date(orderData.items[0].originVisitDate).format('yyyy-MM-dd') : '-'}}</span>-->
                    <span class="org-name">{{orderData.items[0].originVisitDate | timeFormat('yyyy-MM-dd')}}</span>
                </span>
            </div>
            <div class="table-wrap">
                <template v-if="!orderData.isBatch">
                    <table-com
                        :height="250"
                        :table-com-min-height="250"
                        :column-data="columnData"
                        :table-data="tableData"
                        :border="false">
                        <el-table-column
                            slot="column2"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{scope.row.price | moneyFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column3"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{scope.row.actAmount | moneyFilter}}
                            </template>
                        </el-table-column>
                    </table-com>
                    <!--订单金额-->
                    <div class="order-amount">
                        {{$t('orderAmount')}}：<span class="yellow">{{(orderData.items[0] ? orderData.items[0].orderAmount : null) | moneyFilter}} {{$t('yuan')}}</span>
                    </div>
                </template>
                <template v-else>
                    <table-com
                        :height="250"
                        :table-com-min-height="250"
                        :column-data="batchColumnData"
                        :table-data="tableData"
                        :border="false">
                        <el-table-column
                            slot="column2"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                <!--{{new Date(scope.row.originVisitDate).format('yyyy-MM-dd') | contentFilter}}-->
                                {{scope.row.originVisitDate | timeFormat('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column3"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{scope.row.orderAmount | moneyFilter}}
                            </template>
                        </el-table-column>
                    </table-com>
                    <!--订单金额合计-->
                    <div class="order-amount">
                        {{$t('totalOrderAmount')}}：<span class="yellow">{{orderAmountSum | moneyFilter}} {{$t('yuan')}}</span>
                    </div>
                </template>
            </div>
            <!--备注-->
            <div style="padding: 0 20px;">
                <span class="label-remark">{{$t('remark')}}：</span>
                <div :style="{marginLeft: lang=='zh-CN'?'45px':'60px', position: 'relative'}">
                    <Input v-model.trim="auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('inputPlaceholder')" /><!--请输入-->
                    <p class="error-tip" v-show="auditRemark.length>500">{{$t('errorMaxLength', {field: this.$t('remark'), length: 500})}}</p>
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="error" @click="auditReject()" >{{$t("reject")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { orderProductHead, batchAuditHead } from '../auditConfig';
    import sum from 'lodash/sum';
    import { mapGetters } from 'vuex';

    export default {
        props : [],
        components : {
            tableCom,
        },
        data () {
            return {
                visible : false,
                title : '',
                //表头配置
                columnData : orderProductHead,
                //批量表头配置
                batchColumnData : batchAuditHead,
                //表格数据
                tableData : [],
                //订单数据
                orderData : {
                    items : [],
                    isBatch : false
                },
                //审核备注
                auditRemark : '',
                //审核状态
                auditStatus : '',
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
            orderAmountSum () {
                if (this.orderData.isBatch && this.orderData.items.length) {
                    return sum(this.orderData.items.map(item => item.orderAmount));
                } else {
                    return '-';
                }
            },
        },
        methods : {

            show ( data ) {
                if (data) {
                    this.orderData = data;
                    if (data.isBatch) {
                        this.tableData = data.items;
                        this.title = 'teamBatchCheckReject'; // 团队订单批量驳回申请
                    } else {
                        this.title = 'PRODUCT_AUDIT_REJECT'; // 驳回申请
                        this.getOrderProducts(data.items[0].id);
                    }
                    if (data.auditStatus) {
                        this.auditStatus = data.auditStatus;
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide () {
                this.auditRemark = '';
                this.orderData.items = [];
                this.tableData = [];
                this.visible = false;
            },
            /**
             * 获取订单下的产品
             * @param id  订单id
             */
            getOrderProducts (id) {
                ajax.post('queryOrderProductByOrderId', {
                    orderId : id
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data || [];
                    }
                });
            },
            auditReject () {
                if (this.auditRemark.length > 500) {
                    return;
                }

                ajax.post('auditTeamOrder', {
                    orderIds : this.orderData.items.map(item => item.id).join(','),
                    remark : this.auditRemark,
                    auditStatus : this.auditStatus ? this.auditStatus : 'reject',
                }).then(res => {
                    if (res.success) {
                        this.hide();
                        this.$Message.success(this.$t('orderRejected')); // 订单已驳回
                        this.$emit('on-audit-pass');
                    }
                });
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 4px;

            .order-amount {
                margin: 15px 20px;
                color: $color_333;
            }
            .single-org {
                margin-bottom: 15px;
                font-size: 14px;
                .org-name {
                    display: inline-block;
                    max-width: 150px;
                    @include overflow_tip();
                    vertical-align: middle;
                    color: $color_333;
                }
            }

            .label-remark {
                float: left;
                font-size: 14px;
                color: #585858;
            }

            .error-tip {
                position: absolute;
                bottom: -18px;
                left: 0;
                font-size: 12px;
                color: $color_red;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                width: 88px;
            }
        }

        .blue {
            color: $color_blue;
        }
        .yellow {
            color: $color_yellow;
        }
    }
</style>
