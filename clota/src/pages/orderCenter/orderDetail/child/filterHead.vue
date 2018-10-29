<!--表头筛选器-->

<template>
    <div class="filter-head">
        <Form ref="formCustom"
              :model="formData"
              :label-width="80">
            <i-row>
                <i-col span="7">
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
                <i-col span="7">
                    <!--游玩日期-->
                    <FormItem :label="$('playDate')">
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
                <i-col span="4">
                    <!--订单类型-->
                    <FormItem label="订单类型" >
                        <Select v-model.trim="formData.orderType"
                                style="max-width: 100px"
                                @on-change="orderTypeChange">
                            <Option v-for="item in orderType"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="4">
                    <!--是否分销-->
                    <FormItem label="是否分销" >
                        <Select v-model.trim="formData.allocationStatus"
                                style="max-width: 100px"
                                @on-change="allocationStatusChange">
                            <Option v-for="item in tOfSelectList"
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
                    <!--取票状态-->
                    <FormItem label="取票状态">
                        <Select v-model.trim="formData.pickStatus"
                                style="max-width: 200px"
                                @on-change="searchProductList">
                            <Option v-for="item  in takeTicketStatusList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--退票状态-->
                    <FormItem label="退票状态">
                        <Select v-model.trim="formData.refundStatus"
                                style="max-width: 200px"
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
                                style="max-width: 200px"
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
                    <FormItem label="下单企业" >
                        <Select v-model.trim="formData.orderOrgId"
                                style="max-width: 200px"
                                :disabled="orderTaskDisabled"
                                @on-change="searchProductList">
                            <Option v-for="item  in orderTakeList"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--下单渠道-->
                    <FormItem label="下单渠道" >
                        <Select v-model.trim="formData.orderChannel"
                                style="max-width: 200px"
                                @on-change="searchProductList">
                            <Option v-for="item  in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t('order.' + item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--核销状态-->
                    <FormItem label="核销状态" >
                        <Select v-model.trim="formData.verifyStatus"
                                style="max-width: 200px"
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
                    <FormItem label="是否同步" >
                        <Select v-model.trim="formData.syncStatus"
                                style="max-width: 200px"
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
                    <FormItem label="改签状态" >
                        <Select v-model.trim="formData.rescheduleStatus"
                                style="max-width: 200px"
                                @on-change="searchProductList">
                            <Option v-for="item  in rescheduleStatus"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <!--<i-col span="6">-->
                    <!--&lt;!&ndash;营销状态&ndash;&gt;-->
                    <!--<FormItem label="营销状态" >-->
                        <!--<Select v-model.trim="formData.marketTypeId"-->
                                <!--style="max-width: 200px">-->
                            <!--<Option v-for="item  in orderChannelList"-->
                                    <!--:key="item.value"-->
                                    <!--:value="item.value">-->
                                <!--{{$t(item.label)}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                <!--</i-col>-->
                <!--<i-col span="6">-->
                    <!--&lt;!&ndash;营销级别&ndash;&gt;-->
                    <!--<FormItem label="营销级别" >-->
                        <!--<Select v-model.trim="formData.marketLevelId"-->
                                <!--style="max-width: 200px">-->
                            <!--<Option v-for="item  in verifyStatusList"-->
                                    <!--:key="item.value"-->
                                    <!--:value="item.value">-->
                                <!--{{$t(item.label)}}-->
                            <!--</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                <!--</i-col>-->
                <i-col span="6">
                    <!--审核状态-->
                    <FormItem label="审核状态" >
                        <Select v-model.trim="formData.auditStatus"
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
                <i-col span="6">
                    <!--支付状态-->
                    <FormItem label="支付状态" >
                        <Select v-model.trim="formData.paymentStatus"
                                style="max-width: 200px"
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
                    <!--业态类型-->
                    <FormItem label="业态类型" >
                        <Select v-model.trim="formData.productType"
                                style="max-width: 200px"
                                @on-change="searchProductList">
                            <Option value="ticket">票</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="关键字" >
                        <Input v-model.trim="formData.keyword"
                               style="max-width: 380px"
                               placeholder="输入游客姓名/手机号/订单明细编号"
                               @on-enter="searchProductList"/>
                    </FormItem>
                </i-col>
                <i-col span="6" style="text-align: right;float: right">
                    <Button type="primary" class="ivu-btn-90px" @click="searchProductList">搜索</Button>
                    <Button type="ghost" class="ivu-btn-90px reset" @click="reset">重置</Button>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="9" className="abnormal-order">
                    <FormItem :label-width="0">
                        <Checkbox v-model="formData.abnormalStatus"
                                  @on-change="searchProductList">仅显示异常订单</Checkbox>
                    </FormItem>
                </i-col>
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
        distributorChannelList,
        notDistributorChannelList,
        auditStatusList,
        payStatusList,
    } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    export default {
        props : {
            //表格是否显示
            tableShow : {
                type : Boolean,
                default : false
            }
        },
        data() {
            return {
                //表单数据
                formData : {
                    //下单时间
                    orderDate : [new Date().addMonths(-1),new Date()],
                    //游玩日期
                    visitDate : [],
                    //取票状态
                    pickStatus : 'allStatus',
                    //是否分销
                    allocationStatus : 'true',
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
                    orderOrgId : '',
                    //业态类型
                    productType : 'ticket',
                    //订单类型
                    orderType : 'allStatus',
                    //是否是异常订单
                    abnormalStatus : false,
                    //审核状态
                    auditStatus : 'allStatus',
                    //支付状态
                    paymentStatus : 'allStatus',
                    //营销类别
                    marketTypeId : '',
                    //营销级别
                    marketLevelId : '',
                    //关键字
                    keyword :''
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
                //下单企业是否禁用
                orderTaskDisabled : false
            }
        },
        methods: {
            /**
             * 订单类型改变，查询所属景区信息
             */
            orderTypeChange () {
                ajax.post('getScenicList',{
                    allocationStatus : this.formData.allocationStatus,
                    orderType : this.formData.orderType
                }).then(res => {
                    if(res.success){
                        this.belongScene = res.data ? [].concat([{
                            id : 'all',
                            orgName : this.$t('all')
                        }],res.data) : [];
                        this.orderTakeList = [];
                        if(this.formData.scenicOrgId !== 'all'){
                            this.sceneChange();
                        }else{
                            this.search();
                        }
                    }else{
                        this.belongScene = [];
                    }
                });
            },
            /**
             * 所属景区改变，查询下单企业信息
             */
            sceneChange () {
                if(!this.formData.scenicOrgId) {
                    this.orderTakeList = [];
                    return ;
                }
                this.formData.orderOrgId = '';
                ajax.post('getOrderOrgList',{
                    scenicId : this.formData.scenicOrgId,
                    allocationStatus : this.formData.allocationStatus
                }).then(res => {
                    if(res.success){
                        this.orderTakeList = res.data ? res.data : [];
                    }else{
                        this.orderTakeList = [];
                    }
                    //如果所属景区不是当前登录景区,且是否分销选择了否，那么下单企业必须是当前景区，且不可修改
                    if(this.formData.scenicOrgId === this.manageOrgs.id){
                        this.orderTaskDisabled = false;
                    }else{
                        if(this.formData.allocationStatus === 'false'){
                            if(!this.formData.orderOrgId && this.orderTakeList.length > 0){
                                this.formData.orderOrgId = this.orderTakeList[0].id;
                            }
                            //所属景区不为全部，下单企业不可选
                            if(this.formData.scenicOrgId !== 'all'){
                                this.orderTaskDisabled = true;
                            }else{
                                this.orderTaskDisabled = false;
                            }
                        }else{
                            this.orderTaskDisabled = false;
                        }
                    }
                    this.searchProductList();
                });
            },
            /**
             * 查询数据
             */
            search () {
                this.$emit('set-params',this.paramsObj);
            },
            /**
             * 触发查询产品列表
             */
            searchProductList () {
                this.$emit('search-product',this.paramsObj);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                //下单时间
                this.formData.orderDate = [new Date().addMonths(-1),new Date()];
                this.formData.visitDate = [];
                this.formData.pickStatus =  'allStatus';
                this.formData.allocationStatus =  'true';
                this.formData.refundStatus =  'allStatus';
                this.formData.scenicOrgId =  'all';
                this.formData.orderChannel =  'allStatus';
                this.formData.syncStatus =  'allStatus';
                this.formData.rescheduleStatus =  'allStatus';
                this.formData.verifyStatus =  'allStatus';
                this.formData.orderOrgId =  '';
                this.formData.productType =  'ticket';
                this.formData.orderType =  'allStatus';
                this.formData.abnormalStatus =  false;
                this.formData.auditStatus =  'allStatus';
                this.formData.paymentStatus =  'allStatus';
                this.formData.marketTypeId =  '';
                this.formData.marketLevelId =  '';
                this.formData.keyword =  '';
                this.orderTypeChange();
                this.searchProductList();
            },
            /**
             * 是否分销状态修改
             */
            allocationStatusChange () {
                this.formData.orderChannel = 'allStatus';
                this.formData.scenicOrgId = 'all';
                this.orderTaskDisabled = false;
                this.formData.orderOrgId = '';
                this.orderTypeChange();
            }
        },
        created () {
            this.orderTypeChange();
        },
        computed :{
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //下单企业名字
            orderOrgName () {
                if(this.orderTakeList && this.orderTakeList.length > 0){
                    for(let i = 0, j = this.orderTakeList.length;i < j;i++){
                        if(this.formData.orderOrgId === this.orderTakeList[i]['id']){
                            return this.orderTakeList[i]['orgName'];
                        }
                    }
                    return '';
                }else{
                    return '';
                }
            },
            //查询条件列表
            paramsObj () {
                return {
                    orderStartDate : this.formData.orderDate[0].format('yyyy-MM-dd 00:00:00'),
                    orderEndDate : this.formData.orderDate[1].format('yyyy-MM-dd 23:59:59'),
                    visitStartDate : this.formData.visitDate[0] ?this.formData.visitDate[0].format('yyyy-MM-dd 00:00:00') : '',
                    visitEndDate : this.formData.visitDate[1] ? this.formData.visitDate[1].format('yyyy-MM-dd 23:59:59') : '',
                    orderType : this.formData.orderType === 'allStatus' ? '' : this.formData.orderType,
                    allocationStatus : this.formData.allocationStatus,
                    pickStatus : this.formData.pickStatus === 'allStatus' ? '' : this.formData.pickStatus,
                    refundStatus : this.formData.refundStatus === 'allStatus' ? '' : this.formData.refundStatus,
                    verifyStatus : this.formData.verifyStatus === 'allStatus' ? '' : this.formData.verifyStatus,
                    rescheduleStatus : this.formData.rescheduleStatus === 'allStatus' ? '' : this.formData.rescheduleStatus,
                    scenicOrgId : this.formData.scenicOrgId !== 'all' ? this.formData.scenicOrgId : '',
                    channelId : this.formData.orderOrgId,
                    orderChannel : this.formData.orderChannel === 'allStatus' ? '' : this.formData.orderChannel,
                    productType : this.formData.productType,
                    syncStatus : this.formData.syncStatus === 'allStatus' ? '' : this.formData.syncStatus,
                    auditStatus : this.formData.auditStatus === 'allStatus' ? '' : this.formData.auditStatus,
                    paymentStatus : this.formData.paymentStatus === 'allStatus' ? '' : this.formData.paymentStatus,
                    abnormalStatus : this.formData.abnormalStatus,
                    marketTypeId : this.formData.marketTypeId,
                    marketLevelId : this.formData.marketLevelId,
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
                        label : '是',
                        value : 'true'
                    },
                    {
                        label : '否',
                        value : 'false'
                    }
                ];
            },
            //下单渠道
            orderChannelList () {
                return this.formData.allocationStatus === 'true' ? distributorChannelList : notDistributorChannelList;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        padding: 14px 30px 15px 30px;
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
