<!--新增景区节点-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-scene"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" v-w-title="addedNodeDetail.nodeName">{{addedNodeDetail.nodeName}}</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="190">
                <!--财务上级-->
                <FormItem :label="$t('fianceSuperior')" prop="fianceSuperior">
                    <Select v-model="formData.fianceSuperior" style="width:280px">
                        <Option v-for="item in fianceSuperiorList"
                                :value="item.id"
                                :key="item.id">
                            {{ item.orgName }}
                        </Option>
                    </Select>
                </FormItem>
                <!--管理上级-->
                <FormItem :label="$t('manageSuperior')" prop="manageSuperior">
                    <Select v-model="formData.manageSuperior"
                            disabled
                            style="width:280px">
                        <Option v-for="item in manageSuperiorList"
                                :value="item.id"
                                :key="item.id">
                            {{ item.orgName }}
                        </Option>
                    </Select>
                </FormItem>
                <!--开通服务-->
                <FormItem  prop="openedServices">
                    <template slot="label">
                        <Tooltip placement="top" transfer>
                            <div slot="content" class="tips-content">
                                如需开通更多服务，请先为上级公司开通相应服务。
                            </div>
                            <span class="iconfont icon-note"></span>
                        </Tooltip>
                        <span>{{$t('openedServices')}}：</span>
                    </template>
                    <CheckboxGroup v-model="formData.openedServices">
                        <Checkbox v-for="item in serviceList"
                                  :key="item.id"
                                  :disabled="item.runStatus !== 'normal'"
                                  :label="item.id">
                            {{item.serviceName}}
                        </Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <!--<div class="hint">如需开通更多服务，请先为上级公司开通相应服务。</div>-->
                <!--管理账号-->
                <FormItem :label="$t('controlAccount')" prop="controlAccount">
                    <Input v-model.trim="formData.controlAccount" style="width: 280px"/>
                </FormItem>
                <!--电子邮箱-->
                <FormItem :label="$t('email')" prop="mail">
                    <Input v-model.trim="formData.mail" style="width: 280px"/>
                </FormItem>
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
                    <Input v-model.trim="formData.fax" style="width: 280px"/>
                </FormItem>
                <!--公司编码-->
                <FormItem prop="companyCode">
                    <template slot="label">
                        <Tooltip placement="top" transfer>
                            <div slot="content" class="tips-content">
                                用于与线下系统对接
                            </div>
                            <span class="iconfont icon-note"></span>
                        </Tooltip>
                        <span>{{$t('companyCode') + '(' + $t('offlineVerify') + ')'}}：</span>
                    </template>
                    <Input v-model.trim="formData.companyCode" style="width: 280px"/>
                </FormItem>
                <!--地址-->
                <FormItem :label="$t('location')">
                    <city-plugin
                        v-if="value"
                        @select="changeCity"
                        style="width: 280px">
                    </city-plugin>
                </FormItem>
                <!--详细地址-->
                <FormItem :label="$t('address')" prop="address">
                    <Input v-model="formData.address" style="width: 280px"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="ghost"
                class="ivu-btn-90px"
                @click="cancel">{{$t('cancel')}}</Button>
            <Button type="primary"
                    :loading="saveIng"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';

    export default {
        components: {
            cityPlugin
        },
        props: {
            //绑定的模态框是否显示的变量
            value: {
                type: Boolean,
                default: false
            },
            //选择的父节点详情
            'chosed-node-detail': {
                type: Object,
                default() {
                    return {}
                }
            },
            //新增的节点详情
            'added-node-detail': {
                type: Object,
                default() {
                    return {}
                }
            },
            //根节点id
            'root-id' : {
                type :String,
                default : ''
            }
        },
        data() {
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                if(value){
                    this.queryAccountExist().then((res) => {
                        if(res.success){
                            if(res.data){
                                callback();
                            }else{
                                callback(this.$t('adminAccountIsExit'));
                            }
                        }else{
                            callback(this.$t('accountValidFail'));
                        }
                    }).catch(() => {
                        callback(this.$t('accountValidFail'));
                    });
                }else{
                    callback(this.$t('inputField', {field: this.$t('controlAccount')}));
                }
            };
            //校验电子邮箱
            const validateMail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{field: this.$t('email')}));
                    }
                } else {
                    callback(this.$t('inputField', {field: this.$t('email')}));
                }
            };
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat', {field: this.$t('phone')}));
                    }
                } else {
                    callback();
                }
            };
            //校验传真
            const validateFax = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{field: this.$t('fax')}));
                    }
                } else {
                    callback();
                }
            };
            return {
                //表单数据
                formData: {
                    //联系电话
                    phone: '',
                    //财务上级
                    fianceSuperior: '',
                    //管理上级
                    manageSuperior: '',
                    //开通的服务
                    openedServices: [],
                    //传真
                    fax: '',
                    //公司编码
                    companyCode: '',
                    //管理账号
                    controlAccount: '',
                    //电子邮箱
                    mail: '',
                    //详细地址
                    address: '',
                    //地点
                    place: {},
                    //联系人
                    person : ''
                },
                //表单校验规则
                ruleValidate: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'},
                        {max : 20,message : this.$t('errorMaxLength',{field : this.$t('phone'),length : 20}),trigger : 'blur'}
                    ],
                    fax: [
                        {validator: validateFax, trigger: 'blur'},
                        {max : 20,message : this.$t('errorMaxLength',{field : this.$t('fax'),length : 20}),trigger : 'blur'}
                    ],
                    fianceSuperior: [
                        {
                            required: true,
                            message: this.$t('selectField', {msg: this.$t('fianceSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    manageSuperior : [
                        {
                            required: true,
                            message: this.$t('selectField', {msg: this.$t('manageSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    controlAccount: [
                        {required: true, validator: validateControlAccount, trigger: 'blur'},
                        {max : 20,message : this.$t('errorMaxLength',{field : this.$t('controlAccount'),length : 20}),trigger : 'blur'}
                    ],
                    mail: [
                        {required: true, validator: validateMail, trigger: 'blur'},
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('email'),length : 100}),trigger : 'blur'}
                    ],
                    person: [
                        {required: true,message: this.$t('inputField', {field: this.$t('person')}), trigger: 'blur'},
                        {max : 10,message : this.$t('errorMaxLength',{field : this.$t('person'),length : 10}),trigger : 'blur'}
                    ],
                    address : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('address'),length : 100}),trigger : 'blur'}
                    ],
                    companyCode : [
                        {min : 2,max : 8,message : this.$t('rangeError',{field : this.$t('companyCode'),min : 2,max : 8}),trigger : 'blur'}
                    ]
                },
                //财务上级列表
                fianceSuperiorList : [],
                //服务列表
                serviceList : [],
                //管理上级列表
                manageSuperiorList : [],
                //是否正在保存中
                saveIng : false
            }
        },
        watch: {
            //监听选择的父节点信息
            'chosedNodeDetail': {
                handler(newVal, oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.manageSuperior = newVal.id;
                        this.formData.fianceSuperior = newVal.id;
                    }
                },
                immediate: true
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if (type === false) {
                    this.resetFormData();
                    this.$refs.formValidate.resetFields();
                }else{
                    this.getParentManages();
                    this.getParentEconomic();
                    this.getOrgServiceList();
                }
            },
            /**
             * 保存新增租户数据
             */
            save() {
                this.saveIng =  true;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addCompany();
                    }else{
                        this.saveIng =  false;
                    }
                });
            },
            /**
             * 初始化表单数据
             */
            resetFormData() {
                for (let item in this.formData) {
                    this.formData[item] = '';
                }
            },
            /**
             * 调用新增公司的接口
             */
            addCompany() {
                ajax.post('addOrgInfo',{
                    orgName : this.addedNodeDetail.nodeName,
                    loginName : this.formData.controlAccount,
                    email : this.formData.mail,
                    linkName : this.formData.person,
                    telephone : this.formData.phone,
                    tex : this.formData.fax,
                    checkinCode : this.formData.companyCode,
                    province : this.placeInfo.provinceid,
                    city : this.placeInfo.cityid,
                    district : this.placeInfo.areaid,
                    address : this.formData.address,
                    parentEconomicId : this.formData.fianceSuperior,
                    parentManageId : this.formData.manageSuperior,
                    nodeType : 'scenic',
                    openService : this.formData.openedServices.join(',')
                }).then(res => {
                    if(res.success){
                        this.$emit('fresh-structure-data');
                        this.$Message.success(this.$t('successTip',{tip : this.$t('add')}));
                    }else{
                        this.$Message.error(this.$t('failureTip',{tip : this.$t('add')}))
                    }
                }).finally(() => {
                    this.$emit('input', false);
                    this.saveIng =  false;
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 获取经营上级
             */
            getParentManages () {
                ajax.post('getOrgsByManageType',{
                    orgId :  this.chosedNodeDetail.id,
                    manageType : 'manage',
                    nodeType : this.chosedNodeDetail.nodeType,
                }).then(res => {
                    if(res.success){
                        this.manageSuperiorList = res.data ? res.data : [];
                    }else{
                        this.manageSuperiorList = [];
                    }
                });
            },
            /**
             * 获取财务上级
             */
            getParentEconomic () {
                ajax.post('getOrgsByManageType',{
                    orgId : this.chosedNodeDetail.id,
                    manageType : 'economic',
                    nodeType : this.chosedNodeDetail.nodeType,
                }).then(res => {
                    if(res.success){
                        this.fianceSuperiorList = res.data ? res.data : [];
                    }else{
                        this.fianceSuperiorList = [];
                    }
                });
            },
            /**
             * 判断管理账号是否存在
             */
            queryAccountExist () {
                return ajax.post('checkLoginNameUnique',{
                    loginName : this.formData.controlAccount
                });
            },
            /**
             * 获取上级开通的服务信息
             */
            getOrgServiceList () {
                ajax.post('getOrgServiceList',{
                    orgId : this.chosedNodeDetail.id,
                    pageNo : 1,
                    pageSize : 9999
                }).then(res => {
                   if(res.success){
                       this.serviceList = res.data ? res.data.rootServiceList ? res.data.rootServiceList.data : [] : [];
                   }else{
                       this.serviceList = [];
                   }
                });
            },
            /**
             * 地区改变后
             * @param data
             */
            changeCity (data ) {
                this.formData.place = data;
            }
        },
        computed : {
            //选择的地区信息
            placeInfo () {
                let place = {};
                if(this.formData.place){
                    if(this.formData.place.province){
                        place['provinceid'] = this.formData.place.province.provinceid;
                    }else{
                        place['provinceid'] = '';
                    }
                    if(this.formData.place.city){
                        place['cityid'] = this.formData.place.city.cityid;
                    }else{
                        place['cityid'] = '';
                    }
                    if(this.formData.place.area){
                        place['areaid'] = this.formData.place.area.areaid;
                    }else{
                        place['areaid'] = '';
                    }
                    return place;
                }else{
                    return {
                        provinceid : '',
                        cityid : '',
                        areaid : '',
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-scene {

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
                        position: absolute;
                        top: 32px;
                        left: 0;
                        line-height: 1;
                        padding: 2px 0 0 0;
                        color: #ed3f14;
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
