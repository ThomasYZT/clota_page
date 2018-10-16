<template>
    <!--散客批量审核-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">
                <table-com
                    :table-com-min-height="450"
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
                            {{scope.row.actPrice | moneyFilter}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
            <!--备注-->
            <div>
                <span style="float: left;">{{$t('remark')}}：</span>
                <Input v-model.trim="auditRemark"
                       style="margin-left: 30px"
                       type="textarea"
                       :rows="3"
                       :placeholder="$t('请填写备注，不超过500个字符')" />
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'pass'">{{$t("审核通过")}}</Button>
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'reject'">{{$t("驳回")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {bulkBatchAuditHead} from '../auditConfig';
    import sum from 'lodash/sum';

    export default {
        props: [],
        components: {
            tableCom,
        },
        data () {
            return {
                visible: false,
                title: '',
                //批量表头配置
                batchColumnData : bulkBatchAuditHead,
                //表格数据
                tableData: [],
                //订单数据
                orderData: {
                    items: [],
                    isBatch: false,
                    type: ''
                },
                //审核备注
                auditRemark: ''
            }
        },
        computed: {
            orderAmountSum() {
                if (this.orderData.isBatch && this.orderData.items.length) {
                    return sum(this.orderData.items.map(item => item.orderAmount));
                } else {
                    return '-';
                }
            },
        },
        methods: {

            show ( data ) {
                if (data) {
                    this.orderData = data;
                    this.tableData = data.items || [];
                    if (data.type == 'pass') {
                        this.title = '批量通过';
                    } else if (data.type == 'reject') {
                        this.title = '批量驳回';
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.auditRemark = this.orderData.type = '';
                this.orderData.items = [];
                this.tableData = [];
                this.visible = false;
            },

            bulkBatchAudit() {
                ajax.post('auditTeamOrder', {
                    productRefundAlterIds: this.orderData.items.map(item => item.id).join(','),
                    remark: this.auditRemark,
                    auditStatus: this.orderData.type,
                    reqType: 'refund'
                }).then(res => {
                    if(res.success){
                        this.hide();
                        if (this.orderData.type === 'pass') {
                            this.$Message.success(this.$t('订单已批量审核通过'));
                        } else if (this.orderData.type === 'reject') {
                            this.$Message.success(this.$t('订单已批量驳回'));
                        }

//                        this.$emit('on-audit-pass');
                    }
                });
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 450px;

            .order-amount {
                margin: 15px 20px;
                text-align: right;
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
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

        .blue {
            color: $color_blue;
        }
    }
</style>
