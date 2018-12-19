<!--新增租户-->

<template>
    <div class="add-less">
        <bread-crumb-head
            :locale-router="$t('addLess')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-less-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="120">
                <i-row>
                    <i-col span="11">
                        <!--租户公司名称-->
                        <FormItem :label="$t('lesseeName')" prop="companyName">
                            <Input v-model.trim="formData.companyName" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--联系人-->
                        <FormItem :label="$t('person')" prop="person">
                            <Input v-model.trim="formData.person" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--联系电话-->
                        <FormItem :label="$t('phone')" prop="phone">
                            <Input v-model.trim="formData.phone" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--传真-->
                        <FormItem :label="$t('fax')" prop="fax">
                            <Input v-model.trim="formData.fax" style="width: 280px"/>
                        </FormItem>
                        <!--&lt;!&ndash;所属集团&ndash;&gt;-->
                        <!--<FormItem :label="$t('group')">-->
                            <!--<Select v-model="formData.group" style="width:280px">-->
                                <!--<Option v-for="item in groupList"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value">-->
                                    <!--{{ item.label }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                    </i-col>
                </i-row>
                <!--<i-row>-->
                    <!--<i-col span="11">-->
                        <!--&lt;!&ndash;管理上级&ndash;&gt;-->
                        <!--<FormItem :label="$t('superior')">-->
                            <!--<Select v-model="formData.superior" style="width:280px">-->
                                <!--<Option v-for="item in superiorList"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value">-->
                                    <!--{{ item.label }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                    <!--</i-col>-->
                    <!--<i-col span="11">-->
                        <!--&lt;!&ndash;财务上级&ndash;&gt;-->
                        <!--<FormItem :label="$t('fianceSuperior')">-->
                            <!--<Select v-model="formData.fianceSuperior" style="width:280px">-->
                                <!--<Option v-for="item in superiorList"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value">-->
                                    <!--{{ item.label }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                    <!--</i-col>-->
                <!--</i-row>-->
                <i-row>
                    <i-col span="11">
                        <!--管理账号-->
                        <FormItem :label="$t('controlAccount')" prop="controlAccount">
                            <Input v-model.trim="formData.controlAccount" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--电子邮箱-->
                        <FormItem :label="$t('email')" prop="mail">
                            <Input v-model.trim="formData.mail" placeholder="重要！用于接收登录密码" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--短息供应商-->
                        <FormItem :label="$t('smsProvider')" prop="smsProvider">
                            <Select v-model.trim="formData.smsProvider" style="width:280px" transfer>
                                <Option v-for="item in smsProviderList"
                                        :value="item.provider"
                                        :key="item.provider">
                                    {{ item.provider }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--地点-->
                        <FormItem :label="$t('location')">
                            <city-plugin @select="formData.place = $event" style="width: 280px;">
                            </city-plugin>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--详细地址-->
                    <i-col span="11">
                        <FormItem :label="$t('address')" prop="address">
                            <Input v-model.trim="formData.address" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--受理客服-->
                        <FormItem :label="$t('service')">
                            <Select v-model.trim="formData.service" style="width:280px" transfer>
                                <Option v-for="item in serviceList"
                                        :value="item.id"
                                        :key="item.id">
                                    {{ item.loginName }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--企业编码-->
                    <i-col span="17">
                        <FormItem :label="$t('enterpriseCode')" prop="companyCode">
                            <Input v-model.trim="formData.companyCode" style="width: 280px"/>
                            <span class="tips">用于与线下系统对接</span>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button @click="save('close')"
                        class="ivu-btn-min btn-margin"
                        :loading="addLoading">{{$t('保存，暂不启用')}}</Button>
                <Button type="primary" @click="save('open')" class="ivu-btn-min">{{$t('保存，立即启用')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { validator } from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';

    export default {
        components : {
            breadCrumbHead,
            cityPlugin
        },
        data () {
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError',{ field : this.$t('phone') }));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { 'msg' : this.$t('phone') }));
                }
            };
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                if (value === '' || value === null || value === undefined) {
                    callback(this.$t('validateError.pleaseInput', { 'msg' : this.$t('controlAccount') }));
                } else {
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
                }
            };
            //校验电子邮箱
            const validateMail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError',{ field : this.$t('mail') }));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { 'msg' : this.$t('email') }));
                }
            };
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('less'),
                        router : {
                            name : 'ISPinternet'
                        }
                    }
                ],
                //表单数据
                formData : {
                    //*租户公司名称
                    companyName : '',
                    //联系人
                    person : '',
                    //联系电话
                    phone : '',
                    //所属集团
                    // group: '',
                    //传真
                    fax : '',
                    //管理上级
                    // superior: '',
                    //财务上级
                    // fianceSuperior: '',
                    //管理账号
                    controlAccount : '',
                    //电子邮箱
                    mail : '',
                    //短信供应商
                    smsProvider : '',
                    //详细地址
                    address : '',
                    //客服专员
                    service : '',
                    //地点
                    place : {},
                    //企业编码
                    companyCode : ''
                },
                //表单校验规则
                ruleValidate : {
                    companyName : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('lesseeName') }),
                            trigger : 'blur'
                        },
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('lesseeName'),length : 100 }),trigger : 'blur' }
                    ],
                    person : [
                        {
                            required : true,
                            message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('person') }),
                            trigger : 'blur'
                        },
                        { max : 10,message : this.$t('errorMaxLength',{ field : this.$t('person'),length : 10 }),trigger : 'blur' }
                    ],
                    phone : [
                        { required : true, validator : validatePhone, trigger : 'blur' },
                    ],
                    controlAccount : [
                        { required : true, validator : validateControlAccount, trigger : 'blur' },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('controlAccount'),length : 20 }) }
                    ],
                    mail : [
                        { required : true, validator : validateMail, trigger : 'blur' },
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('mail'),length : 100 }),trigger : 'blur' }
                    ],
                    address : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('address'),length : 100 }),trigger : 'blur' }
                    ],
                    companyCode : [
                        { max : 8,message : this.$t('errorMaxLength',{ field : this.$t('enterpriseCode'),length : 8 }),trigger : 'blur' }
                    ],
                    fax : [
                        {
                            max : 20,
                            message : this.$t('errorMaxLength',{ field : this.$t('fax'),length : 20 }),
                            trigger : 'blur'
                        }
                    ]
                },
                // //集团列表
                // groupList: [
                //     {
                //         value: 'New York',
                //         label: 'New York'
                //     },
                // ],
                // //管理人员列表
                // superiorList: [
                //     {
                //         value: 'New York',
                //         label: 'New York'
                //     },
                // ],
                //短信供应商列表
                smsProviderList : [],
                //受理客服
                serviceList : [],
                //是否正在添加中
                addLoading : false
            };
        },
        methods : {
            /**
             * 保存新增租户数据
             * @param{String} status 根节点状态
             */
            save (status) {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addOrgInfo(status);
                    } else {
                        this.addLoading = false;
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$router.push({
                    name : 'ISPinternet'
                });
            },
            /**
             * 查询所有的受理客服信息
             */
            querySysAccoutList () {
                ajax.post('querySysAccoutList').then(res => {
                    if (res.status === 200) {
                        this.serviceList = res.data ? res.data : [];
                    } else {
                        this.serviceList = [];
                    }
                }).catch(err => {
                    this.serviceList = [];
                });
            },
            /**
             * 查询所有短息供应商
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
                }).catch(() => {
                    this.smsProviderList = [];
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
            /**
             * 新增租户
             * @param{String} status 根节点状态
             */
            addOrgInfo (status) {
                ajax.post('addOrgInfo',{
                    orgName : this.formData.companyName,
                    linkName : this.formData.person,
                    telephone : this.formData.phone,
                    tex : this.formData.fax,
                    loginName : this.formData.controlAccount,
                    email : this.formData.mail,
                    smsProvider : this.formData.smsProvider,
                    provinceid : this.placeSelected.province.provinceid,
                    cityid : this.placeSelected.city.cityid,
                    districtid : this.placeSelected.area.areaid,
                    address : this.formData.address,
                    businessAccountId : this.formData.service,
                    checkinCode : this.formData.companyCode,
                    nodeType : 'company',
                    status : status
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('新增成功');
                        this.$router.push({
                            name : 'ISPinternet'
                        });
                    } else {
                        this.$Message.error(res.message || '新增失败');
                    }
                }).finally(() => {
                    this.addLoading = false;
                });
            }
        },
        created () {
            this.querySysAccoutList();
            this.querySmsProviderList();
            this.getSysAccountByToken();
        },
        computed : {
            //选择的地区信息
            placeSelected () {
                if (this.formData.place && Object.keys(this.formData.place).length > 0) {
                    return {
                        province : this.formData.place.province,
                        city : this.formData.place.city,
                        area : this.formData.place.area,
                    };
                } else {
                    return {
                        province : '',
                        city : '',
                        area : '',
                    };
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-less {
        @include block_outline();

        .add-less-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
            }
        }

        .tips{
            color: $color_gray;
            display: inline-block;
            margin-left: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .btn-margin {
                margin-right: 18px;
            }
        }
    }
</style>
