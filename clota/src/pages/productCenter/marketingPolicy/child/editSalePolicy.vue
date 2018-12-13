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
                        <Form-item :label="$t('policyValidity')" prop="specifiedSaleDateSold"><!--政策可售期-->
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
                    <!--政策可售期 == 游玩日期前N天可售-->
                    <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'playBeforeSold'">
                        <Form-item :label="$t('aheadDays')"><!--提前天数(M)-->
                            <InputNumber :max="365"
                                         :min="0"
                                         v-model.trim="formData.saleRule.beforeDay"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="split">{{$t('To')}}</span>
                            <InputNumber :max="365"
                                         :min="formData.saleRule.beforeDay || 0"
                                         v-model.trim="formData.saleRule.afterDay"
                                         :placeholder="$t('inputField', {field: ''})">
                            </InputNumber>
                            <span class="notice">{{$t('aheadDaysNotice')}}</span>
                        </Form-item>
                    </div>
                    <!--政策可售期 == 指定期间可售-->
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
                                        v-if="index!==0"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.saleRule.weekSold.indexOf(index+'') > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek( index, 'saleRule')">
                                    {{$t(item)}} <i class="iconfont icon-selected" v-if="formData.saleRule.weekSold.indexOf(index+'') > -1"></i>
                                </Button>
                            </Form-item>
                        </div>
                    </template>
                    <!--政策可售期 = 指定日期可售-->
                    <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'specifiedDateSold'">
                        <Form-item :label="$t('specifiedDateSold')"><!--指定日期-->
                            <Select v-model="formData.saleRule.dateType"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeSelectForSale"
                                    style="display: inline-block;">
                                <Option v-for="(item,index) in enumData.specialHoliday"
                                        :key="index"
                                        :value="item.id">
                                    {{$t(item.holidayName)}}
                                </Option>
                            </Select>
                            <!--<br/>-->
                            <!--日历视图-->
                            <DatePicker
                                v-model="formData.saleRule.specifiedTime"
                                multiple
                                format="yyyy-MM-dd"
                                type="date"
                                :placeholder="$t('selectField', {msg: ''})"
                                :disabled="formData.saleRule.dateType === 'custom' ? false : true"
                                transfer
                                :clearable="false"
                                :editable="false"
                                :confirm="false"
                                @on-change="changeSaleSelectTime"
                                style="width: 230px;margin-left: 15px;">
                            </DatePicker>
                            <span class="blue" v-if="showSaleDatePicker" @click="showDateType('showSaleDatePicker', false)">{{$t('toList')}}</span>
                            <span class="blue" v-else @click="showDateType('showSaleDatePicker', true)">{{$t('toDate')}}</span>
                            <!--列表视图-->
                            <div class="date-table-wrap" v-if="!showSaleDatePicker">
                                <table-com
                                    :table-com-min-height="260"
                                    :column-data="dateListColumn"
                                    :table-data="saleDate"
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
                    <div class="ivu-form-item-wrap single" v-if="formData.saleRule.beforeDay == 0 || formData.saleRule.afterDay == 0">
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
                        <Form-item :label="$t('playDeadline')" prop="specifiedPlayDateSold"><!--游玩期限-->
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
                            <Form-item :label="$t('weekPlay')"><!--每周可玩日期-->
                                <Button v-for="(item,index) in weekList"
                                        v-if="index!==0"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.playRule.weekSold.indexOf(index+'') > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek(index, 'playRule')">
                                    {{$t(item)}} <i class="iconfont icon-selected" v-if="formData.playRule.weekSold.indexOf(index+'') > -1"></i>
                                </Button>
                            </Form-item>
                        </div>
                    </template>
                    <!--游玩期限 = 自定义可玩日期-->
                    <div class="ivu-form-item-wrap single" v-if="formData.playRule.type === 'specifiedDateSold'">
                        <Form-item :label="$t('specifiedDateSold')"><!--指定日期-->
                            <Select v-model="formData.playRule.dateType"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeSelectForPlay"
                                    style="display: inline-block;">
                                <Option v-for="(item,index) in enumData.specialHoliday"
                                        :key="index"
                                        :value="item.id">
                                    {{$t(item.holidayName)}}
                                </Option>
                            </Select>
                            <!--<br/>-->
                            <!--日历视图-->
                            <DatePicker
                                v-if="showPlayDatePicker"
                                v-model="formData.playRule.specifiedTime"
                                multiple
                                format="yyyy-MM-dd"
                                type="date"
                                :placeholder="$t('selectField', {msg: ''})"
                                :disabled="formData.playRule.dateType === 'custom' ? false : true"
                                transfer
                                :clearable="false"
                                :editable="false"
                                @on-change="changePlaySelectTime"
                                style="width: 230px;margin-left: 15px;">
                            </DatePicker>
                            <span class="blue" v-if="showPlayDatePicker" @click="showDateType('showPlayDatePicker', false)">{{$t('toList')}}</span>
                            <span class="blue" v-else @click="showDateType('showPlayDatePicker', true)">{{$t('toDate')}}</span>
                            <!--列表视图-->
                            <div class="date-table-wrap" v-if="!showPlayDatePicker">
                                <table-com
                                    auto-height
                                    :table-com-min-height="260"
                                    :column-data="dateListColumn"
                                    :table-data="playDate"
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
                        <Form-item :label="$t('delayValidTime')"><!--下单后延迟生效 48小时内-->
                            <InputNumber :max="2880"
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
                            <span class="blue"
                                  v-if="itemsData.length < productListCount"
                                  @click="addProduct">+ {{$t('appendProduct')}}</span><!--新增产品-->
                            <table-com
                                auto-height
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
                                            <li class="normal" @click="modify(scope.row,scope.$index)">{{$t('modify')}}</li><!--修改-->
                                            <li class="red-label" @click="del(scope.row,scope.$index)">{{$t('delete')}}</li><!--删除-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('saleChannels')"><!--销售渠道-->
                            <table-com
                                ref="channelMultiTablePlug"
                                auto-height
                                :table-com-min-height="260"
                                :column-data="saleChannelColumn"
                                :table-data="saleChannelList"
                                :border="false"
                                :column-check="true"
                                @selection-change="changeSelection">
                                <el-table-column
                                    slot="column1"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-for="(item, index) in scope.row.channelModels"
                                              class="channel"
                                              :class="{disable: item.status !== 'valid'}"
                                              :key="index">
                                            {{item.channelName}}
                                            <span class="disable" v-if="item.status !== 'valid'">({{$t('unStarting')}})</span>
                                        </span>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                    </div>

                    <!--全民营销-->
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('allPeopleMarket')"><!--全民营销-->
                            <span @click="addMarketLevel" class="blue">+ {{$t('addNewMarketingType')}}</span><!--增加营销等级-->
                            <table-com
                                auto-height
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
                                                v-model="scope.row.typeId"
                                                label-in-value
                                                transfer
                                                :placeholder="$t('selectField', {msg: ''})"
                                                @on-change="marketingTypeChange($event, scope.row)">
                                            <Option v-for="(item,index) in marketingTypeList"
                                                    :key="index"
                                                    :value="item.value">
                                                {{$t(item.label)}}
                                            </Option>
                                        </Select>
                                        <span v-else>{{$t(scope.row.typeName) | contentFilter}}</span>
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
                                                v-model="scope.row.levelId"
                                                label-in-value
                                                transfer
                                                :placeholder="$t('selectField', {msg: ''})"
                                                @on-change="marketingLevelChange($event, scope.row)">
                                            <Option v-for="(item,index) in marketingLevelList"
                                                    :key="index"
                                                    :value="item.value">
                                                {{$t(item.label)}}
                                            </Option>
                                        </Select>
                                        <span v-else>{{$t(scope.row.levelName) | contentFilter}}</span>
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
                                                <li class="normal" @click="saveMarketingData(scope.row)">{{$t('save')}}</li><!--保存-->
                                                <li class="normal" @click="cancelMarketingData(scope.row)">{{$t('cancel')}}</li><!--取消-->
                                            </template>
                                            <template v-else>
                                                <li class="red-label" @click="delMarketingData(scope.row)">{{$t('delete')}}</li><!--删除-->
                                            </template>
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </Form-item>
                        <span class="marketing-tip">{{$t('productCenter.addPolicyMarketingTip')}}</span>
                    </div>
                </div>

                <div class="form-content">
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('returnRule')"><!--退票规则-->
                            <div style="position: relative;">
                                <Select v-model="formData.returnRule.type"
                                        :placeholder="$t('selectField', {msg: ''})">
                                    <Option v-for="(item,index) in enumData.returnRule"
                                            :key="index"
                                            :value="item.value">
                                        {{$t(item.label,{msg: $t('return')})}}
                                </Option>
                                </Select>
                                <span class="blue add-rate"
                                      v-if="formData.returnRule.type!=='notAllow'"
                                      @click="addReturnRateRule"><span>+</span> {{$t('addReturnRateRule')}}</span><!--新增退票手续费率档位-->
                            </div>
                            <template v-if="formData.returnRule.type!=='notAllow'">
                                <!--<br/>-->
                                <table-com
                                    auto-height
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
                                            <span>{{$t('playDate')}} {{scope.row.befPlayStart == '0' ? $t('when') : $t('before')}}</span>
                                            <span v-if="scope.row.befPlayStart != '0'">{{scope.row.befPlayStart}}</span>
                                            <span>{{$t('day')}}</span>
                                            <span> ~ </span>
                                            <span>{{$t('playDate')}}{{scope.row.befPlayEnd == '0' ? $t('when') : $t('before')}}</span>
                                            <template v-if="scope.row.active">
                                                <InputNumber :max="9999999999"
                                                             :min="scope.row.befPlayStart ? Number(scope.row.befPlayStart) : 0"
                                                             class="short-input"
                                                             :editable="false"
                                                             v-model.trim="scope.row.befPlayEnd"
                                                             :placeholder="$t('inputField', {field: ''})" @on-blur="changeNextStart(scope.row.befPlayEnd, scope.$index)">
                                                </InputNumber>
                                            </template>
                                            <template v-else>
                                                {{scope.row.befPlayEnd | contentFilter}}
                                            </template>
                                            <span>{{$t('day')}}</span>
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
                                            <template v-if="scope.row.active">
                                                <InputNumber :max="1"
                                                             :min="0"
                                                             :step="0.01"
                                                             class="short-input"
                                                             v-model.trim="scope.row.procedureRates"
                                                             :placeholder="$t('inputField', {field: ''})">
                                                </InputNumber>
                                            </template>
                                            <template v-else>
                                                {{scope.row.procedureRates | contentFilter}}
                                            </template>
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
                                                    <li class="normal" @click="saveReturnItem(scope.row, scope.$index)">{{$t('save')}}</li><!--保存-->
                                                    <li class="normal" @click="cancelReturnItem(scope.row,scope.$index)">{{$t('cancel')}}</li><!--取消-->
                                                </template>
                                                <template v-else>
                                                    <li class="normal" @click="modifyReturnItem(scope.row,scope.$index)">{{$t('modify')}}</li><!--修改-->
                                                    <li class="red-label" v-if="scope.$index > 0" @click="delReturnItem(scope.row,scope.$index)">{{$t('delete')}}</li><!--删除-->
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
                                <InputNumber :max="9999999999"
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
                                   :placeholder="$t('inputField', {field: $t('buyTicketNotes')})+'，'+$t('noMax',{length: 1000})"/>
                        </Form-item>
                    </div>
                </div>

            </Form>

            <!--底部操作-->
            <div class="footer">
                <Button type="primary"
                        :loading="loading"
                        @click="formValidateFunc">
                    {{$t('commitCheck')}}
                </Button>
                <Button type="ghost"
                        @click="goBack">
                    {{$t("cancel")}}

                </Button>
            </div>

        </div>

        <!--添加/修改产品-->
        <edit-product-modal ref="editProduct"></edit-product-modal>

        <auditConfirmModal ref="auditConfirmModal"></auditConfirmModal>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editProductModal from './editProductModal.vue';
    import auditConfirmModal from '../components/auditConfirmModal';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import { productColumn, selectSaleChannelColumn, marketingColumn, dateListColumn, refundColumn } from './editPolicyConfig';
    import { policyValidity, playDeadline, returnRule, alterRule, specialHoliday, configVariable } from '@/assets/js/constVariable';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editProductModal,
            auditConfirmModal
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

            //校验售票规则的指定日期
            const validateSaleData = (rule,value,callback) => {
                if (this.formData.saleRule.type === 'playBeforeSold' && !(common.isNotEmpty(this.formData.saleRule.beforeDay) && common.isNotEmpty(this.formData.saleRule.afterDay))) {
                    callback(this.$t('inputField',{ field : this.$t('aheadDays') }));
                } else if (this.formData.saleRule.type === 'specifiedPeriodSold') {
                    if (!(this.formData.saleRule.time[0] && this.formData.saleRule.time[1])) {
                        callback(this.$t('selectField',{ msg : this.$t('specifiedTime') }));
                    } else if (this.formData.saleRule.weekSold.length < 1) {
                        callback(this.$t('selectField',{ msg : this.$t('weekSold') }));
                    } else {
                        callback();
                    }
                } else if (this.formData.saleRule.type === 'specifiedDateSold' && this.formData.saleRule.specifiedTime.length < 1) {
                    callback(this.$t('selectField',{ msg : this.$t('specifiedDateSold') }));
                } else {
                    callback();
                }
            };

            //校验游玩规则的指定日期
            const validatePlayData = (rule,value,callback) => {
                if (this.formData.playRule.type === 'specifiedPeriodSold') {
                    if (!(this.formData.playRule.time[0] && this.formData.playRule.time[1])) {
                        callback(this.$t('selectField',{ msg : this.$t('specifiedTime') }));
                    } else if (this.formData.playRule.weekSold.length < 1) {
                        callback(this.$t('selectField',{ msg : this.$t('weekPlay') }));
                    } else {
                        callback();
                    }
                } else if (this.formData.playRule.type === 'specifiedDateSold' && this.formData.playRule.specifiedTime.length < 1) {
                    callback(this.$t('selectField',{ msg : this.$t('specifiedDateSold') }));
                } else {
                    callback();
                }
            };

            return {
                //新增/修改 add/modify
                type : 'add',
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'marketingPolicy', //  销售政策列表
                        router : {
                            name : 'marketingPolicy'
                        },
                    }
                ],
                loading : false,
                //week
                weekList : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //控制点选日期控件显示/隐藏
                open : true,
                //表单数据
                formData : {
                    id : '',//政策id
                    productType : 'ticket',//业态类型 ticket-票类，repast-餐饮，hotel-酒店，ticket_package-套票
                    name : '',//销售政策名称
                    policyDesc : '',//描述
                    saleTime : ['00:00','23:59'],//每日可售开始时间 saleStartTime - 每日可售结束时间 saleEndTime
                    saleStartTime : '00:00', //每日可售开始时间；格式：mm:ss
                    saleEndTime : '23:59', //每日可售结束时间；格式：mm:ss
                    todaySaleTime : ['00:00','23:59'],//当日票可售开始时间 todaySaleStartTime - 当日票可售结束时间 todaySaleEndTime
                    todaySaleStartTime : '00:00',//当日票可售开始时间；格式：mm:ss
                    todaySaleEndTime : '23:59',//当日票可售结束时间；格式：mm:ss
                    checkinTime : ['00:00','23:59'],//入园时间范围；格式：mm:ss-mm:ss
                    delayValidTime : 0,//下单延迟生效时间（分钟）
                    buyTicketNotes : '',//购票须知
                    //销售规则
                    saleRule : {
                        "type" : "playBeforeSold",//期限类型（游玩日期前M天可售-playBeforeSold，指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay" : 0,//提前天数前
                        "afterDay" : 365,//提前天数后
                        "time" : [new Date(),new Date().addDays(7)],//开始时间startTime-结束时间endTime
                        "dateType" : 'custom',//日期类型
                        "startTime" : "",//开始时间
                        "endTime" : "",//结束时间
                        "weekSold" : ['1','2','3','4','5'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime" : []//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //游玩规则
                    playRule : {
                        "type" : "specifiedPeriodSold",//期限类型（指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay" : '',//提前天数前
                        "afterDay" : '',//提前天数后
                        "time" : [new Date(),new Date().addDays(7)],//开始时间startTime-结束时间endTime
                        "dateType" : 'custom',//日期类型
                        "startTime" : "",//开始时间
                        "endTime" : "",//结束时间
                        "weekSold" : ['1','2','3','4','5'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime" : []//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //退票规则
                    returnRule : {
                        "type" : "notAllow",//退票类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit ）
                        //{"befPlayStart": "",//游玩日期前起始天（0代表当天）"befPlayEnd": "",//游玩日期前截止天（0代表当天）"procedureRates": ""//手续费率}
                        "rules" : []
                    },
                    //改签规则
                    alterRule : {
                        "type" : "notAllow",//改签类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit）
                        "befPlayLatestDays" : 10,//最晚改签日期（游玩日期前N天）
                        "alterNum" : 1//可改签次数
                    },
                    //销售渠道组ID，多个逗号分隔
                    groupIds : '',
                    //全民营销
                    marketSaleData : [],
                },
                ruleValidate : {
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('productName') }), trigger : 'blur' }, // 不能为空
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('salePolicyName'), length : 50 }), trigger : 'blur' }, // 不能多于50个字符
                        { validator : validateMethod.emoji, trigger : 'blur' }
                    ],
                    policyDesc : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('desc'), length : 500 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    specifiedSaleDateSold : [
                        { validator : validateSaleData, trigger : 'change' },
                    ],
                    specifiedPlayDateSold : [
                        { validator : validatePlayData, trigger : 'change' },
                    ],
                    buyTicketNotes : [
                        { type : 'string', max : 1000, message : this.$t('errorMaxLength', { field : this.$t('ticketDesc'), length : 1000 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                },
                //枚举数据
                enumData : {
                    //政策可售期
                    policyValidity : policyValidity,
                    //游玩期限
                    playDeadline : playDeadline,
                    //退票规则
                    returnRule : returnRule,
                    //改签规则
                    alterRule : alterRule,
                    //指定日期-节假日
                    specialHoliday : specialHoliday,
                },

                //产品列表及表头
                productColumn : productColumn,
                itemsData : [],
                //产品列表--用于新增产品弹窗
                productList : [],
                productListCount : 0,

                //销售渠道列表及表头
                saleChannelColumn : selectSaleChannelColumn,
                saleChannelList : [],
                selectedRow : [],

                //全民营销列表及表头
                marketingColumn : marketingColumn,
                marketingData : [],
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                // 数据总条数
                total : 0,

                //日期清单视图列表及表头
                dateListColumn : dateListColumn,
                saleDate : [],
                playDate : [],

                //退票规则列表及表头
                refundColumn : refundColumn,
                //分销id
                allocationId : '',
                //暂存退票修改数据
                returnItem : {},

                //显示/隐藏日历控件--默认日历显示
                showSaleDatePicker : true,
                showPlayDatePicker : true,

                //全民营销类别、等级
                marketingTypeList : [],
                marketingLevelList : [],
            };
        },
        created () {
            //查询票类产品列表
            this.queryProductPage();
            //获取有效的假期数据
            this.getNormalHolidaysData();
        },
        methods : {

            //查询票类产品列表
            queryProductPage () {
                ajax.post('queryProductPage',{
                    pageNo : 1,
                    pageSize : 99999,
                    auditStatus : 'enabled',
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data.data || [];
                        this.productListCount = res.data.data.length || 0;
                    } else {
                        this.productList = [];
                        this.productListCount = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //获取有效的假期数据
            getNormalHolidaysData () {
                ajax.post('getNormalHolidaysData',{}).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            this.$set(this.enumData, 'specialHoliday', this.enumData.specialHoliday.concat(res.data));
                        }
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //售票规则指定日期改变
            changeSelectForSale ( val ) {
                if (val && val !== 'custom') {
                    let holiday = this.enumData.specialHoliday.find( item => val === item.id );
                    if (holiday && holiday.rangeDates) {
                        this.formData.saleRule.specifiedTime = holiday.rangeDates.split(',');
                    }
                } else {
                    this.formData.saleRule.specifiedTime = [];
                }
            },

            //游玩规则指定日期改变
            changeSelectForPlay ( val ) {
                if (val && val !== 'custom') {
                    let holiday = this.enumData.specialHoliday.find( item => val === item.id );
                    if (holiday && holiday.rangeDates) {
                        this.formData.playRule.specifiedTime = holiday.rangeDates.split(',');
                    }
                } else {
                    this.formData.playRule.specifiedTime = [];
                }
            },

            //查询销售渠道组列表
            queryOrgGroupVoList () {
                ajax.post('queryOrgGroupVoList',{
                    groupType : 'sale',
                }).then(res => {
                    if (res.success) {
                        this.saleChannelList = res.data || [];
                        setTimeout( () => {
                            if (this.saleChannelList.length > 0) {
                                this.saleChannelList.forEach( (item, index) => {
                                    if (this.formData.groupIds.indexOf(item.id) > -1) {
                                        if (this.$refs.channelMultiTablePlug) {
                                            this.$refs.channelMultiTablePlug.toggleRowSelection(this.saleChannelList[index], true);
                                        }
                                    }
                                });
                            }
                        },300);
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
            changeSelection (selection) {
                this.selectedRow = selection;
            },

            //星期的选中/不选中
            triggerWeek ( i, key ) {
                if (this.formData[key].weekSold.indexOf(i + '') > -1) {
                    let index = this.formData[key].weekSold.indexOf(i + '');
                    this.formData[key].weekSold.splice(index, 1);
                } else {
                    this.formData[key].weekSold.push(i + '');
                }
            },

            //SaleRule 指定日期可售
            changeSaleSelectTime ( val ) {
                if (val && this.formData.saleRule.dateType && this.formData.saleRule.dateType !== 'custom') {
                    let holiday = this.enumData.specialHoliday.find( item => this.formData.saleRule.dateType === item.id );
                    if (val != holiday.rangeDates) {
                        this.formData.saleRule.dateType = 'custom';
                    }
                }
                this.getDateList(val,'saleDate');
                this.$refs.formValidate.validateField('specifiedSaleDateSold');
            },

            //PlayRule 指定日期可玩
            changePlaySelectTime ( val ) {
                if (val && this.formData.playRule.dateType && this.formData.playRule.dateType !== 'custom') {
                    let holiday = this.enumData.specialHoliday.find( item => this.formData.playRule.dateType === item.id );
                    if (val != holiday.rangeDates) {
                        this.formData.playRule.dateType = 'custom';
                    }
                }
                this.getDateList(val,'playDate');
                this.$refs.formValidate.validateField('specifiedPlayDateSold');
            },

            //显示列表/日历视图
            showDateType ( field, val ) {
                this[field] = val;
            },

            //获取年月日表格 val-当前选择日期 field-当前操作是销售规则/游玩规则
            getDateList ( val, field ) {
                let obj = {};
                if (val) {
                    let list = val.split(',');
                    list.forEach( item => {
                        let _year = String(new Date(item).getFullYear());
                        let _month = String(new Date(item).getMonth() + 1);
                        let _day = new Date(item).getDate();
                        if (!obj.hasOwnProperty(_year)) {
                            obj[_year] = {};
                            if (!obj[_year].hasOwnProperty(_month)) {
                                obj[_year][_month] = [_day];
                            } else {
                                obj[_year][_month].push(_day);
                            }
                        } else {
                            if (!obj[_year].hasOwnProperty(_month)) {
                                obj[_year][_month] = [_day];
                            } else {
                                obj[_year][_month].push(_day);
                            }
                        }
                    });
                }
                this[field] = [];
                for ( let year in obj ) {
                    if (year && obj[year]) {
                        for ( let month in obj[year] ) {
                            this[field].push({
                                year : year,
                                month : month,
                                day : (obj[year][month].sort( (a,b) => {
                                    return a - b;
                                }) ).join('、')
                            });
                        }
                    }
                }
            },

            //新增产品，显示新增产品弹窗
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('append') + this.$t('product'),
                    type : 'add',
                    productList : [...this.productList],
                    chosedProducts : [...this.itemsData],
                    confirmCallback : ( data ) => {
                        this.open = true;
                        this.itemsData.push(data);
                    },
                    cancelCallback : () => {
                        this.open = true;
                    }
                });
                this.open = false;
            },
            //修改产品
            modify ( data, index ) {
                this.$refs.editProduct.show({
                    data : data,
                    title : this.$t('modify') + this.$t('product'),
                    type : 'modify',
                    productList : [...this.productList],
                    chosedProducts : [...this.itemsData],
                    confirmCallback : ( _data ) => {
                        this.open = true;
                        this.$set(this.itemsData, index, _data);
                    },
                    cancelCallback : () => {
                        this.open = true;
                    }
                });
                this.open = false;
            },
            //删除产品
            del ( data, index ) {
                this.itemsData.splice(index, 1);
            },

            //新增退票手续费率档位
            addReturnRateRule () {
                let param = {
                    befPlayStart : 0,
                    befPlayEnd : 1,
                    procedureRates : 0,
                    active : true,
                };
                if (this.formData.returnRule.rules.length > 0) {
                    param.befPlayStart = this.formData.returnRule.rules[this.formData.returnRule.rules.length - 1].befPlayEnd + 1;
                    param.befPlayEnd = param.befPlayStart + 1;
                }
                this.formData.returnRule.rules.push(param);
            },
            //保存退票手续费率档位
            saveReturnItem (item, index) {
                this.$set(this.formData.returnRule.rules[index], 'active', false);
            },
            //修改退票手续费率档位
            modifyReturnItem (item, index) {
                this.returnItem = defaultsDeep({}, this.formData.returnRule.rules[index]);
                this.$set(this.formData.returnRule.rules[index], 'active', true);
                this.formData.returnRule.rules.forEach( (obj,i) => {
                    if (index !== i) {
                        obj.active = false;
                    }
                } );
            },
            //取消退票手续费率档位
            cancelReturnItem (item, index) {
                this.$set(this.formData.returnRule.rules, index, this.returnItem);
            },
            //取消/删除退票手续费率档位
            delReturnItem (item, index) {
                if (index === this.formData.returnRule.rules.length - 1) {
                    this.formData.returnRule.rules.splice(index,1);
                } else {
                    let data = defaultsDeep({}, this.formData.returnRule.rules[index + 1]);
                    this.formData.returnRule.rules.splice(index,1);
                    if (index > 0) {
                        data.befPlayStart = this.formData.returnRule.rules[index - 1].befPlayEnd + 1;
                    } else {
                        data.befPlayStart = 0;
                    }
                    this.$set(this.formData.returnRule.rules, index, data);
                }
            },
            //失焦修改下一条的开始日期
            changeNextStart (val, index) {
                this.formData.returnRule.rules.forEach( (item, i) => {
                    if (i > index) {
                        item.befPlayStart = this.formData.returnRule.rules[i - 1].befPlayEnd + 1;
                        item.befPlayEnd = item.befPlayStart + 1;
                    }
                });
            },

            //表单校验
            formValidateFunc () {

                //产品
                if (this.itemsData && this.itemsData.length < 1) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('addProduct') }));
                    return;
                }

                //渠道
                if (this.selectedRow && this.selectedRow.length < 1) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('saleChannels') }));
                    return;
                }
                //全民营销验证是否选择了营销等级
                if (this.marketingData && this.marketingData.length > 0) {
                    for (let i = 0, len = this.marketingData.length; i < len; i++) {
                        if (this.marketingData[i].editable) {
                            this.$Message.error(this.$t('pleaseSave',  { field : this.$t('allPeopleMarketSetting') }));
                            return;
                        }
                    }
                }

                //退票规则
                if (this.formData.returnRule.type !== 'notAllow' && this.formData.returnRule.rules.length < 1) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('addReturnRateRule') }));
                    return;
                }

                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = defaultsDeep({}, this.formData);
                        params.groupIds = this.selectedRow.map( item => {
                            return item.id;
                        }).join(',');
                        params.itemsData = JSON.stringify(defaultsDeep([], this.itemsData));

                        params.saleRule.weekSold = this.formData.saleRule.weekSold && this.formData.saleRule.weekSold.length > 0 ?
                            this.formData.saleRule.weekSold.join(',') : '';
                        params.saleRule.specifiedTime = this.formData.saleRule.type === 'specifiedDateSold' && this.formData.saleRule.specifiedTime && this.formData.saleRule.specifiedTime.length > 0 ?
                            this.formData.saleRule.specifiedTime.map( item => {
                                return new Date(item).format('yyyy-MM-dd');
                            }).join(',') : '';
                        params.saleRule.startTime = this.formData.saleRule.time[0] ? new Date(this.formData.saleRule.time[0]).format('yyyy-MM-dd') : '';
                        params.saleRule.endTime = this.formData.saleRule.time[1] ? new Date(this.formData.saleRule.time[1]).format('yyyy-MM-dd') : '';
                        delete params.saleRule.validDates;
                        delete params.saleRule.time;
                        params.saleRule = JSON.stringify(params.saleRule);

                        params.playRule.weekSold = this.formData.playRule.weekSold && this.formData.playRule.weekSold.length > 0 ?
                            this.formData.playRule.weekSold.join(',') : '';

                        params.playRule.specifiedTime = this.formData.playRule.type === 'specifiedDateSold' && this.formData.playRule.specifiedTime && this.formData.playRule.specifiedTime.length > 0 ?
                            this.formData.playRule.specifiedTime.map( item => {
                                return new Date(item).format('yyyy-MM-dd');
                            }).join(',') : '';
                        params.playRule.startTime = this.formData.playRule.time[0] ? new Date(this.formData.playRule.time[0]).format('yyyy-MM-dd') : '';
                        params.playRule.endTime = this.formData.playRule.time[1] ? new Date(this.formData.playRule.time[1]).format('yyyy-MM-dd') : '';
                        delete params.playRule.validDates;
                        delete params.playRule.time;
                        params.playRule = JSON.stringify(params.playRule);

                        if (this.formData.returnRule.type === 'notAllow') {
                            params.returnRule.rules = [];
                        } else {
                            let rules = [];
                            this.formData.returnRule.rules.forEach(item => {
                                if (!item.active) {
                                    rules.push({
                                        befPlayStart : item.befPlayStart,
                                        befPlayEnd : item.befPlayEnd,
                                        procedureRates : item.procedureRates,
                                    });
                                }
                            });
                            params.returnRule.rules = rules;
                        }
                        params.returnRule = JSON.stringify(params.returnRule);

                        if (this.formData.alterRule.type === 'notAllow') {
                            params.alterRule.befPlayLatestDays = '';
                            params.alterRule.alterNum = '';
                        }
                        params.alterRule = JSON.stringify(params.alterRule);

                        params.saleStartTime = this.formData.saleTime[0];
                        params.saleEndTime = this.formData.saleTime[1];
                        params.todaySaleStartTime = this.formData.todaySaleTime[0];
                        params.todaySaleEndTime = this.formData.todaySaleTime[1];
                        params.checkinTime = this.formData.checkinTime.join('~');
                        params.allocationId = this.allocationId || ''; //分销id

                        //全民营销表单数据
                        params.marketSaleData = this.marketingData.map((item) => {
                            return {
                                market_type_id : item.typeId,
                                market_level_id : item.levelId,
                            };
                        });
                        params.marketSaleData = JSON.stringify(params.marketSaleData);

                        delete params.saleTime;
                        delete params.todaySaleTime;

                        this.$refs.auditConfirmModal.toggle({
                            type : 'audit',
                            products : this.itemsData,
                            confirmCallback : () => {
                                //区分新增与修改
                                if ( this.type === 'add' ) {
                                    this.saveAndEditPolicy( 'addPolicy', params);
                                }
                                if ( this.type === 'modify' ) {
                                    this.saveAndEditPolicy( 'modifyPolicy', params);
                                }
                            }
                        });
                    }
                });
            },
            //新增/修改销售政策
            saveAndEditPolicy ( url, params ) {
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

            //返回
            goBack () {
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.$router.push({ name : 'marketingPolicy' });
                }
                if ( this.type === 'modify' ) {
                    this.$router.back();
                }
            },

            /**
             * 获取路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.type = params.type;
                    if (params.productType) {
                        this.formData.productType = params.productType;
                    }
                    if (params.allocationId) {
                        this.allocationId = params.allocationId;
                    }
                    if (params.type === 'modify') {
                        this.initData(params.info);
                    } else {
                        //查询销售渠道组
                        this.queryOrgGroupVoList();
                    }
                }
            },
            /**
             * 初始化数据
             * @param data
             */
            initData (data) {
                let formData = pick(data.productPolicy, ['id','productType', 'name','policyDesc','saleStartTime','saleEndTime','todaySaleStartTime','todaySaleEndTime',
                'buyTicketNotes']);
                formData.saleTime = [data.productPolicy.saleStartTime, data.productPolicy.saleEndTime];
                formData.todaySaleTime = [data.productPolicy.todaySaleStartTime, data.productPolicy.todaySaleEndTime];
                if (data.productPolicy.checkinTime.indexOf('~')) {
                    formData.checkinTime = data.productPolicy.checkinTime.split('~');
                } else {
                    formData.checkinTime = data.productPolicy.checkinTime.split(',');
                }
                formData.delayValidTime = data.productPolicy.delayValidTime ? Number(data.productPolicy.delayValidTime) : 0;

                //销售规则
                formData.saleRule = data.productPolicy.saleRuleModel;
                formData.saleRule.time = [data.productPolicy.saleRuleModel.startTime, data.productPolicy.saleRuleModel.endTime];
                formData.saleRule.beforeDay = data.productPolicy.saleRuleModel.beforeDay ? Number(data.productPolicy.saleRuleModel.beforeDay) : 1;
                formData.saleRule.afterDay = data.productPolicy.saleRuleModel.afterDay ? Number(data.productPolicy.saleRuleModel.afterDay) : 1;
                formData.saleRule.weekSold = data.productPolicy.saleRuleModel.weekSold ?
                    data.productPolicy.saleRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                formData.saleRule.dateType = 'custom';
                formData.saleRule.specifiedTime = data.productPolicy.saleRuleModel.specifiedTime ?
                    data.productPolicy.saleRuleModel.specifiedTime.split(',') : [];

                //游玩规则
                formData.playRule = data.productPolicy.playRuleModel;
                formData.playRule.time = [data.productPolicy.playRuleModel.startTime, data.productPolicy.playRuleModel.endTime];
                formData.playRule.beforeDay = data.productPolicy.playRuleModel.beforeDay ? Number(data.productPolicy.playRuleModel.beforeDay) : 1;
                formData.playRule.afterDay = data.productPolicy.playRuleModel.afterDay ? Number(data.productPolicy.playRuleModel.afterDay) : 1;
                formData.playRule.weekSold = data.productPolicy.playRuleModel.weekSold ?
                    data.productPolicy.playRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                formData.playRule.dateType = 'custom';
                formData.playRule.specifiedTime = data.productPolicy.playRuleModel.specifiedTime ?
                    data.productPolicy.playRuleModel.specifiedTime.split(',') : [];

                //退票规则
                formData.returnRule = data.productPolicy.returnRuleModel;
                let rules = [];
                data.productPolicy.returnRuleModel.rules.forEach(item => {
                    rules.push({
                        befPlayStart : Number(item.befPlayStart),
                        befPlayEnd : Number(item.befPlayEnd),
                        procedureRates : Number(item.procedureRates),
                        active : false,
                    });
                });
                formData.returnRule.rules = rules;

                //改签规则
                formData.alterRule = data.productPolicy.alterRuleModel;
                formData.alterRule.befPlayLatestDays = data.productPolicy.alterRuleModel.befPlayLatestDays ?
                    Number(data.productPolicy.alterRuleModel.befPlayLatestDays) : 10;
                formData.alterRule.alterNum = data.productPolicy.alterRuleModel.alterNum ?
                    Number(data.productPolicy.alterRuleModel.alterNum) : 1;

                //销售渠道列表
                formData.groupIds = data.policyChannels.map( item => {
                    return item.groupId;
                });
                //查询销售渠道组
                this.queryOrgGroupVoList();

                //产品列表
                data.policyItems.forEach( item => {
                    this.itemsData.push({
                        id : item.id,
                        productId : item.productId,
                        productName : item.productName,
                        settlePrice : item.settlePrice,
                        standardPrice : item.standardPrice,
                        stockNum : item.stockNum,
                        stockType : item.stockType,
                        itemRule : item.itemRule ? JSON.parse(item.itemRule) : [],
                    });
                });

                //全民营销数据
                this.marketingData = data.marketSalePriceVos && data.marketSalePriceVos.length > 0 ? data.marketSalePriceVos.map((item) => {
                    return {
                        typeId : item.typeId,
                        typeName : item.typeName,
                        levelId : item.levelId,
                        levelName : item.levelName,
                        editable : false
                    }
                }) : [];

                this.formData = defaultsDeep( {}, formData );
            },
            /**
             * 新增营销等级
             */
            addMarketLevel () {
                //一次只能同时新增一个营销等级
                if (this.marketingData.findIndex((item) => {
                    return item.editable === true;
                }) < 0) {
                    this.marketingData.push({
                        typeName : '',
                        typeId : '',
                        levelName : '',
                        levelId : '',
                        editable : true
                    });
                    ajax.post('marketing-typeList').then(res => {
                        if (res.success) {
                            this.marketingTypeList = res.data ? res.data.map((item) => {
                                return {
                                    value : item.id,
                                    label : item.typeName,
                                };
                            }) : [];
                            this.marketingData[this.marketingData.length - 1].typeName = this.marketingTypeList.length > 0 ? this.marketingTypeList[0].label : '';
                            this.marketingData[this.marketingData.length - 1].typeId = this.marketingTypeList.length > 0 ? this.marketingTypeList[0].value : '';
                            this.listLevel(this.marketingTypeList[0].value);
                        } else {
                            this.marketingTypeList = [];
                        }
                    });
                }
            },
            /**
             *  查询等级列表
             *  @param {string} typeId
             */
            listLevel (typeId) {
                ajax.post('marketing-listLevel', {
                    typeId : typeId,
                    pageNo : 1,
                    pageSize : 99
                }).then(res => {
                    if (res.success) {
                        this.marketingLevelList = res.data ? res.data.data.map((item) => {
                            return  {
                                label : item.levelName,
                                value : item.id
                            };
                        }) : [];

                        //过滤已增加的营销等级
                        for (let i = 0, len = this.marketingData.length; i < len; i++) {
                            for (let j = 0, jlen = this.marketingLevelList.length; j < jlen; j++) {
                                if (this.marketingData[i].levelId === this.marketingLevelList[j].value) {
                                    this.marketingLevelList.splice(j, 1);
                                    jlen--;
                                    j--;
                                }
                            }
                        }

                        this.marketingData[this.marketingData.length - 1].levelName = this.marketingLevelList.length > 0 ? this.marketingLevelList[0].label : '';
                        this.marketingData[this.marketingData.length - 1].levelId = this.marketingLevelList.length > 0 ? this.marketingLevelList[0].value : '';
                    } else {
                        this.marketingLevelList = [];
                    }
                })
            },
            /**
             *  营销类别变化时触发
             *  @param {string} newType
             *  @param {object} rowData
             */
            marketingTypeChange (newType, rowData) {
                rowData.typeName = newType.label;
                rowData.typeId = newType.value;
                this.listLevel(newType.value);
            },
            /**
             *  营销级别变化时触发
             *  @param {string} newLevel
             *  @param {object} rowData
             */
            marketingLevelChange (newLevel, rowData) {
                rowData.levelName = newLevel ? newLevel.label : '';
                rowData.levelId = newLevel ? newLevel.value : '';
            },
            /**
             *  保存新增营销等级数据
             *  @param {object} data
             */
            saveMarketingData (data) {
                if (!data.typeName) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('marketType') }));
                    return;
                }

                if (!data.levelName) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('marketingLevel') }));
                    return;
                }

                data.editable = false;
            },
            /**
             *  取消新增营销等级数据
             *  @param {object} data
             */
            cancelMarketingData (data) {
                this.marketingData.pop();
            },
            /**
             *  删除营销等级数据
             *  @param {object} data
             */
            delMarketingData (data) {
                this.marketingData.splice(this.marketingData.findIndex((item) => {
                    return item.value === data.value;
                }), 1);
            }
        },
        computed : {
            localeRouter () {
                return this.type === 'add' ? this.$t('addSalePolicy') : this.$t('modifySalePolicy'); // 新建销售政策 ： 修改销售政策
            },
        },
    };
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
                &.add-rate{
                    position: relative;
                    display: inline-table;
                    width: 180px;
                    text-align: right;
                    left: calc(100% - 575px);
                }
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
                            clear: both;
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
                        position: relative;
                        &.week-btn{
                            min-width: 70px;
                            margin-right: 10px;
                            @include overflow_tip();
                            .iconfont{
                                font-size: $font_size_20px;
                                position: absolute;
                                bottom: 0;
                                right: 1px;
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
                        vertical-align: middle;
                    }

                    .custom-row{
                        padding-top: 10px;
                    }

                    .date-table-wrap{
                        width: 400px;
                    }

                }
                .marketing-tip {
                    margin-bottom: 10px;
                    color: $color_yellow;
                }
            }

            .float-right{
                float: right;
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

            .channel {
                span {
                    margin-right: 13px;
                }

                span.disable {
                    letter-spacing: -1px;
                }
            }
            .disable {
                color: $color_red;
            }

        }

    }
</style>
