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
                        <Form-item :label="$t('standardPrice')" prop="standardPrice"><!--景区成本价-->
                            <Input v-model.trim="formData.standardPrice"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('thirdCode')" prop="thirdCode"><!--第三方产品编码-->
                            <Input v-model.trim="formData.thirdCode"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('productDes')" prop="productDes"><!--产品描述-->
                            <Input v-model.trim="formData.productDes"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap"></div>
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
                        <Form-item :label="$t('printPrice')" prop="printPrice"><!--票面价格-->
                            <Input v-model.trim="formData.printPrice"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('ticketRemark')" prop="ticketRemark"><!--票面说明-->
                            <Input v-model.trim="formData.ticketRemark"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('printRemark')" prop="printRemark"><!--打印说明-->
                            <Input v-model.trim="formData.printRemark"
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
                        <Form-item :label="$t('isGroup')"><!--是否团队产品-->
                            <Select v-model="formData.isGroup"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="isGroupChange">
                                <Option v-for="(item,index) in enumData.isTeamProduct"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('inNum')" prop="inNum"><!-- 可入园人数-->
                            <Input :disabled="formData.isGroup === 'true' ? true : false "
                                   v-model.trim="formData.inNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('minOrderNum')" prop="minNum"><!--每订单最小起订数-->
                            <Input v-model.trim="formData.minNum"
                                   :placeholder="$t('inputField', {field: $t('minOrderNum')})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('maxOrderNum')" prop="maxNum"><!--每订单最大限订数-->
                            <Input v-model.trim="formData.maxNum"
                                   :placeholder="$t('inputField', {field: $t('maxOrderNum')})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('needId')"><!--预定时提交身份信息-->
                            <Select v-model="formData.needId"
                                    :disabled="formData.isGroup === 'true' ? true : false "
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
                    <div class="ivu-form-item-wrap single" v-if="formData.needId !== 'noRequired'">
                        <Form-item :label="$t('idType')"><!--可接受证件类型-->
                            <CheckboxGroup v-model="formData.acceptIdType">
                                <Checkbox v-for="(item,index) in enumData.idType"
                                          :key="index"
                                          :label="item.value">
                                    {{$t(item.label)}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" v-if="formData.needId === 'more'">
                        <Form-item :label="$t('limitByIdDay')" prop="limitByIdDay"><!--身份证购票限制-->
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
                    <div class="ivu-form-item-wrap" v-if="formData.needId === 'more'">
                        <Form-item :label="$t('limitByMobileDay')" prop="limitByMobileDay"><!--手机号购票限制-->
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
                        <Form-item :label="$t('stockType')"><!--限制库存-->
                            <Select v-model="formData.stockType"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.stockType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('stockNum')" prop="stockNum"><!-- 库存数量-->
                            <template v-if="formData.stockType !== 'is_no_limit'">
                                <Input v-model.trim="formData.stockNum"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </template>
                            <span v-else>
                                {{$t('disableSet')}}
                            </span>
                        </Form-item>
                    </div>
                </div>

                <!--产品有效性-->
                <title-temp title="productEffect"></title-temp>
                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('productEffSet')" prop="productEffSet"><!--产品有效性设置-->
                            <Select v-model="formData.productEffSet"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.productEffSet"
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
                            <span class="blue"
                                  v-if="productPlayRuleVo.length < parkListCount"
                                  @click="addPark" >+ {{$t('addPark')}}</span>
                            <table-com
                                :table-com-min-height="260"
                                :column-data="columnData"
                                :auto-height="true"
                                :table-data="productPlayRuleVo"
                                :row-class-name="rowClassName"
                                :border="false">
                                <el-table-column
                                    slot="column0"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <!--<span class="red" v-if="!scope.row.check">!</span>-->
                                        <span>{{ scope.row.parkName | contentFilter }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column1"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                       {{$t(scope.row.saleType) | contentFilter}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal" @click="modify(scope.row, scope.$index)">{{$t('modify')}}</li><!--修改-->
                                            <li class="red-label" @click="del(scope.row, scope.$index)">{{$t('delete')}}</li><!--删除-->
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
                <!--新增按钮-->
                <template v-if="type === 'add' && canApplyAuditProduct">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc"> <!--提交审核-->
                            {{$t('commitCheck')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack"><!--放弃新增-->
                            {{$t("giveUpAdd")}}
                    </Button>
                </template>
                <!--修改按钮-->
                <template v-if="type === 'modify' && canModifyProduct">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('commitCheck')}}
                    </Button>
                    <Button type="ghost"
                            @click="goBack"><!--放弃修改-->
                        {{$t("giveUpModify")}}
                    </Button>
                </template>
            </div>

        </div>

        <!--新增/编辑园区-->
        <edit-park-modal ref="editPark" :park-list="parkList" :data="formData"></edit-park-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editParkModal from './editParkModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import { parkColumn } from './parkConfig';
    import { isTeamProduct, orderInfo, idType, productEffectSet, limitStore } from '@/assets/js/constVariable';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editParkModal,
        },
        data () {

            let validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                }
            };
            //校验钱
            const validateMoney = (rule,value,callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                } else {
                    callback();
                }
            };
            //校验正整数
            const validateNumber = (rule,value,callback) => {
                if (value) {
                    common.validateInteger(value, null, 0, 50).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t(rule.field === 'minNum' ? 'minOrderNum' : 'maxOrderNum'),length : 50 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field === 'minNum' ? 'minOrderNum' : 'maxOrderNum') }));
                        }
                    });
                } else {
                    callback();
                }
            };
            //校验身份证购票限制
            const validateIdBuyTicket = (rule,value,callback) => {
                if (value || this.formData.limitByIdNum) {
                    common.validateInteger(this.formData.limitByIdNum).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                }
            };
            //校验手机号码购票限制
            const validateMobileBuyTicket = (rule,value,callback) => {
                if (value || this.formData.limitByMobileNum) {
                    common.validateInteger(this.formData.limitByMobileNum).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                }
            };
            //校验票面价格(大于景区成本价)
            const validatePrintPrice = (rule,value,callback) => {
                if (value && this.formData.standardPrice) {
                    if ( Number(value) < Number(this.formData.standardPrice) ) {
                        callback(this.$t('sizeErrorS',{ filed1 : this.$t('printPrice'),filed2 : this.$t('standardPrice') }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            //校验产品有效性设置
            const validateProductEffSet = (rule,value,callback) => {
                if (value) {
                    callback();
                } else {
                    callback(this.$t('selectField', { msg : this.$t('productEffSet') }));
                }
            };

            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'ticketType', // 产品列表--票类列表
                        router : 'ticketType',
                    }
                ],
                //新增/修改
                type : 'add',
                loading : false,
                //表单数据
                formData : {
                    //基本信息
                    productName : '',//产品名称
                    standardPrice : '',//景区成本价
                    thirdCode : '',//第三方产品编码
                    productDes : '',//产品描述
                    //票面信息
                    printName : '',//打印名称
                    printPrice : '',//票面价格
                    ticketRemark : '',//票面说明
                    printRemark : '',//打印说明
                    //购买限制
                    isGroup : 'true',//是否团队产品
                    inNum : '',//可入园人数
                    minNum : '',//每订单最小起订数
                    maxNum : '',//每订单最大限订数
                    needId : 'noRequired',//预定时提交游客身份信息
                    acceptIdType : ['identity','passport'],//可接受证件类型
                    limitByIdDay : '',//身份证件购票限制
                    limitByIdNum : '',//身份证件购票限制
                    limitByMobileDay : '',//手机号购票限制
                    limitByMobileNum : '',//手机号购票限制
                    stockType : '',//限制库存
                    stockNum : '',//库存数量
                    //产品有效性
                    productEffSet : 'since_the_play',//产品有效性设置
                },
                //可游玩园区表头
                columnData : parkColumn,
                //可游玩园区列表数据
                parkList : [],
                parkListCount : 0,
                //游玩规则-产品园区列表数据
                productPlayRuleVo : [],
                //校验规则
                ruleValidate : {
                    productName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('productName') }), trigger : 'blur' }, // 不能为空
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('productName'), length : 50 }), trigger : 'blur' }, // 不能多于15个字符
                        { validator : validateMethod.emoji, trigger : 'blur' }
                    ],
                    standardPrice : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('standardPrice') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('standardPrice'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' }
                    ],
                    thirdCode : [
                        { max : 50, message : this.$t('errorMaxLength', { field : this.$t('thirdCode'), length : 50 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    productDes : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('productDes'), length : 500 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    printName : [
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('printName'), length : 50 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    printPrice : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('printPrice'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' },
                        { validator : validatePrintPrice, trigger : 'blur' }
                    ],
                    ticketRemark : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('ticketRemark'), length : 500 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    printRemark : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('printRemark'), length : 500 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    inNum : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('inNum') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('inNum'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    minNum : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('minOrderNum'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    maxNum : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('maxOrderNum'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    stockNum : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    limitByIdDay : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('limitByIdDay'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateIdBuyTicket, trigger : 'blur' }
                    ],
                    limitByMobileDay : [
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('limitByMobileDay'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateMobileBuyTicket, trigger : 'blur' }
                    ],
                    productEffSet : [
                        { validator : validateProductEffSet, trigger : 'change' }
                    ],
                },
                //枚举数据
                enumData : {
                    //是否团队产品
                    isTeamProduct : isTeamProduct,
                    //预定时提交游客身份信息
                    orderInfo : orderInfo,
                    //证件类型
                    idType : idType,
                    //产品有效性设置
                    productEffSet : productEffectSet,
                    //限制库存
                    stockType : limitStore,
                },
            };
        },
        created () {

        },
        methods : {

            //团队产品默认无需证件
            isGroupChange ( val ) {
                if (val === 'true') {
                    this.formData.needId = 'noRequired';
                    this.formData.inNum = '1';
                } else {
                    this.formData.inNum = '';
                }
            },

            //表单校验
            formValidateFunc () {
                //校验游玩规则-产品园区列表数据
                if (this.productPlayRuleVo.length < 1) {
                    this.$Message.warning(this.$t('selectField',{ msg : this.$t('playPark') }));
                    return;
                }
                //校验产品有效性设置与游玩规则数据
                this.productPlayRuleVo.forEach(item => {
                    if (this.formData.productEffSet === 'since_the_play' && (item.effDay == '' || item.effDay == 0)) {
                        this.$Message.warning(this.$t('inputField', { feild : this.$t('AvailableNumberOfDays') }));
                        return;
                    }
                });
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {

                        let rule = [];
                        this.productPlayRuleVo.forEach((item,index) => {
                            let obj = defaultsDeep({},item);
                            if (item.saleType === 'one_ticket') {
                                obj.playPoint = [];
                            }
                            rule.push(obj);
                        });

                        let params = {
                            //产品
                            productJson : JSON.stringify({
                                auditStatus : this.formData.auditStatus || '',
                                code : this.formData.code || '',
                                productDes : this.formData.productDes || '',
                                id : this.formData.id || '',
                                inNum : this.formData.inNum || '',
                                isGroup : this.formData.isGroup || '',
                                printName : this.formData.printName || '',
                                printPrice : this.formData.printPrice || '',
                                printRemark : this.formData.printRemark || '',
                                printTpl : this.formData.printTpl || '',
                                productName : this.formData.productName || '',
                                productType : this.formData.productType || '',
                                standardPrice : this.formData.standardPrice || '',
                                thirdCode : this.formData.thirdCode || '',
                                ticketRemark : this.formData.ticketRemark || '',
                                productEffSet : this.formData.productEffSet || '',
                            }),
                            //销售
                            saleRuleJson : JSON.stringify({
                                acceptIdType : this.formData.acceptIdType.length > 0 ? this.formData.acceptIdType.join(',') : '',
                                id : this.formData.saleId || '',
                                idLimit : JSON.stringify({
                                    day : this.formData.limitByIdDay || '',
                                    quantity : this.formData.limitByIdNum || '',
                                }),
                                mobileLimit : JSON.stringify({
                                    day : this.formData.limitByMobileDay || '',
                                    quantity : this.formData.limitByMobileNum || '',
                                }),
                                minNum : this.formData.minNum || '',
                                maxNum : this.formData.maxNum || '',
                                needAllId : '',
                                needId : this.formData.needId || '',
                                productId : this.formData.productId || '',
                                stockNum : this.formData.stockNum || '',
                                stockType : this.formData.stockType || '',
                            }),
                            //游玩
                            playRuleJson : JSON.stringify(rule),
                        };
                        //区分新增与修改
                        if ( this.type === 'add' ) {
                            this.saveAndEditTicket( 'addProduct', params);
                        }
                        if ( this.type === 'modify' ) {
                            this.saveAndEditTicket( 'updateProduct', params);
                        }
                    }
                });
            },

            //新增/修改票类
            saveAndEditTicket ( url, params ) {
                ajax.post(url, params).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        this.$Message.success(this.$t('successTip',{ tip : this.$t(this.type) }));
                        this.goBack();
                    } else {
                        //区分新增与修改
                        this.$Message.error(res.message || this.$t('failureTip',{ tip : this.$t(this.type) }));
                    }
                });
            },

            //修改可游玩园区
            modify ( data, index ) {
                this.$refs.editPark.show({
                    index : index,
                    data : data,
                    parkList :  Array.from(this.parkList),
                    list : this.productPlayRuleVo,
                    title : this.$t('modify') + (data.saleType === 'one_ticket' ? this.$t('oneTicketPark') : this.$t('moreTicketPark')),
                    type : 'modify',
                    confirmCallback : ( data, index ) => {
                        this.$set(this.productPlayRuleVo, index, data);
                    }
                });
            },
            //删除可游玩园区
            del ( data, index ) {
                this.productPlayRuleVo.splice(index,1);

            },
            //新增可游玩园区
            addPark () {
                this.$refs.editPark.show({
                    title : this.$t('add') + this.$t('one_ticket'),
                    parkList : Array.from(this.parkList),
                    type : 'add',
                    list : this.productPlayRuleVo,
                    confirmCallback : ( data ) => {
                        this.productPlayRuleVo.push(data);
                        //this.dealParkList(data.parkId);
                    }
                });
            },
            //新增成功，可选园区数组数据-1
            dealParkList ( id ) {
                for (let i = 0,len = this.parkList.length; i < len; i++) {
                    if (id === this.parkList[i].id) {
                        this.parkList.splice(i,1);
                        i--;
                        len--;
                        continue;
                    }
                }
            },

            //返回
            goBack () {
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.$router.push({ name : 'ticketType' });
                }
                if ( this.type === 'modify' ) {
                    this.$router.back();
                }
            },

            /**
             * 动态给行添加类名 行数据有误时添加的背景颜色 - 暂不使用
             * @param row
             */
            rowClassName (row) {
                if (!row.row.check) {
                    return '';
                   /* return 'error-tr';*/
                }
            },

            /**
             * 获取路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.type = params.type;
                    if (params.info) {
                        this.initData(params.info);
                    }
                    if (params.productPlayRuleVo) {
                        this.productPlayRuleVo = defaultsDeep([],params.productPlayRuleVo);
                    }

                    if (this.formData.isGroup === 'true') {
                        this.formData.inNum = '1';
                    }
                }
                this.queryScenicOrgByAccountRole();
            },
            /**
             * 初始化数据
             * @param data
             */
            initData (data) {
                let formData = defaultsDeep({},data);
                formData.limitByIdDay = data.idLimit ? JSON.parse(data.idLimit).day : '';
                formData.limitByIdNum = data.idLimit ? JSON.parse(data.idLimit).quantity : '';
                formData.limitByMobileDay = data.mobileLimit ? JSON.parse(data.mobileLimit).day : '';
                formData.limitByMobileNum = data.mobileLimit ? JSON.parse(data.mobileLimit).quantity : '';
                formData.limitByMobileNum = data.mobileLimit ? JSON.parse(data.mobileLimit).quantity : '';
                formData.acceptIdType = data.acceptIdType ? data.acceptIdType.split(',') : '';
                formData.printPrice = data.printPrice ? String(data.printPrice) : '0';
                formData.standardPrice = data.standardPrice ? String(data.standardPrice) : '0';
                formData.id = data.id ? String(data.id) : '';
                formData.saleId = data.saleId ? String(data.saleId) : '';

                this.formData = defaultsDeep({},formData);
            },

            //查询权限下的园区
            queryScenicOrgByAccountRole () {
                ajax.post('queryScenicOrgByAccountRole', {
                    privCode : '"addProduct"',
                }).then(res => {
                    if (res.success) {
                        this.parkList = res.data || [];
                        this.parkListCount = res.data.length || 0;
                    } else {
                        this.parkList = [];
                        this.parkListCount = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            localeRouter () {
                return this.type === 'add' ? this.$t('addTicket') : this.$t('editDetail'); // 新增票类 ： 修改票类信息
            },
            //是否可以提交审核信息
            canApplyAuditProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
            //是否可以修改票类信息
            canModifyProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
        },
    };
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
                    min-width: 340px;
                    width: 49%;
                    text-align: left;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 340px;
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
                        width: calc(49% + 340px);
                        .ivu-form-item{
                            width: 100%;
                        }
                    }
                }

            }

            .red{
                color: $color_red;
            }

            /deep/ .error-tr{
                background: $color_EB6751_005;
            }

            .footer{
                text-align: center;

                /deep/ .ivu-btn{
                    min-width: 108px;
                    &:nth-child(1){
                        margin-right: 20px;
                    }
                }

            }

        }

    }

</style>
