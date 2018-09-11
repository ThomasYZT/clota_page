<!--延期服务模态框-->

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
                        v-for="(item,i) in serviceDelayedInfo"
                        :key="i">{{item.serviceName}}   &nbsp;&nbsp; {{item.estimateEndtime}}</li>
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
    import ajax from '@/api/index.js';
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
            },
            //公司id
            'org-id' : {
                type : String,
                default : ''
            }
        },
        data() {
            return {
                //表单数据
                formData : {
                    //服务期限
                    serverTime : 1
                },
                //服务期限列表
                monthEnum : monthEnum,
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
                if(type === false){
                    this.formData.serverTime = 1;
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
                this.delayService();
            },
            /**
             * 延期服务
             */
            delayService () {
                ajax.post('extensionServices',{
                    orgId : this.orgId,
                    serviceIds : this.serviceList.map(item => item.serviceId),
                    extensionTime : this.formData.serverTime
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('延期成功');
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error('延期失败');
                    }
                }).finally(() => {
                    this.$emit('input', false);
                }) ;
            }
        },
        computed : {
            //服务延期后预计结束时间
            serviceDelayedInfo () {
                let result = [];
                if(this.serviceList && this.serviceList.length > 0){
                    for(let i = 0, j = this.serviceList.length;i < j;i++){
                        result.push(Object.assign({
                             estimateEndtime : this.serviceList[i].endTime
                                ? this.serviceList[i].endTime.replace(/-/g,'/').toDate().addMonths(this.formData.serverTime).format('yyyy-MM-dd hh:mm:ss')
                                : this.serviceList[i].endTime
                        },this.serviceList[i]));
                    }
                }
                return result;
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
