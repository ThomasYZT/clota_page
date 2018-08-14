<!--短信设置-->

<template>
    <div class="sms-setting">
        <div class="sms-label-title">
            短信字数设置
        </div>
        <div class="sms-length-setting">
            单条短信最大字数&nbsp;
            <InputNumber :min="1" v-model="smsLength"></InputNumber>
            &nbsp;字
        </div>
        <div class="sms-label-title">
            短信供应商
        </div>
        <el-table
            :data="tableData"
            style="width: 150px">
            <el-table-column
                prop="date"
                label="短信供应商名称"
                width="150">
            </el-table-column>
        </el-table>
        <div class="btn-area">
            <slot name="footer" :rowData="tableData"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //短信长度
                smsLength : 0,
                //表格数据
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        methods: {

        },
        computed : {
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .sms-setting{
        position: relative;
        @include block_outline();

        .sms-label-title{
            padding-top: 30px;
            @include block_outline($height : 70px);
            font-size: $font_size_16px;
            color: $color_666;
        }

        .sms-length-setting{
            font-size: $font_size_14px;
            color: $color_333;
        }

        .btn-area{
            width: 100%;
            @include absolute_pos(absolute,$bottom : 20px);
            text-align: center;

            .ivu-btn-90px{
                margin: 0 10px;
            }
        }
    }
</style>
