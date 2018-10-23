<!--申请退票-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="800"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="refund-ticket"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('申请退票')}}</span>
        </div>
        <div class="target-body">
            <ul class="tourist-info">
                <li><span class="key">游客姓名：</span><span class="value">{{orderDetail.visitorName | contentFilter}}</span></li>
                <li><span class="key">手机号：</span><span class="value">{{orderDetail.phoneNumber | contentFilter}}</span></li>
            </ul>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :height="164"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :selectable="selectableFunc"
                    :label="row.title"
                    fixed="left"
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
            </table-com>
            <div class="service-charge">退票手续费：<span class="charge">{{refundFee | moneyFilter}}元</span></div>
            <div class="err-message">您申请退票的数量已超过可退票数量</div>
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './applyRefundTicketConfig';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //订单详情
            orderDetail : {
                type : Object,
                default : ''
            }
        },
        components : {
            tableCom
        },
        data() {
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //选择的产品信息
                selectedTicket : []
            }
        },
        methods: {
            /**
             * 隐藏模态框
             */
            cancel () {
                this.changeValue(hide);
            },
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                    this.queryOrderTicketList();
                }
            },
            /**
             * 确定退票
             */
            confirm () {

            },
            /**
             * 查询订单详情
             */
            queryOrderTicketList () {
                ajax.post('queryOrderTicketList',{
                    visitorProductId : this.orderDetail.visitorProductId
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data : [];
                    }else{
                        this.tableData = [];
                    }
                });
            },
            /**
             * 选择的产品信息
             * @param data
             */
            handleSelectionChange(data) {
                this.selectedTicket = data;
            },
            /**
             * 判断一个产品是否可选
             * @param data
             * @returns {boolean}
             */
            selectableFunc(data){
                //同步失败，已核销，已退票/退票待审核,已改签/改签待审核,不可选择
                if(data.syncStatus !== 'success'){
                    return false;
                }else if(data.rescheduleStatus !== "no_alter"){
                    return false;
                }else if(data.refundStatus !== 'no_refund'){
                    return false;
                }else if(data.verifyStatus !== 'true'){
                    return false;
                }else{
                    return true;
                }
            }
        },
        computed : {
            //退票费
            refundFee () {
                return this.selectedTicket.reduce((price,item) => price += item.refundProcedureFee,0);
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .refund-ticket{

        /deep/ .ivu-modal-body{
            padding: 0;
        }

        /deep/ .table-com{
            border-top: 1px solid #ebeef5;

            .el-table th{
                padding: 8px 0;
            }

            .ivu-form-item-content{
                line-height: 30px;
            }

            .el-table td{
                padding: 4px 0;

                .cell{
                    line-height: 31px;
                }
            }
        }

        .target-body{
            padding: 0 30px;

            .tourist-info{
                height: 60px;
                padding: 20px 0 20px 13px;
                line-height: 20px;
                font-size: $font_size_14px;

                li{
                    float: left;
                    margin-right: 100px;

                    .key{
                        color: #585858;
                    }

                    .value{
                        color: $color_333;
                    }
                }
            }

            .service-charge{
                height: 46px;
                padding: 15px 0;
                line-height: 16px;
                font-size: $font_size_12px;
                color: #353B48;

                .charge{
                    color: $color_yellow;
                }
            }

            .err-message{
                height: 56px;
                line-height: 16px;
                font-size: $font_size_12px;
                color: $color_err;
                padding: 20px 0;
                text-align: center;
            }
        }
    }
</style>
