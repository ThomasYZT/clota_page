<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">会员积分生效设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreEffectiveMode.isIntegralType" vertical>
                        <Radio label="immediately">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after">
                            <span>消费、核销成功后
                                <Input v-model.trim="settingData.scoreEffectiveMode.isNoIntegralTime"
                                       :disabled="settingData.scoreEffectiveMode.isIntegralType !== 'checkout_after' ? true : false"
                                       type="text"
                                       placeholder="请输入"
                                       class="single-input"/>
                                时后生效</span>
                        </Radio>
                    </RadioGroup>
                 </div>
            </div>

            <div class="content-item">
                <div class="title">会员生日积分多倍积分</div>
                <div class="main">
                    <i-switch v-model="settingData.scoreMultipleOnBirthday.isSwitch"></i-switch>
                    <span class="text">会员生日当天消费可获得
                        <Input v-model.trim="settingData.scoreMultipleOnBirthday.multiple"
                               :disabled="!settingData.scoreMultipleOnBirthday.isSwitch"
                               :maxlength="10"
                               @on-blur="validateInput(settingData.scoreMultipleOnBirthday.multiple)"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        倍积分</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员积分有效期设置</div>
                <div class="main">
                    <RadioGroup v-model="settingData.scoreValidityPeriod.validityType" vertical>
                        <Radio label="perpetual">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="months_effective">
                            <span>获得积分
                                <Input v-model.trim="settingData.scoreValidityPeriod.validityTime"
                                       :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective' ? true : false"
                                       :maxlength="10"
                                       @on-blur="validateInput(settingData.scoreValidityPeriod.validityTime)"
                                       type="text"
                                       class="single-input"
                                       placeholder="请输入"/>
                                个月后失效，清除</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">
                        <Checkbox v-model="settingData.scoreValidityPeriod.checked"
                                  :disabled="settingData.scoreValidityPeriod.validityType !== 'months_effective' ? true : false">
                        </Checkbox>清除积分前
                        <Input v-model.trim="settingData.scoreValidityPeriod.remind"
                               :disabled="!settingData.scoreValidityPeriod.checked"
                               :maxlength="10"
                               @on-blur="validateInput(settingData.scoreValidityPeriod.remind)"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        天短信提醒，
                        <span class="blue-color">短信设置</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员卡有效期设置</div>
                <div class="main margin-radio-group">
                    <RadioGroup v-model="settingData.memberValidPeriod.Type" vertical>
                        <Radio label="perpetual">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="vipValidityTime">
                            <span>最后一次消费
                             <Input v-model.trim="settingData.memberValidPeriod.vipValidityTime"
                                    :disabled="settingData.memberValidPeriod.Type !== 'vipValidityTime' ? true : false"
                                    :maxlength="10"
                                    @on-blur="validateInput(settingData.memberValidPeriod.vipValidityTime)"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后如未使用，冻结该会员卡</span>
                        </Radio>
                        <Radio label="vipValidity">
                            <span>开卡
                             <Input v-model.trim="settingData.memberValidPeriod.vipValidityType"
                                    :disabled="settingData.memberValidPeriod.Type !== 'vipValidity' ? true : false"
                                    :maxlength="10"
                                    @on-blur="validateInput(settingData.memberValidPeriod.vipValidityType)"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后冻结该会员卡</span>
                        </Radio>
                        <Radio label="vipNumber">
                            <span>会员卡使用
                             <Input v-model.trim="settingData.memberValidPeriod.vipNumber"
                                    :disabled="settingData.memberValidPeriod.Type !== 'vipNumber' ? true : false"
                                    :maxlength="10"
                                    @on-blur="validateInput(settingData.memberValidPeriod.vipNumber)"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后冻结该会员卡</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">卡券过期提醒设置</div>
                <div class="main">
                    <i-switch v-model="settingData.notificationBeforeCouponExpire.isSwitch"></i-switch>
                    <span class="text">卡券过期前
                        <Input v-model.trim="settingData.notificationBeforeCouponExpire.day"
                               :disabled="!settingData.notificationBeforeCouponExpire.isSwitch"
                               :maxlength="10"
                               @on-blur="validateInput(settingData.notificationBeforeCouponExpire.day)"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/> 天短信提醒，
                        <span class="blue-color">短信设置</span>
                    </span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时积分是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="settingData.handingWithScoreGrowthWhileRefund.score" vertical>
                        <Radio label="true">
                            <span>用户退款时积分不退</span>
                        </Radio>
                        <Radio label="false">
                            <span>用户退款时积分退回用户积分账户中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时卡券是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="settingData.handingWithScoreGrowthWhileRefund.coupon" vertical>
                        <Radio label="true">
                            <span>用户退款时卡券不退</span>
                        </Radio>
                        <Radio label="false">
                            <span>用户退款时卡券退回用户会员卡中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <Form ref="formDynamic" :model="formDynamic" :label-width="50">

                <div class="content-item">
                    <div class="title">修改会员储值、积分、虚拟账户余额设置</div>
                    <div class="main">
                        <RadioGroup v-model="settingData.allowAdjustAccount" vertical>
                            <Radio label="false">
                                <span>不允许修改会员的储值、积分、虚拟账户</span>
                            </Radio>
                            <Radio label="true">
                                <span>允许修改会员的储值、积分、虚拟账户,如允许修改，请设置修改原因
                                    <span class="add-span blue-color"
                                          v-if="settingData.allowAdjustAccount === 'true'"
                                          @click="handleAddReason">+ 新增修改原因</span>
                                </span>
                            </Radio>
                        </RadioGroup>
                        <div class="ivu-form-item-wrap"  v-show="settingData.allowAdjustAccount === 'true' ? true : false" >
                            <FormItem
                                v-for="(item, index) in formDynamic.reason"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'reason.' + index + '.reason'"
                                :rules="{required: true, message: '修改原因不能为空', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.reason" :maxlength="100" placeholder="请输入"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deleteReason(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForReason(item,index)">保存</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetReason(item,index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

                <div class="content-item">
                    <div class="title">证件类型设置   <span class="blue-color add-span" @click="handleAddIdType">+ 新增证件类型</span></div>
                    <div class="main">

                        <div class="ivu-form-item-wrap short-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.idType"
                                v-if="item._status"
                                :key="index"
                                label=""
                                :prop="'idType.' + index + '.name'"
                                :rules="{required: true, message: '证件类型不能为空', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model.trim="item.name" :maxlength="10" placeholder="请输入"/>
                                <span class="span-bottom red-color" v-if="item.active && index > 0" @click="deleteDocument(item,index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.active" @click="handleSubmitForIdType(item,index)">保存</span>
                                <span class="span-bottom grey-color" v-if="!item.active" @click="handleResetDocument(item,index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="basicSet">保存</Button>
            <Button type="ghost" @click="resetFieldFunc">取消</Button>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import headerTabs from './components/headerTabs.vue';

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //用于动态表单校验(特殊字符)
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
                //用于动态表单校验(选项点去重)
                /*itemRepeat: (rule, value, callback) => {
                    let desc = [];
                    let index = Number(rule.field.split('.')[1]);
                    this.formDynamic.options.forEach(function (item) {
                        if(item.desc){
                            desc.push(item.desc);
                        }
                    })
                    if (value && desc.length > 0 && desc.indexOf(value) > -1 && (desc.indexOf(value) !== index) ) {
                        callback(new Error('该选项已存在'));
                    } else {
                        callback();
                    }
                },*/
                //设置id
                id:'',
                //当前页面路由名称
                routerName: 'memberSetting',
                //设置数据
                settingData: {
                    //积分生效设置
                    scoreEffectiveMode: {
                        isIntegralType: 'checkout',
                        isNoIntegralTime: '24'
                    },
                    //会员生日积分多倍积分
                    scoreMultipleOnBirthday: {
                        isSwitch: true,
                        multiple: '2',
                    },
                    //会员积分有效期设置
                    scoreValidityPeriod: {
                        validityType: 'months_effective',
                        validityTime: '24',
                        checked: true,
                        remind: '60',
                    },
                    //会员卡有效期设置
                    memberValidPeriod: {
                        Type: 'vipValidityTime',//类型
                        perpetual: '',//是否永久
                        vipValidityType: '365',
                        vipValidityTime: '365',
                        vipNumber: '10',
                    },
                    //卡券过期提醒设置
                    notificationBeforeCouponExpire: {
                        isSwitch: true,
                        day: '60',
                    },
                    //用户退款时积分是否退还用户
                    handingWithScoreGrowthWhileRefund: {
                        score: 'false',
                        coupon: 'false',
                    },
                    //修改会员储值、积分、虚拟账户余额设置
                    allowAdjustAccount: 'true',
                },
                //copy数据，用于数据重置
                copySetData: {},
                //动态表单数据
                reasonIndex: 1,
                idTypeIndex: 1,
                formDynamic: {
                    reason: [],
                    idType: [],
                },
            }
        },
        watch: {
            //会员积分有效期设置
            'settingData.scoreValidityPeriod.validityType' : function (newVal, oldVal) {
                if(newVal === 'perpetual'){
                    this.settingData.scoreValidityPeriod.checked = false;
                }
                if(newVal === 'months_effective'){
                    this.settingData.scoreValidityPeriod.checked = true;
                }
            }
        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
            //查询证件类型
            this.queryDocument();
            //查询修改原因
            this.listAdjustReason();
        },
        methods: {

            //查询会员基础设置
            findBasicSet () {
                ajax.post('findBasicSet', {
                    companyId: 1,
                    orgId: 101,
                } ).then(res => {
                    if( res.success){
                        if(res.data){
                            this.id = res.data.id;
                            if(res.data.allowAdjustAccount){
                                //处理数据
                                let params = {
                                    scoreEffectiveMode: JSON.parse(res.data.scoreEffectiveMode),
                                    scoreMultipleOnBirthday: JSON.parse(res.data.scoreMultipleOnBirthday),
                                    scoreValidityPeriod: JSON.parse(res.data.scoreValidityPeriod),
                                    memberValidPeriod: JSON.parse(res.data.memberValidPeriod),
                                    notificationBeforeCouponExpire: JSON.parse(res.data.notificationBeforeCouponExpire),
                                    handingWithScoreGrowthWhileRefund: JSON.parse(res.data.handingWithScoreGrowthWhileRefund),
                                    allowAdjustAccount: res.data.allowAdjustAccount,
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
                if(this.checkInputFunc()){
                    ajax.post('basicSet', {
                        id: this.id,
                        scoreEffectiveMode: JSON.stringify(this.settingData.scoreEffectiveMode),
                        scoreMultipleOnBirthday: JSON.stringify(this.settingData.scoreMultipleOnBirthday),
                        scoreValidityPeriod: JSON.stringify(this.settingData.scoreValidityPeriod),
                        memberValidPeriod: JSON.stringify(this.settingData.memberValidPeriod),
                        notificationBeforeCouponExpire: JSON.stringify(this.settingData.notificationBeforeCouponExpire),
                        handingWithScoreGrowthWhileRefund: JSON.stringify(this.settingData.handingWithScoreGrowthWhileRefund),
                        allowAdjustAccount:this.settingData.allowAdjustAccount,
                    }).then(res => {
                        if( res.success){
                            this.$Message.success('保存基础设置成功!');
                            this.findBasicSet();
                        }
                    })
                } else {
                    this.$Message.warning("输入框不能为空");
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
                if(this.settingData.scoreEffectiveMode.isIntegralType === 'checkout_after' && !this.validateInput(this.settingData.scoreEffectiveMode.isNoIntegralTime)){
                    return false
                }

                if(this.settingData.scoreMultipleOnBirthday.isSwitch && !this.validateInput(this.settingData.scoreMultipleOnBirthday.multiple)){
                    return false
                }

                if(this.settingData.scoreValidityPeriod.validityType === 'months_effective' && !this.validateInput(this.settingData.scoreValidityPeriod.validityTime)){
                    return false
                }

                if(this.settingData.scoreValidityPeriod.checked && !this.validateInput(this.settingData.scoreValidityPeriod.validityTime)){
                    return false
                }

                if(this.settingData.memberValidPeriod.Type === 'vipValidityType' && !this.validateInput(this.settingData.memberValidPeriod.vipValidityType)){
                    return false
                }

                if(this.settingData.memberValidPeriod.Type === 'vipValidityTime' && !this.validateInput(this.settingData.memberValidPeriod.vipValidityTime)){
                    return false
                }

                if(this.settingData.memberValidPeriod.Type === 'vipNumber' && !this.validateInput(this.settingData.memberValidPeriod.vipNumber)){
                    return false
                }

                if(this.settingData.notificationBeforeCouponExpire.isSwitch && !this.validateInput(this.settingData.notificationBeforeCouponExpire.day)){
                    return false
                }

                return true
            },
            //校验input输入
            validateInput ( value ) {
                if( value === '' || value === 'null' || value == 0 || !value){
                    this.$Message.warning("输入框不能为空");
                    return false
                } else if( value && value.length > 10){
                    this.$Message.warning("当前输入字符不能超过10个");
                    return false
                } else if ( value && ( parseInt(value) < 0 || parseInt(value) + '' !== value + '' ) ) {
                    this.$Message.warning("当前输入只能是非负整数");
                    return false
                } else {
                    return true
                }
            },


            //查询证件类型
            queryDocument () {
                this.formDynamic.idType = [];
                ajax.post('queryDocument',{
                    orgId: '',
                    companyId: '',
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        if(res.data.data && res.data.data.length > 0){
                            res.data.data.forEach( (item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.idType.push(item);
                            })
                        }
                    }
                })
            },
            //增加/修改证件
            updateDocument ( data, index ) {
                ajax.post('updateDocument',{
                    orgId: '101',
                    companyId: '1',
                    name: data.name,
                }).then(res => {
                    if(res.success){
                        this.formDynamic.idType[index].disabled = true;
                        this.formDynamic.idType[index].active = true;
                        this.$Message.success('新增证件类型成功!');
                    }
                })
            },
            //删除证件类型
            deleteDocument ( data, index ) {
                ajax.post('updateDocument',{
                    id: data.id,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除证件类型成功!');
                        this.formDynamic.idType[index]._status = 0;
                    }
                })
            },
            //新增证件类型
            handleAddIdType() {
                this.idTypeIndex++;
                this.formDynamic.idType.push({
                    name: '',
                    index: this.idTypeIndex,
                    _status: 1,
                    disabled: false,
                });
            },
            //证件类型校验
            handleSubmitForIdType ( data, index ) {
                this.$refs.formDynamic.validateField( 'idType.' + index + '.name',  (valid) => {
                    if (valid === '') {
                        this.updateDocument(data, index);
                    }
                } );
            },
            //取消证件类型校验
            handleResetDocument (data, index) {
                this.$refs.formDynamic.resetFields('idType.' + index + '.name' );
                this.formDynamic.idType[index]._status = 0;
            },


            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{}).then(res => {
                    if(res.success){
                        if(res.data && res.data.length > 0){
                            res.data.forEach( (item, index) => {
                                item.index = index;
                                item._status = 1;
                                item.active = true;
                                item.disabled = true;
                                this.formDynamic.reason.push(item);
                            })
                        }
                    }
                })
            },
            //增加/修改原因
            updateReason ( data, index ) {
                ajax.post('addAdjustReason',{
                    reason: data.reason,
                }).then(res => {
                    if(res.success){
                        this.formDynamic.reason[index].disabled = true;
                        this.formDynamic.reason[index].active = true;
                        this.$Message.success('新增原因成功!');
                    }
                })
            },
            //删除原因
            deleteReason ( data, index ) {
                ajax.post('deleteAdjustReason',{
                    reasonId: data.id,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除原因成功!');
                        this.formDynamic.reason[index]._status = 0;
                    }
                })
            },
            //新增修改原因
            handleAddReason () {
                this.reasonIndex++;
                this.formDynamic.reason.push({
                    reason: '',
                    index: this.reasonIndex,
                    _status: 1,
                    disabled: false,
                });
            },
            //修改原因表单校验
            handleSubmitForReason ( data, index ) {
                this.$refs.formDynamic.validateField( 'reason.' + index + '.reason', (valid) => {
                    if (valid === '') {
                        this.updateReason(data, index);
                    }
                });
            },
            //取消证件类型校验
            handleResetReason (data, index) {
                this.$refs.formDynamic.resetFields('reason.' + index + '.reason' );
                this.formDynamic.reason[index]._status = 0;
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
                    /*display: inline-block;*/
                    min-width: 495px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 520px;
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
                    div{
                        margin-bottom: 10px;
                    }
                    &.margin-radio-group{
                        /deep/ .ivu-radio-wrapper{
                           margin-bottom: 10px;
                        }
                    }
                }
            }

            .add-span{
                font-size: $font_size_14px;
                margin-left: 20px;
            }

            .blue-color{
                font-size: $font_size_14px;
                color: $color_blue;
                cursor: pointer;
            }
            .red-color{
                font-size: $font_size_14px;
                color: $color_red;
                cursor: pointer;
            }
            .grey-color{
                font-size: $font_size_14px;
                color: $color-3F3F3F;
                cursor: pointer;
            }
            .span-bottom{
                vertical-align: bottom;
            }

        }

        /deep/ .ivu-input-wrapper{
            vertical-align: sub;

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
