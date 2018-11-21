<!--筛选表头-->


<template>
    <div class="filter-head" >

        <Form :model="formData" label-position="right" :label-width="100" >
            <Row>
                <i-col span="8">
                    <FormItem label="账号">
                        <Input v-model.trim="formData.loginName"
                               :placeholder="$t('请输入发售机构名称')"
                               @on-enter="emitFreshData"/>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label="操作类型">
                        <Select v-model="formData.sysOperationScene"
                                :transfer="true"
                                :clearable="true"
                                @on-change="emitFreshData">
                            <Option v-for="item in operateType"
                                    :value="item.lable"
                                    :key="item.lable">
                                {{ item.lable }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label="操作对象">
                        <Input v-model.trim="formData.sysTargetName"
                               placeholder="请输入操作对象名称"
                               @on-enter="emitFreshData"/>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="8">
                    <FormItem label="日志时间">
                        <DatePicker v-model="formData.date"
                                    :editable="false"
                                    type="daterange"
                                    :transfer="true"
                                    style="width: 100%;"
                                    @on-change="emitFreshData">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="16" style="text-align: right">
                    <div class="btn-area">
                        <Button type="primary"
                                class="ivu-btn-90px"
                                @click="emitFreshData">搜索</Button>
                        <Button type="ghost"
                                class="ivu-btn-90px"
                                @click="reset">重置</Button>
                    </div>
                </i-col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import { operateType } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //日志类型
            'log-type' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                //表单数据
                formData : {
                    //账号
                    loginName : '',
                    //操作类型
                    sysOperationScene : '',
                    //操作对象
                    sysTargetName : '',
                    //日志时间
                    date : []
                },
                //操作类型
                operateType : [],
            };
        },
        methods : {
            /**
             * 获取有值的路由信息
             */
            getFormdata () {
                let returnObj = {};
                //因为saas平台操作日志和运维平台操作日志的筛选条件不同，所以这里要区别对待
                if (this.logType === 'operate') {
                    for (let item in this.formData) {
                        if (item === 'date') {
                            if (this.formData['date'] &&
                                this.formData['date'].length === 2 &&
                                this.formData['date'][0] &&
                                this.formData['date'][1]) {
                                returnObj['sysLogStartDate'] = this.formData['date'][0].format('yyyy-MM-dd 00:00:00');
                                returnObj['sysLogEndDate'] = this.formData['date'][1].format('yyyy-MM-dd 23:59:59');
                            }
                        } else {
                            if (this.formData[item]) {
                                returnObj[item] = this.formData[item];
                            }
                        }
                    }
                } else {
                    for (let item in this.formData) {
                        if (item === 'date') {
                            if (this.formData['date'] &&
                                this.formData['date'].length === 2 &&
                                this.formData['date'][0] &&
                                this.formData['date'][1]) {
                                returnObj['saasLogStartDate'] = this.formData['date'][0].format('yyyy-MM-dd 00:00:00');
                                returnObj['saasLogEndDate'] = this.formData['date'][1].format('yyyy-MM-dd 23:59:59');
                            }
                        } else if (item === 'sysOperationScene') {
                            if (this.formData[item]) {
                                returnObj['operationScene'] = this.formData['sysOperationScene'];
                            }
                        } else if (item === 'sysTargetName') {
                            if (this.formData[item]) {
                                returnObj['targetName'] = this.formData['sysTargetName'];
                            }
                        } else {
                            if (this.formData[item]) {
                                returnObj[item] = this.formData[item];
                            }
                        }
                    }
                }
                return returnObj;
            },
            /**
             * 更新数据
             */
            emitFreshData () {
                this.$emit('fresh-data',this.getFormdata());
            },
            /**
             * 重置表单数据
             */
            reset () {
                this.formData.loginName = '';
                this.formData.sysOperationScene = '';
                this.formData.sysTargetName = '';
                this.formData.date = [];
                this.emitFreshData();
            },
            /**
             * 获取运维操作日志的操作类型
             */
            querySelectOpScene () {
                ajax.post('selectOpScene').then(res => {
                    if (res.status === 200) {
                        this.operateType = res.data ? res.data : [];
                    } else {
                        this.operateType = [];
                    }
                });
            },
            /**
             * 获取saas平台的操作类型
             */
            selectSaaSOpScene () {
                ajax.post('selectSaaSOpScene').then(res => {
                    if (res.status === 200) {
                        this.operateType = res.data ? res.data : [];
                    } else {
                        this.operateType = [];
                    }
                });
            }
        },
        watch : {
            //日志类型改变，重新获取操作类型
            logType : {
                handler (newVal,oldVal) {
                    if (newVal === 'operate') {
                        this.querySelectOpScene();
                    } else if (newVal === 'sass') {
                        this.selectSaaSOpScene();
                    }
                },
                immediate : true
            }
        }
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
            @include block_outline(100%,auto);
        }

        .btn-area{
            margin-top: 2px;
        }
    }
</style>
