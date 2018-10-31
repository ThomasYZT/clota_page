<!--表头筛选器-->

<template>
    <div class="filter-head">
        <Form ref="formCustom"
              :model="formData"
              :rules="ruleCustom"
              :label-width="80">
            <i-row>
                <i-col span="9">
                    <!--游玩日期-->
                    <FormItem :label="$t('playDate')">
                        <DatePicker v-model="formData.playDate"
                                    type="date"
                                    :options="dateOptions"
                                    :editable="false"
                                    style="width: 280px"
                                    @on-change="searchProductList">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--订单类型-->
                    <FormItem :label="$t('orderType')" >
                        <Select v-model="formData.orderType"
                                style="width: 160px"
                                @on-change="orderTypeChange">
                            <Option v-for="item in orderType"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="9">
                    <!--所属景区-->
                    <FormItem :label="$t('scenePlace')">
                        <Select v-model="formData.scenicOrgId"
                                style="width: 280px"
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
                    <FormItem :label="$t('sellingOrg')" >
                        <Select v-model="formData.saleOrgId"
                                style="width: 160px"
                                :disabled="saleDisabled"
                                @on-change="searchProductList">
                            <Option v-for="item  in saleOrgList"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem :label="$t('orderOrg')" >
                        <Select v-model="formData.orderOrgId"
                                style="width: 160px"
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
                <i-col span="9">
                    <FormItem :label="$t('keyWord')" >
                        <Input v-model.trim="formData.productName"
                               style="width: 280px"
                               :placeholder="$t('inputField',{field : $t('productName')})" />
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem :label="$t('industryType')" >
                        <Select v-model="formData.type"
                                style="width: 160px"
                                @on-change="searchProductList">
                            <Option value="ticket">{{$t('ticketType')}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6" style="text-align: right;float: right">
                    <Button type="primary" class="ivu-btn-90px" @click="searchProductList">{{$t('searching')}}</Button>
                    <Button type="ghost" class="ivu-btn-90px reset" @click="reset">{{$t('reset')}}</Button>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import {orderType} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                //表单校验规则
                ruleCustom : {

                },
                //表单数据
                formData : {
                    //游玩日期
                    playDate : new Date(),
                    //所属景区
                    scenicOrgId : '',
                    //发售机构
                    saleOrgId : '',
                    //下单企业
                    orderOrgId : '',
                    //业态类型
                    type : '',
                    //产品名称
                    productName : '',
                    //订单类型
                    orderType : 'team'
                },
                //订单类型
                orderType : orderType,
                //所属景区列表
                belongScene : [],
                //发售机构列表
                saleOrgList : [],
                //下单企业列表
                orderTakeList : [],
                //发售机构是否禁用
                saleDisabled : false,
                //下单企业是否禁用
                orderTaskDisabled : false,
            }
        },
        methods: {
            /**
             * 订单类型改变，查询所属景区信息
             */
            orderTypeChange () {
                ajax.post('getScenicList',{
                    allocationStatus : 'false',
                    orderType : this.formData.orderType
                }).then(res => {
                    this.formData.scenicOrgId = '';
                    this.formData.orderOrgId = '';
                    this.formData.saleOrgId = '';
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
                this.formData.saleOrgId = '';
                this.formData.orderOrgId = '';
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
                        if(!this.formData.orderOrgId && this.orderTakeList.length > 0){
                            this.formData.orderOrgId = this.orderTakeList[0].id;
                        }
                        if(!this.formData.saleOrgId && this.saleOrgList.length > 0){
                            this.formData.saleOrgId = this.saleOrgList[0].id;
                            this.search();
                        }
                    }else{
                        this.saleDisabled = false;
                        this.orderTaskDisabled = true;
                        if(!this.formData.saleOrgId && this.saleOrgList.length > 0){
                            this.formData.saleOrgId = this.saleOrgList[0].id;
                        }
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
                this.formData.playDate = new Date();
                this.formData.scenicOrgId = '';
                this.formData.saleOrgId = '';
                this.formData.orderOrgId = '';
                this.formData.type = '';
                this.formData.productName = '';
                this.formData.orderType = 'team';
                this.orderTypeChange();
                this.searchProductList();
            },
        },
        created () {
            this.orderTypeChange();
        },
        computed :{
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //发售机构名字
            saleOrgName () {
                if(this.saleOrgList && this.saleOrgList.length > 0){
                    for(let i = 0, j = this.saleOrgList.length;i < j;i++){
                        if(this.formData.saleOrgId === this.saleOrgList[i]['id']){
                            return this.saleOrgList[i]['orgName'];
                        }
                    }
                    return '';
                }else{
                    return '';
                }
            },
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
                    playDate : this.formData.playDate.format('yyyy-MM-dd'),
                    orderType : this.formData.orderType,
                    saleOrgId : this.formData.saleOrgId,
                    orderOrgId : this.formData.orderOrgId,
                    type : this.formData.type,
                    productName : this.formData.productName,
                    scenicOrgId : this.formData.scenicOrgId,
                    saleOrgName : this.saleOrgName,
                    orderOrgName : this.orderOrgName,
                };
            },
            //日期插件配置参数
            dateOptions () {
                return {
                    disabledDate : (date) =>  {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .filter-head{
        padding: 14px 30px 5px 30px;
        border-bottom: 1px solid #EEEEEE;

        /deep/ .ivu-form-item{
            margin-bottom: 7px;
        }

        .reset{
            margin-left: 15px;
        }
    }
</style>
