<!--新增公司节点-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-company"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" v-w-title="addedNodeDetail.nodeName">{{addedNodeDetail.nodeName}}</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="170">
                <!--财务上级-->
                <FormItem :label="$t('fianceSuperior')" prop="fianceSuperior">
                    <!--<Select v-model="formData.fianceSuperior" style="width:280px">-->
                        <!--<Option v-for="item in parentEconomics  "-->
                                <!--:value="item.id"-->
                                <!--:key="item.id">-->
                            <!--{{ item.orgName }}-->
                        <!--</Option>-->
                    <!--</Select>-->
                    <select-tree v-model="formData.fianceSuperior"
                                 :tree="parentEconomics"
                                 width="278px">
                    </select-tree>
                </FormItem>
                <!--管理上级-->
                <FormItem :label="$t('manageSuperior')">
                    <!--<Select v-model="formData.manageSuperior" disabled style="width:280px">-->
                        <!--<Option v-for="item in parentManages"-->
                                <!--:value="item.id"-->
                                <!--:key="item.id">-->
                            <!--{{ item.orgName }}-->
                        <!--</Option>-->
                    <!--</Select>-->
                    <select-tree v-model="formData.manageSuperior"
                                 :tree="parentManages"
                                 disabled
                                 width="278px">
                    </select-tree>
                </FormItem>
                <!--管理账号-->
                <FormItem :label="$t('controlAccount')" prop="controlAccount">
                    <Input v-model.trim="formData.controlAccount" style="width: 280px"/>
                </FormItem>
                <!--电子邮箱-->
                <FormItem :label="$t('email')" prop="mail">
                    <Input v-model.trim="formData.mail" style="width: 280px"/>
                </FormItem>
                <!--短信服务商-->
                <FormItem :label="$t('smsProvider')" prop="smsProvider">
                    <Select v-model.trim="formData.smsProvider" style="width:280px">
                        <Option v-for="item in smsProviderList"
                                :value="item.id"
                                :key="item.id">
                            {{ item.provider }}
                        </Option>
                    </Select>
                </FormItem>
                <template v-if="formData.smsProvider === '3' || formData.smsProvider === '4'">
                    <!--第三方短信服务商账号-->
                    <FormItem :label="$t('thirdPartSmsAccount')" prop="smsProviderAccount">
                        <Input v-model.trim="formData.smsProviderAccount" style="width: 280px"/>
                    </FormItem>
                    <!--第三方短信服务商密码-->
                    <FormItem :label="$t('thirdPartSmsPassword')" prop="smsProviderPassword">
                        <Input v-model.trim="formData.smsProviderPassword"
                               type="password" style="width: 280px"/>
                    </FormItem>
                </template>
                <!--联系人-->
                <FormItem :label="$t('person')" prop="person">
                    <Input v-model.trim="formData.person" style="width: 280px"/>
                </FormItem>
                <!--联系电话-->
                <FormItem :label="$t('phone')" prop="phone">
                    <Input v-model.trim="formData.phone" style="width: 280px"/>
                </FormItem>
                <!--传真-->
                <FormItem :label="$t('fax')" prop="fax">
                    <Input v-model="formData.fax" style="width: 280px"/>
                </FormItem>
                <!--公司编码-->
                <FormItem :label="$t('enterpriseCode') + '(' + $t('offlineVerify') + ')'" prop="companyCode">
                    <Input v-model.trim="formData.companyCode" style="width: 280px"/>
                </FormItem>
                <div class="hint">用于与线下系统对接</div>
                <!--所在地-->
                <FormItem :label="$t('location')">
                    <city-plugin ref="cityPlugin"
                                 @select="formData.place = $event"
                                 style="width: 280px">
                    </city-plugin>
                </FormItem>
                <!--详细地址-->
                <FormItem :label="$t('address')" prop="address">
                    <Input v-model.trim="formData.address" type="textarea" style="width: 280px"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="ghost"
                class="ivu-btn-90px"
                @click="save('close')">保存，暂不启用</Button>
            <Button type="primary"
                class="ivu-btn-90px"
                @click="save('open')">保存，立即启用</Button>
        </div>
    </Modal>
</template>

<script>
    import { validator } from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';

    export default {
        components : {
            cityPlugin
        },
        props : {
            //绑定的模态框是否显示的变量
            value : {
                type : Boolean,
                default : false
            },
            //选择的父节点详情
            'chosed-node-detail' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //新增的节点详情
            'added-node-detail' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //根节点id
            'root-id' : {
                type : String,
                default : ''
            }
        },
        data () {
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                if (value) {
                    this.queryAccountExist().then((res) => {
                        if (res.status === 200) {
                            if (res.data) {
                                callback();
                            } else {
                                callback('管理账号已存在');
                            }
                        } else {
                            callback('账号校验失败');
                        }
                    }).catch(() => {
                        callback('管理账号已存在');
                    });
                } else {
                    callback(this.$t('inputField', { field : this.$t('controlAccount') }));
                }
            };
            //校验电子邮箱
            const validateMail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.emailError'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { msg : this.$t('email') }));
                }
            };
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.phoneError'));
                    }
                } else {
                    callback();
                }
            };
            return {
                //表单数据
                formData : {
                    //联系电话
                    phone : '',
                    //财务上级
                    fianceSuperior : '',
                    //管理上级
                    manageSuperior : '',
                    //传真
                    fax : '',
                    //公司编码
                    companyCode : '',
                    //管理账号
                    controlAccount : '',
                    //电子邮箱
                    mail : '',
                    //短信供应商
                    smsProvider : '',
                    //详细地址
                    address : '',
                    //地点
                    place : {},
                    //联系人
                    person : '',
                    //受理客服
                    service : '',
                    //第3方账号
                    smsProviderAccount : '',
                    //第2方密码
                    smsProviderPassword : ''
                },
                //表单校验规则
                ruleValidate : {
                    phone : [
                        { validator : validatePhone, trigger : 'blur' },
                    ],
                    fax : [
                        {
                            max : 20,
                            message : this.$t('errorMaxLength',{ field : this.$t('fax'),length : 20 }),
                            trigger : 'blur'
                        }
                    ],
                    fianceSuperior : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseSelect', { msg : this.$t('fianceSuperior') }),
                            trigger : 'change'
                        },
                    ],
                    controlAccount : [
                        { required : true, validator : validateControlAccount, trigger : 'blur' },
                        {
                            max : 20,
                            message : this.$t('errorMaxLength',{ field : this.$t('管理账号'),length : 20 }),
                            trigger : 'blur'
                        }
                    ],
                    mail : [
                        { required : true, validator : validateMail, trigger : 'blur' },
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('mail'),length : 100 }),trigger : 'blur' }
                    ],
                    smsProvider : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseSelect', { msg : this.$t('smsProvider') }),
                            trigger : 'change'
                        },
                    ],
                    person : [
                        { required : true,message : this.$t('validateError.pleaseInput',{ msg : this.$t('person') }) },
                        { max : 10,message : this.$t('errorMaxLength',{ field : this.$t('person'),length : 10 }),trigger : 'blur' }
                    ],
                    companyCode : [
                        { min : 2,max : 8,message : this.$t('scopeLimit'),trigger : 'blur' },
                    ],
                    address : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('address'),length : 100 }),trigger : 'blur' }
                    ],
                    smsProviderAccount : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('thirdPartSmsAccount') }),
                            trigger : 'blur'
                        },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('thirdPartSmsAccount'),length : 20 }),trigger : 'blur' },
                    ],
                    smsProviderPassword : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('thirdPartSmsPassword') }),
                            trigger : 'blur'
                        },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('thirdPartSmsPassword'),length : 20 }),trigger : 'blur' },
                    ],
                },
                //短信供应商列表
                smsProviderList : [],
                //财务上级列表
                parentEconomics : [],
                //管理上级
                parentManages : []
            };
        },
        watch : {
            //监听选择的父节点信息
            'chosedNodeDetail' : {
                handler (newVal, oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.fianceSuperior = newVal.id;
                        this.formData.manageSuperior = newVal.id;
                    }
                },
                immediate : true
            }
        },
        methods : {
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    this.resetFormData();
                    this.$refs.formValidate.resetFields();
                    this.$refs.cityPlugin.onClickSuffix();
                } else {
                    this.getParentManages();
                    this.querySmsProviderList();
                    this.getSysAccountByToken();
                    this.formData.fianceSuperior = this.chosedNodeDetail.id;
                    this.formData.manageSuperior = this.chosedNodeDetail.id;
                }
            },
            /**
             * 保存新增租户数据
             * @params{string} status 保存节点的状态
             */
            save (status) {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addOrgInfo(status);
                    }
                });
            },
            /**
             * 初始化表单数据
             */
            resetFormData () {
                for (let item in this.formData) {
                    this.formData[item] = '';
                }
            },
            /**
             * 调用新增公司的接口
             */
            addCompany () {
                this.$emit('fresh-structure-data');
                this.$emit('input', false);
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 获取财务上级和经营上级
             */
            getParentManages () {
                ajax.post('getParentManages',{
                    id : this.chosedNodeDetail.id
                }).then(res => {
                    if (res.status === 200) {
                        this.parentEconomics = res.data ? [res.data.parentEconomics] : [];
                        this.parentManages = res.data ? [res.data.parentManages] : [];
                    } else {
                        this.parentEconomics = [];
                        this.parentManages = [];
                    }
                });
            },
            /**
             * 获取短信供应商列表
             */
            querySmsProviderList () {
                ajax.post('smsProviderList',{
                    page : 1,
                    pageSize : 9999
                }).then(res => {
                    if (res.status === 200) {
                        this.smsProviderList = res.data.list ? res.data.list : [];
                    } else {
                        this.smsProviderList = [];
                    }
                });
            },
            /**
             * 新增下属公司
             * @params{string} status 保存节点的状态
             */
            addOrgInfo (status) {
                ajax.post('addOrgInfo',{
                    rootId : this.chosedNodeDetail.id,
                    orgName : this.addedNodeDetail.nodeName,
                    loginName : this.formData.controlAccount,
                    email : this.formData.mail,
                    smsProviderId : this.formData.smsProvider,
                    linkName : this.formData.person,
                    telephone : this.formData.phone,
                    tex : this.formData.fax,
                    checkinCode : this.formData.companyCode,
                    provinceid : this.placeInfo.provinceid,
                    cityid : this.placeInfo.cityid,
                    districtid : this.placeInfo.areaid,
                    address : this.formData.address,
                    parentEconomicId : this.formData.fianceSuperior,
                    parentManageId : this.formData.manageSuperior,
                    nodeType : 'company',
                    status : status,
                    businessAccountId : this.formData.service,
                    smsProviderAccount : this.formData.smsProviderAccount,
                    smsProviderPassword : this.formData.smsProviderPassword,
                }).then(res => {
                    if (res.status === 200) {
                        this.$emit('fresh-structure-data');
                        this.$emit('input', false);
                        this.$Message.success('新增成功');
                    } else {
                        this.$Message.error(res.message || '新增失败');
                    }
                });
            },
            /**
             * 判断管理账号是否存在
             */
            queryAccountExist () {
                return ajax.post('queryAccountExist',{
                    loginName : this.formData.controlAccount
                });
            },
            /**
             * 获取当前登录的用户信息
             */
            getSysAccountByToken () {
                ajax.post('getSysAccountByToken').then(res => {
                    if (res.status === 200) {
                        this.formData.service = res.data.id ? res.data.id : '';
                    } else {
                        this.formData.service = '';
                    }
                });
            },
        },
        computed : {
            //选择的地区信息
            placeInfo () {
                let place = {};
                if (this.formData.place) {
                    if (this.formData.place.province) {
                        place['provinceid'] = this.formData.place.province.provinceid;
                    } else {
                        place['provinceid'] = '';
                    }
                    if (this.formData.place.city) {
                        place['cityid'] = this.formData.place.city.cityid;
                    } else {
                        place['cityid'] = '';
                    }
                    if (this.formData.place.area) {
                        place['areaid'] = this.formData.place.area.areaid;
                    } else {
                        place['areaid'] = '';
                    }
                    return place;
                } else {
                    return {
                        provinceid : '',
                        cityid : '',
                        areaid : '',
                    };
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-company {

        & /deep/ .ivu-modal {
            width: 560px !important;
            height: 615px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 17px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 13px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
        }

        .hint {
            text-indent: 36px;
            margin-top: -12px;
            margin-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_999;
        }

        .target-body {
            width: 100%;
            height: 497px;
            padding: 20px 0 5px 0;
            overflow: auto;

            /deep/ .ivu-form {

                .ivu-form-item {
                    margin-bottom: 15px;
                    padding-right: 110px;
                    position: relative;

                    .ivu-form-item-error-tip {
                        font-size: $font_size_12px;
                        padding-top: 3px;
                    }
                }

                .ivu-form-item-label {
                    font-size: $font_size_14px;
                    color: $color_6c6c6c;
                }

                textarea.ivu-input{
                    height: 70px;
                }
            }
        }
        & /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
