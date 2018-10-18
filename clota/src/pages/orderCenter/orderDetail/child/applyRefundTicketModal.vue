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
                <li><span class="key">游客姓名：</span><span class="value">王</span></li>
                <li><span class="key">手机号：</span><span class="value">王</span></li>
            </ul>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :height="164">
            </table-com>
            <div class="service-charge">退票手续费：<span class="charge">25.00元</span></div>
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
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
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
                tableData : [
                    {

                    }
                ]
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
                    this.queryLeftMoney();
                    this.findProductSaleRule();
                }
            },
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
