<!--退票和改签操作-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="operate-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t( operateType === 'returnTicket' ?  '申请退票' : '申请改签')}}</span>
        </div>
        <div class="body-info">
            <ul class="ticket-info">
                <li class="ticket-list">
                    <span class="info-key" v-if="operateType === 'returnTicket'">退票人：</span>
                    <span class="info-key" v-else>改签人：</span>
                    <span class="info-val">站撒</span>
                </li>
                <li class="ticket-list">
                    <span class="info-key">证件类型：</span>
                    <span class="info-val">身份证</span>
                </li>
                <li class="ticket-list">
                    <span class="info-key">证件号码：</span>
                    <span class="info-val">11111111111111111111</span>
                </li>
            </ul>
            <div class="product-title">产品名称</div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="item in columnData"
                    :prop="item.field"
                    :label="item.title"
                    :min-width="item.minWidth">
                </el-table-column>
                <el-table-column
                    v-if="operateType === 'returnTicket'"
                    :label="$t('退票数量')"
                    min-width="100">
                    <template slot-scope="scoped">
                        <InputNumber :max="10" :min="1" ></InputNumber>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :label="$t('游玩日期')"
                    min-width="100">
                    <template slot-scope="scoped">
                        <DatePicker
                            type="date"
                            :transfer="true"
                            style="width: 100px">
                        </DatePicker>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props: {
            //绑定的模态框是否显示的变量
            value: {
                type: Boolean,
                default: false
            },
            //操作类型
            'operate-type': {
                type: String,
                default : ''
            }
        },
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普'
                }],
            }
        },
        methods: {
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

            },
            /**
             * 取消
             */
            cancel() {
                this.$emit('input', false);
            },
            /**
             * 确认
             */
            confirm() {
                this.$emit('input', false);
            }
        },
        computed :{
            //表头配置
            columnData () {
                if(this.operateType === 'returnTicket'){
                    return [
                        {
                            title : '产品名称',
                            field : 'name',
                            minWidth : 150
                        },
                        {
                            title : '游玩日期',
                            field : 'playDate',
                            minWidth : 100
                        },
                        {
                            title : '结算价',
                            field : 'price',
                            minWidth : 80
                        }
                    ]
                }else{
                    return [
                        {
                            title : '产品名称',
                            field : 'name',
                            minWidth : 150
                        },
                        {
                            title : '结算价',
                            field : 'price',
                            minWidth : 80
                        },
                        {
                            title : '数量',
                            field : 'number',
                            minWidth : 60
                        },
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .operate-modal {
        & /deep/ .ivu-modal {
            width: 650px !important;
            max-height: 477px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        /deep/ .el-table td,
        /deep/ .el-table th{
            padding: 5px 0!important;
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 370px);
            overflow: auto;
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .body-info {
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;
            padding: 20px 30px 0 30px;
            overflow: auto;
            @include padding_place();

            .ticket-info{
                overflow: auto;
                border-bottom: 1px solid $color_E1E1E1;
                padding-bottom: 20px;

                .ticket-list{
                    font-size: $font_size_14px;
                    @include block_outline($height : 30px);
                    line-height: 30px;
                    display: flex;
                    flex-direction: row;

                    .info-key{
                        display: inline-block;
                        color: $color_333;
                    }

                    .info-val{
                        flex: 1;
                        display: inline-block;
                        color: $color_666;
                        @include overflow_tip();
                    }
                }
            }

            .product-title{
                font-size: $font_size_14px;
                color: $color_333;
                @include block_outline($height : 50px);
                line-height: 30px;
                padding: 10px 0;
            }
        }
    }
</style>
