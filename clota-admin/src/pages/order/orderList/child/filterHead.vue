<!--表头筛选器-->

<template>
    <div class="filter-head">
        <Form ref="formCustom"
              :model="formData"
              :label-width="80">
            <i-row>
                <i-col span="6">
                    <!--下单时间-->
                    <FormItem :label="$t('orderDate')">
                        <DatePicker v-model.trim="formData.orderDate"
                                    transfer
                                    :editable="false"
                                    type="daterange"
                                    placement="bottom-end"
                                    :placeholder="$t('selectField',{msg: ''})"
                                    style="max-width: 260px"
                                    @on-change="searchProductList">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--游玩日期-->
                    <FormItem :label="$t('playDate')">
                        <DatePicker v-model.trim="formData.visitDate"
                                    transfer
                                    :editable="false"
                                    type="daterange"
                                    placement="bottom-end"
                                    :placeholder="$t('selectField',{msg: ''})"
                                    style="max-width: 260px"
                                    @on-change="searchProductList">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--订单类型-->
                    <FormItem :label="$t('orderType')" >
                        <Select v-model.trim="formData.orderType"
                                style="max-width: 260px"
                                @on-change="orderTypeChange">
                            <Option v-for="item in orderType"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--取票状态-->
                    <FormItem :label="$t('takeTicketStatus')">
                        <Select v-model.trim="formData.pickStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in takeTicketStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--退票状态-->
                    <FormItem :label="$t('refundStatus')">
                        <Select v-model.trim="formData.refundStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in refundStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--所属景区-->
                    <FormItem :label="$t('scenePlace')">
                        <Select v-model.trim="formData.scenicOrgId"
                                style="max-width: 260px"
                                @on-change="sceneChange">
                            <Option v-for="item  in belongScene"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单企业-->
                    <FormItem :label="$t('orderOrg')" >
                        <Select v-model.trim="formData.orderOrgId"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in orderChannelInfo"
                                    :key="item.id"
                                    :value="item.id">
                                {{$t(item.orgName)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单渠道-->
                    <FormItem :label="$t('orderChannel')" >
                        <Select v-model.trim="formData.orderChannel"
                                style="max-width: 260px"
                                @on-change="channelChange">
                            <Option v-for="item  in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t('order.' + item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--核销状态-->
                    <FormItem :label="$t('verifyStatus')" >
                        <Select v-model.trim="formData.verifyStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in verifyStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--是否同步-->
                    <FormItem :label="$t('whetherSync')" >
                        <Select v-model.trim="formData.syncStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in synchronizationList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--改签状态-->
                    <FormItem :label="$t('rescheduleStatus')" >
                        <Select v-model.trim="formData.rescheduleStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in rescheduleStatus"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--支付状态-->
                    <FormItem :label="$t('paymentStatus')" >
                        <Select v-model.trim="formData.paymentStatus"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in payStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--营销类别-->
                    <FormItem label="营销类别" >
                        <Select v-model.trim="formData.marketTypeId"
                                :disabled="formData.orderChannel !== 'market'"
                                style="max-width: 260px"
                                @on-change="marketTypeChange">
                            <Option v-for="item  in marketTypeListFull"
                                    :key="item.id"
                                    :value="item.id">
                                {{$t(item.typeName)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--营销级别-->
                    <FormItem label="营销级别" >
                        <Select v-model.trim="formData.marketLevelId"
                                :disabled="formData.orderChannel !== 'market'"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option v-for="item  in marketLevelListFull"
                                    :key="item.id"
                                    :value="item.id">
                                {{$t(item.levelName)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--业态类型-->
                    <FormItem :label="$t('industryType')" >
                        <Select v-model.trim="formData.productType"
                                style="max-width: 260px"
                                @on-change="searchProductList">
                            <Option value="all">{{$t('all')}}</Option>
                            <Option value="ticket">{{$t('tickets')}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <!--<i-col span="8">-->
                    <!--&lt;!&ndash;团队订单预审核状态&ndash;&gt;-->
                    <!--<FormItem :label="$t('团队订单预审核状态')" :label-width="150">-->
                        <!--<Select v-model.trim="formData.productType"-->
                                <!--style="max-width: 260px"-->
                                <!--@on-change="searchProductList">-->
                            <!--<Option value="ticket">{{$t('tickets')}}</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                <!--</i-col>-->

                <i-col span="6">
                <!--团队订单预审核状态-->
                    <FormItem :label="$t('团队订单审核状态')" :label-width="150" >
                        <Select v-model.trim="formData.auditStatus"
                                :disabled="formData.orderType === 'individual'"
                                style="max-width: 200px"
                                @on-change="searchProductList">
                                <Option v-for="item  in auditStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('keyWord')" >
                        <!--输入游客姓名/手机号/订单明细编号-->
                        <Input v-model.trim="formData.keyword"
                               style="max-width: 380px"
                               :placeholder="$t('enterNamePhoneAndOrderNo')"
                               @on-enter="searchProductList"/>
                    </FormItem>
                </i-col>
                <i-col span="9" className="abnormal-order">
                    <FormItem :label-width="0">
                        <!--仅显示异常订单-->
                        <Checkbox v-model="formData.abnormalStatus"
                                  @on-change="searchProductList">{{$t('showAbnormalOrder')}}</Checkbox>
                    </FormItem>
                </i-col>
                <i-col span="6" style="text-align: right;float: right">
                    <Button type="primary" class="ivu-btn-90px" @click="searchProductList">{{$t('searching')}}</Button>
                    <Button type="ghost" class="ivu-btn-90px reset" @click="reset">{{$t('reset')}}</Button>
                </i-col>
            </i-row>
            <i-row>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import {
        orderType,
        takeTicketStatusList,
        refundStatusList,
        rescheduleStatus,
        synchronizationList,
        verifyStatusList,
        notDistributorChannelList,
        auditStatusList,
        payStatusList,
    } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import debounce from 'lodash/debounce';
    export default {
        props : {
            //默认筛选条件
            'params-default' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //表单数据
                formData : {
                    //下单时间
                    orderDate : [new Date().addMonths(-1),new Date()],
                    //游玩日期
                    visitDate : [],
                    //取票状态
                    pickStatus : 'allStatus',
                    //退票状态
                    refundStatus : 'allStatus',
                    //所属景区
                    scenicOrgId : 'all',
                    //下单渠道
                    orderChannel : 'allStatus',
                    //同步状态
                    syncStatus : 'allStatus',
                    //改签状态
                    rescheduleStatus : 'allStatus',
                    //核销状态
                    verifyStatus : 'allStatus',
                    //下单企业
                    orderOrgId : 'all',
                    //业态类型
                    productType : 'all',
                    //订单类型
                    orderType : 'allStatus',
                    //是否是异常订单
                    abnormalStatus : false,
                    //审核状态
                    auditStatus : 'allStatus',
                    //支付状态
                    paymentStatus : 'allStatus',
                    //营销类别
                    marketTypeId : 'all',
                    //营销级别
                    marketLevelId : 'all',
                    //关键字
                    keyword : ''
                },
                //所属景区列表
                belongScene : [],
                //下单企业列表
                orderTakeList : [],
                //取票状态
                takeTicketStatusList : takeTicketStatusList,
                //退票状态
                refundStatusList : refundStatusList,
                //改签状态
                rescheduleStatus : rescheduleStatus,
                //同步状态
                synchronizationList : synchronizationList,
                //核销状态
                verifyStatusList : verifyStatusList,
                //审核状态
                auditStatusList : auditStatusList,
                //支付状态
                payStatusList : payStatusList,
                //营销类别列表
                marketTypeList : [],
                //营销级别列表
                marketLevelList : []
            };
        },
        methods : {
            /**
             * 订单类型改变，查询所属景区信息
             */
            orderTypeChange () {
                if (this.formData.orderType === 'individual') {
                    this.formData.auditStatus = 'allStatus';
                }
                ajax.post('getAllScenic').then(res => {
                    if (res.status === 200) {
                        this.belongScene = res.data ? [].concat([{
                            id : 'all',
                            orgName : this.$t('all')
                        }],res.data) : [];
                        this.orderTakeList = [];
                        if (this.formData.scenicOrgId !== 'all') {
                            this.sceneChange();
                        } else {
                            this.search();
                        }
                    } else {
                        this.belongScene = [];
                    }
                });
            },
            /**
             * 所属景区改变，查询下单企业信息
             */
            sceneChange () {
                if (!this.formData.scenicOrgId) {
                    this.orderTakeList = [];
                    return;
                }
                this.formData.orderOrgId = 'all';
                ajax.post('getOrderCompany',{
                    scenicId : this.formData.scenicOrgId,
                }).then(res => {
                    if (res.status === 200) {
                        this.orderTakeList = res.data ? res.data : [];
                    } else {
                        this.orderTakeList = [];
                    }
                    // if (!this.formData.orderOrgId && this.orderTakeList.length > 0) {
                    //     this.formData.orderOrgId = this.orderTakeList[0].id;
                    // }
                    this.searchProductList();
                });
            },
            /**
             * 查询数据
             */
            search : debounce(function () {
                this.$emit('set-params',{
                    searchParams : this.paramsObj,
                    formData : this.formData
                });
            },100),
            /**
             * 触发查询产品列表
             */
            searchProductList : debounce (function () {
                this.$emit('search-product',{
                    searchParams : this.paramsObj,
                    formData : this.formData
                });
            },100),
            /**
             * 重置筛选条件
             */
            reset () {
                //下单时间
                this.formData.orderDate = [new Date().addMonths(-1),new Date()];
                this.formData.visitDate = [];
                this.formData.pickStatus = 'allStatus';
                this.formData.refundStatus = 'allStatus';
                this.formData.scenicOrgId = 'all';
                this.formData.orderChannel = 'allStatus';
                this.formData.syncStatus = 'allStatus';
                this.formData.rescheduleStatus = 'allStatus';
                this.formData.verifyStatus = 'allStatus';
                this.formData.orderOrgId = 'all';
                this.formData.productType = 'all';
                this.formData.orderType = 'allStatus';
                this.formData.abnormalStatus = false;
                this.formData.auditStatus = 'allStatus';
                this.formData.paymentStatus = 'allStatus';
                this.formData.marketTypeId = 'all';
                this.formData.marketLevelId = 'all';
                this.formData.keyword = '';
                this.orderTypeChange();
                this.searchProductList();
            },
            /**
             * 查询营销类别信息
             */
            queryMarketList () {
                ajax.post('getMarketType',{
                    scenicId : this.formData.scenicOrgId
                }).then(res => {
                    if (res.status === 200) {
                        this.marketTypeList = res.data ? res.data : [];
                    } else {
                        this.marketTypeList = [];
                    }
                });
            },
            /**
             * 营销类别改变，重新获取营销级别
             */
            marketTypeChange () {
                this.formData.marketLevelId = 'all';
                this.queryLevelByTypeId();
                this.searchProductList();
            },
            /**
             * 根据营销类别获取营销级别信息
             */
            queryLevelByTypeId () {
                if (this.formData.scenicOrgId === 'all' || !this.formData.scenicOrgId) {
                    this.marketLevelList = [];
                    return;
                }
                ajax.post('getMarketLevel',{
                    typeId : this.formData.marketTypeId,
                    scenicId : this.formData.scenicOrgId
                }).then(res => {
                    if (res.status === 200) {
                        this.marketLevelList = res.data ? res.data : [];
                    } else {
                        this.marketLevelList = [];
                    }
                });
            },
            /**
             * 下单渠道修改
             */
            channelChange () {
                this.formData.marketLevelId = 'all';
                this.formData.marketTypeId = 'all';
                this.searchProductList();
            }
        },
        created () {
            // if (this.paramsDefault && Object.keys(this.paramsDefault).length > 0) {
            //     this.formData = this.paramsDefault;
            // }
            this.orderTypeChange();
        },
        computed : {
            //下单企业名字
            orderOrgName () {
                if (this.orderTakeList && this.orderTakeList.length > 0) {
                    for (let i = 0, j = this.orderTakeList.length; i < j; i++) {
                        if (this.formData.orderOrgId === this.orderTakeList[i]['id']) {
                            return this.orderTakeList[i]['orgName'];
                        }
                    }
                    return '';
                } else {
                    return '';
                }
            },
            //查询条件列表
            paramsObj () {
                return {
                    orderStartDate : this.formData.orderDate[0] ? this.formData.orderDate[0].format('yyyy-MM-dd 00:00:00') : '',
                    orderEndDate : this.formData.orderDate[1] ? this.formData.orderDate[1].format('yyyy-MM-dd 23:59:59') : '',
                    visitStartDate : this.formData.visitDate[0] ? this.formData.visitDate[0].format('yyyy-MM-dd 00:00:00') : '',
                    visitEndDate : this.formData.visitDate[1] ? this.formData.visitDate[1].format('yyyy-MM-dd 23:59:59') : '',
                    orderType : this.formData.orderType === 'allStatus' ? '' : this.formData.orderType,
                    pickStatus : this.formData.pickStatus === 'allStatus' ? '' : this.formData.pickStatus,
                    refundStatus : this.formData.refundStatus === 'allStatus' ? '' : this.formData.refundStatus,
                    verifyStatus : this.formData.verifyStatus === 'allStatus' ? '' : this.formData.verifyStatus,
                    rescheduleStatus : this.formData.rescheduleStatus === 'allStatus' ? '' : this.formData.rescheduleStatus,
                    scenicOrgId : this.formData.scenicOrgId !== 'all' ? this.formData.scenicOrgId : '',
                    orderOrgId : this.formData.orderOrgId !== 'all' ? this.formData.orderOrgId : '',
                    orderChannel : this.formData.orderChannel === 'allStatus' ? '' : this.formData.orderChannel,
                    productType : this.formData.productType !== 'all' ? this.formData.productType : '',
                    syncStatus : this.formData.syncStatus === 'allStatus' ? '' : this.formData.syncStatus,
                    auditStatus : this.formData.auditStatus === 'allStatus' ? '' : this.formData.auditStatus,
                    paymentStatus : this.formData.paymentStatus === 'allStatus' ? '' : this.formData.paymentStatus,
                    abnormalStatus : this.formData.abnormalStatus,
                    marketTypeId : this.formData.marketTypeId !== 'all' ? this.formData.marketTypeId : '',
                    marketLevelId : this.formData.marketLevelId !== 'all' ? this.formData.marketLevelId : '',
                    keyword : this.formData.keyword,
                    // orderOrgName : this.orderOrgName,
                };
            },
            //订单类型
            orderType () {
                return [].concat([{
                    label : 'all',
                    value : 'allStatus'
                }],orderType);
            },
            //正误选择
            tOfSelectList () {
                return [
                    {
                        label : 'yes',
                        value : 'true'
                    },
                    {
                        label : 'no',
                        value : 'false'
                    }
                ];
            },
            //下单渠道
            orderChannelList () {
                return notDistributorChannelList;
            },
            //营销类别选择
            marketTypeListFull () {
                return [].concat([{
                    id : 'all',
                    typeName : 'all'
                }],this.marketTypeList);
            },
            //营销级别选择
            marketLevelListFull () {
                return [].concat([{
                    id : 'all',
                    levelName : 'all'
                }],this.marketLevelList);
            },
            //下单企业信息
            orderChannelInfo () {
                return [].concat([{
                    id : 'all',
                    orgName : 'all'
                }],this.orderTakeList);
            }
        },
        watch : {
            paramsDefault : {
                handler (newVal,oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        for (let item in this.paramsDefault) {
                            if (item === 'orderDate') {
                                this.$set(this.formData['orderDate'],0,this.paramsDefault.orderDate[0] ? new Date(this.paramsDefault.orderDate[0]) : '');
                                this.$set(this.formData['orderDate'],1,this.paramsDefault.orderDate[1] ? new Date(this.paramsDefault.orderDate[1]) : '');
                            } else if (item === 'visitDate') {
                                this.$set(this.formData['visitDate'],0,this.paramsDefault.visitDate[0] ? new Date(this.paramsDefault.visitDate[0]) : '');
                                this.$set(this.formData['visitDate'],1,this.paramsDefault.visitDate[1] ? new Date(this.paramsDefault.visitDate[1]) : '');
                            } else {
                                this.$set(this.formData,item,this.paramsDefault[item]);
                            }
                        }
                    } else {
                        this.$set(this.formData,'orderDate',[new Date().addMonths(-1),new Date()]);
                        this.$set(this.formData,'visitDate',[]);
                    }
                    this.searchProductList();
                },
                immediate : true
            },
            //监视所属景区变化，重新获取营销级别和营销类别信息
            'formData.scenicOrgId' (newVal,oldVal) {
                this.formData.marketTypeId = 'all';
                this.formData.marketLevelId = 'all';
                this.marketTypeList = [];
                this.marketLevelList = [];
                if (newVal) {
                    this.queryMarketList();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        padding: 14px 20px 15px 20px;
        /*border: 1px solid #EEEEEE;*/

        /deep/ .ivu-date-picker{
            width: 100%;
        }

        /deep/ .ivu-form-item{
            margin-bottom: 7px;
        }

        .reset{
            margin-left: 15px;
        }

        .abnormal-order{

            /deep/ .ivu-form-item-content{
                margin-left: 18px!important;
                line-height: 20px;
            }

            /deep/ .ivu-form-item{
                margin-bottom: 0;
            }
        }
    }
</style>
