<template>
    <!--会员管理--储值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">储值密码设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.passwdForRechargeAccount" vertical>
                        <Radio label="false">
                            <span>消费时无需要密码验证，提供个人信息等</span>
                        </Radio>
                        <Radio label="true">
                            <span>消费时需要密码验证</span>
                            <span class="yellow-color">（刷二维码即可或其他短信发送随机密码）</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值积分、成长值比例设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreGrowthFromCharging.storedAndGrowthType" vertical>
                        <Radio label="false">
                            <span>储值时不获得积分、成长值，消费时获取</span>
                        </Radio>
                        <Radio label="true">
                            <span>储值时获得积分、成长值，消费时不重复获得积分、成长值</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">储值
                        <span :class="{'ivu-form-item-error': error.moneyToIntegrateError}">
                            <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToIntegrate"
                                 :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'true' ? true : false"
                                 @on-blur="checkInputBlurFunc(settingData.scoreGrowthFromCharging.moneyToIntegrate,'moneyToIntegrateError')"
                                 type="text"
                                 class="single-input"
                                 :placeholder="$t('inputField', {field: ''})"/> 元获取
                            <span class="ivu-form-item-error-tip"
                                   style="left: 92px;"
                                   v-if="error.moneyToIntegrateError">{{error.moneyToIntegrateError}}</span>
                        </span>
                        <span> 1 积分</span>
                    </div>
                    <div class="check-group-wrap">储值
                        <span :class="{'ivu-form-item-error': error.moneyToGgowthError}">
                              <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToGgowth"
                                     :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'true' ? true : false"
                                     @on-blur="checkInputBlurFunc(settingData.scoreGrowthFromCharging.moneyToGgowth,'moneyToGgowthError')"
                                     type="text"
                                     class="single-input"
                                     :placeholder="$t('inputField', {field: ''})"/> 元获取
                              <span class="ivu-form-item-error-tip"
                                   style="left: 92px;"
                                   v-if="error.moneyToGgowthError">{{error.moneyToGgowthError}}</span>
                        </span>
                        <span> 1 成长值</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值获得积分、成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreGrowthEffModeWhileCharging.storedType" vertical>
                        <Radio label="immediately">
                            <span>储值成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after" :class="{'ivu-form-item-error': error.growthTimeError}">
                            <span>储值成功后</span>
                            <Input v-model.trim="settingData.scoreGrowthEffModeWhileCharging.storedTime"
                                   :disabled="settingData.scoreGrowthEffModeWhileCharging.storedType !== 'checkout_after' ? true : false"
                                   @on-blur="checkInputBlurFunc(settingData.scoreGrowthEffModeWhileCharging.storedTime,'growthTimeError')"
                                   type="text"
                                   class="single-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>个小时后失效</span>
                            <span class="ivu-form-item-error-tip"
                                  style="left: 113px;"
                                  v-if="error.growthTimeError">{{error.growthTimeError}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值赠送金额比例设置 <span class="add-span blue-color" @click="addSendRate">+ 新增</span></div>
                <div class="main" v-if="settingData.donateWhileRecharge.length > 0">
                    <div class="ivu-form-item-wrap">
                        <template v-for="(item, index) in settingData.donateWhileRecharge">
                            <div :key="index" class="send-money-wrap" v-if="item._status">
                                <span class="label">储值：</span>
                                <Input type="text"
                                       :value="item.lowerValue"
                                       disabled
                                       :placeholder="$t('inputField', {field: ''})"
                                       class="single-input"/> –
                                <Input type="text"
                                       :value="item.topValue"
                                       disabled
                                       :placeholder="$t('inputField', {field: ''})"
                                       class="single-input"/> 赠送
                                <Input type="text"
                                       :value="item.gift"
                                       disabled
                                       :placeholder="$t('inputField', {field: ''})"
                                       class="single-input"/> 元
                                <span class="add-span blue-color"
                                      @click="showSendRateModal(item,index)">{{$t('applicationScope')}}</span><!--应用范围-->
                                <span class="add-span blue-color"
                                      @click="showSendRateModal(item,index)">修改</span>
                                <span class="add-span red-color"
                                      @click="handleRemoveSendRate(item,index)">删除</span>
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
                <div class="title">收款方式设置   <span class="blue-color add-span" @click="handleAddPay">+ 新增收款方式</span></div>
                <div class="main">
                    <Form ref="formDynamic" :model="formDynamic" :label-width="20">
                        <div class="ivu-form-item-wrap short-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.pay"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'pay.' + index + '.payment'"
                                :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.payment" :placeholder="$t('inputField', {field: ''})"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deletePay(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForPay(item,index)">{{$t("save")}}</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetPay(item,index)">取消</span>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值账户设置   <span class="add-span blue-color" @click="AddAccount">+ 新增账户</span></div>
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
                                        <li class="blue-label" @click="showRangeModal(scope.row, scope.$index, 'money')">应用设置</li>
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
                                        <li class="blue-label" @click="showRangeModal(scope.row, scope.$index, 'send')">应用设置</li>
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
                                        <li class="blue-label" @click="showModifyAccountModal(scope.row, scope.$index)">编辑账户</li>
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </div>
                </div>
            </div>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="basicSet">{{$t("save")}}</Button>
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
                        storedAndGrowthType: 'true',
                        moneyToIntegrate: '1',//储值额-积分
                        integrate: '1',//积分
                        moneyToGgowth: '1',//储值额-成长值
                        growth: '1',//成长值
                    },
                    //储值获得积分、成长值生效设置
                    scoreGrowthEffModeWhileCharging: {
                        storedType: 'immediately',
                        storedTime: '24',
                    },
                    //转账扣除手续费比例
                    commissionOfTransfermation: '2',
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
                        title: '账户名称',
                        minWidth: 140,
                        field: 'accountName',
                    },
                    {
                        title: '本金',
                        minWidth: 110,
                        field: 'id'
                    },
                    {
                        title: '赠送金额',
                        minWidth: 110,
                        field: 'id'
                    },
                    {
                        title: '操作',
                        minWidth: 110,
                        field: 'id'
                    },
                ],
                //获取储值账户-(本金/赠送金额)应用范围
                listAmountRangeTable: [],
                sendRangeTable: [],
                //输入框校验错误显示
                error: {
                    moneyToIntegrateError: '',//储值额-积分
                    moneyToGgowthError: '',//储值额--成长值
                    storedTimeError: '',//储值获得积分、成长值生效设置
                },
            }
        },
        watch: {

            //成长值生效设置
            'settingData.scoreGrowthFromCharging.storedAndGrowthType' : function (newVal, oldVal) {
                if(newVal !== 'true'){
                    this.error.moneyToIntegrateError = '';
                    this.error.moneyToGgowthError = '';
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
        },
        methods: {

            //获取储值赠送金额应用范围
            listAccount () {
                ajax.post('listAccount', {}).then(res => {
                    if( res.success ) {
                        this.listAccountTable = res.data || [];
                    }
                })
            },
            //获取储值账户-(本金/赠送金额)应用范围
            getSubNode () {
                ajax.post('getSubNode', {
                    orgType: 'scenic'
                }).then(res => {
                    if( res.success ) {
                        this.listAmountRangeTable = defaultsDeep([], res.data );
                        this.sendRangeTable = defaultsDeep([], res.data );
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
                                    commissionOfTransfermation: res.data.commissionOfTransfermation,
                                    donateWhileRecharge: res.data.donateWhileRecharge ? JSON.parse(res.data.donateWhileRecharge) : [],
                                };
                                console.log(params)
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
            //会员基础设置-保存/修改
            basicSet () {
                if(this.checkInputFunc()){
                    ajax.post('basicSet', {
                        id: this.id,
                        passwdForRechargeAccount: this.settingData.scoreEffectiveMode,
                        scoreGrowthFromCharging: JSON.stringify(this.settingData.scoreGrowthFromCharging),
                        scoreGrowthEffModeWhileCharging: JSON.stringify(this.settingData.scoreGrowthEffModeWhileCharging),
//                    commissionOfTransfermation: this.settingData.commissionOfTransfermation,
                        donateWhileRecharge: this.settingData.donateWhileRecharge.length > 0 ?
                            JSON.stringify(this.settingData.donateWhileRecharge) : '',
                    }).then(res => {
                        if( res.success){
                            this.$Message.success('保存储值设置成功!');
                            this.findBasicSet();
                        }
                    })
                }
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
                    !this.validateInput(this.settingData.scoreGrowthEffModeWhileCharging.storedTime)){
                    this.checkInputBlurFunc(this.settingData.scoreGrowthEffModeWhileCharging.storedTime, 'storedTimeError');
                    return false
                }

                if(this.settingData.scoreGrowthFromCharging.storedAndGrowthType === 'true' &&
                    !this.validateInput(this.settingData.scoreGrowthFromCharging.moneyToIntegrate) ){
                    this.checkInputBlurFunc(this.settingData.scoreGrowthFromCharging.moneyToIntegrate, 'moneyToIntegrateError');
                    return false
                }
                if(this.settingData.scoreGrowthFromCharging.storedAndGrowthType === 'true' &&
                    !this.validateInput(this.settingData.scoreGrowthFromCharging.moneyToGgowth) ){
                    this.checkInputBlurFunc(this.settingData.scoreGrowthFromCharging.moneyToGgowth, 'moneyToGgowthError');
                    return false
                }

                return true
            },

            //校验input输入
            validateInput ( value ) {
                if( value === '' || value === 'null' || value == 0 || !value ){
                    return false
                } else if( value && value.length > 10 ){
                    return false
                } else if( value && value.isUtf16() ){
                    return false
                } else {
                    return true
                }
            },

            /**
             * 输入框失焦校验
             * @param val 值
             * @param errorField 校验错误显示字段
             */
            checkInputBlurFunc ( val, errorField ) {

                //为空校验
                if( val === '' || val === 'null' || val == 0 || !val){
                    this.error[errorField] = '不能为空';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //长度校验
                if (val && val.length > 10) {
                    this.error[errorField] = '不能超过10个';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //校验表情符号
                if (val && val.isUtf16()) {
                    this.error[errorField] = '输入内容不合规则';
                    return
                } else {
                    this.error[errorField] = '';
                }

                //校验正整数
                if(val){
                    common.validateInteger(val).then(() => {
                        this.error[errorField] = '';
                    }).catch(err => {
                        this.error[errorField] = err;
                        return
                    });
                }

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
                        this.$Message.success('新增收款方式成功!');
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
                        this.$Message.success('删除收款方式成功!');
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
                this.$Message.success('删除成功!');
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
                    unit: '元',
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
                    width: 480px;
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

