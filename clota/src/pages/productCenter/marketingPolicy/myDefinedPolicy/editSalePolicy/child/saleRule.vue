<!--
    销售规则模版元素
    作者：杨泽涛
-->
<template>
    <div class="sale-rule">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <!--政策可售期 方案类型下拉框-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('policyValidity')" prop="specifiedSaleDateSold">
                        <Select v-model="formData.saleRule.type"
                                @on-change="saleRuleTypeChange"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="(item,index) in enumData.policyValidity"
                                    :key="index"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
                <!--方案类型 == 游玩日期前N天可售-->
                <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'playBeforeSold'">
                    <!--提前天数(M)-->
                    <Form-item :label="$t('aheadDays')">
                        <InputNumber :max="365"
                                     :min="0"
                                     :precision="0"
                                     v-model.trim="formData.saleRule.beforeDay"
                                     :placeholder="$t('inputField', {field: ''})">
                        </InputNumber>
                        <span class="split">{{$t('To')}}</span>
                        <InputNumber :max="365"
                                     :min="formData.saleRule.beforeDay || 0"
                                     :precision="0"
                                     v-model.trim="formData.saleRule.afterDay"
                                     :placeholder="$t('inputField', {field: ''})">
                        </InputNumber>
                        <span class="notice">{{$t('aheadDaysNotice')}}</span>
                    </Form-item>
                </div>
                <!--方案类型 == 指定期间可售-->
                <template v-if="formData.saleRule.type === 'specifiedPeriodSold'">
                    <div class="ivu-form-item-wrap single">
                        <!--指定起止日期-->
                        <Form-item :label="$t('specifiedTime')">
                            <DatePicker v-model="formData.saleRule.time"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        type="daterange"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        @on-change="saleRuleTimeChange"
                                        style="width: 280px;">
                            </DatePicker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap single">
                        <!--每周可玩日期-->
                        <Form-item :label="$t('weekSold')">
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
                <!--方案类型 = 指定日期方案-->
                <div class="ivu-form-item-wrap single" v-if="formData.saleRule.type === 'specifiedDateSold'">
                    <Form-item :label="$t('specifiedDateSold')"><!--指定日期-->
                        <Select v-model="formData.saleRule.dateType"
                                :placeholder="$t('selectField', {msg: ''})"
                                @on-change="changeSelectForSale"
                                style="display: inline-block;">
                            <Option v-for="(item,index) in specialHoliday"
                                    :key="index"
                                    :value="item.id">
                                {{$t(item.holidayName)}}
                            </Option>
                        </Select>
                        <el-date-picker type="dates"
                                        v-model="formData.saleRule.specifiedTime"
                                        :clearable="false"
                                        :editable="false"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        @change="changeSaleSelectTime"
                                        :disabled="formData.saleRule.dateType === 'custom' ||
                                                   (formData.saleRule.dateType !== 'custom' && specifiedTimeIsEditing) ? false : true"
                                        style="width: 230px;height:28px;margin-left: 15px;"
                                        format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="blue" v-if="showSaleDatePicker" @click="showDateType('showSaleDatePicker', false)">{{$t('expandDateList')}}</span>
                        <span class="blue" v-else @click="showDateType('showSaleDatePicker', true)">{{$t('rollUpDateList')}}</span>
                        <!-- 保存日期方案 -->
                        <span class="blue"
                              v-if="(selectedHolidayPlan.id === 'custom' && formData.saleRule.specifiedTime.length > 0) ||
                                    (selectedHolidayPlan.id !== 'custom' && specifiedTimeIsEditing)"
                              @click="saveSpecifiedTime">{{$t('save')}}</span>
                        <!-- 取消修改日期方案 -->
                        <span class="red-btn"
                              v-if="specifiedTimeIsEditing"
                              @click="cancelSpecifiedTime">{{$t('cancel')}}</span>
                        <!-- 修改日期方案 -->
                        <span class="blue"
                              v-if="specifiedTimeEditable && !specifiedTimeIsEditing"
                              @click="modifySpecifiedTime">{{$t('modify')}}</span>
                        <!-- 删除日期方案 -->
                        <span class="red-btn"
                              v-if="specifiedTimeCanDelete && !specifiedTimeIsEditing"
                              @click="deleteSpecifiedTime">{{$t('delete')}}</span>
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
                <!--每日可售时间-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('saleDayTime')">
                        <TimePicker format="HH:mm"
                                    v-model="formData.saleTime"
                                    type="timerange"
                                    @on-change="saleTimeChange"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"></TimePicker>
                    </Form-item>
                </div>
                <!--当日票可售时间-->
                <div class="ivu-form-item-wrap single" v-if="formData.saleRule.beforeDay == 0 || formData.saleRule.afterDay == 0">
                    <Form-item :label="$t('saleTodayTime')">
                        <TimePicker format="HH:mm"
                                    v-model="formData.todaySaleTime"
                                    type="timerange"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"></TimePicker>
                    </Form-item>
                </div>
            </div>
        </Form>

        <addDatePlanModal ref="addDatePlanModal"
                          @updateDateList="updateDateList"></addDatePlanModal>

        <!--删除日期方案模态框-->
        <del-modal ref="delModal">
            <div :class="$style['del-tips']">
                <Icon type="help-circled" :class="$style.icon"></Icon>
                <span :class="$style['red-bale']">{{$t('youAreDeleting')}}
                    <span style="color: #F7981C;">{{selectedHolidayPlan.holidayName}}</span>
                    <span style="color:#ed3f14 ;">{{$t('irreversible')}}，</span>
                </span>
                <span>{{$t('sureToDel')}}</span>
            </div>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import addDatePlanModal from '../components/addDatePlanModal';
    import delModal from '@/components/delModal/index';
    import { policyValidity } from '@/assets/js/constVariable';
    import { validateSaleData } from '../validateMethods';
    import { dateListColumn } from '../editPolicyConfig';
    import defaultsDeep from 'lodash/defaultsDeep';
    import forEach from 'lodash/forEach';
    import ajax from '@/api/index';

    export default {
        props : {
            //指定日期-节假日
            specialHoliday : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom,
            addDatePlanModal,
            delModal
        },
        data () {
            return {
                //政策可售期表单数据
                formData : {
                    //销售规则
                    saleRule : {
                        "type" : "playBeforeSold",//期限类型（游玩日期前M天可售-playBeforeSold，指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                        "beforeDay" : 1,//最少提前天数
                        "afterDay" : 30,//最多提前天数
                        "time" : [new Date(),new Date().addDays(7)],//开始时间startTime-结束时间endTime
                        "dateType" : 'custom',//日期类型
                        "startTime" : "",//开始时间
                        "endTime" : "",//结束时间
                        "weekSold" : ['1','2','3','4','5'],//指定周数-每周可玩日期（例：1,2,3,4,5,6,7）
                        "specifiedTime" : []//指定时间（例：2018-10-12,2018-10-18）
                    },
                    //每日可售时间 （开始时间 saleStartTime - 结束时间 saleEndTime）
                    saleTime : ['00:00','23:59'],
                    //每日可售开始时间；格式：mm:ss
                    saleStartTime : '00:00',
                    //每日可售结束时间；格式：mm:ss
                    saleEndTime : '23:59',
                    //当日票可售时间 （开始时间 todaySaleStartTime - 当日票可售时间 todaySaleEndTime）
                    todaySaleTime : ['00:00','23:59'],
                    //当日票可售开始时间；格式：mm:ss
                    todaySaleStartTime : '00:00',
                    //当日票可售结束时间；格式：mm:ss
                    todaySaleEndTime : '23:59',
                },
                //原始表单数据
                copyFormData : {},
                //自定义日期方案是否可编辑
                specifiedTimeEditable : false,
                //自定义日期方案处于编辑状态
                specifiedTimeIsEditing : false,
                //日期方案是否可删除
                specifiedTimeCanDelete : false,
                //当前选择的日期方案 -- 默认选择自定义日期方案
                selectedHolidayPlan : {
                    id : 'custom'
                },
                //枚举数据
                enumData : {
                    //政策可售期
                    policyValidity : policyValidity,
                },
                //week
                weekList : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //显示/隐藏日历控件--默认日历显示
                showSaleDatePicker : true,
                //日期清单视图列表及表头
                dateListColumn : dateListColumn,
                saleDate : [],
            };
        },
        computed : {
            //表达校验规则
            ruleValidate () {
                return {
                    //政策可售期方案类型校验
                    specifiedSaleDateSold : [
                        {
                            validator : validateSaleData,
                            trigger : 'change',
                            params : {
                                type : this.formData.saleRule.type,
                                startTime : this.formData.saleRule.time[0],
                                endTime : this.formData.saleRule.time[1],
                                weekSold : this.formData.saleRule.weekSold,
                                specifiedTime : this.formData.saleRule.specifiedTime
                            }
                        },
                    ]
                };
            },
        },
        methods : {
            /**
             *  政策可售期 方案类型变更时初始化表单数据，用来控制表单隐藏项
             */
            saleRuleTypeChange (type) {
                Object.assign(this.formData, defaultsDeep({ saleRule : { type : type } }, this.copyFormData));
                //重置所选日期方案状态
                this.selectedHolidayPlan = { id : 'custom' };
                //控制日期方案操作按钮显示
                this.controlDatePlanEdit();
            },
            /**
             *  控制自定义日期方案操作按钮显示
             */
            controlDatePlanEdit () {
                if (this.selectedHolidayPlan.id && this.selectedHolidayPlan.id !== 'custom') {
                    if (this.selectedHolidayPlan.isSystem === 'true') {
                        this.specifiedTimeEditable = false;
                        this.specifiedTimeCanDelete = false;
                    } else {
                        this.specifiedTimeEditable = true;
                        this.specifiedTimeCanDelete = true;
                    }
                } else {
                    this.specifiedTimeEditable = false;
                    this.specifiedTimeCanDelete = false;
                }
                //关闭日期方案编辑状态
                this.specifiedTimeIsEditing = false;
            },
            /**
             * 星期的选中/不选中
             * @param i
             * @param key
             */
            triggerWeek ( i, key ) {
                if (this.formData[key].weekSold.indexOf(i + '') > -1) {
                    let index = this.formData[key].weekSold.indexOf(i + '');
                    this.formData[key].weekSold.splice(index, 1);
                } else {
                    this.formData[key].weekSold.push(i + '');
                }
            },
            /**
             * 指定日期方案更改处理
             * @param val
             */
            changeSelectForSale ( val ) {
                if (val && val !== 'custom') {
                    //选择系统方案和自定义方案时
                    this.selectedHolidayPlan = this.specialHoliday.find( item => val === item.id );
                    if (this.selectedHolidayPlan && this.selectedHolidayPlan.rangeDates) {
                        this.$set(this.formData.saleRule, 'specifiedTime', this.selectedHolidayPlan.rangeDates.split(',').map((item) => {
                            return new Date(new Date(item).setHours(0, 0, 0, 0));
                        }));
                        this.getDateList(this.selectedHolidayPlan.rangeDates, 'saleDate');
                    } else {
                        this.formData.saleRule.specifiedTime = [];
                        this.saleDate = [];
                    }
                } else {
                    //选择自定义方案时
                    this.selectedHolidayPlan = { id : 'custom' };
                    this.saleDate = [];
                    this.formData.saleRule.specifiedTime = [];
                }
                //控制是否显示修改日期方案按钮
                this.controlDatePlanEdit();
            },
            /**
             *  获取年月日表格 val-当前选择日期 field-当前操作是销售规则/游玩规则
             *  @param val
             *  @param field
             */
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
            /**
             * 显示列表/日历视图
             * @param field
             * @param val
             */
            showDateType ( field, val ) {
                this[field] = val;
            },
            /**
             * SaleRule 指定日期可售
             * @param val
             */
            changeSaleSelectTime ( val ) {
                let datelist = val.map((item) => {
                    return item.format('YYYY-MM-DD');
                }).join(',');
                this.getDateList(datelist, 'saleDate');
                this.$refs.formValidate.validateField('specifiedSaleDateSold');
            },
            /**
             * 指定期间可售的起止日期变更时，实时改变
             * @param startTime
             * @param endTime
             */
            saleRuleTimeChange ([startTime, endTime]) {
                this.formData.saleRule.startTime = startTime;
                this.formData.saleRule.endTime = endTime;
            },
            /**
             * 每日可售时间改变,实时改变saleStartTime、saleEndTime
             * @param saleStartTime
             * @param saleEndTime
             */
            saleTimeChange ([saleStartTime, saleEndTime]) {
                this.formData.saleStartTime = saleStartTime;
                this.formData.saleEndTime = saleEndTime;
            },
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('saleRuleError');
                        }
                    })
                })
            },
            /**
             *  保存自定义日期时间
             */
            saveSpecifiedTime () {
                if (this.formData.saleRule.specifiedTime) {
                    let dateList = this.formData.saleRule.specifiedTime.map((item) => {
                        return item.format('YYYY-MM-DD');
                    }).join(',');
                    this.$refs.addDatePlanModal.show({
                        id : this.selectedHolidayPlan.id ? this.selectedHolidayPlan.id : '',
                        type : this.specifiedTimeIsEditing ? 'modify' : 'add',
                        name : this.selectedHolidayPlan.holidayName ? this.selectedHolidayPlan.holidayName : '',
                        dateList : dateList
                    });
                } else {
                    this.$t('selectField', { msg : this.$t('date') });
                }
            },
            /**
             *  修改自定义时间
             */
            modifySpecifiedTime () {
                this.specifiedTimeIsEditing = true;
            },
            /**
             *  取消修改
             */
            cancelSpecifiedTime () {
                this.specifiedTimeIsEditing = false;
                this.formData.saleRule.specifiedTime = this.selectedHolidayPlan.rangeDates.split(',').map((item) => {
                    return new Date(new Date(item).setHours(0, 0, 0, 0));
                });
                this.getDateList(this.selectedHolidayPlan.rangeDates,'playDate');
            },
            /**
             *  删除自定义日期时间
             */
            deleteSpecifiedTime () {
                this.$refs.delModal.show({
                    title : this.$t('delete'),
                    confirmCallback : () => {
                        ajax.post('deletedDatePlan', {
                            id : this.selectedHolidayPlan.id
                        }).then(res => {
                            if (res.success) {
                                //重置自定义日期数据
                                this.formData.saleRule.dateType = 'custom';
                                this.formData.saleRule.specifiedTime = [];
                                //更新日期方案列表数据
                                this.$emit('queryDatePlanList');
                                this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('delete') }));
                            }
                        });
                    }
                });
            },
            /**
             * 自定义日期保存成功回调
             */
            updateDateList () {
                //重置自定义日期数据
                this.formData.saleRule.dateType = 'custom';
                this.formData.saleRule.specifiedTime = [];
                //更新日期方案列表数据
                this.$emit('queryDatePlanList');
            },
            /**
             * 编辑时 -- 初始化表单数据
             * @param formData
             */
            initData (formData) {
                Object.assign(this.formData, formData);
                forEach(this.formData.saleRule, (value, key) => {
                    if (!["type", "beforeDay", "afterDay", "time", "dateType",
                        "startTime", "endTime", "weekSold", "specifiedTime"].includes(key)) {
                        delete this.formData.saleRule[key];
                    }
                });
                //初始化日期清单列表数据
                if (this.formData.saleRule.specifiedTime && this.formData.saleRule.specifiedTime.length > 0) {
                    let datelist = this.formData.saleRule.specifiedTime.map((item) => {
                        return item.format('YYYY-MM-DD');
                    }).join(',');
                    this.getDateList(datelist, 'saleDate');
                }
            }
        },
        created () {
            this.copyFormData = defaultsDeep({}, this.formData)
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .sale-rule {

    }
</style>
<style module lang="scss">
    .del-tips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        position: absolute;
        left: 88px;
        top : 2px;
        font-size: 15px;
        color: #EB6751;
    }

    .red-bale {
        color: #ED3F14;
    }

    .blue-txt {
        color: #2F70DF;
        margin-right: 5px;
    }
</style>
