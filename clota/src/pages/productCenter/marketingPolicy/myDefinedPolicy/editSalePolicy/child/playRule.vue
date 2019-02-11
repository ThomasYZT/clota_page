<!--
    游玩规则模版元素
    作者：杨泽涛
-->
<template>
    <div class="play-rule">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('playDeadline')" prop="specifiedPlayDateSold"><!--游玩期限-->
                        <Select v-model="formData.playRule.type"
                                :placeholder="$t('selectField', {msg: ''})"
                                @on-change="playRuleTypeChange">
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
                        <!--指定起止日期-->
                        <Form-item :label="$t('specifiedTime')">
                            <DatePicker v-model="formData.playRule.time"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        format="yyyy-MM-dd"
                                        type="daterange"
                                        :clearable="false"
                                        :editable="false"
                                        transfer
                                        @on-change="playRuleTimeChange"
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
                            <Option v-for="(item,index) in specialHoliday"
                                    :key="index"
                                    :value="item.id">
                                {{$t(item.holidayName)}}
                            </Option>
                        </Select>
                        <el-date-picker v-model="formData.playRule.specifiedTime"
                                        ref="datePicker"
                                        type="dates"
                                        :clearable="false"
                                        :editable="false"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        :disabled="formData.playRule.dateType === 'custom' ||
                                                   (formData.playRule.dateType !== 'custom' && specifiedTimeIsEditing) ? false : true"
                                        @change="changePlaySelectTime"
                                        style="width: 230px;height:28px;margin-left: 15px;"
                                        format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="blue" v-if="showPlayDatePicker" @click="showDateType('showPlayDatePicker', false)">{{$t('expandDateList')}}</span>
                        <span class="blue" v-else @click="showDateType('showPlayDatePicker', true)">{{$t('rollUpDateList')}}</span>
                        <!-- 保存日期方案 -->
                        <span class="blue"
                              v-if="(selectedHolidayPlan.id === 'custom' && formData.playRule.specifiedTime.length > 0) ||
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
        </Form>

        <addDatePlanModal ref="addDatePlanModal"
                          @updateDateList="updateDateList"></addDatePlanModal>

        <!--删除日期方案模态框-->
        <del-modal ref="delModal">
            <div class="del-tips">
                <Icon type="help-circled"></Icon>
                <span class="red-bale">{{$t('youAreDeleting')}}：
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
    import { validatePlayData } from '../validateMethods';
    import { playDeadline } from '@/assets/js/constVariable';
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
                formData : {
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
                    //入园时间范围；格式：mm:ss-mm:ss
                    checkinTime : ['00:00','23:59'],
                    //下单延迟生效时间（分钟）
                    delayValidTime : 0,
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
                    //游玩期限
                    playDeadline : playDeadline,
                },
                //week
                weekList : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //显示/隐藏日历控件--默认日历显示
                showPlayDatePicker : true,
                //列表形式日期方案显示
                playDate : [],
                //日期清单视图列表及表头
                dateListColumn : dateListColumn,
            };
        },
        computed : {
            ruleValidate () {
                return {
                    specifiedPlayDateSold : [
                        {
                            validator : validatePlayData,
                            trigger : 'change',
                            params : {
                                type : this.formData.playRule.type,
                                startTime : this.formData.playRule.time[0],
                                endTime : this.formData.playRule.time[1],
                                weekSold : this.formData.playRule.weekSold,
                                specifiedTime : this.formData.playRule.specifiedTime
                            }
                        },
                    ],
                }
            }
        },
        methods : {
            /**
             *  政策可售期 方案类型变更时初始化表单数据，用来控制表单隐藏项
             */
            playRuleTypeChange (type) {
                Object.assign(this.formData, defaultsDeep({ playRule : { type : type } }, this.copyFormData));
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
             * 指定期间可售的起止日期变更时，实时改变
             * @param startTime
             * @param endTime
             */
            playRuleTimeChange ([startTime, endTime]) {
                this.formData.playRule.startTime = startTime;
                this.formData.playRule.endTime = endTime;
            },
            /**
             *  星期的选中/不选中
             *  @param i
             *  @param key
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
            changeSelectForPlay ( val ) {
                if (val && val !== 'custom') {
                    //选择系统方案和自定义方案时
                    this.selectedHolidayPlan = this.specialHoliday.find( item => val === item.id );
                    if (this.selectedHolidayPlan && this.selectedHolidayPlan.rangeDates) {
                        this.$set(this.formData.playRule, 'specifiedTime', this.selectedHolidayPlan.rangeDates.split(',').map((item) => {
                            return new Date(new Date(item).setHours(0, 0, 0, 0));
                        }));
                        this.getDateList(this.selectedHolidayPlan.rangeDates,'playDate');
                    } else {
                        this.formData.playRule.specifiedTime = [];
                        this.playDate = [];
                    }
                } else {
                    //选择自定义方案时
                    this.selectedHolidayPlan = { id : 'custom' };
                    this.playDate = [];
                    this.formData.playRule.specifiedTime = [];
                }
                //控制是否显示修改日期方案按钮
                this.controlDatePlanEdit();
            },
            /**
             * 自定义日期值变更处理
             * @param val
             */
            changePlaySelectTime ( val ) {
                let datelist = val.map((item) => {
                    return item.format('YYYY-MM-DD');
                }).join(',');
                this.getDateList(datelist,'playDate');
            },
            /**
             *  显示列表/日历视图
             */
            showDateType ( field, val ) {
                this[field] = val;
            },
            /**
             * 获取年月日表格 val-当前选择日期 field-当前操作是销售规则/游玩规则
             * @param val
             * @param field
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
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('playRuleError');
                        }
                    })
                })
            },
            /**
             *  保存自定义日期时间
             */
            saveSpecifiedTime () {
                if (this.formData.playRule.specifiedTime) {
                    let dateList = this.formData.playRule.specifiedTime.map((item) => {
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
                this.formData.playRule.specifiedTime = this.selectedHolidayPlan.rangeDates.split(',').map((item) => {
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
                                this.formData.playRule.dateType = 'custom';
                                this.formData.playRule.specifiedTime = [];
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
                this.formData.playRule.dateType = 'custom';
                this.formData.playRule.specifiedTime = [];
                //更新日期方案列表数据
                this.$emit('queryDatePlanList');
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
                forEach(this.formData.playRule, (value, key) => {
                    if (!["type", "beforeDay", "afterDay", "time", "dateType",
                        "startTime", "endTime", "weekSold", "specifiedTime"].includes(key)) {
                        delete this.formData.playRule[key];
                    }
                });
                //初始化日期清单列表数据
                if (this.formData.playRule.specifiedTime && this.formData.playRule.specifiedTime.length > 0) {
                    let datelist = this.formData.playRule.specifiedTime.map((item) => {
                        return item.format('YYYY-MM-DD');
                    }).join(',');
                    this.getDateList(datelist, 'playDate');
                }
            },
        },
        created () {
            this.copyFormData = defaultsDeep({}, this.formData)
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .play-rule {

    }

</style>
