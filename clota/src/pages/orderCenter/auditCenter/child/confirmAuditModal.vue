<template>
    <!--审核结果确认-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        :width="lang === 'zh-CN' ? 500 : 600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="single-org">
                <div class="form-wrap">
                    <!--游客姓名-->
                    <div class="form-item-wrap">
                        <label>{{$t("touristName")}}：</label><span v-w-title="visitorInfo.visitorName">{{visitorInfo.visitorName | contentFilter}}</span>
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
                <div class="table-bottom clearfix">
                    <ul>
                        <li>{{$t('rejectedNum')}}：<span class="red">{{rejectProducts.length | contentFilter}}</span></li><!--驳回数量-->
                        <li>{{$t('passedNum')}}：<span class="green">{{passedProducts.length | contentFilter}}</span></li><!--通过数量-->
                        <li>{{$t('requestNum')}}：<span style="color: #333;">{{applyNum | contentFilter}}</span></li><!--申请数量-->
                    </ul>
                </div>
                <!--退票手续费-->
                <div class="refund-fee" v-if="isRefund">
                    {{$t('cancellationCharge')}}：<span class="yellow">{{refundProcedureFee | moneyFilter}} {{$t('yuan')}}</span>
                </div>
            </div>
            <!--备注-->
            <div>
                <span style="float: left;">{{$t('remark')}}：</span>
                <div :style="{marginLeft: lang=='zh-CN'?'45px':'60px', position: 'relative'}">
                    <Input v-model.trim="auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('inputPlaceholder')" />
                    <p class="error-tip" v-show="auditRemark.length>500">{{$t('errorMaxLength', {field: this.$t('remark'), length: 500})}}</p>
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
    import { transAudit } from '../../commFun';
    import { mapGetters } from 'vuex';

    export default {
        props : {
            baseInfo : Object,
            visitorInfo : Object,
            //申请数量
            'apply-num' : {
                type : [String,Number],
                default : 0
            }
        },
        components : {
            tableCom,
        },
        data () {
            return {
                visible : false,
                title : 'confirmAuditRes', // 审核结果确认
                //表头配置
                columnData : [
                    {
                        title : 'productDetailNo', // 产品明细编号
                        minWidth : 150,
//                        enWidth : 180,
                        field : 'id'
                    },
                    {
                        title : 'auditResult', // 审核结果
                        minWidth : 150,
//                        enWidth : 180,
                        field : 'auditStatus'
                    },
                ],
                //表格数据
                tableData : [],
                //审核类型：通过or全部驳回
                auditType : '',
                //审核备注
                auditRemark : '',
                //退票手续费
                refundProcedureFee : 0
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
            // 是否散客退票
            isRefund () {
                return (this.$route.query.reqType === 'refund') || (this.$route.name === 'bulkRefundDetail');
            },
            // 是否散客改签
            isAlter () {
                return (this.$route.query.reqType === 'alter') || (this.$route.name === 'bulkChangeDetail');
            },
            //产品列表 - 通过
            passedProducts () {
                return this.tableData.filter(item => {
                    return item.auditStatus === 'success';
                }) || [];
            },
            //产品列表 - 驳回
            rejectProducts () {
                return this.tableData.filter(item => {
                    return item.auditStatus === 'reject';
                }) || [];
            },
        },
        methods : {

            show ( data ) {
                if (data) {
                    this.auditType = data.type;
                    let selectItemIds = data.passList.map(passItem => passItem.id);
                    this.tableData = data.productList.map(item => {
                        if (data.type === 'pass' && selectItemIds.includes(item.id)) {
                            item.auditStatus = 'success';
                        } else {
                            item.auditStatus = 'reject';
                        }
                        return item;
                    });

                    // 只有退票审核并且有被勾选了的产品的时候才需调接口，获取退票手续费
                    if (this.isRefund && this.passedProducts.length) {
                        this.getRefundProcedureFee();
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide () {
                setTimeout(() => {
                    this.auditRemark = '';
                    this.tableData = [];
                    this.refundProcedureFee = 0;
                }, 500);
                this.visible = false;
            },
            /**
             * 审核状态的code转换
             */
            transAudit : transAudit,

            /**
             * 获取订单退票手续费
             */
            getRefundProcedureFee () {
                if (this.tableData.length) {
                    ajax.post('getRefundProcedureFee', {
                        orderId : this.baseInfo.orderId,
                        orderProductId : this.tableData[0].orderProductId,
                        orderTicketIds : this.passedProducts.map(item => item.id).join(','), // 只传审核结果为通过的id
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
            confirmAudit () {
                let auditParams = {
                    orderId : '',
                    visitorProductId : '',
                    productId : '',
                    passOrderTicketIds : this.passedProducts.map(item => item.id).join(','),
                    rejectOrderTicketIds : this.rejectProducts.map(item => item.id).join(','),
                    reqType : '', // 申请类型（退票-refund，改签-alter）
                    afterAlterDate : '', // 改签的时候，需要将改签后的日期传上
                    remark : this.auditRemark,
                };
                if (this.tableData.length) {
                    Object.assign(auditParams, {
                        orderId : this.tableData[0].orderId,
                        visitorProductId : this.tableData[0].visitorProductId,
                        productId : this.tableData[0].productId,
                    });
                }

                if (this.isRefund) {
                    auditParams.reqType = 'refund';
                } else if (this.isAlter) {
                    auditParams.reqType = 'alter';
                }

                if (this.auditRemark.length <= 500) {
                    this.$emit('on-audit-confirmed', auditParams);
                }
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 10px 14px;
            font-size: 14px;

            .refund-fee {
                margin: 10px 0;
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
                margin: 10px 0;
                ul > li {
                    float: right;
                    margin-right: 20px;
                }
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
