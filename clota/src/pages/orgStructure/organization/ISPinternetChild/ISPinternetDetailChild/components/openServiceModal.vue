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
              :label-width="130">
            <FormItem :label="$t('selectPackage')" prop="package"><!--选择套餐-->
                <RadioGroup v-model="formData.packageId" @on-change="packageChange">
                    <Radio :label="item.id"
                           v-for="(item,index) in packageList"
                           :key="index">{{item.comboName}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem :label="$t('selectService')" prop="servers"><!--选择服务-->
                <CheckboxGroup v-model="formData.servers" @on-change="serviceChange">
                    <Checkbox :label="item.id"
                              v-for="(item,index) in serverList"
                              :disabled="item.disabled"
                              :key="index">
                        <span>{{item.serviceName}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem :label="$t('setServiceStartTIme')" prop="startTime"><!--设置服务开始时间-->
                <DatePicker type="date"
                            v-model="formData.startTime"
                            :editable="false"
                            :clearable="false"
                            style="width:280px">
                </DatePicker>
            </FormItem>
            <FormItem :label="$t('serverTime') + '（'+$t('Month')+'）'" prop="serverTime">
                <Select v-model="formData.serverTime" style="width:280px">
                    <Option v-for="item in monthEnum"
                            :value="item.value"
                            :key="item.value">
                        {{ item.value }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('serviceEndTIme')"><!--预计服务结束时间-->
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
    import { monthEnum } from '../../../../../../assets/js/constVariable';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //组织id
            'org-id' : {
                type : String,
                default : ''
            },
            //默认选中的服务id
            'opened-service-id' : {
                type : String,
                default : ''
            },
            //已开通的服务
            'opened-services' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            //校验选择的服务
            const validateService = (rule,value,callback) => {
                if (value && value.length > 0) {
                    callback();
                } else {
                    callback(this.$t('validateError.pleaseSelect',{ msg : this.$t('serverTime') }));
                }
            };
            return {
                //表单数据
                formData : {
                    //套餐id
                    packageId : '',
                    //服务开始时间
                    startTime : new Date(),
                    //选择的服务
                    servers : [],
                    //服务期限
                    serverTime : 1
                },
                //表单校验规则
                ruleValidate : {
                    servers : [
                        { required : true,validator : validateService ,trigger : 'change' }
                    ]
                },
                //服务期限列表
                monthEnum : monthEnum,
                //服务列表
                serverList : [],
                //套餐列表
                packageList : []
            };
        },
        methods : {
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === true) {
                    this.getSysServiceCombos();
                    this.getServerList();
                } else {
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
                    if (valid) {
                        this.openServer();
                    }
                });
            },
            /**
             * 开通服务
             */
            openServer () {
                let startTime = this.formData.startTime.valueOf();
                ajax.post('addServices',{
                    orgId : this.orgId,
                    serviceIds : this.formData.servers,
                    startTime : new Date(startTime).format('yyyy-MM-dd 00:00:00'),
                    endTime : new Date(startTime).addMonths(this.formData.serverTime).format('yyyy-MM-dd 23:59:59'),
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('open') }));
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('open') }));
                    }
                }).finally(() => {
                    this.$emit('input', false);
                });
            },
            /**
             * 获取服务列表
             */
            getServerList () {
                ajax.post('getServices').then(res => {
                    if (res.status === 200) {
                        this.serverList = res.data ? res.data : [];
                        if (this.openedServiceId) {
                            for (let i = 0,j = this.serverList.length; i < j; i++) {
                                if (this.serverList[i].id === this.openedServiceId) {
                                    this.formData.servers = [this.serverList[i].id];
                                    break;
                                }
                            }
                        }
                        for (let i = 0,j = this.serverList.length; i < j; i++) {
                            if (this.serverList[i].id in this.openedServicesObj) {
                                this.$set(this.serverList[i],'disabled',true);
                            } else {
                                this.$set(this.serverList[i],'disabled',false);
                            }
                        }
                    } else {
                        this.serverList = [];
                    }
                });
            },
            /**
             * 重置表单数据
             */
            resetFormData () {
                this.formData.packageId = '';
                this.formData.startTime = new Date();
                this.formData.servers = [];
                this.formData.serverTime = 1;
            },
            /**
             * 查询所有服务套餐
             */
            getSysServiceCombos () {
                ajax.post('getSysServiceCombos').then(res => {
                    if (res.status === 200) {
                        this.packageList = res.data ? res.data : [];
                    } else {
                        this.packageList = [];
                    }
                });
            },
            /**
             * 更改选择的套餐
             */
            packageChange (data) {
                if (data) {
                    this.formData.servers = [];
                    for (let i = 0,j = this.packageList.length; i < j; i++) {
                        if (this.packageList[i].id === data) {
                            if (this.packageList[i].services && this.packageList[i].services.length > 0) {
                                for (let a = 0,b = this.packageList[i].services.length; a < b; a++) {
                                    if (!(this.packageList[i].services[a].id in this.openedServicesObj)) {
                                        this.formData.servers.push(this.packageList[i].services[a].id);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            },
            /**
             * 更改选择的服务
             * @param data
             */
            serviceChange (data) {
                this.formData.packageId = '';
            }
        },
        created () {
            this.getSysServiceCombos();
        },
        computed : {
            /**
             * 服务截止日期
             */
            serverEndTime () {
                let startTime = this.formData.startTime.valueOf();
                if (this.formData.startTime) {
                    return new Date(startTime).addMonths(this.formData.serverTime).format('yyyy-MM-dd');
                } else {
                    return '--';
                }
            },
            //已开通服务对象
            openedServicesObj () {
                let obj = {};
                if (this.openedServices && this.openedServices.length > 0) {
                    for (let i = 0,j = this.openedServices.length; i < j; i++) {
                        obj[this.openedServices[i].serviceId] = true;
                    }
                }
                return obj;
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .open-service-modal {

        & /deep/ .ivu-modal {
            width: 600px !important;
            min-height: 410px;
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
