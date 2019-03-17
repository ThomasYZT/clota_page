<!--新建规则-->

<template>
    <Modal
        :title="isCopyRule ? $t('复制规则') : $t('createdRule')"
        :mask-closable="false"
        :value="value"
        :width="600"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="create-rule"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="110">
            <FormItem :label="$t('ruleName')" prop="name">
                <Input v-model.trim="formData.name"
                       :placeholder="$t('inputPlaceholder')"
                       style="width: 280px"/>
            </FormItem>
            <FormItem :label="$t('startTime')" prop="startTime">
                <DatePicker type="date"
                            :options="dateOptions"
                            transfer
                            :editable="false"
                            :placeholder="$t('selectField',{ msg : '' })"
                            v-model="formData.startTime"
                            style="width: 280px">
                </DatePicker>
            </FormItem>
            <FormItem :label="$t('endTime')" prop="endTime">
                <DatePicker type="date"
                            :options="dateOptions"
                            transfer
                            :editable="false"
                            :placeholder="$t('selectField',{ msg : '' })"
                            v-model="formData.endTime"
                            :disabled="!endTimeAbled"
                            style="width: 280px">
                </DatePicker>
                <Checkbox class="forever-class"
                          v-model="formData.validForEver"
                          @on-change="timeValidChange">
                    {{$t('永久有效')}}
                </Checkbox>
            </FormItem>
            <FormItem :label="$t('validDate')" prop="validTime">
                <CheckboxGroup v-model="formData.validTime">
                    <Checkbox v-for="(item,index) in validDateList"
                              :key="index"
                              :label="$t(item.value)">
                        {{$t(item.name)}}
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <i-row>
                <i-col span="14">
                    <FormItem :label="$t('validDateEveryDay')" prop="validStartTimeForDay">
                        <TimePicker type="time"
                                    transfer
                                    :clearable="false"
                                    :editable="false"
                                    :placeholder="$t('selectField',{ msg : '' })"
                                    style="width: 120px"
                                    v-model="formData.validStartTimeForDay">
                        </TimePicker>
                    </FormItem>
                </i-col>
                <i-col span="2" class="to-label">
                    {{$t('To')}}
                </i-col>
                <i-col span="8">
                    <FormItem  prop="validEndTimeForDay" :label-width="1">
                        <TimePicker type="time"
                                    transfer
                                    :clearable="false"
                                    :editable="false"
                                    :placeholder="$t('selectField',{ msg : '' })"
                                    style="width: 120px"
                                    v-model="formData.validEndTimeForDay">
                        </TimePicker>
                    </FormItem>
                </i-col>
            </i-row>
            <!--<FormItem :label="$t('是否启用')" prop="enabled">-->
                <!--<RadioGroup v-model="formData.enabled">-->
                    <!--<Radio label="true">{{$t('立即启用')}}</Radio>-->
                    <!--<Radio label="false">{{$t('暂不启用')}}</Radio>-->
                <!--</RadioGroup>-->
            <!--</FormItem>-->
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //当前操作的规则信息
            'rule-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            //校验结束时间
            const validateEndTime = (rule,value,callback) => {
                if (this.formData.validForEver) {
                    callback();
                } else {
                    if (value) {
                        if (this.formData.startTime && value < this.formData.startTime) {
                            callback(this.$t('sizeErrorS',{ filed1 : this.$t('endTime'),filed2 : this.$t('startTime') }));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('inputField',{ field : this.$t('endTime') }));
                    }
                }
            };
            //校开始时间
            const validateStartTime = (rule,value,callback) => {
                if (value) {
                    if (this.formData.endTime && value > this.formData.endTime) {
                        callback(this.$t('sizeErrorB',{ filed2 : this.$t('endTime'),filed1 : this.$t('startTime') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('startTime') }));
                }
            };
            //校验每日生效的结束时间
            const validEndTimeForDay = (rule,value,callback) => {
                if (value) {
                    if (this.formData.validStartTimeForDay && value < this.formData.validStartTimeForDay) {
                        callback(this.$t('sizeErrorS',{ filed1 : this.$t('endTime'),filed2 : this.$t('startTime') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('endTime') }));
                }
            };
            //校验每日开始时间
            const validStartTimeForDay = (rule,value,callback) => {
                if (value) {
                    if (this.formData.validEndTimeForDay && value > this.formData.validEndTimeForDay) {
                        callback(this.$t('sizeErrorB',{ filed2 : this.$t('endTime'),filed1 : this.$t('startTime') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('startTime') }));
                }
            };
            return {
                //表单数据
                formData : {
                    //规则名称
                    name : '',
                    //开始时间
                    startTime : '',
                    //结束时间
                    endTime : '',
                    //每日有效开始时间
                    validStartTimeForDay : '00:00:00',
                    //每日有效结束时间
                    validEndTimeForDay : '23:59:59',
                    //是否永久有效
                    validForEver : false,
                    //生效日期
                    validTime : ['0','1','2','3','4','5','6'],
                    //是否立即启用
                    // enabled : 'true'
                },
                //校验规则
                ruleValidate : {
                    name : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('ruleName') }),
                            trigger : 'blur',
                        },
                        {
                            max : 30,
                            type : 'string',
                            message : this.$t('errorMaxLength',{ field : this.$t('ruleName'),length : 30 }),
                            trigger : 'blur',
                        }
                    ],
                    startTime : [
                        {
                            required : true,
                            validator : validateStartTime,
                            trigger : 'change',
                        }
                    ],
                    endTime : [
                        {
                            required : true,
                            validator : validateEndTime,
                            trigger : 'change',
                        }
                    ],
                    validEndTimeForDay : [
                        {
                            validator : validEndTimeForDay,
                            trigger : 'change'
                        }
                    ],
                    validStartTimeForDay : [
                        {
                            validator : validStartTimeForDay,
                            trigger : 'change'
                        }
                    ],
                    validTime : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('生效日期') }),
                            trigger : 'change',
                            type : 'array'
                        }
                    ]
                },
                //周数据列表
                validDateList : [
                    {
                        value : '1',
                        name : this.$t('Monday')
                    },
                    {
                        value : '2',
                        name : this.$t('Tuesday')
                    },
                    {
                        value : '3',
                        name : this.$t('Wednesday')
                    },
                    {
                        value : '4',
                        name : this.$t('Thursday')
                    },
                    {
                        value : '5',
                        name : this.$t('Friday')
                    },
                    {
                        value : '6',
                        name : this.$t('Saturday')
                    },
                    {
                        value : '0',
                        name : this.$t('Sunday')
                    },
                ],
                //结束时间是否可修改
                endTimeAbled : true,
                //日期组件不可选日期
                dateOptions : {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now();
                    }
                },
            };
        },
        methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的状态
             */
            visibleChange (type) {
                if (!type) {
                    this.$refs.formValidate.resetFields();
                    this.formData.validForEver = '';
                } else {
                    if (this.ruleData && Object.keys(this.ruleData).length > 0) {
                        this.formData.name = this.ruleData.ruleName;
                        this.formData.startTime = this.ruleData.startDate;
                        this.formData.endTime = this.ruleData.endDate;
                        this.formData.validStartTimeForDay = this.ruleData.startTime;
                        this.formData.validEndTimeForDay = this.ruleData.endTime;
                        this.formData.validTime = this.ruleData.effDate.split(',');
                        if (this.ruleData.endDate && this.ruleData.endDate.substr(0,4) === '9999') {
                            this.formData.validForEver = true;
                        }
                    }
                }
            },
            /**
             * 保存规则
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.checkRuleDate();
                    }
                });
            },
            /**
             * 取消保存
             */
            cancel () {
                this.changeValue(false);
            },
            /**
             * 是否永久有效状态改变
             * @param{Boolean} validType 当前永久有效状态是否生效
             */
            timeValidChange (validType) {
                if (validType) {
                    this.formData.endTime = new Date('9999','11','31');
                    this.endTimeAbled = false;
                } else {
                    this.endTimeAbled = true;
                    this.formData.endTime = '';
                }
            },
            /**
             * 新增特殊会员积分规则
             */
            addSpecialPointRule () {
                ajax.post('addSpecialPointRule',{
                    ruleName : this.formData.name,
                    startDate : this.formData.startTime ? new Date(this.formData.startTime).format('yyyy-MM-dd') : '',
                    endDate : this.formData.endTime ? new Date(this.formData.endTime).format('yyyy-MM-dd') : '',
                    effDate : this.formData.validTime.join(','),
                    startTime : this.formData.validStartTimeForDay,
                    endTime : this.formData.validEndTimeForDay,
                }).then(res => {
                    if (res.success) {
                        this.$emit('fresh-data');
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                    }
                }).finally(() => {
                    this.changeValue(false);
                });
            },
            /**
             * 校验会员规则
             */
            checkRuleDate () {
                ajax.post('checkRuleDate',{
                    startDate : this.formData.startTime ? new Date(this.formData.startTime).format('yyyy-MM-dd') : '',
                    endDate : this.formData.endTime ? new Date(this.formData.endTime).format('yyyy-MM-dd') : '',
                    effDate : this.formData.validTime.join(','),
                }).then(res => {
                    if (res.success) {
                        if (!res.data) {
                            if (this.isCopyRule) {
                                this.copyRule();
                            } else {
                                this.addSpecialPointRule();
                            }
                        } else {
                            this.$Message.error(this.$t('M061'));
                        }
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 复制规则
             */
            copyRule () {
                ajax.post('copyRule',{
                    ruleName : this.formData.name,
                    startDate : this.formData.startTime ? new Date(this.formData.startTime).format('yyyy-MM-dd') : '',
                    endDate : this.formData.endTime ? new Date(this.formData.endTime).format('yyyy-MM-dd') : '',
                    effDate : this.formData.validTime.join(','),
                    startTime : this.formData.validStartTimeForDay,
                    endTime : this.formData.validEndTimeForDay,
                }).then(res => {
                    if (res.success) {
                        this.$emit('fresh-data');
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                    }
                }).finally(() => {
                    this.changeValue(false);
                });
            }
        },
        computed : {
            //是否是复制规则
            isCopyRule () {
                return this.ruleData && Object.keys(this.ruleData).length > 0;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .create-rule{
        padding-top: 35px;

        /deep/ .ivu-form-item{
            position: relative;

            .forever-class{
                @include absolute_pos(absolute,$right : -85px,$top : -3px);
            }
        }

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 50px;
            padding-top: 35px;
        }

        /deep/ .ivu-form{
            width: 400px;
        }

        .to-label{
            display: flex;
            align-items: center;
            justify-content: center;
            height : 32px;
        }
    }
</style>
