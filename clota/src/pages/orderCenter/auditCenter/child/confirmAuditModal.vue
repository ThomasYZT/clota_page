<template>
    <!--审核结果确认-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="500"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="single-org">
                <div class="form-wrap">
                    <div class="form-item-wrap">
                        <label>{{$t("游客姓名")}}：</label><span v-w-title="visitorInfo.visitorName">{{visitorInfo.visitorName | contentFilter}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("mobilePhone")}}：</label><span>{{visitorInfo.phoneNumber | contentFilter}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("productName")}}：</label><span v-w-title="baseInfo.productName">{{baseInfo.productName | contentFilter}}</span>
                    </div>
                </div>
            </div>
            <div class="table-wrap">
                <table-com
                    :height="165"
                    :column-data="columnData"
                    :table-data="tableData"
                    :min-height="150"
                    :border="false">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span :class="scope.row.auditStatus=='reject' ? 'red' : 'green'">{{$t(transAudit(scope.row.auditStatus))}}</span>
                        </template>
                    </el-table-column>
                </table-com>
                <div class="table-bottom">
                    <ul>
                        <li>{{$t('申请数量')}}：<b style="color: #333;">{{baseInfo.reqNum | contentFilter}}</b></li>
                        <li>{{$t('通过数量')}}：<b class="green">{{passedProducts.length | contentFilter}}</b></li>
                        <li>{{$t('驳回数量')}}：<b class="red">{{rejectProducts.length | contentFilter}}</b></li>
                    </ul>
                </div>

                <div class="refund-fee" v-if="isRefund">
                    {{$t('退票手续费')}}：<span class="yellow">{{(refundProcedureFee || '-') | moneyFilter}} {{$t('yuan')}}</span>
                </div>
            </div>
            <!--备注-->
            <div>
                <span style="float: left;">{{$t('remark')}}：</span>
                <div style="margin-left: 30px">
                    <Input v-model.trim="auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('请填写备注，不超过500个字符')" />
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirmAudit()" >{{$t("confirm")}}</Button>
            <Button type="ghost" @click="hide()" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {orderProductHead, batchAuditHead} from '../auditConfig';
    import sum from 'lodash/sum';
    import {transAudit} from '../../commFun';

    export default {
        props: {
            baseInfo: Object,
            visitorInfo: Object,
        },
        components: {
            tableCom,
        },
        data () {
            return {
                visible: false,
                title: '审核结果确认',
                //表头配置
                columnData : [
                    {
                        title: '产品明细编号',
                        minWidth: 150,
                        enWidth : 180,
                        field: 'id'
                    },
                    {
                        title: '审核结果',
                        minWidth: 150,
                        enWidth : 180,
                        field: 'auditStatus'
                    },
                ],
                //表格数据
                tableData: [],
                //审核类型：通过or全部驳回
                auditType: '',
                //审核备注
                auditRemark: '',
                //退票手续费
                refundProcedureFee: ''
            }
        },
        computed: {
            // 是否散客退票
            isRefund() {
                return (this.$route.query.reqType=='refund') || (this.$route.name=='bulkRefundDetail');
            },
            // 是否散客改签
            isAlter() {
                return (this.$route.query.reqType=='alter') || (this.$route.name=='bulkChangeDetail');
            },
            //产品列表 - 通过
            passedProducts() {
                return this.tableData.filter(item => {
                    return item.auditStatus === 'success';
                }) || [];
            },
            //产品列表 - 驳回
            rejectProducts() {
                return this.tableData.filter(item => {
                    return item.auditStatus === 'reject';
                }) || [];
            },
        },
        methods: {

            show ( data ) {
                if (data) {
                    this.auditType = data.type;
                    let selectItemIds = data.passList.map(passItem => passItem.id);
                    this.tableData = data.productList.map(item => {
                        if (data.type=='pass' && selectItemIds.includes(item.id)) {
                            item.auditStatus = 'success';
                        } else {
                            item.auditStatus = 'reject';
                        }
                        return item;
                    });

                    // 只有退票的时候才需调接口，获取退票手续费
                    if (this.isRefund) {
                        this.getRefundProcedureFee();
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.auditRemark = '';
                this.tableData = [];
                this.visible = false;
            },
            /**
             * 审核状态的code转换
             */
            transAudit: transAudit,

            /**
             * 获取订单退票手续费
             */
            getRefundProcedureFee() {
                if (this.tableData.length) {
                    ajax.post('getRefundProcedureFee', {
                        orderProductId: this.tableData[0].orderProductId,
                        orderTicketIds: this.passedProducts.map(item => item.id).join(','),  // 只传审核结果为通过的id
                    }).then(res => {
                        if (res.success) {
                            this.refundProcedureFee = res.data;
                        }
                    });
                }
            },
            /**
             * 单个订单审核的确认
             */
            confirmAudit() {
                let auditParams = {
                    orderId: '',
                    visitorProductId: '',
                    productId: '',
                    passOrderTicketIds: this.passedProducts.map(item => item.id).join(','),
                    rejectOrderTicketIds: this.rejectProducts.map(item => item.id).join(','),
                    reqType: '',    // 申请类型（退票-refund，改签-alter）
                    afterAlterDate: '',     // 改签的时候，需要将改签后的日期传上
                    remark: this.auditRemark,
                };
                if (this.tableData.length) {
                    Object.assign(auditParams, {
                        orderId: this.tableData[0].orderId,
                        visitorProductId: this.tableData[0].visitorProductId,
                        productId: this.tableData[0].productId,
                    });
                }

                if (this.isRefund) {
                    auditParams.reqType = 'refund';
                } else if (this.isAlter) {
                    auditParams.reqType = 'alter';
                }

                this.$emit('on-audit-confirmed', auditParams);
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            /*height: 450px;*/

            .refund-fee {
                margin: 15px 20px;
            }
            .single-org {
                margin-bottom: 16px;
                .org-name {
                    display: inline-block;
                    max-width: 150px;
                    @include overflow_tip();
                    vertical-align: middle;
                }
            }

            .table-bottom {
                ul > li {
                    float: right;
                    margin-right: 20px;
                }
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

        .green {
            color: $color_22BB5F;
        }
        .red {
            color: $color_red;
        }
        .yellow {
            color: $color_yellow;
        }

        .form-wrap{
            width: 100%;
            margin-top: 15px;
            @include clearfix();

            .form-item-wrap{
                width: 50%;
                float: left;
                padding-right: 10px;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color-666;
                display: flex;
                >label{
                    color: $color-333;
                }
                >span{
                    flex: 1;
                    display: inline-block;
                    vertical-align: middle;
                    @include overflow_tip();
                }
            }
        }
    }
</style>
