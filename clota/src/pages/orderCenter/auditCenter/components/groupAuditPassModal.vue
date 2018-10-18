<template>
    <!--审核通过-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="single-org" v-if="!orderData.isBatch">
                <div style="float: left;">
                    {{$t('下单企业')}}：
                    <span class="org-name" v-w-title="orderData.items[0] ? orderData.items[0].orderOrgName : '-'">
                        {{orderData.items[0] ? orderData.items[0].orderOrgName : '-'}}
                    </span>
                </div>
                <div style="text-align: right;">{{$t('游玩日期')}}：{{orderData.items[0] ? orderData.items[0].originVisitDate : '-'}}</div>
            </div>
            <div class="table-wrap">
                <template v-if="!orderData.isBatch">
                    <table-com
                        :table-com-min-height="450"
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
                                {{scope.row.actPrice | moneyFilter}}
                            </template>
                        </el-table-column>
                    </table-com>
                    <div class="order-amount">
                        {{$t('订单金额')}}：<span class="blue">{{(orderData.items[0] ? orderData.items[0].orderAmount : '-') | moneyFilter}}</span>
                    </div>
                </template>
                <template v-else>
                    <table-com
                        :table-com-min-height="450"
                        :column-data="batchColumnData"
                        :table-data="tableData"
                        :border="false">
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
                    <div class="order-amount">
                        {{$t('订单金额合计')}}：<span class="blue">{{orderAmountSum | moneyFilter}}</span>
                    </div>
                </template>
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
            <Button type="primary" @click="auditPass()" >{{$t("审核通过")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {orderProductHead, batchAuditHead} from '../auditConfig';
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
                //表头配置
                columnData : orderProductHead,
                //批量表头配置
                batchColumnData : batchAuditHead,
                //表格数据
                tableData: [],
                //订单数据
                orderData: {
                    items: [],
                    isBatch: false
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
                    if (data.isBatch) {
                        this.tableData = data.items;
                        this.title = '团队订单批量审核通过';
                    } else {
                        this.title = '审核通过';
                        this.getOrderProducts(data.items[0].id);
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.auditRemark = '';
                this.orderData.items = [];
                this.tableData = [];
                this.visible = false;
            },

            /**
             * 获取订单下的产品
             * @param id  订单id
             */
            getOrderProducts(id) {
                ajax.post('queryOrderProductByOrderId', {
                    orderId: id
                }).then(res => {
                    if(res.success && res.data){
                        this.tableData = res.data || [];
                    }
                });
            },
            auditPass() {
                ajax.post('auditTeamOrder', {
                    orderIds: this.orderData.items.map(item => item.id).join(','),
                    remark: this.auditRemark,
                    auditStatus: 'success',
                }).then(res => {
                    if(res.success){
                        this.hide();
                        this.$Message.success(this.$t('订单已审核通过'));
                        this.$emit('on-audit-pass');
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
