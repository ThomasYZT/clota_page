<template>
    <!--新增/修改会员信息-->
    <div class="add-card">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="type === 'add' ? '新增卡券' : '修改卡券信息'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="form-container">

            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="220">
                <div class="ivu-form-item-wrap">
                    <!--卡券名称-->
                    <Form-item label="卡券名称" prop="couponName">
                        <Input v-model.trim="formData.couponName"
                               placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--卡券类别-->
                    <Form-item label="卡券类别" prop="couponName">
                        <Select v-model.trim="formData.couponType"
                                placeholder="请选择"
                                @on-change="typeChange">
                            <Option v-for="(item,index) in couponTypeList"
                                    :key="index"
                                    :value="item.value">
                                {{item.label}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon' || formData.couponType === 'discount_coupon'">
                    <Form-item label="卡券面值" prop="nominalValue">
                        <Input v-model.trim="formData.nominalValue" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'">
                    <!--消费满-->
                    <Form-item label="消费满" prop="conditionLowerLimtation">
                        <Input v-model.trim="formData.conditionLowerLimtation"
                               placeholder="请输入"/>
                        <span class="label-used">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'discount_coupon'">
                    <!--最低消费金额-->
                    <Form-item label="最低消费金额" prop="conditionLowerLimtation">
                        <Input v-model.trim="formData.conditionLowerLimtation"
                               placeholder="请输入"/>
                        <span class="label-used">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'discount_coupon'">
                    <!--最高消费金额-->
                    <Form-item label="最高消费金额" prop="conditionUpperLimtation">
                        <Input v-model.trim="formData.conditionUpperLimtation"
                               placeholder="请输入"/>
                        <span class="label-used">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效开始日期-->
                    <Form-item label="有效开始日期" prop="effectiveTime">
                        <Date-picker
                            type="datetime"
                            v-model.trim="formData.effectiveTime"
                            placeholder="请选择">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--有效结束日期-->
                    <Form-item label="有效结束日期" prop="expireTime">
                        <Date-picker
                            type="datetime"
                            v-model.trim="formData.expireTime"
                            placeholder="请选择">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'exchange_coupon'">
                    <!--选择店铺-->
                    <Form-item label="选择店铺" prop="store">
                        <Select v-model="formData.store" placeholder="请选择">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可兑换积分为-->
                    <Form-item label="可兑换积分为" prop="price">
                        <Input v-model="formData.price"  placeholder="请输入" />
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'">
                    <!--能否和会员折扣权益同时使用-->
                    <Form-item label="能否和会员折扣权益同时使用" prop="isDiscountCoexist">
                        <RadioGroup v-model="formData.isDiscountCoexist">
                            <Radio label="true">可同时使用</Radio>
                            <Radio label="false">不可同时使用</Radio>
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon' && formData.isDiscountCoexist === 'true'">
                    <!--代金券在折扣前后使用设置-->
                    <Form-item label="代金券在折扣前后使用设置" prop="isEffectBeforeDiscount">
                        <RadioGroup v-model="formData.isEffectBeforeDiscount">
                            <Radio label="true">折扣前可用</Radio>
                            <Radio label="false">折扣后可用</Radio>
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可用渠道-->
                    <Form-item label="可用渠道" prop="conditionChannelId">
                        <Select v-model.trim="formData.conditionChannelId"
                                multiple
                                placeholder="请选择">
                            <Option v-for="(item,index) in channelSetList"
                                    :key="index"
                                    :value="item.id">
                                {{item.channelName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon' || formData.couponType === 'discount_coupon'">
                    <!--可用店铺-->
                    <Form-item label="可用店铺" prop="useStore">
                        <Select v-model.trim="formData.conditionOrgId"
                                multiple
                                placeholder="请选择">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'exchange_coupon'">
                    <!--选择商品-->
                    <Form-item label="选择商品" prop="commodity">
                        <Select v-model.trim="formData.commodity" placeholder="请选择">
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cash_coupon'"></div>

            </Form>

            <div class="content-footer">
                <i-button type="primary"
                          :loading="loading"
                          @click="formValidateFunc">{{$t('confirm')}}</i-button>
                <router-link :to="{name: 'card'}">
                    <i-button type="ghost">{{$t('cancel')}}</i-button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import {couponTypeList} from '@/assets/js/constVariable.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import common from '@/assets/js/common.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead
        },
        data() {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
            };

            //校验金额格式
            const validateMoney = (rule,value,callback) => {
                common.validateMoney(value).then(() => {
                    callback();
                }).catch(err => {
                    callback(this.$t(err,{field : rule.field}));
                });
            };

            //校验有效开始时间
            const validateStartTime = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(this.formData.expireTime && value.valueOf() >  this.formData.expireTime.valueOf()){
                        callback('有效开始时间不可大于结束时间');
                    }else{
                        callback();
                    }
                }else{
                    callback('有效开始时间不可为空');
                }
            };

            //校验有效结束时间
            const validateEndTime = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(this.formData.effectiveTime && value.valueOf() <  this.formData.effectiveTime.valueOf()){
                        callback('有效结束时间不可小于开始时间');
                    }else{
                        callback();
                    }
                }else{
                    callback('有效结束时间不可为空');
                }
            };

            //校验可兑换积分是否为正整数
            const validatePrice = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    callback(err);
                });
            };

            //校验可用渠道
            const validateConditionChannelId = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(value.length > 0){
                        callback();
                    }else{
                        callback('可用渠道不可为空');
                    }
                }else{
                    callback('可用渠道不可为空');
                }
            };

            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('card'),
                        router: {
                            name: 'card'
                        }
                    }
                ],
                //新增/修改
                type: '',
                loading: false,
                //卡券类别列表
                couponTypeList : couponTypeList,
                //渠道列表
                channelSetList : [],
                //可用店铺列表
                listAmountRange : [],
                // 表单数据
                formData: {
                    id : '',
                    status : 'valid',
                    //卡券名称
                    couponName: '',
                    //卡券类别
                    couponType: 'cash_coupon',
                    //卡券面值
                    nominalValue: '',
                    //最低消费金额后可用
                    conditionLowerLimtation: '',
                    // 最高消费金额内可用
                    conditionUpperLimtation: '',
                    //可兑换积分数
                    price : '',
                    // 有效开始时间
                    effectiveTime: '',
                    //有效结束时间
                    expireTime: '',
                    //可用店铺id
                    conditionOrgId : [],
                    store: '',
                    //可用渠道id
                    conditionChannelId: [],
                    //商品
                    commodity: '',
                    //是否与会员折扣权益同时使用
                    isDiscountCoexist : 'false',
                    //代金券在折扣前后使用设置
                    isEffectBeforeDiscount : ''
                },
                //校验规则
                ruleValidate: {
                    couponName: [
                        { required: true, message: '卡券名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 30, message: '卡券名称不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    couponType: [
                        { required: true, message: '卡券类别不能为空', trigger: 'change' },
                    ],
                    nominalValue: [
                        { required: true, message: '卡券面值不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMoney, trigger: 'blur' },
                    ],
                    conditionLowerLimtation: [
                        { required: true, message: '最低消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMoney, trigger: 'blur' },
                    ],
                    conditionUpperLimtation: [
                        { required: true, message: '最高消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    effectiveTime: [
                        { required: true, validator : validateStartTime, trigger: 'change' },
                    ],
                    expireTime: [
                        { required: true, validator : validateEndTime, trigger: 'change' },
                    ],
                    store: [
                        { required: true, message: '店铺不能为空', trigger: 'change' },
                    ],
                    price: [
                        { required: true, message: '可兑换积分为不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'},
                        { validator: validatePrice, trigger: 'blur' },
                    ],
                    conditionChannelId: [
                        { required: true, validator : validateConditionChannelId, trigger: 'change' },
                    ],
                    isDiscountCoexist : [
                        {required : true,trigger : 'change'}
                    ],
                    isEffectBeforeDiscount : [
                        {required : true,message : '请选择代金券在折扣前后使用设置',trigger : 'change'}
                    ]
                }
            }
        },
        methods: {

            // 手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field){
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                })
            },

            /**
             * 表单校验
             */
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.loading = true;
                       this.updateCoupon();
                    }
                })
            },
            /**
             * 新增或编辑卡券
             */
            updateCoupon () {
                let params = this.getAddCouponParams();
                ajax.post('updateCoupon',params).then(res => {
                    if(res.success){
                        if(this.type === 'add'){
                            this.$Message.success('新增成功');
                        }else{
                            this.$Message.success('修改成功');
                        }
                    }else{
                        if(this.type === 'add'){
                            this.$Message.error('新增失败');
                        }else{
                            this.$Message.error('修改失败');
                        }
                    }
                }).finally(() => {
                    this.loading = false;
                    this.$router.push({
                        name : 'card'
                    });
                });
            },
            /**
             * 查询渠道
             */
            queryChannelSet () {
                ajax.post('queryChannelSet',{
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 9999
                }).then(res => {
                    if(res.success){
                        this.channelSetList = res.data.data ? res.data.data : [];
                    }else{
                        this.channelSetList =  [];
                    }
                }).catch(() => {
                    this.channelSetList =  [];
                });
            },
            /**
             * 查询所有店铺信息
             */
            queryListAmountRange () {
                ajax.post('listAmountRange').then(res => {
                    if(res.success){
                        this.listAmountRange = res.data ? res.data : [];
                    }else{
                        this.listAmountRange =  [];
                    }
                }).catch(() => {
                    this.listAmountRange =  [];
                });
            },
            /**
             * 获取新增卡券的参数
             */
            getAddCouponParams () {
                if(this.formData.couponType === 'cash_coupon'){//新增代金券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        isDiscountCoexist : this.formData.isDiscountCoexist,
                        price : this.formData.price,
                        isEffectBeforeDiscount : this.formData.isEffectBeforeDiscount,
                        conditionChannelId : this.formData.conditionChannelId.join(','),
                        conditionOrgId : this.formData.conditionOrgId.join(','),
                    }
                }else if(this.formData.couponType === 'exchange_coupon'){//新增兑换券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        store : this.formData.store,
                        price : this.formData.price,
                        conditionChannelId : this.formData.conditionChannelId.join(','),
                        conditionProductId : this.formData.commodity,
                        remark : this.getDiscountRemark(),
                        conditionOrgId : this.formData.conditionOrgId.join(','),
                    }
                }else if(this.formData.couponType === 'discount_coupon'){//新增折扣券
                    return {
                        id : this.formData.id,
                        status : this.formData.status,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        conditionUpperLimtation : this.formData.conditionUpperLimtation,
                        effectiveTime : this.formData.effectiveTime.format('yyyy-MM-dd'),
                        expireTime : this.formData.expireTime.format('yyyy-MM-dd'),
                        price : this.formData.price,
                        conditionOrgId : this.formData.conditionOrgId.join(','),
                        conditionChannelId : this.formData.conditionChannelId,
                    }
                }
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        if(item in this.formData){
                            if(['conditionChannelId','conditionOrgId'].includes(item)){
                                this.formData[item] = params[item] ? params[item].split(',') : '';
                            }else{
                                this.formData[item] = params[item];
                            }
                        }
                    }
                }
                this.type = this.$route.query.type;
            },
            /**
             * 卡券类别修改
             */
            typeChange () {
                this.$refs.formValidate.resetFields();
            },
            /**
             * 获取兑换券的使用条件
             */
            getDiscountRemark () {
                let remark = [];
                this.channelSetList.forEach(item => {
                    if(this.formData.conditionChannelId.includes(item.id)){
                        remark.push(item.channelName);
                    }
                });
                return remark.join(',');
            }
        },
        created () {
            this.queryChannelSet();
            this.queryListAmountRange();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }
        .form-container{
            width: 100%;
            height: calc(100% - 90px);
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            .ivu-input-icon{
                z-index: 2;
            }

            .ivu-form{
                padding: 40px 50px 40px 0;
                text-align: center;
            }

            .ivu-form-item-wrap{
                position: relative;
                display: inline-block;
                min-width: 495px;
                padding-right: 20px;
                width: 49%;
                text-align: center;
                vertical-align: middle;

                .btn-add-dept,
                .btn-add-position{
                    position: absolute;
                    left: calc(50% + 185px);
                    top: 5px;
                    font-size: 12px;
                    color: #1875F0;
                    letter-spacing: 0.75px;
                    cursor: pointer;
                }
            }

            .ivu-form-item{
                /*width: 395px;*/
                /*margin: 0 auto 20px;*/
                text-align: left;

                .ivu-date-picker {
                    display: block;
                }

                .ivu-select-selected-value,
                .ivu-input{
                    font-size: 14px;
                }

                .ivu-select-item{
                    font-size: 14px !important;
                }

                .label-used{
                    position: absolute;
                    @include absolute_pos(absolute,$right : -35px,$top : 2px);
                }
            }

            .register-info-footer{
                padding: 30px 20px;
                text-align: center;

                .ivu-btn{
                    width: 90px;
                    height: 30px;
                    padding: 4px 12px 3px;
                    font-size: 12px;
                    letter-spacing: 1.33px;
                }

                &.edit-footer .ivu-btn{
                    width: 90px;
                }

                .ivu-btn-ghost{
                    margin-left: 20px;
                    color: #666666;
                }
            }
        }

        .content-footer{
            text-align: center;
        }

    }
</style>


