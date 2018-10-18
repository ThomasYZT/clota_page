<!--订单明细信息-->

<template>
    <div class="order-particular">
        <div class="title">订单明细信息</div>
        <Form ref="formInline" :model="formData" :rules="ruleInline" inline>
            <FormItem prop="user" label="产品名称" :label-width="80">
                <Select v-model="formData.printName"
                        style="width: 180px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem prop="user" label="是否取票" :label-width="80">
                <Select v-model="formData.printName"
                        style="width: 180px">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem prop="user" label="关键词" :label-width="80">
                <Input type="text" v-model.trim="formData.keyword" style="min-width: 180px;max-width: 280px" />
            </FormItem>
            <FormItem prop="user" :label-width="10">
                <Button type="primary" class="ivu-btn-90px">搜索</Button>
                <Button type="ghost" class="ivu-btn-90px">重置</Button>
            </FormItem>
        </Form>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :auto-height="true">
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './orderParticularsConfig';
    export default {
        data() {
            return {
                //表格数据
                tableData : [
                    {
                    }
                ],
                //表头配置
                columnData : columnData,
                //查询条件
                formData :{
                    //产品名称
                    productName : '',
                    //关键字
                    keyword : ''
                },
                //校验规则
                ruleInline : {

                }
            }
        },
        components :{
            tableCom
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-particular{
        clear: both;

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
        }
    }
</style>
