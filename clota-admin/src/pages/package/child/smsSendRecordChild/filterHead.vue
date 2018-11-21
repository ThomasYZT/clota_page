<!--筛选表头-->


<template>
    <div class="filter-head" >

        <Form :model="formData" label-position="right" :label-width="100" >
            <i-row>
                <i-col span="8">
                    <!--订单编号-->
                    <FormItem :label="$t('orderCode')">
                        <Input v-model="formData.orderNo"/>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--租户-->
                    <FormItem :label="$t('lessee')">
                        <Select v-model="formData.orgId" :transfer="true">
                            <Option v-for="item in lesseeList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--手机号-->
                    <FormItem :label="$t('mobileNum')">
                        <Input v-model.trim="formData.phone"/>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="8">
                    <!--发送状态-->
                    <FormItem :label="$t('sendStatus')">
                        <Select v-model="formData.status" :transfer="true">
                            <Option v-for="item in sendStatusList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--发送时间-->
                    <FormItem :label="$t('sendTime')">
                        <DatePicker type="daterange"
                                    :editable="false"
                                    v-model="formData.sendTime"
                                    :transfer="true"
                                    style="width: 100%;">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--短信供应商-->
                    <FormItem :label="$t('smsProvider')">
                        <Select v-model="formData.provider" :transfer="true">
                            <Option v-for="item in smsProviderList"
                                    :value="item.provider"
                                    :key="item.provider">
                                {{ item.provider }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="24" style="text-align: right">
                    <div class="btn-area">
                        <Button type="primary"
                                class="ivu-btn-90px"
                                @click="search">搜索</Button>
                        <Button type="ghost"
                                class="ivu-btn-90px"
                                @click="reset">重置</Button>
                    </div>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import { sendStatusList } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    export default {
        props : {
        },
        data () {
            return {
                //表单数据
                formData : {
                    //租户id
                    orgId : '',
                    //手机号
                    phone : '',
                    //发送时间
                    sendTime : [],
                    //发送状态
                    status : '',
                    //订单编号
                    orderNo : '',
                    //短信供应商
                    provider : ''
                },
                //发送状态列表
                sendStatusList : sendStatusList,
                //租户列表
                lesseeList : [],
                //短信服务商
                smsProviderList : [],
            };
        },
        methods : {
            /**
             * 获取所有租户信息
             */
            listServiceProvider () {
                ajax.post('listServiceProvider').then(res => {
                    if (res.status === 200) {
                        this.lesseeList = res.data ? res.data : [];
                    } else {
                        this.lesseeList = [];
                    }
                }).catch(err => {
                    this.lesseeList = [];
                });
            },
            /**
             * 获取短信提供商
             */
            getSmsProviderList () {
                ajax.post('smsProviderList',{
                    page : 1,
                    pageSize : 9999
                }).then(res => {
                    if (res.status === 200) {
                        this.smsProviderList = res.data.list ? res.data.list : [];
                    } else {
                        this.smsProviderList = [];
                    }
                }).catch(err => {
                    this.smsProviderList = [];
                });
            },
            /**
             * 查询数据
             */
            search () {
                this.$emit('search-data',this.formData);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.formData.orgId = '';
                this.formData.phone = '';
                this.formData.orderNo = '';
                this.formData.status = '';
                this.formData.provider = '';
                this.formData.sendTime = [];
                this.search();
            }
        },
        created () {
            this.listServiceProvider();
            this.getSmsProviderList();
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
