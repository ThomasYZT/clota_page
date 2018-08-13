<!--筛选表头-->


<template>
    <div class="filter-head" >

        <Form :model="formData" label-position="right" :label-width="80" >
            <Row>
                <Col span="8">
                <FormItem :label="$t('lessee')">
                    <Select v-model="formData.code" :transfer="true">
                        <Option v-for="item in lesseeList"
                                :value="item.value"
                                :key="item.value">
                            {{ $t(item.label) }}
                        </Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem :label="$t('serviceName')">
                    <Input v-model="formData.code" />
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem :label="$t('operateTime')">
                    <DatePicker type="daterange" :transfer="true" style="width: 100%;"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="类别">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in serviceOperateType"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="16" style="text-align: right">
                    <div class="btn-area">
                        <Button type="primary" class="ivu-btn-90px">搜索</Button>
                        <Button type="ghost" class="ivu-btn-90px">重置</Button>
                    </div>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import{serviceOperateType} from '@/assets/js/constVariable.js';
    export default {
        props : {
        },
        data() {
            return {
                //表单数据
                formData : {
                    code : '',
                    keyWord : ''
                },
                //操作类型
                serviceOperateType : serviceOperateType,
                //租户列表
                lesseeList : [],
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        position: relative;
        @include block_outline($height : auto);
        padding: 15px 34px 10px 0;
        overflow: hidden;
        transition: all 0.5s;

        .form-wrap{
            @include block_outline($height : auto);
            overflow: hidden;

            & .height-54px{
                height: 60px;
                transition: all 0.5s;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
        }

        /deep/ .ivu-form{
            float: left;
            @include block_outline(100%,auto);
        }

        .btn-area{
            margin-top: 2px;
        }
    }
</style>
