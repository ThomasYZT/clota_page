<!--短信-->

<template>
    <div class="note-table">
        <div class="table-name">
            <span class="label">短信</span>
            <span class="back-up"
                  @click="isPackUpLoad = !isPackUpLoad">
            {{$t(isPackUpLoad ? 'backUp' : 'upLoad')}}
          </span>
        </div>
        <transition name="fade">
            <div v-if="isPackUpLoad">
                <table-com
                    :table-data="tableData"
                    :column-data="buyColumns"
                    :is-pack-up="true"
                    :show-page="true"
                    :total="totalCount"
                    @get-new-data="getNoteData">
                    <div class="employee-account" slot="table-title">
                        <span class="note-record">短信发送记录</span>
                        <div class="note-sended">
                            <Icon type="ios-help"></Icon>
                            <span class="note-tips">共发送短信数量：<span class="icon-weight">1280条</span></span>
                        </div>
                    </div>
                </table-com>
                <table-com
                    :table-data="tableData"
                    :column-data="sendColumns"
                    :is-pack-up="true"
                    :show-table-bar="false"
                    :show-page="true"
                    :total="totalCount"
                    @get-new-data="getNoteData">
                    <div class="employee-account" slot="table-title">
                        <span class="note-record">短信购买记录</span>
                        <div class="note-sended">
                            <Icon type="ios-help"></Icon>
                            <span class="note-tips">共购买短信数量：<span class="icon-weight">1280条</span></span>
                            <span class="note-tips">剩余短信数量：<span class="icon-weight">1280条</span></span>
                        </div>
                    </div>
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import tableCom from '../../../organization/tableCom';
    import {buyColumns,sendColumns} from './noteConfig';
    export default {
        components : {
            tableCom,
        },
        data() {
            return {
                //表格数据
                tableData: [
                    {
                        aa: '2016-05-03',
                        realName: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        aa: '2016-05-03',
                        realName: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                //购买短信表头
                buyColumns : buyColumns,
                //发送短信表头
                sendColumns : sendColumns,
                //员工总数
                totalCount : 100,
                //是否展开表格
                isPackUpLoad : false
            }
        },
        methods: {
            /**
             * 获取短信信息
             * @param data
             */
            getNoteData (data) {
                console.log(data)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .note-table{

        .table-name {
            @include block_outline($height: 49px);
            padding: 25px 0 0 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                vertical-align: middle;
                cursor: pointer;
            }
        }

        .employee-account {
            @include block_outline(auto);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;

            .note-record{
                display: block;
                margin-bottom: 5px;
                font-size: $font_size_13px;
                color: $color_333;
            }

            .note-sended{
                @include block_outline($height : 30px);
                background: $color_E8F7FF;
                border: 1px solid rgba(0,130,213,0.50);
                border-radius: 4px;
                margin-top: 10px;
                line-height: 27px;
                font-size: $font_size_14px;
                color: rgba($color_000,0.65);
                padding-left: 15px;

                .ivu-icon-ios-help{
                    font-size: $font_size_17px;
                    color:  $color_0082D5;
                    vertical-align: text-top;
                    margin-right: 10px;
                    margin-top: 1px;
                }

                .note-tips{
                    margin-right: 20px;

                    .icon-weight{
                        color: $color_000;
                    }
                }
            }
        }
    }
</style>
