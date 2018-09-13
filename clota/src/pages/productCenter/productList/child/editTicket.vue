<!--
内容：产品列表 - 票类列表 - 编辑/新增
作者：
日期：
-->
<template>
    <div class="edit-ticket">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="container">

            <!--表单信息-->
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">

                <!--基本信息-->
                <title-temp title="basicInfo"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('productName')" prop="productName"><!--产品名称-->
                            <Input v-model.trim="formData.productName"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('scenePrice')" prop="scenePrice"><!--景区成本价-->
                            <Input v-model.trim="formData.scenePrice"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('thirdProductNo')" prop="thirdProductNo"><!--第三方产品编码-->
                            <Input v-model.trim="formData.thirdProductNo"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('productDesc')" prop="productDesc"><!--产品描述-->
                            <Input v-model.trim="formData.productDesc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                </div>

                <!--票面信息-->
                <title-temp title="ticketInfo"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('printName')" prop="printName"><!--打印名称-->
                            <Input v-model.trim="formData.printName"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('ticketPrice')" prop="ticketPrice"><!--票面价格-->
                            <Input v-model.trim="formData.ticketPrice"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('ticketDesc')" prop="ticketDesc"><!--票面说明-->
                            <Input v-model.trim="formData.ticketDesc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('printDesc')" prop="printDesc"><!--打印说明-->
                            <Input v-model.trim="formData.printDesc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                </div>

                <!--购买限制-->
                <title-temp title="buyLimit"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('isTeamProduct')" prop="isTeamProduct"><!--是否团队产品-->
                            <Select v-model="formData.isTeamProduct"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.isTeamProduct"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('enterNum')" prop="enterNum"><!-- 可入园人数-->
                            <Input v-model.trim="formData.enterNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('minOrderNum')" prop="minOrderNum"><!--每订单最小起订数-->
                            <Input v-model.trim="formData.minOrderNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('maxOrderNum')" prop="maxOrderNum"><!--每订单最大限订数-->
                            <Input v-model.trim="formData.maxOrderNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('orderToCommitVisitorIdInfo')" prop="orderToCommitVisitorIdInfo"><!--预定时提交身份信息-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.orderInfo"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single" v-if="formData.orderToCommitVisitorIdInfo !== 'noRequired'">
                        <Form-item :label="$t('idType')" prop="idType"><!--可接受证件类型-->
                            <CheckboxGroup v-model="formData.idType">
                                <Checkbox v-for="(item,index) in enumData.idType"
                                          :key="index"
                                          :label="item.value">
                                    {{$t(item.label)}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('limitById')" prop="limitByIdDay"><!--身份证购票限制-->
                            <Input v-model.trim="formData.limitByIdDay"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span class="label">{{$t('maxBuy')}}</span>
                            <Input v-model.trim="formData.limitByIdNum"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('paper')}}</span>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('limitByMobile')" prop="limitByMobileDay"><!--手机号购票限制-->
                            <Input v-model.trim="formData.limitByMobileDay"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span class="label">{{$t('maxBuy')}}</span>
                            <Input v-model.trim="formData.limitByMobileNum"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('paper')}}</span>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('limitStore')" prop="limitStore"><!--限制库存-->
                            <Select v-model="formData.limitStore"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.limitStore"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('storeNum')" prop="storeNum"><!-- 库存数量-->
                            <Input v-model.trim="formData.storeNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                </div>

                <!--产品有效性-->
                <title-temp title="productEffect"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('productEffectSet')" prop="productEffectSet"><!--产品有效性设置-->
                            <Select v-model="formData.productEffectSet"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.productEffectSet"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap">
                        <Form-item label=""></Form-item>
                    </div>
                </div>

                <!--游玩规则-->
                <title-temp title="playRule"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('playPark')"><!--可游玩园区-->
                            <span class="blue" @click="addPark">+ {{$t('addPark')}}</span>
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="columnData"
                                :table-data="tableData"
                                :border="false">
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal" @click="modify(scope.row)">{{$t('modify')}}</li><!--修改-->
                                            <li class="red-label" @click="del(scope.row)">{{$t('delete')}}</li><!--删除-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                    </div>
                </div>

            </Form>

            <!--底部操作-->
            <div class="footer">
                <template v-if="type === 'add'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('commitCheck')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack">
                        {{$t("giveUpAdd")}}
                    </Button>
                </template>
                <template v-if="type === 'modify'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('confirm')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack">
                        {{$t("giveUpModify")}}
                    </Button>
                </template>
            </div>

        </div>

        <!--新增/编辑园区-->
        <edit-park-modal ref="editPark"></edit-park-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editParkModal from './editParkModal.vue'
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import {parkColumn} from './parkConfig';
    import { isTeamProduct, orderInfo, idType, productEffectSet, limitStore } from '@/assets/js/constVariable';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editParkModal,
        },
        data () {

            let validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }
            };
            //校验钱
            const validateMoney = (rule,value,callback) => {
                if(value){
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t('errorMaxLength',{field : this.$t(rule.field),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }
            };
            //校验正整数
            const validateNumber = (rule,value,callback) => {
                if(value){
                    common.validateInteger(value).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t(err,{field : this.$t(rule.field),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }
            };
            //校验身份证购票限制
            const validateIdBuyTicket = (rule,value,callback) => {
                if(value || this.formData.limitByIdNum){
                    common.validateInteger(this.formData.limitByIdNum).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t(err,{field : this.$t(rule.field),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }
            };
            //校验手机号码购票限制
            const validateMobileBuyTicket = (rule,value,callback) => {
                if(value || this.formData.limitByMobileNum){
                    common.validateInteger(this.formData.limitByMobileNum).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t(err,{field : this.$t(rule.field),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }
            };

            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'ticketType',   // 产品列表--票类列表
                        router: 'ticketType',
                    }
                ],
                //新增/修改
                type: 'add',
                loading: false,
                //表单数据
                formData: {
                    //基本信息
                    productName: '',//产品名称
                    scenePrice: '',//景区成本价
                    thirdProductNo: '',//第三方产品编码
                    productDesc: '',//产品描述
                    //票面信息
                    printName: '',//打印名称
                    ticketPrice: '',//票面价格
                    ticketDesc: '',//票面说明
                    printDesc: '',//打印说明
                    //购买限制
                    isTeamProduct : 'yes',//是否团队产品
                    enterNum : '',//可入园人数
                    minOrderNum : '10',//每订单最小起订数
                    maxOrderNum : '100',//每订单最大限订数
                    orderToCommitVisitorIdInfo : 'noRequired',//预定时提交游客身份信息
                    idType : ['identity','passport'],//可接受证件类型
                    limitByIdDay: '5',//身份证件购票限制
                    limitByIdNum: '5',//身份证件购票限制
                    limitByMobileDay: '5',//手机号购票限制
                    limitByMobileNum: '5',//手机号购票限制
                    limitStore : 'is_no_limit',//限制库存
                    storeNum : '',//库存数量
                    //产品有效性
                    productEffectSet: 'dayToStart',//产品有效性设置
                    //游玩规则
                },
                ruleValidate: {
                    productName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('productName')}), trigger: 'blur' },     // 不能为空
                        { type: 'string', max: 50, message: this.$t('errorMaxLength', {field: this.$t('productName'), length: 50}), trigger: 'blur' },      // 不能多于15个字符
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    scenePrice: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('scenePrice')}), trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('scenePrice'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMoney, trigger: 'blur' }
                    ],
                    thirdProductNo: [
                        { type: 'string', max: 50, message: this.$t('errorMaxLength', {field: this.$t('thirdProductNo'), length: 50}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    productDesc: [
                        { type: 'string', max: 500, message: this.$t('errorMaxLength', {field: this.$t('productDesc'), length: 500}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    printName: [
                        { type: 'string', max: 50, message: this.$t('errorMaxLength', {field: this.$t('printName'), length: 50}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    ticketPrice: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('ticketPrice'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMoney, trigger: 'blur' }
                    ],
                    ticketDesc: [
                        { type: 'string', max: 500, message: this.$t('errorMaxLength', {field: this.$t('ticketDesc'), length: 500}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    printDesc: [
                        { type: 'string', max: 500, message: this.$t('errorMaxLength', {field: this.$t('printDesc'), length: 500}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    enterNum: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('enterNum')}), trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('enterNum'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    minOrderNum: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('minOrderNum'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    maxOrderNum: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('maxOrderNum'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    storeNum: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('storeNum'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    limitByIdDay: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('limitById'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateIdBuyTicket, trigger: 'blur' }
                    ],
                    limitByMobileDay: [
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('limitByMobile'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { validator: validateMobileBuyTicket, trigger: 'blur' }
                    ],
                },
                //枚举数据
                enumData: {
                    scene: [],
                    //是否团队产品
                    isTeamProduct: isTeamProduct,
                    //预定时提交游客身份信息
                    orderInfo: orderInfo,
                    //证件类型
                    idType: idType,
                    //产品有效性设置
                    productEffectSet: productEffectSet,
                    //限制库存
                    limitStore: limitStore,
                },
                //可游玩园区表头
                columnData: parkColumn,
                //可游玩园区表格数据
                tableData: [{}],
            }
        },
        created() {

        },
        methods: {

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ){
                        console.log(true);
                        //区分新增与修改
                        if( this.type === 'add' ){
                            this.saveAndEditTicket( 'saveNewMemberInfo', params);
                        }
                        if( this.type === 'modify' ){
                            this.saveAndEditTicket( 'editMemberInfo', params);
                        }
                    }
                })
            },

            //新增/修改票类
            saveAndEditTicket( url, params ){
                ajax.post(url, {}).then(res => {
                    if(res.success){
                        //区分新增与修改
                        this.$Message.success(this.$t('successTip',{tip : this.$t(this.type)}));
                        this.goBack();
                    } else {
                        //区分新增与修改
                        this.$Message.error(res.message || this.$t('failureTip',{tip : this.$t(this.type)}));
                    }
                })
            },

            //修改可游玩园区
            modify ( data ) {
                this.$refs.editPark.show({
                    data: data,
                    title : this.$t('modify')+this.$t('oneTicketPark'),
                    type: 'modify',
                    confirmCallback : () => {
                        //push to tableData
                        debugger
                        console.log(true)
                    }
                });
            },
            //删除可游玩园区
            del ( data ) {

            },
            //新增可游玩园区
            addPark () {
                this.$refs.editPark.show({
                    title : this.$t('add')+this.$t('oneTicketPark'),
                    type: 'add',
                    confirmCallback : ( data ) => {
                        //push to tableData
                        console.log(true)
                        this.tableData.push(data);
                    }
                });
            },

            //返回
            goBack() {
                //区分新增与修改
                if( this.type === 'add' ){
                    this.$router.push({ name: 'ticketType'});
                }
                if( this.type === 'modify' ){
                    this.$router.back();
                }
            },

            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
                    this.type = params.type;
                    if(params.info){
                        this.formData = params.info;
                    }
                }
            },
            /**
             * 初始化数据
             * @param data
             */
            initData(data) {
                this.info = JSON.parse(JSON.stringify(data));
                let memberInfo = pick(data, ['custName', 'phoneNum','emailAddr','birthDay',
                    'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                    'certificationType','idCardNumber','homeAddr','status','tpNo','tpCardNo','levelId','channelId']);
                this.member = defaultsDeep({},memberInfo);
            },

        },
        computed: {
            localeRouter () {
                return this.type === 'add' ? this.$t('addTicket') : this.$t('editDetail');      // 新增票类 ： 修改票类信息
            },
        },
    }
</script>


<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-ticket {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        .container{

            .ivu-form{
                padding: 10px 0 20px;
                text-align: center;
            }

            .blue{
                color: $color_blue;
                cursor: pointer;
            }

            .form-content{
                width: 1000px;
                margin: 0 auto;

                .ivu-input-icon{
                    z-index: 2;
                }

                /deep/ .ivu-form-item-label{
                    padding-left: 0;
                }

                .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    width: 49%;
                    text-align: left;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 395px;
                        margin: 0 auto 18px;
                        text-align: left;

                        /deep/ .ivu-date-picker {
                            display: block;
                        }

                        /deep/ .ivu-select-selected-value,
                        /deep/ .ivu-input{
                            font-size: $font_size_14px;
                        }

                        /deep/ .ivu-select-item{
                            font-size: $font_size_14px !important;
                        }

                        /deep/ .ivu-input-wrapper{
                            &.short-input{
                                width: 123px;
                                display: inline-block;
                                margin-right: 10px;
                            }
                        }

                        /deep/ .ivu-checkbox-wrapper{
                            margin-right: 24px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }

                        /deep/ .ivu-checkbox{
                            margin-right: 5px;
                        }

                        .label{
                            margin-right: 10px;
                        }
                    }

                    &.single{
                        width: calc(49% + 455px);
                        padding: 0 24px 0 24px;
                        .ivu-form-item{
                            width: 100%;
                        }
                    }
                }

            }

            .footer{
                text-align: center;

                /deep/ .ivu-btn{
                    width: 108px;
                    &:nth-child(1){
                        margin-right: 20px;
                    }
                }

            }

        }

    }

</style>
