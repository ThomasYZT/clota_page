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
            <span class="title">{{$t('serviceDelay')}}</span>
        </div>
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="150">
            <FormItem label="已选服务" prop="package">
                <ul class="service-list">
                    <li class="service-name"
                        v-for="(item,i) in serviceList"
                        :key="i">{{item.serviceName}}</li>
                </ul>
            </FormItem>
            <FormItem :label="$t('delayTime') + '（月）'" prop="serverTime">
                <Select v-model="formData.serverTime" style="width:280px">
                    <Option v-for="item in monthEnum"
                            :value="item.value"
                            :key="item.value">
                        {{ item.value }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="预计服务结束时间">
                <ul class="service-list">
                    <li class="service-name"
                        v-for="(item,i) in serviceList"
                        :key="i">{{item.serviceName}}   &nbsp;&nbsp; {{item.endTime}}</li>
                </ul>
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
            },
            //当前操作的服务列表
            'service-list' : {
                type : Array,
                default () {
                    return [];
                }
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
                console.log(this.serviceList)
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

        .service-list{
            overflow: auto;

            .service-name{
                @include overflow_tip();
                @include block_outline($height : 25px);
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

        & /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
