<!--
    退改规则编辑信息模版元素
    作者：杨泽涛
-->
<template>
    <div class="return-rule">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('returnRule')" prop="returnRule"><!--退票规则-->
                        <div style="position: relative;">
                            <Select v-model="formData.returnRule.type"
                                    @on-change="returnRuleTypeChange"
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
                                        <template v-if="scope.row.returnRuleType === 'normal'">
                                            <span>{{$t('playDate')}} {{scope.row.befPlayStart == '0' ? $t('when') : $t('before')}}</span>
                                            <span v-if="scope.row.befPlayStart != '0'">{{scope.row.befPlayStart}}</span>
                                            <span>{{$t('day')}}</span>
                                            <span> ~ </span>
                                            <span>{{$t('playDate')}}{{scope.row.befPlayEnd == '0' ? $t('when') : $t('before')}}</span>
                                            <template v-if="scope.row.active">
                                                <InputNumber :max="9999999999"
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
                                        <template v-else>
                                            <span>过期自动核销</span>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column1"
                                    slot-scope="row"
                                    :label="$t(row.title) + '(0.00 ~ 1.00)'"
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
                            <p class="remark">{{$t('productCenter.refundTip1')}}</p>
                            <p class="remark">{{$t('productCenter.refundTip2')}}</p>
                            <p class="remark">{{$t('productCenter.refundTip3')}}</p>
                        </template>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('alterRule')" prop="alterRule"><!--改签规则-->
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
                    <Form-item :label="$t('预定须知')" prop="buyTicketNotes"><!--预定须知-->
                        <!--<Input v-model.trim="formData.buyTicketNotes"-->
                               <!--type="textarea"-->
                               <!--:rows="3"-->
                               <!--:placeholder="$t('inputField', {field: $t('buyTicketNotes')})+'，'+$t('noMax',{length: 1000})"/>-->

                        <editor ref="editor" :uploadImgable="false" :value.sync="formData.buyTicketNotes"></editor>
                    </Form-item>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editor from '@/components/editor/editor';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { returnRule, alterRule } from '@/assets/js/constVariable';
    import { emoji, validateAlterRule, validateReturnRule } from '../validateMethods';
    import { refundColumn } from '../editPolicyConfig';

    export default {
        components : {
            tableCom,
            editor
        },
        data () {
            return {
                formData : {
                    //购票须知
                    buyTicketNotes : '',
                    //退票规则
                    returnRule : {
                        "type" : "notAllow",//退票类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit ）
                        //{"befPlayStart": "",//游玩日期前起始天（0代表当天）"befPlayEnd": "",//游玩日期前截止天（0代表当天）"procedureRates": ""//手续费率}
                        "rules" : [
                            {
                                befPlayStart : -1,
                                befPlayEnd : 0,
                                procedureRates : 0,
                                active : false,
                                returnRuleType : 'overdue',
                            }
                        ]
                    },
                    //改签规则
                    alterRule : {
                        "type" : "notAllow",//改签类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit）
                        "befPlayLatestDays" : 10,//最晚改签日期（游玩日期前N天）
                        "alterNum" : 1//可改签次数
                    },
                },
                //枚举数据
                enumData : {
                    //退票规则
                    returnRule : returnRule,
                    //改签规则
                    alterRule : alterRule,
                },
                //退票规则列表及表头
                refundColumn : refundColumn,
                //分销id
                allocationId : '',
                //暂存退票修改数据
                returnItem : {},
            };
        },
        computed : {
            ruleValidate () {
                return {
                    //购票须知
                    buyTicketNotes : [
                        { type : 'string', max : 1000, message : this.$t('errorMaxLength', { field : this.$t('ticketDesc'), length : 1000 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                    //退票规则
                    returnRule : [
                        {
                            validator : validateReturnRule,
                            params : {
                                type : this.formData.returnRule.type,
                                returnRule : this.formData.returnRule.rules
                            }
                        }
                    ],
                    //改签规则
                    alterRule : [
                        {
                            validator : validateAlterRule,
                            params : {
                                type : this.formData.alterRule.type,
                                befPlayLatestDays : this.formData.alterRule.befPlayLatestDays,
                                alterNum : this.formData.alterRule.alterNum,
                            }
                        }
                    ]
                }
            }
        },
        methods : {
            /**
             * 新增退票手续费率档位
             */
            addReturnRateRule () {
                let param = {
                    type : 'add',
                    befPlayStart : 0,
                    befPlayEnd : 1,
                    procedureRates : 0,
                    active : true,
                    returnRuleType : 'normal',
                };
                if (this.formData.returnRule.rules.length > 1) {
                    param.befPlayStart = this.formData.returnRule.rules[this.formData.returnRule.rules.length - 1].befPlayStart + 1;
                    param.befPlayEnd = param.befPlayEnd + 1;
                }
                this.formData.returnRule.rules.push(param);
            },
            /**
             * 保存退票手续费率档位
             * @param item
             * @param index
             */
            saveReturnItem (item, index) {
                item.type = '';
                this.$set(this.formData.returnRule.rules[index], 'active', false);
            },
            /**
             * 修改退票手续费率档位
             * @param item
             * @param index
             */
            modifyReturnItem (item, index) {
                this.returnItem = defaultsDeep({}, this.formData.returnRule.rules[index]);
                this.$set(this.formData.returnRule.rules[index], 'active', true);
                this.formData.returnRule.rules.forEach( (obj,i) => {
                    if (index !== i) {
                        obj.active = false;
                    }
                } );
            },
            /**
             * 取消退票手续费率档位
             * @param item
             * @param index
             */
            cancelReturnItem (item, index) {
                if (item.type !== 'add') {
                    this.$set(this.formData.returnRule.rules, index, this.returnItem);
                } else {
                    this.formData.returnRule.rules.pop();
                }
            },
            /**
             * 取消/删除退票手续费率档位
             * @param item
             * @param index
             */
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
            /**
             * 失焦修改下一条的开始日期
             * @param val
             * @param index
             */
            changeNextStart (val, index) {
                this.formData.returnRule.rules.forEach( (item, i) => {
                    if (i > index) {
                        item.befPlayStart = this.formData.returnRule.rules[i - 1].befPlayEnd + 1;
                        item.befPlayEnd = item.befPlayStart + 1;
                    }
                });
            },
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve({
                                buyTicketNotes : this.formData.buyTicketNotes,
                                alterRule : this.formData.alterRule,
                                returnRule : this.formData.returnRule,
                            });
                        } else {
                            reject('returnRuleError');
                        }
                    });
                });
            },
            /**
             *  退票规则改变
             *  @param {string} type
             */
            returnRuleTypeChange (type) {
                if (type !== 'notAllow') {
                    this.formData.returnRule.rules = [
                        {
                            befPlayStart : -1,
                            befPlayEnd : 0,
                            procedureRates : 0,
                            active : false,
                            returnRuleType : 'overdue',
                        }
                    ];
                }
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .return-rule {
        /deep/ .quill-editor {
            height: 300px !important;

            .ql-container {
                height: calc(100% - 70px);
            }
        }
    }
</style>
