<template>
    <!--会员管理--储值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <Form ref="formDynamic" :model="formDynamic">

                <!--会员3期暂时去掉-->
                <!--<div class="content-item">-->
                <!--<div class="title">{{$t('StorePasswordSetting')}}</div>-->
                <!--<div class="main">-->
                <!--<RadioGroup v-model="settingData.passwdForRechargeAccount" vertical>-->
                <!--<Radio label="false">-->
                <!--<span>{{$t('consumeWithoutPass')}}</span>-->
                <!--</Radio>-->
                <!--<Radio label="true">-->
                <!--<span>{{$t('consumeWithPass')}}</span>-->
                <!--<span class="yellow-color">{{$t('erCodeOrSmsToPass')}}</span>-->
                <!--</Radio>-->
                <!--</RadioGroup>-->
                <!--</div>-->
                <!--</div>-->

                <div class="content-item">
                    <div class="title">{{$t('setProportionOfBonusAmountOfStorageValue')}}
                        <span class="add-span blue-color" @click="addSendRate">+ {{$t('add')}}</span>
                    </div>
                    <div class="main" v-if="settingData.donateWhileRecharge.length > 0">
                        <div class="ivu-form-item-wrap">
                            <template v-for="(item, index) in settingData.donateWhileRecharge">
                                <div :key="index" class="send-money-wrap" v-if="item._status">
                                    <span class="label">{{$t('recharge')}}：</span>
                                    <Input type="text"
                                           :value="item.lowerValue"
                                           disabled
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/> –
                                    <Input type="text"
                                           :value="item.topValue"
                                           disabled
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/> {{$t('sendGift')}}
                                    <Input type="text"
                                           :value="item.gift"
                                           disabled
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/> {{isMutipleAccount ? $t('variousUnit') : $t('yuan')}}
                                    <span class="add-span blue-color"
                                          @click="showSendRateModal(item,index)">{{$t('applicationScope')}}</span><!--应用范围-->
                                    <span class="add-span blue-color"
                                          @click="showSendRateModal(item,index)">{{$t('modify')}}</span>
                                    <span class="add-span red-color"
                                          @click="handleRemoveSendRate(item,index)">{{$t('del')}}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!--<div class="content-item">
                    <div class="title">转账手续费扣除比例设置</div>
                    <div class="main">
                        <Input  v-model.trim="settingData.commissionOfTransfermation"
                                type="text"
                                class="single-input"
                                placeholder="请输入"/>%
                        </div>
                </div>-->

                <!--储值账户设置-->
                <div class="content-item">
                    <div class="title">{{$t('storeValueAccountSettings')}}
                        <span v-if="isMutipleAccount" class="add-span blue-color" @click="AddAccount">+ {{$t('newAccount')}}</span>
                    </div>
                    <div class="main">
                        <div class="table-wrap">
                            <table-com
                                :table-com-min-height="320"
                                :column-data="columnData"
                                :table-data="tableData"
                                :auto-height="true"
                                :border="false">
                                <el-table-column
                                    slot="column1"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                </el-table-column>
                                <!--会员4期暂时去掉-->
                                <el-table-column
                                    v-if="false"
                                    slot="column2"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="blue-label" @click="showRangeModal(scope.row, scope.$index, 'money')">{{$t('appSetting')}}</li>
                                        </ul>
                                    </template>
                                </el-table-column>
                                <!--会员4期暂时去掉-->
                                <el-table-column
                                    v-if="false"
                                    slot="column3"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="blue-label" @click="showRangeModal(scope.row, scope.$index, 'send')">{{$t('appSetting')}}</li>
                                        </ul>
                                    </template>
                                </el-table-column>
                                <!--会员3期暂时去掉-->
                                <el-table-column
                                    slot="column4"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <ul class="operate-list" v-if="scope.row.accountTypeId !== '1'">
                                            <li class="blue-label"
                                                @click="showModifyAccountModal(scope.row, scope.$index)">
                                                {{$t('editAccount')}}
                                            </li>
                                        </ul>
                                        <template v-else>-</template>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">{{$t('settingOfPriority')}}</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.priorityDeductionInConsumption">
                            <Radio label="corpus">
                                <span>{{$t('corpusAccount')}}</span>
                            </Radio>
                            <Radio label="donate">
                                <span>{{$t('donateMoneyAccount')}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>

                <!--修改会员储值余额设置-->
                <div class="content-item">
                    <div class="title">{{$t('rechargeModifyReasons')}}</div><!--修改会员储值余额设置-->
                    <div class="main">
                        <RadioGroup v-model="settingData.allowAdjustRechargeAccount" vertical style="display: block">
                            <Radio label="false">
                                <span>{{$t('notAllowRecharge')}}</span><!--不允许修改会员的储值账户-->
                            </Radio>
                            <Radio label="true">
                            <span>{{$t('allowModifyRecharge')}}<!--允许修改会员的储值账户，如允许修改，请设置修改原因-->
                                <span class="add-span blue-color"
                                      v-if="settingData.allowAdjustRechargeAccount === 'true'"
                                      @click="handleAddReason">+ {{$t('addModifyReason')}}</span><!--新增修改原因-->
                            </span>
                            </Radio>
                        </RadioGroup>
                        <div class="ivu-form-item-wrap margin-left-50"
                             v-show="settingData.allowAdjustRechargeAccount === 'true' ? true : false">
                            <FormItem
                                v-for="(item, index) in formDynamic.reason"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'reason.' + index + '.reason'"
                                :rules="[{required: true, message: $t('errorEmpty', {msg: $t('modifyReason')}), trigger: 'blur'},
                                 { validator: emoji, trigger: 'blur' }]"><!--修改原因不能为空-->
                                <Input type="text"
                                       :disabled="item.disabled"
                                       v-model.trim="item.reason" :maxlength="100"
                                       style="width: 290px"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0"
                                      @click="deleteReason(item,index)">{{$t('del')}}</span><!--删除-->
                                <span class="span-bottom blue-color" v-if="!item.active"
                                      @click="handleSubmitForReason(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active"
                                      @click="handleResetReason(item,index)">{{$t('cancel')}}</span><!--取消-->
                            </FormItem>
                        </div>

                    </div>
                </div>

                <!--会员4期暂时去掉-->
                <!--房款返还至各业态账户的比例设置-->
                <!--<owner-refund-setting class="content-item"-->
                <!--ref="ownerSetting"-->
                <!--:ownerData.sync="settingData.houseMoneyRefunded"-->
                <!--@updateOwnerData="settingData.houseMoneyRefunded = $event">-->
                <!--</owner-refund-setting>-->

                <!--会员4期暂时去掉-->
                <!--业主使用已返还金额在各业态进行消费时单笔订单可用金额比例设置-->
                <!--<owner-card-consume-config class="content-item"-->
                <!--ref="ownerSetting"-->
                <!--:ownerData.sync="settingData.houseMoneyRefunded"-->
                <!--@updateOwnerData="settingData.houseMoneyRefunded = $event">-->
                <!--</owner-card-consume-config>-->
            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="save">{{$t("save")}}</Button>
            <Button type="ghost" @click="resetFieldFunc">{{$t("cancel")}}</Button>
        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"
                           :length="tableData.length"
                           :table-data="listAmountRangeTable"
                           :send-data="sendRangeTable"
                           @updata-list="submitFundsAccount"></add-account-modal>

        <!--编辑账户modal-->
        <modify-account-modal ref="modifyAccount"
                              :length="tableData.length"
                              :table-data="listAmountRangeTable"
                              @updata-list="submitFundsAccount"></modify-account-modal>

        <!--默认账户本金/赠送金额可使用范围设置modal-->
        <modify-range-modal ref="modifyRange"
                            :length="tableData.length"
                            :table-data="listAmountRangeTable"
                            @updata-list="submitFundsAccount"></modify-range-modal>

        <!--储值赠送金额比例设置modal-->
        <send-rate-modal ref="sendRate"
                         :length="settingData.donateWhileRecharge.length"
                         @submit-date="submitAddSend"></send-rate-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import headerTabs from './components/headerTabs.vue';
    import addAccountModal from './components/addAccountModal.vue';
    import modifyAccountModal from './components/modifyAccountModal.vue';
    import modifyRangeModal from './components/modifyRangeModal.vue';
    import sendRateModal from './components/addSendRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { validator } from 'klwk-ui';
    import ownerRefundSetting from './components/ownerRefundSetting.vue';
    import ownerCardConsumeConfig from './components/ownerCardConsumeConfig';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            headerTabs,
            addAccountModal,
            modifyAccountModal,
            modifyRangeModal,
            sendRateModal,
            tableCom,
            ownerRefundSetting,
            ownerCardConsumeConfig
        },
        data () {
            return {
                //设置id
                id : '',
                //当前页面路由名称
                routerName : 'fundSetting',
                //设置数据
                settingData : {
                    //修改会员积分、虚拟账户余额设置
                    allowAdjustRechargeAccount : '',
                    //储值密码设置
                    passwdForRechargeAccount : '',
                    //转账扣除手续费比例
//                    commissionOfTransfermation: '',
                    //储值赠送金额比例设置
                    donateWhileRecharge : [],
                    //消费时优先扣除账户设置
                    priorityDeductionInConsumption : '',
                    //房款返还至各业态账户的比例设置
                    houseMoneyRefunded : ''
                },
                //copy数据，用于数据重置
                copySetData : {},
                //储值赠送金额应用范围
                listAccountTable : [],
                //收款方式设置
                payIndex : 1,
                //表格数据--储值账户列表
                tableData : [],
                //表头数据
                columnData : [
                    {
                        title : 'accountOwnership',
                        minWidth : 140,
                        field : 'orgName',
                    },
                    {
                        title : 'accountName',
                        minWidth : 140,
                        field : 'accountName',
                    },
                    {
                        title : 'principal',
                        minWidth : 110,
                        field : 'id'
                    },
                    {
                        title : 'giftSum',
                        minWidth : 110,
                        field : 'id'
                    },
                    {
                        title : 'operate',
                        minWidth : 110,
                        enMinWidth : 140,
                        field : 'id'
                    },
                ],
                //获取储值账户-(本金/赠送金额)应用范围
                listAmountRangeTable : [],
                sendRangeTable : [],
                //输入框校验错误显示
                error : {
                    moneyToGrowthError : '',//储值额--成长值
                    storedTimeError : '',//储值获得积分、成长值生效设置
                },
                //Number型
                numberProps : ['moneyToGrowth'],
                //String型
                stringProps : ['moneyToGrowth'],
                formDynamic : {
                    reason : [],
                },
                //动态表单数据
                reasonIndex : 1,

                //用于动态表单校验(特殊字符)
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error(this.$t('errorIrregular'))); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };
        },
        created () {
            //查询会员基础设置
            this.findBasicSet();
            //查询储值账户
            this.queryMemberAccountDefine();
            //获取储值赠送金额应用范围
            this.listAccount();
            //获取储值账户-(本金/赠送金额)应用范围
            this.getSubNode();
            //查询修改原因
            this.listAdjustReason();
        },
        methods : {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                    case 'boolean':
                        return data === 'true' ? true : false;
                    case 'string':
                        return data !== null ? String(data) : '';
                }
            },

            //获取储值赠送金额应用范围
            listAccount () {
                // 会员3期暂时去掉
                // ajax.post('queryMemberAccountDefine', {
                //     accountType : 'charging',
                //     pageNo : 1,
                //     pageSize : 99999,
                // }).then(res => {
                //     if ( res.success ) {
                //         this.listAccountTable = res.data.data || [];
                //     }
                // });
                ajax.post('getMemberLevelsInType').then(res => {
                    if ( res.success ) {
                        let tmpData = res.data ? res.data : {};
                        let listAccountTable = [];
                        for (let item in tmpData) {
                            listAccountTable = [].concat(listAccountTable,tmpData[item]);
                        }
                        this.listAccountTable = listAccountTable;
                    } else {
                        this.listAccountTable = [];
                    }
                });
            },
            //获取储值账户-(本金/赠送金额)应用范围
            getSubNode () {
                ajax.post('listApplicationRange').then(res => {
                    if ( res.success ) {
                        this.listAmountRangeTable = defaultsDeep([], res.data );
                        this.sendRangeTable = defaultsDeep([], res.data );
                    } else {
                        this.listAmountRangeTable = [];
                        this.sendRangeTable = [];
                    }
                });
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if ( res.success) {
                        if (res.data) {
                            this.id = res.data.id;
                            //处理数据
                            let params = {
                                passwdForRechargeAccount : res.data.passwdForRechargeAccount || 'true',
                                donateWhileRecharge : res.data.donateWhileRecharge ? JSON.parse(res.data.donateWhileRecharge) : [],
                                priorityDeductionInConsumption : res.data.priorityDeductionInConsumption,
                                houseMoneyRefunded : res.data.houseMoneyRefunded,
                                allowAdjustRechargeAccount : res.data.allowAdjustRechargeAccount,
                            };
                            for ( let key in params) {
                                if (key && params[key] && typeof (params[key]) === 'object' && Object.keys(params[key]).length > 0) {
                                    for ( let ckey in params[key]) {
                                        if (this.stringProps.indexOf(ckey) > -1) {
                                            params[key][ckey] = this.transPropsType(params[key][ckey], 'string');
                                        }
                                    }
                                }
                            }
                            this.settingData = params;
                            //复制数据
                            this.copySetData = defaultsDeep({}, params);
                        } else {
                            this.copySetData = defaultsDeep({}, this.settingData);
                        }
                    }
                });
            },
            //点击保存，校验信息，数据处理
            save () {
                if (this.checkInputFunc()) {
                    let setParam = defaultsDeep({}, this.settingData);
                    for ( let key in setParam) {
                        if (key && typeof (setParam[key]) === 'object' && Object.keys(setParam[key]).length > 0) {
                            for ( let ckey in setParam[key]) {
                                // if (this.boolProps.indexOf(ckey) > -1) {
                                //     setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'boolean');
                                // }
                                if (this.numberProps.indexOf(ckey) > -1) {
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'number');
                                }
                            }
                        }
                    }
                    setParam.id = this.id;

                    let params = {
                        id : this.id,
                        passwdForRechargeAccount : setParam.passwdForRechargeAccount,
                        donateWhileRecharge : setParam.donateWhileRecharge.length > 0 ?
                            JSON.stringify(setParam.donateWhileRecharge) : '',
                        priorityDeductionInConsumption : this.settingData.priorityDeductionInConsumption,
                        houseMoneyRefunded : this.settingData.houseMoneyRefunded,
                        allowAdjustRechargeAccount : this.settingData.allowAdjustRechargeAccount,
                    };
                    this.basicSet(params);

                }
            },
            //会员储值设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if ( res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('saveStorageSetting') }));
                        this.findBasicSet();
                    }
                });
            },
            //点击取消重置数据
            resetFieldFunc () {
                if (this.copySetData !== {}) {
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },

            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {
                return true;
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //校验不为空
                if (common.isNotEmpty(val)) {
                    this.error[errorField] = '';
                } else {
                    this.error[errorField] = this.$t('inputField', { field : '' });
                    return false;
                }

                //校验表情符号
                if (val && val.isUtf16()) {
                    this.error[errorField] = this.$t('errorIrregular'); // 输入内容不合规则
                    return false;
                } else {
                    this.error[errorField] = '';
                }
                //正整数，长度校验
                if (validator.isNumber(val)) {
                    let numStr = String(val);
                    if (numStr.length < 1) {
                        this.error[errorField] = this.$t('errorMinLength',{ field : '',length : 1 });
                        return false;
                    } else if (numStr.length > 10) {
                        this.error[errorField] = this.$t('errorMaxLength', { field : '',length : 10 });
                        return false;
                    } else {
                        if (Number.parseInt(val) === Number.parseFloat(val)) {
                            if (val < 0 || val == 0) {
                                this.error[errorField] = this.$t('fieldTypeError', { field : '' });
                                return false;
                            } else {
                                this.error[errorField] = '';
                            }
                        } else {
                            this.error[errorField] = this.$t('integetError', { field : '' });
                            return false;
                        }
                    }
                } else {
                    this.error[errorField] = this.$t('integetError', { field : '' });
                    return false;
                }

                return true;
            },

            //删除储值赠送金额比例
            handleRemoveSendRate ( data, index ) {
                this.settingData.donateWhileRecharge.splice(index, 1);
            },
            //新增显示储值赠送金额比例
            addSendRate () {
                let item = {
                    lowerValue : '',
                    topValue : '',
                    gift : '',
                    scope : '',
                    _status : 1,
                };
                let index = this.settingData.donateWhileRecharge.length;
                this.$refs.sendRate.show({ item, index }, 'add');
            },
            //保存后回调传参
            submitAddSend (data) {
                this.$set(this.settingData.donateWhileRecharge,data.index, data.item);
            },
            //点击‘应用范围’与‘修改’，显示储值赠送金额比例
            showSendRateModal ( item, index ) {
                this.$refs.sendRate.show({ item, index }, 'modify');
            },

            //查询储值账户
            queryMemberAccountDefine () {
                ajax.post('queryAccountSetList').then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.filter(item => {
                            if (this.isMutipleAccount) {
                                return true;
                            } else {
                                return item.accountTypeId === '1';
                            }
                        }) : [];
                    } else {
                        this.tableData = [];
                        this.$Message.warning(res.message || 'queryMemberAccountDefine ' + this.$t('queryFailure'));
                    }
                });
            },
            //新增显示储值赠送金额比例
            AddAccount () {
                let item = {
                    accountBelonging : '',
                    accountName : '',
                    unit : '',
                    rate : '1',
                    rateNumerator : '1',
                    rateDenominator : '1',
                    exchangeToCash : 'false',
                    corpusAppliedOrgId : [],
                    donateAppliedOrgId : [],
                };
                let index = this.tableData.length;
                this.$refs.addAccount.show({ item, index });
            },
            //保存后回调传参
            submitFundsAccount (data) {
                this.queryMemberAccountDefine();
            },
            //点击储值账户的应用设置，显示应用设置弹窗
            showRangeModal ( item, index, type ) {
                this.$refs.modifyRange.show({ item, index }, type);
            },
            //点击储值账户的编辑账户，显示编辑账户弹窗
            showModifyAccountModal ( item, index ) {
                this.findAccountSetDetail(item.accountBelonging,item.cardTypeId,item.cardLevelId,item.accountTypeId,index);
                // this.$refs.modifyAccount.show({ item, index });
            },
            //查询修改原因
            listAdjustReason () {
                this.formDynamic.reason = [];
                ajax.post('listAdjustReason',{
                    reasonType : 'recharge'
                }).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            res.data.forEach((item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.reason.push(item);
                            });
                        }
                    }
                });
            },
            //新增修改原因
            handleAddReason () {
                this.reasonIndex++;
                this.formDynamic.reason.push({
                    reason : '',
                    index : this.reasonIndex,
                    _status : 1,
                    disabled : false,
                });
            },
            //修改原因表单校验
            handleSubmitForReason (data, index) {
                this.$refs.formDynamic.validateField('reason.' + index + '.reason', (valid) => {
                    if (valid === '') {
                        this.updateReason(data, index);
                    }
                });
            },
            //增加/修改原因
            updateReason (data, index) {
                ajax.post('addAdjustReason', {
                    reason : data.reason,
                    reasonType : 'recharge'
                }).then(res => {
                    if (res.success) {
                        this.formDynamic.reason[index].disabled = true;
                        this.formDynamic.reason[index].active = true;
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addReason') })); // 新增原因成功
                    }
                });
            },
            //删除原因
            deleteReason (data, index) {
                ajax.post('deleteAdjustReason', {
                    reasonId : data.id,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delReason') })); // 删除原因成功
                        this.formDynamic.reason[index]._status = 0;
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('delReason') })); // 删除原因成功
                    }
                });
            },
            //取消原因表单校验
            handleResetReason (data, index) {
                this.$refs.formDynamic.resetFields('reason.' + index + '.reason');
                this.formDynamic.reason[index]._status = 0;
            },


            /**
             * 获取储值账户详情
             * @param{String} accountBelonging 账户归属
             * @param{String} cardTypeId 会员卡类型id
             * @param{String} cardLevelId 会员卡级id
             * @param{String} accountTypeId 账户id
             * @param{String} index
             */
            findAccountSetDetail (accountBelonging,cardTypeId,cardLevelId,accountTypeId,index) {
                ajax.post('findAccountSetDetail',{
                    accountBelonging,
                    cardTypeId,
                    cardLevelId,
                    accountTypeId,
                }).then(res => {
                    if (res.success) {
                        let accountInfo = res.data ? res.data : {};
                        this.$refs.addAccount.show({ item : {
                                id : accountInfo.id,
                                accountBelonging : accountInfo.accountBelonging,
                                accountName : accountInfo.accountName,
                                unit : accountInfo.unit,
                                rate : accountInfo.rate,
                                rateNumerator : accountInfo.rateNumerator,
                                rateDenominator : accountInfo.rateDenominator,
                                exchangeToCash : accountInfo.exchangeToCash,
                                corpusAppliedOrgId : accountInfo.corpusAppliedOrgId,
                                donateAppliedOrgId : accountInfo.donateAppliedOrgId,
                                cardTypeId : cardTypeId,
                                cardLevelId : cardLevelId,
                            }, index });
                    }
                });
            }

        },
        computed : {
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: hidden;
        background: $color-fff;
        border-radius: 4px;

        .content{
            padding: 30px 60px 10px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item{

                .add-span {
                    font-size: $font_size_14px;
                    margin-left: 20px;
                }

                .blue-color {
                    font-size: $font_size_14px;
                    color: $color_blue;
                    cursor: pointer;
                }

                .red-color {
                    font-size: $font_size_14px;
                    color: $color_red;
                    cursor: pointer;
                }
                .grey-color {
                    font-size: $font_size_14px;
                    color: $color-3F3F3F;
                    cursor: pointer;
                }
                .span-bottom {
                    vertical-align: bottom;
                }

                &:not(:nth-last-of-type(1)) {
                    margin-bottom: 30px;
                }

                /deep/ .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 690px;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 700px;
                        text-align: left;
                    }

                    &.short-wrap{
                        min-width: 360px;
                        .ivu-form-item{
                            width: 360px;
                        }
                    }

                    &.margin-left-50 {
                        margin-left: 50px;
                    }
                }

                /deep/ .ivu-form-item-content{
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper{
                    margin-bottom: 0px !important;
                    margin-right: 5px;
                    width: 80%;
                }

                /deep/ .title{
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;
                }
                .main{
                    >div{
                        margin-bottom: 10px;
                    }
                    .send-money-wrap{
                        text-align: left;
                        margin-bottom: 10px;
                    }
                }
                .table-wrap{
                    width: 650px;
                }
            }

            .add-span{
                margin-left: 10px;
            }
            .blue-color{
                color: $color_blue;
                cursor: pointer;
            }
            .yellow-color{
                color: $color_yellow;
            }
            .red-color{
                color: $color_red;
                cursor: pointer;
            }
            .grey-color{
                color: $color-3F3F3F;
                cursor: pointer;
            }

        }

        /deep/ .ivu-input-wrapper{
            /*vertical-align: sub;*/

            &.single-input{
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap{
            position: relative;
            padding-left: 50px;
            padding-top: 8px;
        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }

    }
</style>

