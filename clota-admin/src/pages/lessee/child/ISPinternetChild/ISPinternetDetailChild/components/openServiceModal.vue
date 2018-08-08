<!--开通服务模态框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="open-service-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('openedServices')}}</span>
        </div>
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="120">
            <FormItem label="选择套餐" prop="package">
                <RadioGroup v-model="formData.packageName">
                    <Radio :label="item.name" v-for="item in packageList">{{item.name}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="选择服务" prop="service">
                <CheckboxGroup v-model="formData.servers">
                    <Checkbox :label="item.name" v-for="item in serverList"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="设置服务开始时间" prop="startTime">
                <DatePicker type="date"
                            v-model="formData.startTime"
                            :editable="false"
                            :clearable="false"
                            style="width:280px">
                </DatePicker>
            </FormItem>
            <FormItem :label="$t('serverTime') + '（月）'" prop="serverTime">
                <Select v-model="formData.serverTime" style="width:280px">
                    <Option v-for="item in monthEnum"
                            :value="item.value"
                            :key="item.value">
                        {{ item.value }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="预计服务结束时间">
                {{serverEndTime}}
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
    import {monthEnum} from '../../../../../../assets/js/constVariable';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {
                //表单数据
                formData : {
                    //套餐名称
                    packageName : '',
                    //服务开始时间
                    startTime : new Date(),
                    //选择的服务
                    servers : [],
                    //服务期限
                    serverTime : 1
                },
                //表单校验规则
                ruleValidate : {
                    service : [
                        {required : true,message : this.$t('validateError.pleaseSelect',{msg : this.$t('serverTime')})}
                    ]
                },
                //服务期限列表
                monthEnum : monthEnum,
                //服务列表
                serverList : [
                    {
                        name : '服务1'
                    },
                    {
                        name : '服务2'
                    }
                ],
                //套餐列表
                packageList : [
                    {
                        name : '套餐1'
                    },
                    {
                        name : '套餐2'
                    }
                ]
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
                if(type === true){
                    this.getPackageList();
                    this.getServerList();
                }else{
                    this.resetFormData();
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 取消保存
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 保存数据
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.openServer();
                    }
                });
            },
            /**
             * 开通服务
             */
            openServer () {
                this.$emit('fresh-data');
            },
            /**
             * 获取套餐列表
             */
            getPackageList () {

            },
            /**
             * 获取服务列表
             */
            getServerList () {

            },
            /**
             * 重置表单数据
             */
            resetFormData () {
                this.formData.packageName = '';
                this.formData.startTime = new Date();
                this.formData.servers = [];
                this.formData.serverTime = 1;
            }
        },
        computed : {
            /**
             * 服务截止日期
             */
            serverEndTime () {
                if(this.formData.startTime){
                    return this.formData.startTime.addMonths(this.formData.serverTime).format('yyyy-MM-dd');
                }else{
                    return '--';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .open-service-modal {

        & /deep/ .ivu-modal {
            width: 560px !important;
            height: 410px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 17px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 13px;
        }

        & /deep/ .ivu-modal-body {
            padding: 20px 30px 0 30px;
        }

        .target-body {
            width: 100%;
            height: 290px;
            padding: 55px 0 5px 0;
            overflow: auto;

            /deep/ .ivu-form {

                .ivu-form-item {
                    margin-bottom: 15px;
                    padding-right: 110px;
                    position: relative;

                    .ivu-form-item-error-tip {
                        width: 110px;
                        position: absolute;
                        top: 7px;
                        right: -110px;
                        left: auto;
                        line-height: 1;
                        padding: 6px 0 0 5px;
                        color: #ed3f14;
                    }
                }

                .ivu-form-item-label {
                    font-size: $font_size_14px;
                    color: $color_6c6c6c;
                }
            }
        }
        & /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
