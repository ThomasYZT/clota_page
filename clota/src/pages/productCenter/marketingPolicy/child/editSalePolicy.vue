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
                        <Form-item :label="$t('salePolicyName')" prop="name"><!--销售政策名称-->
                            <Input v-model.trim="formData.name"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('desc')" prop="policyDesc"><!--描述-->
                            <Input v-model.trim="formData.policyDesc"
                                   type="textarea"
                                   :rows="3"
                                   :placeholder="$t('inputField', {msg: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('policyValidity')" prop="policyValidity"><!--政策可售期-->
                            <Select v-model="formData.saleRule.type"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.policyValidity"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <!--政策可售期 = 游玩日期前M天可售-->
                    <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'playBeforeSold'">
                        <Form-item :label="$t('aheadDays')"><!--提前天数(M)-->
                            <InputNumber :max="365"
                                         :min="0"
                                         v-model.trim="formData.saleRule.beforeDay"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="split">{{$t('To')}}</span>
                            <InputNumber :max="365"
                                         :min="0"
                                         v-model.trim="formData.saleRule.afterDay"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="notice">{{$t('aheadDaysNotice')}}</span>
                        </Form-item>
                    </div>
                    <!--政策可售期 = 指定期间可售-->
                    <template v-if="formData.saleRule.type === 'specifiedPeriodSold'">
                        <div class="ivu-form-item-wrap single">
                            <Form-item :label="$t('specifiedTime')"><!--指定起止日期-->
                                <DatePicker v-model="formData.saleRule.time"
                                            :placeholder="$t('selectField', {msg: ''})"
                                            format="yyyy-MM-dd"
                                            type="daterange"
                                            :clearable="false"
                                            :editable="false"
                                            transfer
                                            style="width: 280px;">
                                </DatePicker>
                            </Form-item>
                        </div>
                        <div class="ivu-form-item-wrap single">
                            <Form-item :label="$t('weekSold')"><!--每周可玩日期-->
                                <Button v-for="(item,index) in weekList"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.saleRule.weekSold.indexOf(item) > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek(item)">
                                    {{$t(item)}} <i class="iconfont icon-selected" v-if="formData.saleRule.weekSold.indexOf(item) > -1"></i>
                                </Button>
                            </Form-item>
                        </div>
                    </template>
                    <!--政策可售期 = 指定日期可售-->
                    <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'specifiedDateSold'">
                        <Form-item :label="$t('specifiedDateSold')"><!--指定日期-->
                            <Select v-model="formData.saleRule.dateType"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;">
                                <Option v-for="(item,index) in enumData.specialHoliday"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="blue" v-if="formData.saleRule.dateType === 'custom'">{{$t('toList')}}</span>
                            <span class="blue" v-else>{{$t('toDate')}}</span>
                            <br/>
                            <!--日历视图-->
                            <DatePicker v-model="formData.saleRule.specifiedTime"
                                        :open="false"
                                        multiple
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        :clearable="false"
                                        :editable="false"
                                        :disabled="formData.saleRule.dateType === 'custom' ? false : true"
                                        transfer
                                        style="width: 280px;">
                            </DatePicker>
                            <!--列表视图-->
                            <div class="date-table-wrap">
                                <table-com
                                    :table-com-min-height="260"
                                    :column-data="dateListColumn"
                                    :table-data="dateData"
                                    :border="false">
                                </table-com>
                            </div>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleDayTime')"><!--每日可售时间-->
                            <TimePicker format="HH:mm"
                                        v-model="formData.saleTime"
                                        type="timerange"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        style="width: 280px;"></TimePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleTodayTime')"><!--当日票可售时间-->
                            <TimePicker format="HH:mm"
                                        v-model="formData.todaySaleTime"
                                        type="timerange"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        style="width: 280px;"></TimePicker>
                        </Form-item>
                    </div>
                </div>

                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('playDeadline')"><!--游玩期限-->
                            <Select v-model="formData.playRule.type"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.playDeadline"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <!--游玩期限 = 指定期间可玩-->
                    <template v-if="formData.playRule.type === 'specifiedPeriodSold'">
                        <div class="ivu-form-item-wrap single">
                            <Form-item :label="$t('specifiedTime')"><!--指定起止日期-->
                                <DatePicker v-model="formData.playRule.time"
                                            :placeholder="$t('selectField', {msg: ''})"
                                            format="yyyy-MM-dd"
                                            type="daterange"
                                            :clearable="false"
                                            :editable="false"
                                            transfer
                                            style="width: 280px;">
                                </DatePicker>
                            </Form-item>
                        </div>
                        <div class="ivu-form-item-wrap single">
                            <Form-item :label="$t('weekSold')"><!--每周可玩日期-->
                                <Button v-for="(item,index) in weekList"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.playRule.weekSold.indexOf(item) > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek(item)">
                                    {{$t(item)}} <i class="iconfont icon-selected" v-if="formData.playRule.weekSold.indexOf(item) > -1"></i>
                                </Button>
                            </Form-item>
                        </div>
                    </template>
                    <!--游玩期限 = 指定日期可玩-->
                    <div class="ivu-form-item-wrap single" v-if="formData.playRule.type === 'specifiedDateSold'">
                        <Form-item :label="$t('specifiedDateSold')"><!--指定日期-->
                            <Select v-model="formData.playRule.dateType"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;">
                                <Option v-for="(item,index) in enumData.specialHoliday"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="blue" v-if="formData.playRule.dateType === 'custom'">{{$t('toList')}}</span>
                            <span class="blue" v-else>{{$t('toDate')}}</span>
                            <br/>
                            <!--日历视图-->
                            <DatePicker v-model="formData.playRule.specifiedTime"
                                        :open="false"
                                        multiple
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        :clearable="false"
                                        :editable="false"
                                        :disabled="formData.playRule.dateType === 'custom' ? false : true"
                                        transfer
                                        style="width: 280px;">
                            </DatePicker>
                            <!--列表视图-->
                            <div class="date-table-wrap">
                                <table-com
                                    :table-com-min-height="260"
                                    :column-data="dateListColumn"
                                    :table-data="dateData"
                                    :border="false">
                                </table-com>
                            </div>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('checkinTime')"><!--入园时间控制-->
                            <TimePicker format="HH:mm"
                                        v-model="formData.checkinTime"
                                        type="timerange"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        style="width: 280px;"></TimePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('delayValidTime')"><!--下单后延迟生效-->
                            <InputNumber :max="60"
                                         :min="0"
                                         v-model.trim="formData.delayValidTime"
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
                                :table-data="itemsData"
                                :border="false">
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        {{$t(scope.row.stockType)}}
                                    </template>
                                </el-table-column>
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
                                :table-data="saleChannelList"
                                :border="false"
                                :column-check="true"
                                @selection-change="changeSelection">
                            </table-com>
                        </Form-item>
                    </div>

                    <!--全民营销暂不显示-->
                    <div class="ivu-form-item-wrap single" v-if="false">
                        <Form-item :label="$t('allPeopleMarket')"><!--全民营销-->
                            <span class="blue">+ {{$t('addMarketLevel')}}</span><!--增加营销等级-->
                            <table-com
                                :ofsetHeight="120"
                                :table-com-min-height="260"
                                :column-data="marketingColumn"
                                :table-data="marketingData"
                                :show-pagination="true"
                                :total-count="total"
                                :page-no-d.sync="queryParams.pageNo"
                                :page-size-d.sync="queryParams.pageSize"
                                :border="false">
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
                        <Form-item :label="$t('returnRule')"><!--退票规则-->
                            <Select v-model="formData.returnRule.type"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.returnRule"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label,{msg: $t('return')})}}
                                </Option>
                            </Select>
                            <span class="blue"
                                  v-if="formData.returnRule.type!=='notAllow'"
                                  @click="addReturnRateRule">+ {{$t('addReturnRateRule')}}</span><!--新增退票手续费率档位-->
                            <template v-if="formData.returnRule.type!=='notAllow'">
                                <br/>
                                <table-com
                                    :ofsetHeight="120"
                                    :table-com-min-height="260"
                                    :column-data="refundColumn"
                                    :table-data="formData.returnRule.rules"
                                    :border="false">
                                    <el-table-column
                                        slot="column0"
                                        slot-scope="row"
                                        :label="row.title"
                                        :width="row.width"
                                        :min-width="row.minWidth"
                                        show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <span>{{$t('playDate')}}{{scope.row.befPlayStart == '0' ? $t('when') : $t('before')}}</span>
                                            <span v-if="scope.row.befPlayStart != '0'">{{scope.row.befPlayStart}}</span>
                                            <span>{{$t('day')}}</span>
                                            <span> ~ </span>
                                            <span>{{$t('playDate')}}{{scope.row.befPlayEnd == '0' ? $t('when') : $t('before')}}</span>
                                            <InputNumber :max="365"
                                                         :min="scope.row.befPlayStart ? Number(scope.row.befPlayStart) : 0"
                                                         class="short-input"
                                                         v-model.trim="scope.row.befPlayEnd"
                                                         :placeholder="$t('inputField', {field: ''})">
                                            </InputNumber>
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
                                            <InputNumber :max="365"
                                                         :min="0"
                                                         class="short-input"
                                                         v-model.trim="scope.row.procedureRates"
                                                         :placeholder="$t('inputField', {field: ''})">
                                            </InputNumber>
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
                                                <template v-if="scope.row.active">
                                                    <li class="normal" @click="modify(scope.row)">{{$t('save')}}</li><!--保存-->
                                                    <li class="normal" @click="modify(scope.row)">{{$t('cancel')}}</li><!--取消-->
                                                </template>
                                                <template v-else>
                                                    <li class="normal" @click="modify(scope.row)">{{$t('modify')}}</li><!--修改-->
                                                    <li class="red-label" v-if="scope.$index > 0" @click="del(scope.row)">{{$t('delete')}}</li><!--删除-->
                                                </template>
                                            </ul>
                                        </template>
                                    </el-table-column>
                                </table-com>
                            </template>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('alterRule')"><!--改签规则-->
                            <Select v-model="formData.alterRule.type"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.alterRule"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label,{msg: $t('alter')})}}
                                </Option>
                            </Select>
                            <div class="custom-row" v-if="formData.alterRule.type!=='notAllow'">
                                <span>{{$t('lastAlterDate')}}：{{$t('playDate')}}{{$t('before')}}</span>
                                <InputNumber :max="365"
                                             :min="0"
                                             class="short-input"
                                             v-model.trim="formData.alterRule.befPlayLatestDays"
                                             :placeholder="$t('inputField', {field: ''})">
                                </InputNumber>
                                <span>{{$t('alterTimes')}}</span>
                                <InputNumber :max="9999999999"
                                             :min="0"
                                             class="short-input"
                                             v-model.trim="formData.alterRule.alterNum"
                                             :placeholder="$t('inputField', {field: ''})">
                                </InputNumber>
                            </div>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('buyTicketNotes')" prop="buyTicketNotes"><!--购票须知-->
                            <Input v-model.trim="formData.buyTicketNotes"
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
        <edit-product-modal ref="editProduct" :list="productList"></edit-product-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editProductModal from './editProductModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import {productColumn, selectSaleChannelColumn, marketingColumn, dateListColumn, refundColumn} from './editPolicyConfig';
    import { policyValidity, playDeadline, returnRule, alterRule, specialHoliday } from '@/assets/js/constVariable';
    import {configVariable} from '@/assets/js/constVariable';
    import ajax from '@/api/index';
    import {mapGetters} from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editProductModal,
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
                    productType: 'ticket',//业态类型 ticket-票类，repast-餐饮，hotel-酒店，ticket_package-套票
                    name: '销售政策名称',//销售政策名称
                    policyDesc: '描述',//描述
                    saleTime: ['00:00','23:59'],//每日可售开始时间 saleStartTime - 每日可售结束时间 saleEndTime
                    saleStartTime: '00:00', //每日可售开始时间；格式：mm:ss
                    saleEndTime: '23:59', //每日可售结束时间；格式：mm:ss
                    todaySaleTime: ['00:00','23:59'],//当日票可售开始时间 todaySaleStartTime - 当日票可售结束时间 todaySaleEndTime
                    todaySaleStartTime: '00:00',//当日票可售开始时间；格式：mm:ss
                    todaySaleEndTime: '23:59',//当日票可售结束时间；格式：mm:ss
                    checkinTime: ['00:00','23:59'],//入园时间范围；格式：mm:ss-mm:ss
                    delayValidTime: 0,//下单延迟生效时间（分钟）
                    buyTicketNotes: '购票须知',//购票须知
                    //销售规则
                    saleRule: {
                        "type": "playBeforeSold",//期限类型（游玩日期前M天可售-playBeforeSold，指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay": 1,//提前天数前
                        "afterDay": 365,//提前天数后
                        "time":  ['2018-10-12','2018-10-18'],//开始时间startTime-结束时间endTime
                        "dateType": 'custom',//日期类型
                        "startTime": "2018-10-12",//开始时间
                        "endTime": "2018-10-18",//结束时间
//                        "weekSold": ['Monday','Tuesday','Wednesday','Thursday','Friday'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "weekSold": '1,2,3,4,5',//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime": ['2018-10-12','2018-10-18']//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //游玩规则
                    playRule: {
                        "type": "specifiedPeriodSold",//期限类型（指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay": '',//提前天数前
                        "afterDay": '',//提前天数后
                        "time":  ['2018-10-12','2018-10-18'],//开始时间startTime-结束时间endTime
                        "dateType": 'custom',//日期类型
                        "startTime": "2018-10-12",//开始时间
                        "endTime": "2018-10-18",//结束时间
//                        "weekSold": ['Monday','Tuesday','Wednesday','Thursday','Friday'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "weekSold": '1,2,3,4,5',//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime": ['2018-10-12','2018-10-18']//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //退票规则
                    returnRule: {
                        "type": "notAllow",//退票类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit ）
                        //{"befPlayStart": "",//游玩日期前起始天（0代表当天）"befPlayEnd": "",//游玩日期前截止天（0代表当天）"procedureRates": ""//手续费率}
                        "rules": [
                            {
                                befPlayStart: 0,
                                befPlayEnd: 1,
                                procedureRates: 0.5,
                                active: false,
                            },
                            {
                                befPlayStart: 2,
                                befPlayEnd: 3,
                                procedureRates: 0,
                                active: true,
                            },
                            {
                                befPlayStart: 4,
                                befPlayEnd: 6,
                                procedureRates: 0.5,
                            },
                        ]
                    },
                    //改签规则
                    alterRule: {
                        "type": "notAllow",//改签类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit）
                        "befPlayLatestDays": 10,//最晚改签日期（游玩日期前N天）
                        "alterNum": 1//可改签次数
                    },
                    //销售渠道组ID，多个逗号分隔
                    groupIds: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('productName')}), trigger: 'blur' },     // 不能为空
                        { type: 'string', max: 50, message: this.$t('errorMaxLength', {field: this.$t('salePolicyName'), length: 50}), trigger: 'blur' },      // 不能多于50个字符
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    policyDesc: [
                        { type: 'string', max: 500, message: this.$t('errorMaxLength', {field: this.$t('desc'), length: 500}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    buyTicketNotes: [
                        { type: 'string', max: 100, message: this.$t('errorMaxLength', {field: this.$t('ticketDesc'), length: 100}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
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
                    //指定日期-节假日
                    specialHoliday: specialHoliday,
                },

                //产品列表及表头
                productColumn: productColumn,
                itemsData: [
                    {
                        productId:"1040508701972238336",
                        productName: "xt测试产品2111111",
                        settlePrice: "500",
                        standardPrice: "101",
                        stockNum: "100",
                        stockType: "is_no_limit",
                        itemRule: [
                            {
                                orgId:"1037976274619994113",
                                parkName:"奇趣乐园修改2323",
                                subPrice:10,
                            },
                            {
                                orgId:"1037976274619994113",
                                parkName:"奇趣乐园修改2323",
                                subPrice:100,
                            }
                        ]
                    }
                ],

                //销售渠道列表及表头
                saleChannelColumn: selectSaleChannelColumn,
                saleChannelList: [],
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

                //产品列表--用于新增产品弹窗
                productList: [],

            }
        },
        created() {
            //查询票类产品列表
            this.queryProductPage();
            //查询销售渠道组
            this.queryOrgGroupVoList();
            //获取有效的假期数据
            this.getNormalHolidaysData();
        },
        methods: {

            //查询票类产品列表
            queryProductPage() {
                ajax.post('queryProductPage',{
                    pageNo: 1,
                    pageSize: 99999,
                    auditStatus: 'enabled',
                }).then(res => {
                    if(res.success){
                        this.productList = res.data.data || [];
                    } else {
                        this.productList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //获取有效的假期数据
            getNormalHolidaysData () {
                ajax.post('getNormalHolidaysData',{}).then(res => {
                    if(res.success){
                        if(res.data && res.data.length > 0){
                            this.$set(this.enumData, 'specialHoliday', this.enumData.specialHoliday.concat(res.data));
                        }
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //查询销售渠道组列表
            queryOrgGroupVoList () {
                ajax.post('queryOrgGroupVoList',{
                    groupType: 'sale',
                }).then(res => {
                    if(res.success){
                        this.saleChannelList = res.data || [];
                    } else {
                        this.saleChannelList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            /**
             * 销售渠道勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedRow = selection;
            },

            //星期的选中/不选中
            triggerWeek ( val ) {
                if(this.formData.week.indexOf(val) > -1){
                    let index = this.formData.week.indexOf(val);
                    this.formData.week.splice(index, 1);
                }else{
                    this.formData.week.push(val);
                }
            },

            //新增产品，显示新增产品弹窗
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('add')+this.$t('product'),
                    type: 'add',
                    confirmCallback : ( data ) => {
                        console.log(data)
                        this.itemsData.push(data);
                    }
                });
            },
            //修改产品
            modify ( data, index ) {
                this.$refs.editPark.show({
                    data: data,
                    title : this.$t('modify')+this.$t('product'),
                    type: 'modify',
                    confirmCallback : ( data ) => {
                        console.log(data)
                        console.log(index)
                        this.$set(this.itemsData, index, data);
                    }
                });
            },
            //删除产品
            del ( data, index ) {
                this.itemsData.splice(index,1);
            },

            //新增退票手续费率档位
            addReturnRateRule () {

            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ){
                        let params = defaultsDeep({}, this.formData);
                        params.groupIds = this.selectedRow.map( item => { return item.id}).join(',');
                        params.itemsData = JSON.stringify(defaultsDeep([], this.itemsData));
                        params.saleRule = JSON.stringify(this.formData.saleRule);
                        params.playRule = JSON.stringify(this.formData.playRule);
                        params.returnRule = JSON.stringify(this.formData.returnRule);
                        params.alterRule = JSON.stringify(this.formData.alterRule);
                        params.saleStartTime = this.formData.saleTime[0];
                        params.saleEndTime = this.formData.saleTime[1];
                        params.todaySaleStartTime = this.formData.todaySaleTime[0];
                        params.todaySaleEndTime = this.formData.todaySaleTime[1];
                        params.checkinTime = this.formData.checkinTime.join('~');
                        delete params.saleTime;
                        delete params.todaySaleTime;
                        console.log(params);

                        //区分新增与修改
                        if( this.type === 'add' ){
                            this.saveAndEditPolicy( 'addPolicy', params);
                        }
                        if( this.type === 'modify' ){
                            this.saveAndEditPolicy( 'modifyPolicy', params);
                        }
                    }
                })
            },
            //新增/修改销售政策
            saveAndEditPolicy( url, params ){
                ajax.post(url, params).then(res => {
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

            //返回
            goBack() {
                //区分新增与修改
                if( this.type === 'add' ){
                    this.$router.push({ name: 'marketingPolicy'});
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
                    if(params.productType){
                        this.formData.productType = params.productType;
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
                return this.type === 'add' ? this.$t('addSalePolicy') : this.$t('modifySalePolicy');      // 新建销售政策 ： 修改销售政策
            },
            ...mapGetters({
                manageOrgs: 'manageOrgs',
            }),
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
                        font-size: $font_size_14px;
                        color: $color_999;
                        display: inline-block;
                        width: calc(100% - 300px);
                        line-height: 14px;
                        padding-left: 8px;
                    }

                    .custom-row{
                        padding-top: 10px;
                    }

                    .date-table-wrap{
                        width: 500px;
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
