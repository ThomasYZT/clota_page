<!--
内容：产品列表 - 销售政策列表 - 新建销售政策
作者：
日期：
-->

<template>
    <div class="edit-sale-policy">

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

                <div class="form-content">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('salePolicyName')" prop="salePolicyName"><!--销售政策名称-->
                            <Input v-model.trim="formData.salePolicyName"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('desc')" prop="desc"><!--描述-->
                            <Input v-model.trim="formData.desc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('policyValidity')" prop="scenePrice"><!--政策可售期-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.policyValidity"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('aheadDays')" prop="thirdProductNo"><!--提前天数(M)-->
                            <InputNumber :max="365"
                                         :min="0"
                                         v-model.trim="formData.thirdProductNo"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="split">{{$t('To')}}</span>
                            <InputNumber :max="365"
                                         :min="0"
                                         v-model.trim="formData.thirdProductNo"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="notice">{{$t('提前0天表示可售当日票，提前1天表示可售次日票，依次类推')}}</span>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('specifiedTime')" prop="ticketPrice"><!--指定起止日期-->
                            <DatePicker v-model="formData.ticketPrice"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        type="daterange"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        placement="bottom-end"
                                        style="width: 280px;">
                            </DatePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('specifiedDateSold')" prop="ticketPrice"><!--指定日期-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.playDeadline"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="blue">{{$t('toList')}}</span>
                            <span class="blue">{{$t('toDate')}}</span>
                            <br/>
                            <DatePicker v-model="formData.ticketPrice"
                                        :open="open"
                                        multiple
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        placement="bottom-end"
                                        style="width: 280px;">
                            </DatePicker>
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="dateListColumn"
                                :table-data="dateData"
                                :border="false">
                            </table-com>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('weekSold')" prop="ticketDesc"><!--每周可玩日期-->
                            <Button v-for="(item,index) in weekList"
                                    class="week-btn"
                                    :key="index"
                                    :type="formData.week.indexOf(item) > -1 ? 'primary' : 'ghost'"
                                    @click="triggerWeek(item)">
                                {{$t(item)}}
                                <i class="iconfont icon-selected" v-if="formData.week.indexOf(item) > -1"></i>
                            </Button>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleDayTime')" prop="thirdProductNo"><!--每日可售时间-->
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                            <span class="split">{{$t('To')}}</span>
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleTodayTime')" prop="thirdProductNo"><!--当日票可售时间-->
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                            <span class="split">{{$t('To')}}</span>
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                        </Form-item>
                    </div>
                </div>

                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('playDeadline')" prop="scenePrice"><!--游玩期限-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.playDeadline"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('specifiedTime')" prop="ticketPrice"><!--指定起止日期-->
                            <DatePicker v-model="formData.ticketPrice"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        type="daterange"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        placement="bottom-end"
                                        style="width: 280px;">
                            </DatePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('specifiedDateSold')" prop="ticketPrice"><!--指定日期-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.playDeadline"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="blue">{{$t('toList')}}</span>
                            <span class="blue">{{$t('toDate')}}</span>
                            <br/>
                            <DatePicker v-model="formData.ticketPrice"
                                        multiple
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        placement="bottom-end"
                                        style="width: 280px;">
                            </DatePicker>
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="dateListColumn"
                                :table-data="dateData"
                                :border="false">
                            </table-com>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('weekSold')" prop="ticketDesc"><!--每周可玩日期-->
                            <Button v-for="(item,index) in weekList"
                                    class="week-btn"
                                    :key="index"
                                    :type="formData.week.indexOf(item) > -1 ? 'primary' : 'ghost'"
                                    @click="triggerWeek(item)">
                                {{$t(item)}}
                                <i class="iconfont icon-selected" v-if="formData.week.indexOf(item) > -1"></i>
                            </Button>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('checkinTime')" prop="ticketDesc"><!--入园时间控制-->
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                            <span class="split">{{$t('To')}}</span>
                            <TimePicker format="HH:mm"
                                        :placeholder="$t('selectField', {msg: ''})"></TimePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('delayValidTime')" prop="ticketDesc"><!--下单后延迟生效-->
                            <InputNumber :max="60"
                                         :min="0"
                                         v-model.trim="formData.thirdProductNo"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="split">{{$t('minute')}}</span>
                        </Form-item>
                    </div>
                </div>

                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('productList')"><!--产品列表-->
                            <span class="blue" @click="addProduct">+ {{$t('addProduct')}}</span><!--新增产品-->
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="productColumn"
                                :table-data="productData"
                                :border="false">
                                <el-table-column
                                    slot="column4"
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
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleChannels')"><!--销售渠道-->
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="saleChannelColumn"
                                :table-data="saleChannelData"
                                :border="false"
                                :column-check="true"
                                @selection-change="changeSelection">
                            </table-com>
                        </Form-item>
                    </div>
                    <!--全民营销暂不显示-->
                    <div class="ivu-form-item-wrap single" v-if="false">
                        <Form-item :label="$t('allPeopleMarket')"><!--全民营销-->
                            <span class="blue" @click="addPark">+ {{$t('增加营销等级')}}</span><!--增加营销等级-->
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="marketingColumn"
                                :table-data="marketingData"
                                :show-pagination="true"
                                :total-count="total"
                                :page-no-d.sync="queryParams.pageNo"
                                :page-size-d.sync="queryParams.pageSize"
                                :border="false"
                                @query-data="queryList">
                                <el-table-column
                                    slot="column0"
                                    slot-scope="row"
                                    show-overflow-tooltip
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <Select v-if="scope.row.editable"
                                                v-model="scope.row.name"
                                                transfer
                                                :placeholder="$t('selectField', {msg: ''})">
                                            <Option v-for="(item,index) in enumData.orderInfo"
                                                    :key="index"
                                                    :value="item.value">
                                                {{$t(item.label)}}
                                            </Option>
                                        </Select>
                                        <span v-else>{{$t(scope.row.editable) | contentFilter}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column1"
                                    slot-scope="row"
                                    show-overflow-tooltip
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <Select v-if="scope.row.editable"
                                                v-model="scope.row.name"
                                                transfer
                                                :placeholder="$t('selectField', {msg: ''})">
                                            <Option v-for="(item,index) in enumData.orderInfo"
                                                    :key="index"
                                                    :value="item.value">
                                                {{$t(item.label)}}
                                            </Option>
                                        </Select>
                                        <span v-else>{{$t(scope.row.editable) | contentFilter}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column2"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <template v-if="scope.row.editable">
                                                <li class="normal" @click="modify(scope.row)">{{$t('save')}}</li><!--保存-->
                                                <li class="normal" @click="modify(scope.row)">{{$t('cancel')}}</li><!--取消-->
                                            </template>
                                            <template v-else>
                                                <li class="red-label" @click="del(scope.row)">{{$t('delete')}}</li><!--删除-->
                                            </template>
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                    </div>
                </div>

                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('returnRule')" prop="scenePrice"><!--退票规则-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.returnRule"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="blue" @click="addPark">+ {{$t('addReturnRateRule')}}</span><!--新增退票手续费率档位-->
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="refundColumn"
                                :table-data="refundData"
                                :border="false">
                                <el-table-column
                                    slot="column2"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal" @click="modify(scope.row)">{{$t('modify')}}</li><!--修改-->
                                            <li class="red-label" @click="del(scope.row)">{{$t('delete')}}</li><!--删除-->
                                            <li class="normal" @click="modify(scope.row)">{{$t('save')}}</li><!--保存-->
                                            <li class="normal" @click="modify(scope.row)">{{$t('cancel')}}</li><!--取消-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('alterRule')" prop="scenePrice"><!--改签规则-->
                            <Select v-model="formData.orderToCommitVisitorIdInfo"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.alterRule"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <div class="custom-row">
                                <span>{{$t('lastAlterDate')}}：{{$t('playDate')}}{{$t('before')}}</span>
                                <Input v-model.trim="formData.salePolicyName"
                                       class="short-input"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <span>{{$t('alterTimes')}}</span>
                                <Input v-model.trim="formData.salePolicyName"
                                       class="short-input"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </div>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('buyTicketNotes')" prop="productDesc"><!--购票须知-->
                            <Input v-model.trim="formData.productDesc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: $t('buyTicketNotes')})"/>
                        </Form-item>
                    </div>
                </div>

            </Form>

            <!--底部操作-->
            <div class="footer">
                <Button type="primary"
                        :loading="loading"
                        @click="formValidateFunc">
                    {{$t('save')}}
                </Button>
                <Button type="ghost"
                        @click="goBack">
                    {{$t("cancel")}}

                </Button>
            </div>

        </div>

        <!--添加/修改产品-->
        <edit-product ref="editProduct"></edit-product>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editProduct from './editProductModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import {productColumn, saleChannelColumn, marketingColumn, dateListColumn, refundColumn} from './editPolicyConfig';
    import { policyValidity, playDeadline, returnRule, alterRule } from '@/assets/js/constVariable';
    import {configVariable} from '@/assets/js/constVariable';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editProduct,
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
                //新增/修改 add/modify
                type: 'add',
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'marketingPolicy',   //  销售政策列表
                        router: 'marketingPolicy',
                    }
                ],
                loading: false,
                //week
                weekList: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //控制点选日期控件显示/隐藏
                open: false,
                //表单数据
                formData: {
                    salePolicyName: '',//销售政策名称
                    desc: '',//描述
                    week: ['Monday','Tuesday','Wednesday'],//每周可玩日期


                    //基本信息
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
                    salePolicyName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('productName')}), trigger: 'blur' },     // 不能为空
                        { type: 'string', max: 50, message: this.$t('errorMaxLength', {field: this.$t('salePolicyName'), length: 50}), trigger: 'blur' },      // 不能多于50个字符
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    desc: [
                        { type: 'string', max: 500, message: this.$t('errorMaxLength', {field: this.$t('desc'), length: 500}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
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
                    //政策可售期
                    policyValidity: policyValidity,
                    //游玩期限
                    playDeadline: playDeadline,
                    //退票规则
                    returnRule: returnRule,
                    //改签规则
                    alterRule: alterRule,
                },

                //产品列表及表头
                productColumn: productColumn,
                productData: [{}],

                //销售渠道列表及表头
                saleChannelColumn: saleChannelColumn,
                saleChannelData: [{}],
                selectedRow: [],

                //全民营销列表及表头
                marketingColumn: marketingColumn,
                marketingData: [
                    { editable: false },
                    { editable: true },
                ],
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                // 数据总条数
                total: 0,

                //日期清单视图列表及表头
                dateListColumn: dateListColumn,
                dateData: [ { year: '2018', month: '9', day: '7、8、10、14、20'}],

                //退票规则列表及表头
                refundColumn: refundColumn,
                refundData: [{}],

            }
        },
        created() {

        },
        methods: {

            //星期的选中/不选中
            triggerWeek ( val ) {
                if(this.formData.week.indexOf(val) > -1){
                    let index = this.formData.week.indexOf(val);
                    this.formData.week.splice(index, 1);
                }else{
                    this.formData.week.push(val);
                }
            },

            /**
             * 销售渠道勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedRow = selection;
            },

            //查询全民营销列表
            queryList() {

            },

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

            //新增产品，显示新增产品弹窗
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('add')+this.$t('product'),
                    type: 'add',
                    confirmCallback : ( data ) => {
                        //push to tableData
                        console.log(true)
//                        this.tableData.push(data);
                    }
                });
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
//                        this.tableData.push(data);
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
//                    if(params.info){
//                        this.formData = params.info;
//                    }
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
                return this.type === 'add' ? this.$t('addSalePolicy') : this.$t('modifySalePolicy');      // 新建销售政策 ： 修改销售政策
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-sale-policy {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .container{

            .ivu-form{
                padding: 10px 0 30px;
                text-align: center;
            }

            .blue{
                color: $color_blue;
                cursor: pointer;
            }

            .form-content{
                border-top: 1px dashed $color_979797_020;
                width: 1000px;
                margin: 0 auto;
                padding-top: 20px;

                &:first-child{
                    border-top: none;
                }

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

                        /deep/ .ivu-input-number{
                            width: 120px;
                            font-size: $font_size_14px;
                        }

                        /deep/ .ivu-date-picker{
                            font-size: $font_size_14px;
                            width: 120px;
                            display: inline-block;
                        }

                        /deep/ .ivu-select{
                            max-width: 395px;
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

                        .split{
                            margin: 0 10px;
                        }
                    }

                    &.single{
                        width: calc(49% + 455px);
                        padding: 0 24px 0 24px;
                        .ivu-form-item{
                            width: 100%;
                        }
                    }
                    /deep/ .ivu-btn{
                        width: 70px;
                        &.week-btn{
                            margin-right: 10px;
                            .iconfont{
                                font-size: $font_size_20px;
                                position: absolute;
                                bottom: 2px;
                            }
                        }
                    }

                    .notice{
                        font-size: $font_size_12px;
                        color: $color_999;
                        display: inline-block;
                        width: calc(100% - 300px);
                        line-height: 14px;
                        padding-left: 8px;
                    }

                    .custom-row{
                        padding-top: 10px;
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
