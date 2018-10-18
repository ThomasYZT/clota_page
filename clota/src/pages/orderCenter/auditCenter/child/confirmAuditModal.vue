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
            <div class="single-org" v-if="!orderData.isBatch">
                <div class="form-wrap">
                    <div class="form-item-wrap">
                        <label>{{$t("游客姓名")}}：</label><span>{{moduleInfo.visitorName | contentFilter}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("mobilePhone")}}：</label><span>{{moduleInfo.phoneNumber | contentFilter}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("productName")}}：</label><span>{{moduleInfo.productName | contentFilter}}</span>
                    </div>
                </div>
            </div>
            <div class="table-wrap">
                <template v-if="!orderData.isBatch">
                    <table-com
                        :height="165"
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
                    </table-com>
                    <div class="table-bottom">
                        <ul>
                            <li>{{$t('申请数量')}}：<b>{{baseInfo.quantityPicked | contentFilter}}</b></li>
                            <li>{{$t('通过数量')}}：<b>{{baseInfo.quantityPicked | contentFilter}}</b></li>
                            <li>{{$t('驳回数量')}}：<b>{{baseInfo.quantityPicked | contentFilter}}</b></li>
                        </ul>
                        <div class="reserve-num">{{$t('已改签')}}：<b>{{baseInfo.quantity | contentFilter}}</b></div>
                    </div>

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
                <div style="margin-left: 30px">
                    <Input v-model.trim="auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('请填写备注，不超过500个字符')" />
                </div>
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
                columnData : [
                    {
                        title: '产品明细编号',
                        minWidth: 150,
                        enWidth : 180,
                        field: 'passOrderTicketIds'
                    },
                    {
                        title: '审核结果',
                        minWidth: 150,
                        enWidth : 180,
                        field: 'passOrderTicketIds'
                    },
                ],
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

        .form-wrap{
            width: 100%;
            margin-top: 15px;
            @include clearfix();

            .form-item-wrap{
                width: 50%;
                float: left;
                margin-right: 10px;
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
