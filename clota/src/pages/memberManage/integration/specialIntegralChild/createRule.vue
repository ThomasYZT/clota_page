<!--新建规则-->

<template>
    <Modal
        :title="$t('新建规则')"
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
            <FormItem :label="$t('规则名称')" prop="name">
                <Input v-model.trim="formData.name"
                       :placeholder="$t('inputPlaceholder')"
                       style="width: 280px"/>
            </FormItem>
            <FormItem :label="$t('开始时间')" prop="startTime">
                <DatePicker type="date"
                            transfer
                            :editable="false"
                            :placeholder="$t('selectField',{ msg : '' })"
                            v-model="formData.startTime"
                            style="width: 280px">
                </DatePicker>
            </FormItem>
            <FormItem :label="$t('结束时间')" prop="endTime">
                <DatePicker type="date"
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
            <FormItem :label="$t('生效日期')" prop="validTime">
                <CheckboxGroup v-model="formData.validTime">
                    <Checkbox v-for="(item,index) in validDateList"
                              :key="index"
                              :label="$t(item.name)">
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <i-row>
                <i-col span="14">
                    <FormItem :label="$t('每日生效时间')" prop="validStartTimeForDay">
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
            <FormItem :label="$t('复制规则')" prop="copyRule">
                <Select v-model="formData.copyRule"
                        transfer
                        :placeholder="$t('selectField',{ msg : '' })"
                        style="width: 280px">
                    <Option v-for="(item,index) in ruleList"
                            :key="index"
                            value="beijing">
                        {{item.name}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('是否启用')" prop="enabled">
                <RadioGroup v-model="formData.enabled">
                    <Radio label="true">{{$t('立即启用')}}</Radio>
                    <Radio label="false">{{$t('暂不启用')}}</Radio>
                </RadioGroup>
            </FormItem>
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
                            callback(this.$t('sizeErrorS',{ filed1 : this.$t('结束时间'),filed2 : this.$t('开始时间') }));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('inputField',{ field : this.$t('结束时间') }));
                    }
                }
            };
            //校开始时间
            const validateStartTime = (rule,value,callback) => {
                if (value) {
                    if (this.formData.endTime && value > this.formData.endTime) {
                        callback(this.$t('sizeErrorB',{ filed2 : this.$t('结束时间'),filed1 : this.$t('开始时间') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('开始时间') }));
                }
            };
            //校验每日生效的结束时间
            const validEndTimeForDay = (rule,value,callback) => {
                if (value) {
                    if (this.formData.validStartTimeForDay && value < this.formData.validStartTimeForDay) {
                        callback(this.$t('sizeErrorS',{ filed1 : this.$t('结束时间'),filed2 : this.$t('开始时间') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('结束时间') }));
                }
            };
            //校验每日开始时间
            const validStartTimeForDay = (rule,value,callback) => {
                if (value) {
                    if (this.formData.validEndTimeForDay && value > this.formData.validEndTimeForDay) {
                        callback(this.$t('sizeErrorB',{ filed2 : this.$t('结束时间'),filed1 : this.$t('开始时间') }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('开始时间') }));
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
                    validTime : [],
                    //复制的规则信息
                    copyRule : '',
                    //是否立即启用
                    enabled : 'true'
                },
                //校验规则
                ruleValidate : {
                    name : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('规则名称') }),
                            trigger : 'blur',
                        },
                        {
                            max : 30,
                            type : 'string',
                            message : this.$t('errorMaxLength',{ field : this.$t('规则名称'),length : 30 }),
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
                    ]
                },
                //周数据列表
                validDateList : [
                    {
                        value : '',
                        name : '周一'
                    },
                    {
                        value : '',
                        name : '周二'
                    },
                    {
                        value : '',
                        name : '周三'
                    },
                    {
                        value : '',
                        name : '周四'
                    },
                    {
                        value : '',
                        name : '周五'
                    },
                    {
                        value : '',
                        name : '周六'
                    },
                    {
                        value : '',
                        name : '周日'
                    },
                ],
                //结束时间是否可修改
                endTimeAbled : true,
                //可以复制的规则信息
                ruleList : [
                    {}
                ]
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
                }
            },
            /**
             * 保存规则
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    console.log(valid)
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
                    this.formData.endTime = '';
                    this.endTimeAbled = false;
                } else {
                    this.endTimeAbled = true;
                }
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
