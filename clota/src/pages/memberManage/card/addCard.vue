<template>
    <!--新增/修改会员信息-->
    <div class="add-card">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/card">会员卡券</BreadcrumbItem>
                <BreadcrumbItem>{{ type === 'add' ? '新增卡券' : '修改卡券信息'}}</BreadcrumbItem>
            </Breadcrumb>
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
                    <Form-item label="卡券类别" prop="type">
                        <Select v-model.trim="formData.couponType" placeholder="请选择">
                            <Option v-for="(item,index) in couponTypeList"
                                    :key="index"
                                    :value="item.value">
                                {{item.label}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon' || formData.couponType === 'discountCoupon'">
                    <Form-item label="卡券面值" prop="nominalValue">
                        <Input v-model.trim="formData.nominalValue" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon'">
                    <!--消费满-->
                    <Form-item label="消费满" prop="enough">
                        <Input v-model.trim="formData.enough"
                               placeholder="请输入"/>
                        <span class="label-used">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'discountCoupon'">
                    <!--最低消费金额-->
                    <Form-item label="最低消费金额" prop="conditionLowerLimtation">
                        <Input v-model.trim="formData.conditionLowerLimtation"
                               placeholder="请输入"/>
                        <span class="label-used">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'discountCoupon'">
                    <!--最高消费金额-->
                    <Form-item label="最高消费金额" prop="high">
                        <Input v-model.trim="formData.high"
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
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'coinCoupon'">
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
                    <Form-item label="可兑换积分为" prop="integCanSelected">
                        <Input v-model="formData.integCanSelected" placeholder="请输入" />
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon'">
                    <!--可用渠道-->
                    <Form-item label="能否和会员折扣权益同时使用" prop="conditionChannelId">
                        <RadioGroup v-model="formData.isDiscountCoexist">
                            <Radio label="true">可同时使用</Radio>
                            <Radio label="false">不可同时使用</Radio>
                        </RadioGroup>
                    </Form-item>
                </div>

                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon'">
                    <!--代金券在折扣前后使用设置-->
                    <Form-item label="代金券在折扣前后使用设置" prop="conditionChannelId">
                        <RadioGroup v-model="formData.isEffectBeforeDiscount">
                            <Radio label="true">折扣前可用</Radio>
                            <Radio label="false">折扣后可用</Radio>
                        </RadioGroup>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <!--可用渠道-->
                    <Form-item label="可用渠道" prop="conditionChannelId">
                        <Select v-model.trim="formData.conditionChannelId" placeholder="请选择">
                            <Option v-for="(item,index) in channelSetList"
                                    :key="index"
                                    :value="item.id">
                                {{item.channelName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon' || formData.couponType === 'discountCoupon'">
                    <!--可用店铺-->
                    <Form-item label="可用店铺" prop="useStore">
                        <Select v-model.trim="formData.storeCanUseId" placeholder="请选择">
                            <Option v-for="(item,index) in listAmountRange"
                                    :key="index"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'coinCoupon'">
                    <!--选择商品-->
                    <Form-item label="选择商品" prop="commodity">
                        <Select v-model.trim="formData.commodity" placeholder="请选择">
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="formData.couponType === 'cashCoupon'"></div>

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
    export default {
        mixins : [lifeCycleMixins],
        components: { },
        data() {

            var validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
            };

            return {
                //新增/修改
                type: 'add',
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
                    //卡券名称
                    couponName: '',
                    //卡券类别
                    couponType: 'cashCoupon',
                    //卡券面值
                    nominalValue: '',
                    //最低消费金额后可用
                    conditionLowerLimtation: '',
                    // 最高消费金额内可用
                    high: '',
                    //可兑换积分数
                    integCanSelected : '',
                    enough: '',
                    // 有效开始时间
                    effectiveTime: '',
                    //有效结束时间
                    expireTime: '',
                    //可用店铺id
                    storeCanUseId : '',
                    store: '',
                    integ: '',
                    //可用渠道id
                    conditionChannelId: '',
                    chooseStore: '',
                    //商品
                    commodity: '',
                    //是否与会员折扣权益同时使用
                    isDiscountCoexist : 'false',
                    //代金券在折扣前后使用设置
                    isEffectBeforeDiscount : 'false'
                },
                //校验规则
                ruleValidate: {
                    couponName: [
                        { required: true, message: '卡券名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '卡券名称不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    couponType: [
                        { required: true, message: '卡券类别不能为空', trigger: 'change' },
                    ],
                    nominalValue: [
                        { required: true, message: '卡券面值不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    conditionLowerLimtation: [
                        { required: true, message: '最低消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    high: [
                        { required: true, message: '最高消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    enough: [
                        { required: true, message: '消费值不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    effectiveTime: [
                        // { required: true, message: '有效开始日期不能为空', trigger: 'change' },
                    ],
                    expireTime: [
                        // { required: true, message: '有效结束日期不能为空', trigger: 'change' },
                    ],
                    store: [
                        { required: true, message: '店铺不能为空', trigger: 'change' },
                    ],
                    integCanSelected: [
                        { required: true, message: '可兑换积分为不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    conditionChannelId: [
                        { required: true, message: '可用渠道不能为空', trigger: 'change' },
                    ],
                }
            }
        },
        computed: {},
        created() {
            this.init();
        },
        methods: {

            init() {
                if (this.$route.query && this.$route.query.type) {
                    this.type = this.$route.query.type;
                }
            },

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
                        this.$Message.success('新增成功');
                    }else{
                        this.$Message.error('新增失败');
                    }
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
                if(this.formData.couponType === 'cashCoupon'){//新增代金券
                    return {
                        id : this.formData.id,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        effectiveTime : this.formData.effectiveTime.format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : this.formData.expireTime.format('yyyy/MM/dd HH:mm:ss'),
                        isDiscountCoexist : this.formData.isDiscountCoexist,
                        isEffectBeforeDiscount : this.formData.isEffectBeforeDiscount,
                        conditionChannelId : this.formData.conditionChannelId,
                        conditionOrgId : this.formData.conditionChannelId,
                        isDeleted : 'false'
                    }
                }else if(this.formData.couponType === 'coinCoupon'){//新增兑换券
                    return {
                        id : this.formData.id,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        effectiveTime : this.formData.effectiveTime.format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : this.formData.expireTime.format('yyyy/MM/dd HH:mm:ss'),
                        store : this.formData.store,
                        integCanSelected : this.formData.integCanSelected,
                        conditionChannelId : this.formData.conditionChannelId,
                        conditionProductId : this.formData.commodity,
                        isDeleted : 'false'
                    }
                }else if(this.formData.couponType === 'discountCoupon'){//新增折扣券
                    return {
                        id : this.formData.id,
                        couponName : this.formData.couponName,
                        couponType : this.formData.couponType,
                        nominalValue : this.formData.nominalValue,
                        conditionLowerLimtation : this.formData.conditionLowerLimtation,
                        conditionUpperLimtation : this.formData.high,
                        effectiveTime : this.formData.effectiveTime.format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : this.formData.expireTime.format('yyyy/MM/dd HH:mm:ss'),
                        integCanSelected : this.formData.integCanSelected,
                        storeCanUseId : this.formData.conditionOrgId,
                        conditionChannelId : this.formData.conditionChannelId,
                        isDeleted : 'false'
                    }
                }
            },
            /**
             *
             */
            memberDiscountOfProductList () {

            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        if(item in this.formData){
                            this.formData[item] = params[item];
                        }
                    }
                }else{
                    this.$router.push({
                        name : 'card'
                    });
                }
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


