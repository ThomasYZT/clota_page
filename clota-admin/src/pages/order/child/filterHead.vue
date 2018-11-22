<!--筛选表头-->


<template>
    <div class="filter-head" >
        <transition name="fade">
            <Form :model="formData" label-position="right" :label-width="100" v-if="!isPackUp">
                <Row>
                    <Col span="6">
                    <FormItem label="订单编号">
                        <Input v-model.trim="formData.code" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="串码">
                        <Input v-model.trim="formData.code" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="产品名称">
                        <Input v-model.trim="formData.code" placeholder="请输入产品名称" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem >
                        <Checkbox >仅显示异常订单</Checkbox>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <Form :model="formData" label-position="right" :label-width="100" v-else >
                <Row>
                    <Col span="6">
                    <FormItem label="订单编号">
                        <Input v-model.trim="formData.code" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="串码">
                        <Input v-model.trim="formData.code" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="产品名称">
                        <Input v-model.trim="formData.code" placeholder="请输入产品名称" ></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem >
                        <Checkbox >仅显示异常订单</Checkbox>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="租户">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in lessesList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="下单企业">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in orderCompany"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="业态类型">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in formatsStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="订单类型">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in orderType"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="审核状态">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in auditStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="支付状态">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in payStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="核销状态">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in cashierStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="退款状态">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in refundStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="同步状态">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in synchronizationStatus"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="下单日期">
                        <DatePicker type="date"
                                    :transfer="true"
                                    v-model="formData.code"
                                    style="width: 100%;">
                        </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="游玩日期">
                        <DatePicker type="date"
                                    :transfer="true"
                                    v-model="formData.code"
                                    style="width: 100%;">
                        </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="下单渠道">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in orderChannels"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="发售机构">
                        <Select v-model="formData.code" :transfer="true">
                            <Option v-for="item in orderChannels"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </transition>

        <div class="btn-area">
            <div class="pack-up-filters" @click="isPackUp = !isPackUp">
                收起筛选条件
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </div>
            <div class="con-area">
                <Button type="primary" class="ivu-btn-90px">搜索</Button>
                <Button type="ghost" class="ivu-btn-90px">重置</Button>
            </div>
        </div>
        <Form :model="formData" label-position="right" :label-width="100">
            <Row>
                <Col span="6">
                <FormItem label="模糊查询">
                   <Input v-model.trim="formData.keyWord" placeholder="模糊查询" />
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import { orderChannels,orderType,formatsStatus,auditStatus,payStatus,cashierStatus,synchronizationStatus,refundStatus } from '@/assets/js/constVariable.js';
    export default {
        props : {
        },
        data () {
            return {
                //表单数据
                formData : {
                    code : '',
                    keyWord : ''
                },
                //是否展开
                isPackUp : false,
                //下单渠道
                orderChannels : orderChannels,
                //订单类型
                orderType : orderType,
                //业态类型
                formatsStatus : formatsStatus,
                //审核状态
                auditStatus : auditStatus,
                // /支付状态
                payStatus : payStatus,
                //核销状态
                cashierStatus : cashierStatus,
                //同步状态
                synchronizationStatus : synchronizationStatus,
                //退款状态
                refundStatus : refundStatus,
                //下单企业
                orderCompany : [],
                //租户列表
                lessesList : [],
            };
        },
        methods : {}
    };
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
            @include block_outline(unquote('calc(100% - 226px)'));
        }

        .btn-area{
            float: left;
            @include block_outline(226px,100%);
            @include absolute_pos(absolute,$top : 0,$right : 0,$bottom : 0);

            .pack-up-filters{
                display: inline-block;
                float: right;
                @include block_outline(auto,20px);
                line-height: 20px;
                font-size: $font_size_14px;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
                padding-right: 34px;
                margin-top: 20px;
                user-select: none;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }

            .con-area{
                @include absolute_pos(absolute,$bottom : 20px,$left : 0,$right : 34px);
                text-align: right;
            }
        }
    }
</style>
