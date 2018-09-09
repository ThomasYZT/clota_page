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
                  :label-width="150">
                <FormItem :label="$t('fianceSuperior')" prop="fianceSuperior">
                    <Select v-model="formData.fianceSuperior" style="width:280px">
                        <Option v-for="item in parentEconomics  "
                                :value="item.id"
                                :key="item.id">
                            {{ item.orgName }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('manageSuperior')">
                    <Input :value="chosedNodeDetail.name" disabled style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('controlAccount')" prop="controlAccount">
                    <Input v-model="formData.controlAccount" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('email')" prop="mail">
                    <Input v-model="formData.mail" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('smsProvider')" prop="smsProvider">
                    <Select v-model="formData.smsProvider" style="width:280px">
                        <Option v-for="item in smsProviderList"
                                :value="item.provider"
                                :key="item.provider">
                            {{ item.provider }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('person')" prop="person">
                    <Input v-model="formData.person" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('phone')" prop="phone">
                    <Input v-model="formData.phone" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('fax')" prop="fax">
                    <Input v-model="formData.fax" style="width: 280px"/>
                </FormItem>
                <FormItem :label="$t('enterpriseCode') + '(' + $t('offlineVerify') + ')'">
                    <Input v-model="formData.companyCode" style="width: 280px"/>
                </FormItem>
                <div class="hint">用于与线下系统对接</div>
                <FormItem :label="$t('location')">
                    <city-plugin @select="formData.place = $event" style="width: 280px">
                    </city-plugin>
                </FormItem>
                <FormItem :label="$t('address')">
                    <Input v-model="formData.address" type="textarea" style="width: 280px"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="ghost"
                class="ivu-btn-90px"
                @click="cancel">取消</Button>
            <Button type="primary"
                class="ivu-btn-90px"
                @click="save">保存</Button>
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
            }
        },
        data() {
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                if(value){
                    this.queryAccountExist().then(() => {
                        callback();
                    }).catch(() => {
                        callback('管理账号已存在');
                    });
                }else{
                    callback(this.$t('inputField', {msg: this.$t('controlAccount')}));
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
                    callback(this.$t('validateError.pleaseInput', {msg: this.$t('email')}));
                }
            };
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.phoneError'));
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
                        callback(this.$t('validateError.formatError', {field: this.$t('fax')}));
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
                    //传真
                    fax: '',
                    //公司编码
                    companyCode: '',
                    //管理账号
                    controlAccount: '',
                    //电子邮箱
                    mail: '',
                    //短信供应商
                    smsProvider: '',
                    //详细地址
                    address: '',
                    //地点
                    place: {},
                    //联系人
                    person: '',
                },
                //表单校验规则
                ruleValidate: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'},
                    ],
                    fax: [
                        {validator: validateFax, trigger: 'blur'},
                    ],
                    fianceSuperior: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('fianceSuperior')}),
                            trigger: 'change'
                        },
                    ],
                    controlAccount: [
                        {required: true, validator: validateControlAccount, trigger: 'blur'},
                    ],
                    mail: [
                        {required: true, validator: validateMail, trigger: 'blur'},
                    ],
                    smsProvider: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseSelect', {msg: this.$t('smsProvider')}),
                            trigger: 'change'
                        },
                    ],
                    person : [
                        {required :true,message : this.$t('validateError.pleaseInput',{msg : this.$t('person')})}
                    ]
                },
                //短信供应商列表
                smsProviderList: [],
                //财务上级列表
                parentEconomics : []
            }
        },
        watch: {
            //监听选择的父节点信息
            'chosedNodeDetail': {
                handler(newVal, oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.fianceSuperior = newVal.title;
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
                    this.querySmsProviderList();
                }
            },
            /**
             * 保存新增租户数据
             */
            save() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addOrgInfo();
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
                    if(res.status === 200){
                        this.parentEconomics = res.data.parentEconomics ? res.data.parentEconomics : [];
                    }else{
                        this.parentEconomics = [];
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
                    if(res.status === 200){
                        this.smsProviderList = res.data.list ? res.data.list : [];
                    }else{
                        this.smsProviderList = [];
                    }
                });
            },
            /**
             * 新增下属公司
             */
            addOrgInfo () {
                ajax.post('addOrgInfo',{
                    rootId : this.chosedNodeDetail.id,
                    orgName : this.addedNodeDetail.nodeName,
                    loginName : this.formData.controlAccount,
                    email : this.formData.mail,
                    smsProvider : this.formData.smsProvider,
                    linkName : this.formData.person,
                    telephone : this.formData.phone,
                    tex : this.formData.fax,
                    checkinCode : this.formData.companyCode,
                    provinceid : this.placeInfo.provinceid,
                    cityid : this.placeInfo.cityid,
                    districtid : this.placeInfo.areaid,
                    address : this.formData.address,
                    parentEconomicId : this.formData.fianceSuperior,
                    parentManageId : this.chosedNodeDetail.id,
                    nodeType : 'company'
                }).then(res => {
                    if(res.status === 200){
                        this.$emit('fresh-structure-data');
                        this.$emit('input', false);
                        this.$Message.success('新增成功');
                    }else{
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
            text-indent: 150px;
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
                        width: 110px;
                        position: absolute;
                        top: 7px;
                        right: -110px;
                        left: auto;
                        line-height: 1;
                        padding: 6px 0 0 5px;
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
