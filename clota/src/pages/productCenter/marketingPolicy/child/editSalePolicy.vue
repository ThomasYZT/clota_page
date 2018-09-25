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
                                        v-if="index!==0"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.saleRule.weekSold.indexOf(index+'') > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek(item, index)">
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
                                    style="display: inline-block;">
                                <Option v-for="(item,index) in enumData.specialHoliday"
                                        :key="index"
                                        :value="item.id">
                                    {{item.holidayName}}
                                </Option>
                            </Select>
                            <!--<br/>-->
                            <!--:disabled="formData.saleRule.dateType === '' ? false : true"-->
                            <DatePicker
                                v-model="formData.saleRule.specifiedTime"
                                multiple
                                format="yyyy-MM-dd"
                                type="date"
                                :placeholder="$t('selectField', {msg: ''})"
                                :open="false"
                                :transfer="false"
                                :clearable="false"
                                :editable="false"
                                style="width: 280px;display: inline-block;margin-left: 15px;">
                                <!--<a href="javascript:void(0)">-->
                                    <!--&lt;!&ndash;<Icon type="ios-calendar-outline"></Icon>&ndash;&gt;-->
                                <!--</a>-->
                            </DatePicker>
                            <!--<span class="blue" v-if="formData.saleRule.dateType === 'custom'">{{$t('toList')}}</span>-->
                            <!--<span class="blue" v-else>{{$t('toDate')}}</span>-->
                            <!--<DatePicker v-model="formData.saleRule.specifiedTime"-->
                                        <!--:open="true"-->
                                        <!--multiple-->
                                        <!--:placeholder="$t('selectField', {msg: ''})"-->
                                        <!--format="yyyy-MM-dd"-->
                                        <!--:clearable="false"-->
                                        <!--:editable="false"-->
                                        <!--:disabled="formData.saleRule.dateType === '' ? false : true"-->
                                        <!--transfer-->
                                        <!--style="width: 280px;">-->
                            <!--</DatePicker>-->
                            <!--列表视图-->
                            <div class="date-table-wrap" v-if="false">
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
                                        v-if="index!==0"
                                        class="week-btn"
                                        :key="index"
                                        :type="formData.playRule.weekSold.indexOf(index+'') > -1 ? 'primary' : 'ghost'"
                                        @click="triggerWeek(item, index)">
                                    {{$t(item)}} <i class="iconfont icon-selected" v-if="formData.playRule.weekSold.indexOf(index+'') > -1"></i>
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
                            <!--<span class="blue" v-if="formData.playRule.dateType === 'custom'">{{$t('toList')}}</span>-->
                            <!--<span class="blue" v-else>{{$t('toDate')}}</span>-->
                            <br/>
                            <!--日历视图-->
                            <DatePicker
                                v-model="formData.playRule.specifiedTime"
                                multiple
                                format="yyyy-MM-dd"
                                type="date"
                                :placeholder="$t('selectField', {msg: ''})"
                                :open="false"
                                :transfer="false"
                                :clearable="false"
                                :editable="false"
                                style="width: 280px;display: inline-block;margin-left: 15px;">
                                <!--<a href="javascript:void(0)">-->
                                <!--&lt;!&ndash;<Icon type="ios-calendar-outline"></Icon>&ndash;&gt;-->
                                <!--</a>-->
                            </DatePicker>
                            <!--<DatePicker v-model="formData.playRule.specifiedTime"-->
                                        <!--:open="false"-->
                                        <!--multiple-->
                                        <!--:placeholder="$t('selectField', {msg: ''})"-->
                                        <!--format="yyyy-MM-dd"-->
                                        <!--:clearable="false"-->
                                        <!--:editable="false"-->
                                        <!--:disabled="formData.playRule.dateType === 'custom' ? false : true"-->
                                        <!--transfer-->
                                        <!--style="width: 280px;">-->
                            <!--</DatePicker>-->
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
                                            <span>{{$t('playDate')}} {{scope.row.befPlayStart == '0' ? $t('when') : $t('before')}}</span>
                                            <span v-if="scope.row.befPlayStart != '0'">{{scope.row.befPlayStart}}</span>
                                            <span>{{$t('day')}}</span>
                                            <span> ~ </span>
                                            <span>{{$t('playDate')}}{{scope.row.befPlayEnd == '0' ? $t('when') : $t('before')}}</span>
                                            <template v-if="scope.row.active">
                                                <InputNumber :max="365"
                                                             :min="scope.row.befPlayStart ? Number(scope.row.befPlayStart) : 0"
                                                             class="short-input"
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
                                                    <li class="normal" @click="delReturnItem(scope.row,scope.$index)">{{$t('cancel')}}</li><!--取消-->
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
                weekList: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //控制点选日期控件显示/隐藏
                open: false,
                //表单数据
                formData: {
                    id: '',
                    productType: 'ticket',//业态类型 ticket-票类，repast-餐饮，hotel-酒店，ticket_package-套票
                    name: '',//销售政策名称
                    policyDesc: '',//描述
                    saleTime: ['00:00','23:59'],//每日可售开始时间 saleStartTime - 每日可售结束时间 saleEndTime
                    saleStartTime: '00:00', //每日可售开始时间；格式：mm:ss
                    saleEndTime: '23:59', //每日可售结束时间；格式：mm:ss
                    todaySaleTime: ['00:00','23:59'],//当日票可售开始时间 todaySaleStartTime - 当日票可售结束时间 todaySaleEndTime
                    todaySaleStartTime: '00:00',//当日票可售开始时间；格式：mm:ss
                    todaySaleEndTime: '23:59',//当日票可售结束时间；格式：mm:ss
                    checkinTime: ['00:00','23:59'],//入园时间范围；格式：mm:ss-mm:ss
                    delayValidTime: 0,//下单延迟生效时间（分钟）
                    buyTicketNotes: '',//购票须知
                    //销售规则
                    saleRule: {
                        "type": "playBeforeSold",//期限类型（游玩日期前M天可售-playBeforeSold，指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay": 1,//提前天数前
                        "afterDay": 365,//提前天数后
                        "time":  [new Date(),new Date().addDays(7)],//开始时间startTime-结束时间endTime
                        "dateType": 'custom',//日期类型
                        "startTime": "",//开始时间
                        "endTime": "",//结束时间
                        "weekSold": ['1','2','3','4','5'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime": []//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //游玩规则
                    playRule: {
                        "type": "specifiedPeriodSold",//期限类型（指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay": '',//提前天数前
                        "afterDay": '',//提前天数后
                        "time":  [new Date(),new Date().addDays(7)],//开始时间startTime-结束时间endTime
                        "dateType": 'custom',//日期类型
                        "startTime": "",//开始时间
                        "endTime": "",//结束时间
                        "weekSold": ['1','2','3','4','5'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime": []//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //退票规则
                    returnRule: {
                        "type": "notAllow",//退票类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit ）
                        //{"befPlayStart": "",//游玩日期前起始天（0代表当天）"befPlayEnd": "",//游玩日期前截止天（0代表当天）"procedureRates": ""//手续费率}
                        "rules": []
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
                itemsData: [],
                //产品列表--用于新增产品弹窗
                productList: [],

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

                //分销id
                allocationId: '',
            }
        },
        created() {
            //查询票类产品列表
            this.queryProductPage();
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
                        setTimeout( () => {
                            if(this.saleChannelList.length > 0){
                                this.saleChannelList.forEach( (item, index) => {
                                    if(this.formData.groupIds.indexOf(item.id) > -1){
                                        if(this.$refs.channelMultiTablePlug){
                                            this.$refs.channelMultiTablePlug.toggleRowSelection(this.saleChannelList[index], true);
                                        }
                                    }
                                })
                            }
                        },300)
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
            triggerWeek ( val, i ) {
                if(this.formData.saleRule.weekSold.indexOf(i+'') > -1){
                    let index = this.formData.saleRule.weekSold.indexOf(i+'');
                    this.formData.saleRule.weekSold.splice(index, 1);
                }else{
                    this.formData.saleRule.weekSold.push(i+'');
                }
            },

            //新增产品，显示新增产品弹窗
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('add')+this.$t('product'),
                    type: 'add',
                    confirmCallback : ( data ) => {
                        console.log(data);
                        this.itemsData.push(data);
                    }
                });
            },
            //修改产品
            modify ( data, index ) {
                this.$refs.editProduct.show({
                    data: data,
                    title : this.$t('modify')+this.$t('product'),
                    type: 'modify',
                    confirmCallback : ( data ) => {
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
                let param = {
                    befPlayStart: 0,
                    befPlayEnd: 1,
                    procedureRates: 1,
                    active: true,
                };
                if(this.formData.returnRule.rules.length > 0){
                    param.befPlayStart = this.formData.returnRule.rules[this.formData.returnRule.rules.length-1].befPlayEnd + 1;
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
                this.$set(this.formData.returnRule.rules[index], 'active', true);
            },
            //取消/删除退票手续费率档位
            delReturnItem (item, index) {
                if(index === this.formData.returnRule.rules.length-1){
                    this.formData.returnRule.rules.splice(index,1);
                }else{
                    let data = defaultsDeep({}, this.formData.returnRule.rules[index+1]);
                    this.formData.returnRule.rules.splice(index,1);
                    if(index > 0){
                        data.befPlayStart = this.formData.returnRule.rules[index-1].befPlayEnd+1;
                    }else{
                        data.befPlayStart = 0;
                    }
                    this.$set(this.formData.returnRule.rules, index, data);
                }
            },
            //失焦修改下一条的开始日期
            changeNextStart (val, index) {
                this.formData.returnRule.rules.forEach( (item, i) => {
                    if(i > index){
                        item.befPlayStart = this.formData.returnRule.rules[i-1].befPlayEnd+1;
                        item.befPlayEnd = item.befPlayStart+1;
                    }
                })
            },

            //表单校验
            formValidateFunc () {

                if(this.itemsData && this.itemsData.length < 1){
                    this.$Message.warning(this.$t('selectField', {msg: this.$t('addProduct')}));
                    return
                }

                if(this.selectedRow && this.selectedRow.length < 1){
                    this.$Message.warning(this.$t('selectField', {msg: this.$t('saleChannels')}));
                    return
                }

                this.$refs.formValidate.validate((valid) => {
                    if ( valid ){
                        let params = defaultsDeep({}, this.formData);
                        params.groupIds = this.selectedRow.map( item => { return item.id}).join(',');
                        params.itemsData = JSON.stringify(defaultsDeep([], this.itemsData));

                        params.saleRule.weekSold = this.formData.saleRule.weekSold && this.formData.saleRule.weekSold.length > 0 ?
                            this.formData.saleRule.weekSold.join(',') : '';
                        params.saleRule.specifiedTime = this.formData.saleRule.specifiedTime && this.formData.saleRule.specifiedTime.length > 0 ?
                            this.formData.saleRule.specifiedTime.join(',') : '';
                            params.saleRule.startTime = this.formData.saleRule.time[0] ? new Date(this.formData.saleRule.time[0]).format('yyyy-MM-dd'): '';
                        params.saleRule.endTime = this.formData.saleRule.time[1] ? new Date(this.formData.saleRule.time[1]).format('yyyy-MM-dd'): '';
                        delete params.saleRule.validDates;
                        delete params.saleRule.time;
                        params.saleRule = JSON.stringify(params.saleRule);

                        params.playRule.weekSold = this.formData.playRule.weekSold && this.formData.playRule.weekSold.length > 0 ?
                            this.formData.playRule.weekSold.join(',') : '';
                        params.playRule.specifiedTime = this.formData.playRule.specifiedTime && this.formData.playRule.specifiedTime.length > 0 ?
                            this.formData.playRule.specifiedTime.join(',') : '';
                        params.playRule.startTime = this.formData.playRule.time[0] ? new Date(this.formData.playRule.time[0]).format('yyyy-MM-dd'): '';
                        params.playRule.endTime = this.formData.playRule.time[1] ? new Date(this.formData.playRule.time[1]).format('yyyy-MM-dd'): '';
                        delete params.playRule.validDates;
                        delete params.playRule.time;
                        params.playRule = JSON.stringify(params.playRule);

                        if(this.formData.returnRule.type === 'notAllow'){
                            params.returnRule.rules = [];
                        } else {
                            let rules = [];
                            this.formData.returnRule.rules.forEach(item => {
                                if(!item.active){
                                    rules.push({
                                        befPlayStart: item.befPlayStart,
                                        befPlayEnd: item.befPlayEnd,
                                        procedureRates: item.procedureRates,
                                    })
                                }
                            });
                            params.returnRule.rules = rules;
                        }
                        params.returnRule = JSON.stringify(params.returnRule);

                        if(this.formData.alterRule.type === 'notAllow'){
                            params.alterRule.befPlayLatestDays = '';
                            params.alterRule.alterNum = '';
                        }
                        params.alterRule = JSON.stringify(params.alterRule);

                        params.saleStartTime = this.formData.saleTime[0];
                        params.saleEndTime = this.formData.saleTime[1];
                        params.todaySaleStartTime = this.formData.todaySaleTime[0];
                        params.todaySaleEndTime = this.formData.todaySaleTime[1];
                        params.checkinTime = this.formData.checkinTime.join('~');
                        params.allocationId = this.allocationId; //分销id

                        delete params.saleTime;
                        delete params.todaySaleTime;
                        console.log(params);

                        //区分新增与修改
                        if( this.type === 'add' ){
//                            this.saveAndEditPolicy( 'addPolicy', params);
                        }
                        if( this.type === 'modify' ){
//                            this.saveAndEditPolicy( 'modifyPolicy', params);
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
                    if(params.allocationId){
                        this.allocationId = params.allocationId;
                    }
                    if(params.type === 'modify'){
                        this.initData(params.info);
                    }else{
                        //查询销售渠道组
                        this.queryOrgGroupVoList();
                    }
                }
            },
            /**
             * 初始化数据
             * @param data
             */
            initData(data) {
                console.log(data);
                let formData =  pick(data.productPolicy, ['id','productType', 'name','policyDesc','saleStartTime','saleEndTime','todaySaleStartTime','todaySaleEndTime',
                'buyTicketNotes']);
                formData.saleTime = [data.productPolicy.saleStartTime, data.productPolicy.saleEndTime];
                formData.todaySaleTime = [data.productPolicy.todaySaleStartTime, data.productPolicy.todaySaleEndTime];
                formData.checkinTime = data.productPolicy.checkinTime.split('~');
                formData.delayValidTime = data.productPolicy.delayValidTime ? Number(data.productPolicy.delayValidTime) : 0;

                //销售规则
                formData.saleRule = data.productPolicy.saleRuleModel;
                formData.saleRule.time = [data.productPolicy.saleRuleModel.startTime, data.productPolicy.saleRuleModel.endTime];
                formData.saleRule.beforeDay = data.productPolicy.saleRuleModel.beforeDay ? Number(data.productPolicy.saleRuleModel.beforeDay) : 1;
                formData.saleRule.afterDay = data.productPolicy.saleRuleModel.afterDay ? Number(data.productPolicy.saleRuleModel.afterDay) : 1;
                formData.saleRule.weekSold = data.productPolicy.saleRuleModel.weekSold ?
                    data.productPolicy.saleRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                formData.saleRule.specifiedTime = data.productPolicy.saleRuleModel.specifiedTime ?
                    data.productPolicy.saleRuleModel.specifiedTime.split(',') : [];

                //游玩规则
                formData.playRule = data.productPolicy.playRuleModel;
                formData.playRule.time = [data.productPolicy.playRuleModel.startTime, data.productPolicy.playRuleModel.endTime];
                formData.playRule.beforeDay = data.productPolicy.playRuleModel.beforeDay ? Number(data.productPolicy.playRuleModel.beforeDay) : 1;
                formData.playRule.afterDay = data.productPolicy.playRuleModel.afterDay ? Number(data.productPolicy.playRuleModel.afterDay) : 1;
                formData.playRule.weekSold = data.productPolicy.playRuleModel.weekSold ?
                    data.productPolicy.playRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                formData.playRule.specifiedTime = data.productPolicy.playRuleModel.specifiedTime ?
                    data.productPolicy.playRuleModel.specifiedTime.split(',') : [];

                //退票规则
                formData.returnRule = data.productPolicy.returnRuleModel;
                let rules = [];
                data.productPolicy.returnRuleModel.rules.forEach(item => {
                    rules.push({
                        befPlayStart: Number(item.befPlayStart),
                        befPlayEnd: Number(item.befPlayEnd),
                        procedureRates: Number(item.procedureRates),
                        active: false,
                    })
                });
                formData.returnRule.rules = rules;

                //改签规则
                formData.alterRule = data.productPolicy.alterRuleModel;
                formData.alterRule.befPlayLatestDays = data.productPolicy.alterRuleModel.befPlayLatestDays ?
                    Number(data.productPolicy.alterRuleModel.befPlayLatestDays) : 10;
                formData.alterRule.alterNum = data.productPolicy.alterRuleModel.alterNum ?
                    Number(data.productPolicy.alterRuleModel.alterNum) : 1;

                //销售渠道列表
                formData.groupIds = data.policyChannels.map( item => { return item.groupId });
                //查询销售渠道组
                this.queryOrgGroupVoList();

                //产品列表
                data.policyItems.forEach( item => {
                    this.itemsData.push({
                        id: item.id,
                        productId: item.productId,
                        productName: item.productName,
                        settlePrice: item.settlePrice,
                        standardPrice: item.standardPrice,
                        stockNum: item.stockNum,
                        stockType: item.stockType,
                        itemRule: item.itemRule ? JSON.parse(item.itemRule) : [],
                    })
                });

                this.formData = defaultsDeep( {}, formData );
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
