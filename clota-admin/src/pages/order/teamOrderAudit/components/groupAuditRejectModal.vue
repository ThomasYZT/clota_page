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
                    <span class="org-name" v-w-title="placeOrderOrgName">
                        {{placeOrderOrgName | contentFilter}}
                    </span>
                </span>
                <!--游玩日期-->
                <span>{{$t('playDate')}}：
                    <span class="org-name">{{originVisitDate | timeFormat('yyyy-MM-dd')}}</span>
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
                            slot="columnproductName"
                            slot-scope="row"
                            show-overflow-tooltip
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{ getProductName(scope.row) }}
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
                            slot="columnproductName"
                            slot-scope="row"
                            show-overflow-tooltip
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{ getProductName(scope.row) }}
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
                auditRemark : ''
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
            //下单企业名称
            placeOrderOrgName () {
                if (this.orderData && this.orderData.items && this.orderData.items.length > 0) {
                    return this.orderData.items[0].placeOrderOrgName;
                }
                return '';
            },
            //游玩日期
            originVisitDate () {
                if (this.orderData && this.orderData.items && this.orderData.items.length > 0) {
                    return this.orderData.items[0].originVisitDate;
                }
                return '';
            }
        },
        methods : {

            show ( data ) {
                if (data) {
                    this.orderData = data;
                    if (data.isBatch) {
                        this.tableData = data.items;
                        this.title = 'teamBatchCheckReject'; // 团队订单批量驳回申请
                    } else {
                        this.title = 'checkPass'; // 审核通过
                        this.getOrderProducts(data.items[0].orderNo);
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
             * @param orderNo  订单id
             */
            getOrderProducts (orderNo) {
                ajax.post('queryGroupDistributionInformation', {
                    orderNo : orderNo,
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data || [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
            auditReject () {
                if (this.auditRemark.length > 500) {
                    return;
                }
                ajax.post('updateGroupOrderAudit', {
                    orderId : this.orderData.items.map(item => item.id).join(','),
                    remark : this.auditRemark,
                    audit : 'reject',
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('orderRejected')); // 订单已驳回
                        this.$emit('on-audit-pass');
                    } else {
                        this.$Message.error(res.message || this.$t('orderRejectedFailed')); // 订单驳回失败
                    }
                    this.hide();
                });
            },
            /**
             * 获取产品名称
             * @param{Object} rowData 订单详情数据
             */
            getProductName (rowData) {
                if (rowData.productName) {
                    if (rowData.productName.slice(0,1) === '[') {
                        return JSON.parse(rowData.productName).join(',');
                    } else {
                        return rowData.productName;
                    }
                }
                return '';
            }

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
