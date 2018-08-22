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
                        <Radio label="true">
                            <span>储值时不获得积分、成长值，消费时获取</span>
                        </Radio>
                        <Radio label="false">
                            <span>储值时获得积分、成长值，消费时不重复获得积分、成长值</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">储值
                        <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToIntegrate"
                               :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'false' ? true : false"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/> 元获取
                        <Input v-model.trim="settingData.scoreGrowthFromCharging.integrate"
                               :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'false' ? true : false"
                                type="text"
                                class="single-input"
                                placeholder="请输入"/>积分
                    </div>
                    <div class="check-group-wrap">储值
                        <Input v-model.trim="settingData.scoreGrowthFromCharging.moneyToGgowth"
                               :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'false' ? true : false"
                                type="text"
                                class="single-input"
                                placeholder="请输入"/> 元获取
                        <Input v-model.trim="settingData.scoreGrowthFromCharging.growth"
                               :disabled="settingData.scoreGrowthFromCharging.storedAndGrowthType !== 'false' ? true : false"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>成长值
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值获得积分、成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreGrowthEffModeWhileCharging.storedType" vertical>
                        <Radio label="immediately">
                            <span>值成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after">
                            <span>储值成功后</span>
                            <Input v-model.trim="settingData.scoreGrowthEffModeWhileCharging.storedTime"
                                   :disabled="settingData.scoreGrowthEffModeWhileCharging.storedType !== 'checkout_after' ? true : false"
                                   type="text"
                                   class="single-input"
                                   placeholder="请输入"/>
                            <span>个小时后失效</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <Form ref="formDynamic" :model="formDynamic" :label-width="20">

                <div class="content-item">
                    <div class="title">储值赠送金额比例设置 <span class="add-span blue-color" @click="addSendRate">+ 新增</span></div>
                    <div class="main">
                        <div class="ivu-form-item-wrap">
                            <FormItem
                                v-for="(item, index) in donateWhileRecharge"
                                v-if="item._status"
                                :key="index"
                                label="">
                                储值：
                                <Input type="text"
                                       :value="item.lowerValue"
                                       disabled
                                       placeholder="请输入"
                                       class="single-input"/> –
                                <Input type="text"
                                       :value="item.topValue"
                                       disabled
                                       placeholder="请输入"
                                       class="single-input"/> 赠送
                                <Input type="text"
                                       :value="item.gift"
                                       disabled
                                       placeholder="请输入"
                                       class="single-input"/> 元
                                <span class="add-span red-color" v-if="item.disabled && index > 0" @click="handleRemoveSendRate(item,index)">删除</span>
                                <span class="add-span blue-color" v-if="!item.disabled" @click="showSendRateModal(item,index)">应用范围</span>
                            </FormItem>
                        </div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">转账手续费扣除比例设置</div>
                    <div class="main">
                        <Input v-model.trim="settingData.commissionOfTransfermation"
                            type="text"
                            class="single-input"
                            placeholder="请输入"/>%
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">收款方式设置   <span class="blue-color add-span" @click="handleAddPay">+ 新增收款方式</span></div>
                    <div class="main">
                        <div class="ivu-form-item-wrap short-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.pay"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'pay.' + index + '.payment'"
                                :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.payment" placeholder="请输入"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deletePay(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForPay(item,index)">保存</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetPay(item,index)">取消</span>
                            </FormItem>
                        </div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">储值账户设置   <span class="add-span blue-color" @click="showAddAccountModal">+ 新增账户</span></div>
                    <div class="main">
                        <div class="table-wrap">
                            <el-table
                                :data="tableData"
                                :border="false"
                                style="width: 100%">
                                <el-table-column
                                    prop="accountName"
                                    label="账户名称">
                                </el-table-column>
                                <el-table-column
                                    prop="id"
                                    label="本金">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showRangeModal(scope.row)">应用设置</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="id"
                                    label="赠送金额">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showRangeModal(scope.row)">应用设置</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="id"
                                    label="操作">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showModifyAcocuntModal(scope.row)">编辑账户</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>

            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="basicSet">保存</Button>
            <Button type="ghost" @click="resetFieldFunc">取消</Button>
        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"></add-account-modal>

        <!--编辑账户modal-->
        <modify-account-modal ref="modifyAccount"></modify-account-modal>

        <!--默认账户本金/赠送金额可使用范围设置modal-->
        <modify-range-modal ref="modifyRange"></modify-range-modal>

        <!--储值赠送金额比例设置modal-->
        <send-rate-modal ref="sendRate"></send-rate-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import headerTabs from './components/headerTabs.vue';
    import addAccountModal from './components/addAccountModal.vue';
    import modifyAccountModal from './components/modifyAccountModal.vue';
    import modifyRangeModal from './components/modifyRangeModal.vue';
    import sendRateModal from './components/addSendRateModal.vue'

    export default {
        components: {
            headerTabs,
            addAccountModal,
            modifyAccountModal,
            modifyRangeModal,
            sendRateModal,
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
                //储值赠送金额比例设置
                donateIndex: 1,
                //储值赠送金额应用范围
                listAccount: [],
                donateWhileRecharge: [
                    {
                        lowerValue: 100,
                        topValue: 199,
                        gift: 5,
                        scope: '可用账号id',
                        index: 1,
                        _status: 1,
                        disabled: true,
                    },
                ],
                //收款方式设置
                payIndex: 1,
                // 表单数据
                formDynamic: {
                    pay: [],
                },
                // 表格数据
                tableData: [
                    {
                        accountName: "本金账户",
                        accountType: "charging",
                        companyId: "1",
                        createUser: "1",
                        createdTime: 1534313030000,
                        defaultAccount: "true",
                        id: "1",
                        isDeleted: "false",
                        rate: 1,
                        unit: "1",
                    }
                ],
            }
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
        },
        methods: {

            //获取储值赠送金额应用范围
            listAccount () {
                ajax.post('listAccount', {}).then(res => {
                    if( res.success ) {
                        this.listAccount = res.data || [];
                    }
                })
            },

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {
                    companyId: 1,
                    orgId: 101,
                } ).then(res => {
                    if( res.success){
                        if(res.data){
                            this.id = res.data.id;
                            if(res.data.passwdForRechargeAccount){
                                //处理数据
                                let params = {
                                    passwdForRechargeAccount: res.data.passwdForRechargeAccount,
                                    scoreGrowthFromCharging: JSON.parse(res.data.scoreGrowthFromCharging),
                                    scoreGrowthEffModeWhileCharging: JSON.parse(res.data.scoreGrowthEffModeWhileCharging),
                                    commissionOfTransfermation: res.data.commissionOfTransfermation,
                                    donateWhileRecharge: JSON.parse(res.data.donateWhileRecharge),
                                };
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
                console.log({
                    passwdForRechargeAccount: this.settingData.passwdForRechargeAccount,
                    scoreGrowthFromCharging: JSON.stringify(this.settingData.scoreGrowthFromCharging),
                    scoreGrowthEffModeWhileCharging: JSON.stringify(this.settingData.scoreGrowthEffModeWhileCharging),
                    commissionOfTransfermation: this.settingData.commissionOfTransfermation,
                    donateWhileRecharge: JSON.stringify(this.settingData.donateWhileRecharge),
                });
                /*ajax.post('basicSet', {
                    id: this.id,
                    passwdForRechargeAccount: this.settingData.scoreEffectiveMode,
                    scoreGrowthFromCharging: JSON.stringify(this.settingData.scoreGrowthFromCharging),
                    scoreGrowthEffModeWhileCharging: JSON.stringify(this.settingData.scoreGrowthEffModeWhileCharging),
                    commissionOfTransfermation: this.settingData.commissionOfTransfermation,
                    donateWhileRecharge: JSON.stringify(this.settingData.donateWhileRecharge),
                }).then(res => {
                    if( res.success){
                        this.$Message.success('保存储值设置成功!');
                        this.findBasicSet();
                    }
                })*/
            },
            //点击取消重置数据
            resetFieldFunc () {
                if(this.copySetData !== {}){
                    this.settingData = defaultsDeep({}, this.copySetData);
                }
            },

            //查询收款方式
            queryPaymentType () {
                this.formDynamic.pay = [];
                ajax.post('queryPaymentType',{
                    orgId: '',
                    companyId: '',
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
                    orgId: '101',
                    companyId: '1',
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
                his.$Message.success('删除成功!');
                this.donateWhileRecharge[index]._status = 0;
            },
            //新增显示储值赠送金额比例
            addSendRate () {
                let item = {
                    lowerValue: 0,
                    topValue: 0,
                    gift: 0,
                    scope: '可用账号id',
                    index: this.donateIndex,
                    _status: 1,
                    disabled: true,
                };
                let index = this.donateIndex;
                this.$refs.sendRate.show({ item, index}, 'add');
            },
            //点击‘应用范围’与‘修改’，显示储值赠送金额比例
            showSendRateModal ( item, index ) {
                this.$refs.sendRate.show({ item, index}, 'modify');
            },

            //查询储值账户
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    orgId: '101',
                    companyId: '1',
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                    }
                })
            },

            //点击新增储值账户，显示新增弹窗
            showAddAccountModal() {
                this.$refs.addAccount.show();
            },

            //点击储值账户的应用设置，显示应用设置弹窗
            showRangeModal () {
                this.$refs.modifyRange.show();
            },

            //点击储值账户的编辑账户，显示编辑账户弹窗
            showModifyAcocuntModal () {
                this.$refs.modifyAccount.show();
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
                    min-width: 650px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 650px;
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
            padding-left: 50px;
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

