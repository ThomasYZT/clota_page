<template>
    <!--会员管理--储值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">{{$t('StorePasswordSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.passwdForRechargeAccount" vertical>
                        <Radio label="false">
                            <span>{{$t('consumeWithoutPass')}}</span>
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('consumeWithPass')}}</span>
                            <span class="yellow-color">{{$t('erCodeOrSmsToPass')}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">{{$t('storeIntegetSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreGrowthFromCharging.storedAndGrowthType" vertical>
                        <Radio label="false">
                            <span>{{$t('storeWithouIntegetAGrowth')}}</span>
                        </Radio>
                        <Radio label="true">
                            <span>{{$t('storeWithouIntegetAGrowthNoRepeat')}}</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">{{$t('recharge')}}
                        <span :class="{'ivu-form-item-error': error.moneyToIntegrateError}">
                            <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToIntegrate"
                                 :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'true' ? true : false"
                                 @on-blur="checkInputBlurFunc(settingData.scoreGrowthFromCharging.moneyToIntegrate,'moneyToIntegrateError')"
                                 type="text"
                                 class="single-input"
                                 :placeholder="$t('inputField', {field: ''})"/> {{$t('yuanSaved')}}
                            <span class="ivu-form-item-error-tip"
                                   style="left: 92px;"
                                   v-if="error.moneyToIntegrateError">{{error.moneyToIntegrateError}}</span>
                        </span>
                        <span> {{settingData.scoreGrowthFromCharging.integrate}} {{$t('integral')}}</span>
                    </div>
                    <div class="check-group-wrap">{{$t('recharge')}}
                        <span :class="{'ivu-form-item-error': error.moneyToGrowthError}">
                              <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToGrowth"
                                     :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'true' ? true : false"
                                     @on-blur="checkInputBlurFunc(settingData.scoreGrowthFromCharging.moneyToGrowth,'moneyToGrowthError')"
                                     type="text"
                                     class="single-input"
                                     :placeholder="$t('inputField', {field: ''})"/> {{$t('yuanSaved')}}
                              <span class="ivu-form-item-error-tip"
                                   style="left: 92px;"
                                   v-if="error.moneyToGrowthError">{{error.moneyToGrowthError}}</span>
                        </span>
                        <span> {{settingData.scoreGrowthFromCharging.growth}} {{$t('growth')}}</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">{{$t('storeIntegetRatioSetting')}}</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreGrowthEffModeWhileCharging.storedType" vertical>
                        <Radio label="immediately">
                            <span>{{$t('rechartSucEffective')}}</span>
                        </Radio>
                        <Radio label="checkout_after" :class="{'ivu-form-item-error': error.growthTimeError}">
                            <span>{{$t('rechartSuc')}}</span>
                            <Input v-model.trim="settingData.scoreGrowthEffModeWhileCharging.storedTime"
                                   :disabled="settingData.scoreGrowthEffModeWhileCharging.storedType !== 'checkout_after' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.scoreGrowthEffModeWhileCharging.storedTime,'growthTimeError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('hourLaterInvalid')}}</span>
                            <span class="ivu-form-item-error-tip"
                                  style="left: 113px;"
                                  v-if="error.growthTimeError">{{error.growthTimeError}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

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
                                       class="single-input"/> {{$t('yuan')}}
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

            <div class="content-item">
                <div class="title">{{$t('CollectionModeSetting')}}
                    <span class="blue-color add-span" @click="handleAddPay">+ {{$t('newCollectionMethod')}}</span>
                </div>
                <div class="main">
                    <Form ref="formDynamic" :model="formDynamic" :label-width="20">
                        <div class="ivu-form-item-wrap short-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.pay"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'pay.' + index + '.payment'"
                                :rules="{required: true, message: $t('CertificateTypeCannotBeEmpty'), trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.payment" :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deletePay(item,index)">{{$t('del')}}</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForPay(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetPay(item,index)">{{$t('cancel')}}</span>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>

            <div class="content-item">
                <div class="title">{{$t('storeValueAccountSettings')}}
                    <span class="add-span blue-color" @click="AddAccount">+ {{$t('newAccount')}}</span>
                </div>
                <div class="main">
                    <div class="table-wrap">
                        <table-com
                            :table-com-min-height="320"
                            :column-data="columnData"
                            :table-data="tableData"
                            :border="false">
                            <el-table-column
                                slot="column1"
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
                            <el-table-column
                                slot="column2"
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
                            <el-table-column
                                slot="column3"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <li class="blue-label" @click="showModifyAccountModal(scope.row, scope.$index)">{{$t('editAccount')}}</li>
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </div>
                </div>
            </div>

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
                              :all-node="defaultAllTable"
                              @updata-list="submitFundsAccount"></modify-account-modal>

        <!--默认账户本金/赠送金额可使用范围设置modal-->
        <modify-range-modal ref="modifyRange"
                            :length="tableData.length"
                            :table-data="listAmountRangeTable"
                            :all-node="defaultAllTable"
                            @updata-list="submitFundsAccount"></modify-range-modal>

        <!--储值赠送金额比例设置modal-->
        <send-rate-modal ref="sendRate"
                         :length="settingData.donateWhileRecharge.length"
                         :table-data="listAccountTable"
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
    import {validator} from 'klwk-ui';

    export default {
        components: {
            headerTabs,
            addAccountModal,
            modifyAccountModal,
            modifyRangeModal,
            sendRateModal,
            tableCom,
        },
        data () {
            return {
                //设置id
                id:'',
                //当前页面路由名称
                routerName: 'fundSetting',
                //设置数据
                settingData: {
                    //储值密码设置
                    passwdForRechargeAccount: 'true',
                    //储值积分、成长值比例设置
                    scoreGrowthFromCharging: {
                        storedAndGrowthType: 'true',//Boolean
                        moneyToIntegrate: '1',//储值额-积分 Number
                        integrate: 1,//积分
                        moneyToGrowth: '1',//储值额-成长值 Number
                        growth: 1,//成长值
                    },
                    //储值获得积分、成长值生效设置
                    scoreGrowthEffModeWhileCharging: {
                        storedType: 'immediately',
                        storedTime: '24',//Number
                    },
                    //转账扣除手续费比例
//                    commissionOfTransfermation: '',
                    //储值赠送金额比例设置
                    donateWhileRecharge: [],
                },
                //copy数据，用于数据重置
                copySetData: {},
                //储值赠送金额应用范围
                listAccountTable: [],
                //收款方式设置
                payIndex: 1,
                //表单数据
                formDynamic: {
                    pay: [],
                },
                //表格数据--储值账户列表
                tableData: [],
                //表头数据
                columnData: [
                    {
                        title: 'accountName',
                        minWidth: 140,
                        field: 'accountName',
                    },
                    {
                        title: 'principal',
                        minWidth: 110,
                        field: 'id'
                    },
                    {
                        title: 'giftSum',
                        minWidth: 110,
                        field: 'id'
                    },
                    {
                        title: 'operate',
                        minWidth: 110,
                        enMinWidth: 140,
                        field: 'id'
                    },
                ],
                //获取储值账户-(本金/赠送金额)应用范围
                listAmountRangeTable: [],
                sendRangeTable: [],
                //获取储值账户-(本金/赠送金额)应用范围(包含自己，用于默认账户)
                defaultAllTable: [],
                //输入框校验错误显示
                error: {
                    moneyToIntegrateError: '',//储值额-积分
                    moneyToGrowthError: '',//储值额--成长值
                    storedTimeError: '',//储值获得积分、成长值生效设置
                },
                //布尔型
                boolProps: ['storedAndGrowthType'],
                //Number型
                numberProps: ['moneyToIntegrate','moneyToGrowth','storedTime'],
                //String型
                stringProps: ['moneyToIntegrate','moneyToGrowth','storedTime','storedAndGrowthType'],
            }
        },
        watch: {

            //成长值生效设置
            'settingData.scoreGrowthFromCharging.storedAndGrowthType' : function (newVal, oldVal) {
                if(newVal !== 'true'){
                    this.error.moneyToIntegrateError = '';
                    this.error.moneyToGrowthError = '';
                }
            },

            //储值获得积分、成长值生效设置
            'settingData.scoreGrowthEffModeWhileCharging.storedType' : function (newVal, oldVal) {
                if(newVal !== 'checkout_after'){
                    this.error.storedTimeError = '';
                }
            },

        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
            //查询收款方式
            this.queryPaymentType();
            //查询储值账户
            this.queryMemberAccountDefine();
            //获取储值赠送金额应用范围
            this.listAccount();
            //获取储值账户-(本金/赠送金额)应用范围
            this.getSubNode();
            ///获取储值账户-(本金/赠送金额)应用范围(包含自己，用于默认账户)
            this.getSubNodeAndSelf();
        },
        methods: {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                        break;
                    case 'boolean':
                        return Boolean(data);
                        break;
                    case 'string':
                        return data!==null ? String(data) : '';
                        break;
                }
            },

            //获取储值赠送金额应用范围
            listAccount () {
                ajax.post('listAccount', {}).then(res => {
                    if( res.success ) {
                        this.listAccountTable = res.data || [];
                    }
                })
            },
            //获取储值账户-(本金/赠送金额)应用范围(无自己)
            getSubNode () {
                ajax.post('getSubNode', {
                    orgType: 'scenic',
                    includeMe: 'false',
                }).then(res => {
                    if( res.success ) {
                        this.listAmountRangeTable = defaultsDeep([], res.data );
                        this.sendRangeTable = defaultsDeep([], res.data );
                    }
                })
            },
            //查询下级店铺，包含自己，用于默认账户编辑
            getSubNodeAndSelf () {
                ajax.post('getSubNode', {
                    orgType: 'scenic',
                    includeMe: 'true',
                }).then(res => {
                    if( res.success ) {
                        this.defaultAllTable = defaultsDeep([], res.data );
                    }
                })
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if( res.success){
                        if(res.data){
                            this.id = res.data.id;
                            if(res.data.id){
                                //处理数据
                                let params = {
                                    passwdForRechargeAccount: res.data.passwdForRechargeAccount || 'true',
                                    scoreGrowthFromCharging: res.data.scoreGrowthFromCharging ?
                                        JSON.parse(res.data.scoreGrowthFromCharging) : this.settingData.scoreGrowthFromCharging,
                                    scoreGrowthEffModeWhileCharging: res.data.scoreGrowthEffModeWhileCharging ?
                                        JSON.parse(res.data.scoreGrowthEffModeWhileCharging) : this.settingData.scoreGrowthEffModeWhileCharging,
                                    donateWhileRecharge: res.data.donateWhileRecharge ? JSON.parse(res.data.donateWhileRecharge) : [],
                                };
                                console.log(params)
                                for( let key in params){
                                    if(key && typeof (params[key]) === 'object' && Object.keys(params[key]).length > 0){
                                        for( let ckey in params[key]){
                                            if(this.stringProps.indexOf(ckey) > -1){
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
                        } else {
                            this.copySetData = defaultsDeep({}, this.settingData);
                        }
                    }
                })
            },
            //点击保存，校验信息，数据处理
            save () {
                if(this.checkInputFunc()){

                    let setParam = defaultsDeep({}, this.settingData);
                    console.log(setParam)
                    for( let key in setParam){
                        if(key && typeof (setParam[key]) === 'object' && Object.keys(setParam[key]).length > 0){
                            for( let ckey in setParam[key]){
                                if(this.boolProps.indexOf(ckey) > -1){
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'boolean');
                                }
                                if(this.numberProps.indexOf(ckey) > -1){
                                    setParam[key][ckey] = this.transPropsType(setParam[key][ckey], 'number');
                                }
                            }
                        }
                    }
                    setParam.id = this.id;
                    console.log(setParam)

                    let params = {
                        id: this.id,
                        passwdForRechargeAccount: setParam.passwdForRechargeAccount,
                        scoreGrowthFromCharging: JSON.stringify(setParam.scoreGrowthFromCharging),
                        scoreGrowthEffModeWhileCharging: JSON.stringify(setParam.scoreGrowthEffModeWhileCharging),
                        donateWhileRecharge: setParam.donateWhileRecharge.length > 0 ?
                            JSON.stringify(setParam.donateWhileRecharge) : '',
                    };
                    console.log(params)
                    this.basicSet(params);

                }
            },
            //会员储值设置-保存/修改
            basicSet ( params ) {
                ajax.post('basicSet', params).then(res => {
                    if( res.success){
                        this.$Message.success(this.$t('successTip',{tip : this.$t('saveStorageSetting')}));
                        this.findBasicSet();
                    }
                })
            },
            //点击取消重置数据
            resetFieldFunc () {
                if(this.copySetData !== {}){
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },

            //校验选项勾选是输入框是否填写，返回true/false
            checkInputFunc () {

                if(this.settingData.scoreGrowthEffModeWhileCharging.storedType === 'checkout_after' &&
                    !this.checkInputBlurFunc(this.settingData.scoreGrowthEffModeWhileCharging.storedTime, 'storedTimeError') ){
                    return false
                }

                if(this.settingData.scoreGrowthFromCharging.storedAndGrowthType === 'true' &&
                    ! this.checkInputBlurFunc(this.settingData.scoreGrowthFromCharging.moneyToIntegrate, 'moneyToIntegrateError') ){
                    return false
                }
                if(this.settingData.scoreGrowthFromCharging.storedAndGrowthType === 'true' &&
                    !this.checkInputBlurFunc(this.settingData.scoreGrowthFromCharging.moneyToGrowth, 'moneyToGrowthError') ){
                    return false
                }

                return true
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //校验不为空
                if(common.isNotEmpty(val)){
                    this.error[errorField] = '';
                }else{
                    this.error[errorField] = this.$t('inputField', {msg: ''});
                    return false
                }

                //校验表情符号
                if (val && val.isUtf16()) {
                    this.error[errorField] = this.$t('errorIrregular'); // 输入内容不合规则
                    return false
                } else {
                    this.error[errorField] = '';
                }
                //正整数，长度校验
                if(validator.isNumber(val)){
                    let numStr = String(val);
                    if(numStr.length < 1){
                        this.error[errorField] = this.$t('errorMinLength',{field : '',length : 1});
                        return false
                    }else if(numStr.length > 10){
                        this.error[errorField] = this.$t('errorMaxLength', {field : '',length : 10});
                        return false
                    }else{
                        if(Number.parseInt(val) === Number.parseFloat(val)){
                            if(val < 0){
                                this.error[errorField] = this.$t('fieldTypeError', {msg: ''});
                                return false
                            }else{
                                this.error[errorField] = '';
                            }
                        }else{
                            this.error[errorField] = this.$t('integetError', {msg: ''});
                            return false
                        }
                    }
                }else{
                    this.error[errorField] = this.$t('integetError', {msg: ''});
                    return false
                }

                return true
            },

            //查询收款方式
            queryPaymentType () {
                this.formDynamic.pay = [];
                ajax.post('queryPaymentType',{
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        if(res.data && res.data.length > 0){
                            res.data.forEach( (item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.pay.push(item);
                            })
                        }
                    }
                })
            },
            //增加/修改收款方式
            updatePaymentType ( data, index ) {
                ajax.post('updatePaymentType',{
                    payment: data.payment,
                }).then(res => {
                    if(res.success){
                        this.formDynamic.pay[index].disabled = true;
                        this.formDynamic.pay[index].active = true;
                        this.$Message.success(this.$t('successTip',{tip : this.$t('newCollectionMethod')}));
                    }
                })
            },
            //删除收款方式
            deletePay ( data, index ) {
                ajax.post('updatePaymentType',{
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip',{tip : this.$t('delCollectionMethod')}));
                        this.formDynamic.pay[index]._status = 0;
                    }
                })
            },
            //新增收款方式
            handleAddPay() {
                this.payIndex++;
                this.formDynamic.pay.push({
                    payment: '',
                    index: this.payIndex,
                    _status: 1,
                    disabled: false,
                });
            },
            //收款方式校验
            handleSubmitForPay ( data, index ) {
                this.$refs.formDynamic.validateField( 'pay.' + index + '.payment',  (valid) => {
                    if (valid === '') {
                        this.updatePaymentType(data, index);
                    }
                } );
            },
            //取消收款方式校验
            handleResetPay (data, index) {
                this.$refs.formDynamic.resetFields('pay.' + index + '.payment' );
                this.formDynamic.pay[index]._status = 0;
            },

            //删除储值赠送金额比例
            handleRemoveSendRate ( data, index ) {
                this.$Message.success(this.$t('successTip', {tip: 'del'}) + '!');   // 删除成功
                this.settingData.donateWhileRecharge.splice(index, 1);
            },
            //新增显示储值赠送金额比例
            addSendRate () {
                let item = {
                    lowerValue: 0,
                    topValue: 0,
                    gift: 0,
                    scope: '',
                    _status: 1,
                };
                let index = this.settingData.donateWhileRecharge.length;
                this.$refs.sendRate.show({ item, index}, 'add');
            },
            //保存后回调传参
            submitAddSend (data) {
                console.log(data)
                this.$set(this.settingData.donateWhileRecharge,data.index, data.item);
            },
            //点击‘应用范围’与‘修改’，显示储值赠送金额比例
            showSendRateModal ( item, index ) {
                this.$refs.sendRate.show({ item, index}, 'modify');
            },

            //查询储值账户
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryMemberAccountDefine '+ $t('queryFailure') +'！');
                    }
                })
            },
            //新增显示储值赠送金额比例
            AddAccount () {
                let item = {
                    accountBelonging: '',
                    accountName: '',
                    unit: this.$t('yuan'),
                    rate: '1',
                    rateNumerator: '1',
                    rateDenominator: '1',
                    exchangeToCash: 'false',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                };
                let index = this.tableData.length;
                this.$refs.addAccount.show({ item, index});
            },
            //保存后回调传参
            submitFundsAccount (data) {
                console.log(data)
                this.queryMemberAccountDefine();
            },
            //点击储值账户的应用设置，显示应用设置弹窗
            showRangeModal ( item, index, type ) {
                this.$refs.modifyRange.show({ item, index}, type);
            },
            //点击储值账户的编辑账户，显示编辑账户弹窗
            showModifyAccountModal ( item, index ) {
                this.$refs.modifyAccount.show({ item, index});
            },

        },
    }
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
            padding: 30px 60px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item{
                margin-bottom: 30px;

                /deep/ .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 690px;
                    padding-right: 55px;
                    width: 40%;
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
                }

                /deep/ .ivu-form-item-content{
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper{
                    margin-bottom: 0px !important;
                    margin-right: 5px;
                    width: 80%;
                }

                .title{
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
                    width: 510px;
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

