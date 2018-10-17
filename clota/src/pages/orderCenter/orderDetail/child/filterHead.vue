<!--表头筛选器-->

<template>
    <div class="filter-head">
        <Form ref="formCustom"
              :model="formData"
              :rules="ruleCustom"
              :label-width="80">
            <i-row>
                <i-col span="7">
                    <!--下单时间-->
                    <FormItem label="下单日期">
                        <DatePicker v-model="formData.orderDate"
                                    type="daterange"
                                    placement="bottom-end"
                                    placeholder="请选择"
                                    style="max-width: 260px">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="7">
                    <!--游玩日期-->
                    <FormItem label="游玩日期">
                        <DatePicker v-model="formData.visitDate"
                                    type="daterange"
                                    placement="bottom-end"
                                    placeholder="请选择"
                                    style="max-width: 260px">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="4">
                    <!--订单类型-->
                    <FormItem label="订单类型" >
                        <Select v-model="formData.orderType"
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
                        <Select v-model="formData.allocationStatus"
                                style="max-width: 100px">
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
                        <Select v-model="formData.pickStatus"
                                style="max-width: 200px">
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
                        <Select v-model="formData.refundStatus"
                                style="max-width: 200px">
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
                    <FormItem label="所属景区">
                        <Select v-model="formData.scenicOrgId"
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
                    <FormItem label="下单企业" >
                        <Select v-model="formData.orderOrgId"
                                style="max-width: 200px"
                                :disabled="orderTaskDisabled">
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
                        <Select v-model="formData.orderChannel"
                                style="max-width: 200px"
                                :disabled="saleDisabled">
                            <Option v-for="item  in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--核销状态-->
                    <FormItem label="核销状态" >
                        <Select v-model="formData.verifyStatus"
                                style="max-width: 200px">
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
                        <Select v-model="formData.syncStatus"
                                style="max-width: 200px">
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
                        <Select v-model="formData.rescheduleStatus"
                                style="max-width: 200px">
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
                <i-col span="6">
                    <!--业态类型-->
                    <FormItem label="业态类型" >
                        <Select v-model="formData.productType"
                                style="max-width: 200px">
                            <Option value="ticket">票</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="9">
                    <FormItem label="关键字" >
                        <Input v-model.trim="formData.productName"
                               style="width: 280px"
                               placeholder="输入产品名称" />
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
                        <Checkbox v-model="formData.abnormalStatus">仅显示异常订单</Checkbox>
                    </FormItem>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import {orderType,takeTicketStatusList,refundStatusList,rescheduleStatus,synchronizationList,verifyStatusList,orderChannelList} from '@/assets/js/constVariable.js';
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
                //表单校验规则
                ruleCustom : {

                },
                //表单数据
                formData : {
                    //下单时间
                    orderDate : [new Date(),new Date()],
                    //游玩日期
                    visitDate : [new Date(),new Date()],
                    //取票状态
                    pickStatus : '',
                    //是否分销
                    allocationStatus : 'true',
                    //退票状态
                    refundStatus : '',
                    //所属景区
                    scenicOrgId : '',
                    //下单渠道
                    orderChannel : '',
                    //同步状态
                    syncStatus : '',
                    //改签状态
                    rescheduleStatus : '',
                    //核销状态
                    verifyStatus : '',
                    //下单企业
                    orderOrgId : '',
                    //业态类型
                    productType : '',
                    //产品名称
                    productName : '',
                    //订单类型
                    orderType : 'all',
                    //是否是异常订单
                    abnormalStatus : false
                },
                //所属景区列表
                belongScene : [],
                //发售机构列表
                saleOrgList : [],
                //下单企业列表
                orderTakeList : [],
                //发送机构是否禁用
                saleDisabled : false,
                //下单企业是否禁用
                orderTaskDisabled : false,
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
                //下单渠道
                orderChannelList : orderChannelList,
            }
        },
        methods: {
            /**
             * 订单类型改变，查询所属景区信息
             */
            orderTypeChange () {
                ajax.post('getScenicList',{
                    allocationStatus : this.allocationStatus,
                    orderType : this.formData.orderType
                }).then(res => {
                    this.formData.scenicOrgId = '';
                    this.formData.orderOrgId = '';
                    this.formData.saleOrgList = [];
                    this.formData.orderTakeList = [];
                    if(res.success){
                        this.belongScene = res.data ? res.data : [];
                        if(!this.formData.scenicOrgId && this.belongScene.length > 0){
                            this.formData.scenicOrgId = this.belongScene[0].id;
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
             * 所属景区改变，查询发售机构和下单企业信息
             */
            sceneChange () {
                if(!this.formData.scenicOrgId) return;
                ajax.post('queryOrderOptionList',{
                    scenicId : this.formData.scenicOrgId,
                    orderType : this.formData.orderType
                }).then(res => {
                    if(res.success){
                        this.saleOrgList = res.data ? res.data.saleList : [];
                        this.orderTakeList = res.data ? res.data.orderList : [];
                    }else{
                        this.saleOrgList = [];
                        this.orderTakeList = [];
                    }
                    //如果所属景区是当前登录的景区，那么发售机构是当前机构，不可修改，
                    //如果所属景区不是当前登录景区，那么下单企业必须是当前景区，且不可修改
                    if(this.formData.scenicOrgId === this.manageOrgs.id){
                        this.saleDisabled = true;
                        this.orderTaskDisabled = false;
                    }else{
                        this.saleDisabled = false;
                        this.orderTaskDisabled = true;
                        if(!this.formData.orderOrgId && this.orderTakeList.length > 0){
                            this.formData.orderOrgId = this.orderTakeList[0].id;
                            this.search();
                        }
                    }
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
                this.formData.scenicOrgId = '';
                this.formData.orderOrgId = '';
                this.formData.type = '';
                this.formData.productName = '';
                this.formData.orderType = 'team';
                this.orderTypeChange();
                this.searchProductList();
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
                    orderType : this.formData.orderType,
                    orderOrgId : this.formData.orderOrgId,
                    type : this.formData.type,
                    productName : this.formData.productName,
                    scenicOrgId : this.formData.scenicOrgId,
                    orderOrgName : this.orderOrgName,
                };
            },
            //订单类型
            orderType () {
                return [].concat([{
                    label : 'all',
                    value : 'all'
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        padding: 14px 30px 15px 30px;
        border: 1px solid #EEEEEE;

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
