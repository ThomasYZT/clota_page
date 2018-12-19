<!--申请改签-->

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
            <span class="title">{{$t('applyForUpgrade')}}</span>
        </div>
        <div class="target-body">
            <ul class="tourist-info">
                <li><span class="key">{{$t('YouAreApplyingToChangeTheFollowingProducts')}}：</span></li>
            </ul>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :height="224"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="columncheck"
                    slot-scope="row"
                    :selectable="selectableFunc"
                    :label="row.title"
                    fixed="left"
                    type="selection"
                    :width="row.width"
                    :min-width="row.minWidth">
                </el-table-column>
                <!--游玩日期-->
                <el-table-column
                    slot="columnvisitDate"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row['visitDate'] | timeFormat('yyyy-MM-dd')}}
                    </template>
                </el-table-column>
                <!--取票状态-->
                <el-table-column
                    slot="columnpickStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'blue-lable' : scope.row.pickStatus === 'true'}">
                            {{scope.row.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets')}}
                        </span>
                    </template>
                </el-table-column>
                <!--核销状态-->
                <el-table-column
                    slot="columnverifyStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'blue-lable' : scope.row.verifyStatus === 'true'}">
                            {{scope.row.verifyStatus === 'true' ? $t('consumed') : $t('noConsumed')}}
                        </span>
                    </template>
                </el-table-column>
                <!--退票状态-->
                <el-table-column
                    slot="columnrefundStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'red-lable' : scope.row.refundStatus === 'refunded','yellow-lable' : scope.row.refundStatus === 'refund_audit'}">
                            {{$t('order.' + scope.row.refundStatus)}}
                        </span>
                    </template>
                </el-table-column>
                <!--改签状态-->
                <el-table-column
                    slot="columnrescheduleStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'red-lable' : scope.row.rescheduleStatus === 'altered','yellow-lable' : scope.row.rescheduleStatus === 'alter_audit'}">
                            {{$t('order.' + scope.row.rescheduleStatus)}}
                        </span>
                    </template>
                </el-table-column>
                <!--同步状态-->
                <el-table-column
                    slot="columnsyncStatus"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{'red-lable' : scope.row.syncStatus === 'failure'}">
                            {{$t(transSyncStatus(scope.row.syncStatus))}}
                        </span>
                    </template>
                </el-table-column>
            </table-com>
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="110">
                <FormItem :label="$t('applyForUpgradeTo')" prop="alterDate">
                    <DatePicker type="date"
                                :editable="false"
                                :options="dateOptions"
                                style="width: 180px"
                                v-model.trim="formData.alterDate">
                    </DatePicker>
                </FormItem>
            </Form>
            <div class="err-message" v-if="errMsg">{{errMsg}}</div>
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
    import { columnData } from './applyRefundTicketConfig';
    import ajax from '@/api/index.js';
    import { transSyncStatus } from '../../commFun';

    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default () {
                    return false;
                }
            },
            //订单详情
            orderDetail : {
                type : Object,
                default () {
                    return '';
                }
            },
            //产品信息
            'product-info' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                //选择的产品信息
                selectedTicket : [],
                //错误信息
                errMsg : '',
                //表单校验规则
                ruleValidate : {
                    alterDate : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('alterDate') }),trigger : 'change',type : 'date' }
                    ]
                },
                //表单数据
                formData : {
                    alterDate : ''
                },
                //可以改签的日期
                canAlterDate : []
            };
        },
        methods : {
            /**
             * 隐藏模态框
             */
            cancel () {
                this.changeValue(false);
            },
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === true) {
                    this.getProductPolicyPlayDate();
                } else {
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 确定退票
             */
            confirm () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.selectedTicket.length > 0) {
                            this.saveOrderProductRefundAlter();
                        } else {
                            this.$Message.warning(this.$t('PleaseSelectTheProductToBeModified'));
                        }
                    }
                });
            },
            /**
             * 选择的产品信息
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedTicket = data;
                this.errMsg = '';
                for (let i = 0,j = data.length; i < j; i++) {
                    //如果景区改签的时候选择了不能改签的产品需要给出提示
                    if (data[i]['policyAlterRule'] === 'notAllow') {
                        this.errMsg = this.$t('alterProductTip'); // 提示：您申请改签的产品中包含按产品规则不允许改签的产品
                        break;
                    }
                }
            },
            /**
             * 判断一个产品是否可选
             * @param data
             * @returns {boolean}
             */
            selectableFunc (data) {
                return data.alterRule === 'true';
            },
            //同步状态
            transSyncStatus : transSyncStatus,
            /**
             * 发起退票申请
             */
            saveOrderProductRefundAlter () {
                ajax.post('saveOrderProductRefundAlter',{
                    orderId : this.orderDetail.orderId,
                    visitorProductId : this.orderDetail.visitorProductId,
                    productId : this.selectedTicket[0]['productId'],
                    reqOrderTicketIds : this.selectedTicket.map(item => item.id).join(','),
                    reqType : 'alter',
                    afterAlterDate : this.formData.alterDate.format('yyyy-MM-dd'),
                    orgId : this.orderDetail.orgId
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('TheApplicationForAlterationSuccess'));
                        this.cancel();
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('TheApplicationForAlterationFail'));
                    }
                });
            },
            /**
             * 获取产品可预定日期
             */
            getProductPolicyPlayDate () {
                ajax.post('getProductPolicyPlayDate',{
                    visitorProductId : this.orderDetail.visitorProductId,
                }).then(res => {
                    if (res.success) {
                        this.canAlterDate = res.data ? res.data : [];
                    } else {
                        this.canAlterDate = [];
                    }
                });
            }
        },
        computed : {
            //订单下的产品信息
            tableData () {
                if (this.productInfo && this.productInfo.length > 0) {
                    return this.productInfo;
                } else {
                    return [];
                }
            },
            //日期插件配置参数
            dateOptions () {
                return {
                    disabledDate : (date) => {
                        if (date) {
                            return !this.canAlterDate.includes(date.format('yyyy-MM-dd 00:00:00'));
                        }
                        return true;
                    }
                };
            }
        },
        created () {
        }
    };
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

            /deep/ .ivu-form-item{
                margin-top: 20px;
            }

            .blue-lable{
                color: $color_blue;
            }

            .red-lable{
                color: $color_err;
            }

            .yellow-lable{
                color: $color_yellow;
            }

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
