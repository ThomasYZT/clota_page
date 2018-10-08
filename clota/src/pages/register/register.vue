<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="register">
        <!-- 页面头部 -->
        <div class="header">
                <div class="logo">
                    <img src="../../assets/images/logo.svg" alt="">
                </div>
                <div class="lang">
                    <span @click="changeLang('zh-CN')">中文</span>
                    <span>|</span>
                    <span @click="changeLang('en')">English</span>
                </div>
            </div>

        <!-- 注册页面内容 -->
        <div class="content-wrapper">
            <div class="content">
                <div class="form-content">
                    <h4>{{$t('partnerRegister')}}</h4>
                    <Tabs value="personal"
                              type="card"
                              class='form-tab'>
                        <!-- 个人注册 -->
                        <TabPane :label="$t('personalRegist')" name="personal">
                            <Form :model="formData"
                                  ref="personalForm"
                                  :label-width="130"
                                  label-position="left"
                                  :rules="personalRuleValidate">
                                <Steps :current="0"
                                   direction="vertical" class="register-steps">
                                    <Step title="">
                                        <FormItem label="填写个人信息">
                                        </FormItem>
                                        <!-- 选择姓名 -->
                                        <FormItem label="姓名" prop="orgName">
                                            <Input v-model="formData.orgName" placeholder="请输入姓名"></Input>
                                        </FormItem>
                                        <!-- 请选择性别 -->
                                        <FormItem label="性别" prop="sex">
                                            <RadioGroup v-model="formData.sex">
                                                <Radio label="male">男</Radio>
                                                <Radio label="female">女</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                        <!-- 手机号 -->
                                        <FormItem label="手机号" prop="mobile">
                                            <Input v-model="formData.mobile" placeholder="请输入手机号"></Input>
                                        </FormItem>
                                        <!-- 身份证号码 -->
                                        <FormItem label="身份证号码" prop="certificateNumber">
                                            <Input v-model="formData.certificateNumber" placeholder="请输入身份证号码"></Input>
                                        </FormItem>
                                        <!-- 身份证照片 -->
                                        <FormItem label="身份证照片" prop="dialogImageUrl">
                                            <img-uploader @upload-success="uploadSuc"></img-uploader>
                                        </FormItem>
                                        <!-- 邮箱地址 -->
                                        <FormItem label="邮箱地址" prop="email">
                                            <Input v-model="formData.email" placeholder="请输入邮箱地址"></Input>
                                        </FormItem>
                                        <!--地点-->
                                        <FormItem :label="$t('location')" prop="place">
                                            <city-plugin @select="formData.place = $event" style="width: 280px;">
                                            </city-plugin>
                                        </FormItem>
                                        <!-- 详细地址 -->
                                        <FormItem label="详细地址" prop="address">
                                            <Input v-model="formData.address" placeholder="请输入详细地址"></Input>
                                        </FormItem>
                                        <!-- 备注 -->
                                        <FormItem label="备注" prop="description">
                                            <Input v-model="formData.description" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="特殊说明，请输入备注"></Input>
                                        </FormItem>
                                    </Step>
                                    <Step title="" >
                                        <FormItem :label-width="180" label="设置登陆信息">
                                        </FormItem>
                                        <!-- 登录名 -->
                                        <FormItem label="登录名" prop="loginName">
                                            <Input v-model="formData.loginName" placeholder="请输入登录名"></Input>
                                        </FormItem>
                                        <!-- 登陆密码 -->
                                        <FormItem label="登陆密码" prop="password">
                                            <Input v-model="formData.password" placeholder="请输入登陆密码"></Input>
                                        </FormItem>
                                        <!-- 确认登陆密码 -->
                                        <FormItem label="确认登陆密码" prop="rePassword">
                                            <Input v-model="formData.rePassword" placeholder="请输入确认登陆密码"></Input>
                                        </FormItem>

                                        <div class="modal-footer">
                                            <Button type="primary" @click="personelSubmit()" >{{$t('submit')}}</Button>
                                            <Button type="ghost" @click="reset()" >{{$t("reset")}}</Button>
                                        </div>
                                    </Step>

                                </Steps>

                            </Form>

                        </TabPane>
                        <!-- 公司注册 -->
                        <TabPane :label="$t('companyRegist')" name="company">
                            <Form :model="formDataCompany"
                                  :label-width="130"
                                  label-position="left"
                                  :rules="companyRuleValidate">
                                <Steps :current="0"
                                   direction="vertical" class="register-steps">
                                    <Step title="">
                                        <FormItem :label-width="180" label="填写企业基本信息">
                                        </FormItem>
                                        <!-- 企业编号 -->
                                        <FormItem label="企业编号" prop="enterpriseNumber">
                                            <Input v-model="formDataCompany.enterpriseNumber" placeholder="请输入企业编号"></Input>
                                        </FormItem>
                                        <!-- 企业名称 -->
                                        <FormItem label="企业名称" prop="orgName">
                                            <Input v-model="formDataCompany.orgName" placeholder="请输入企业名称"></Input>
                                        </FormItem>
                                        <!-- 联系人 -->
                                        <FormItem label="联系人" prop="linkName">
                                            <Input v-model="formDataCompany.linkName" placeholder="请输入联系人"></Input>
                                        </FormItem>
                                        <!-- 手机号 -->
                                        <FormItem label="手机号" prop="mobile">
                                            <Input v-model="formDataCompany.mobile" placeholder="请输入手机号"></Input>
                                        </FormItem>
                                        <!-- 社会信用代码 -->
                                        <FormItem label="社会信用代码" prop="certificateNumber">
                                            <Input v-model="formDataCompany.certificateNumber" placeholder="请输入社会信用代码"></Input>
                                        </FormItem>
                                        <!-- 营业执照附件 -->
                                        <FormItem label="营业执照附件" prop="enterpriseNumber">
                                            <img-uploader  @upload-success="uploadSuc"></img-uploader>
                                        </FormItem>
                                        <!-- 邮箱地址 -->
                                        <FormItem label="邮箱地址" prop="enterpriseNumber">
                                            <Input v-model="formDataCompany.email" placeholder="请输入邮箱地址"></Input>
                                        </FormItem>
                                        <!--地点-->
                                        <FormItem :label="$t('location')" prop="place">
                                            <city-plugin @select="formDataCompany.place = $event" style="width: 280px;">
                                            </city-plugin>
                                        </FormItem>
                                        <!-- 详细地址 -->
                                        <FormItem label="详细地址" prop="address">
                                            <Input v-model="formDataCompany.address" placeholder="请输入详细地址"></Input>
                                        </FormItem>
                                        <!-- 备注 -->
                                        <FormItem label="备注" prop="description">
                                            <Input v-model="formDataCompany.description" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="特殊说明，请输入备注"></Input>
                                        </FormItem>
                                    </Step>
                                    <Step title="" >
                                        <FormItem :label-width="180" label="设置登陆信息">
                                        </FormItem>
                                        <!-- 登录名 -->
                                        <FormItem label="登录名" prop="loginName">
                                            <Input v-model="formDataCompany.loginName" placeholder="请输入登录名"></Input>
                                        </FormItem>
                                        <!-- 登陆密码 -->
                                        <FormItem label="登陆密码" prop="password">
                                            <Input v-model="formDataCompany.password" placeholder="请输入登陆密码"></Input>
                                        </FormItem>
                                        <!-- 确认登陆密码 -->
                                        <FormItem label="确认登陆密码" prop="rePassword">
                                            <Input v-model="formDataCompany.rePassword" placeholder="请输入确认登陆密码"></Input>
                                        </FormItem>

                                        <div class="modal-footer">
                                            <Button type="primary" @click="submit()" >{{$t('submit')}}</Button>
                                            <Button type="ghost" @click="reset()" >{{$t("reset")}}</Button>
                                        </div>
                                    </Step>
                                </Steps>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ImgUploader from './components/ImgUploader';
    import {validator} from 'klwk-ui';
    export default {
        components: {
            cityPlugin,
            ImgUploader
        },
        data() {
            let self= this;
            const validateMethods = {
                //校验第二次输入的密码和第一次是否相同
                isEqNewPwd: (rule, value, callback) => {
                    if(value != this.formData.password) {
                        return callback(new Error(this.$t('再次输入的密码与新密码不同')));
                    }else {
                        return callback();
                    }
                },
                //校验手机号码
                mobile: (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(this.$t('errorFormat', {field: this.$t('phoneNum')}));
                    } else {
                        callback();
                    }
                },
                //校验邮箱
                email: (rule, value, callback) => {
                    if (value) {
                        if (validator.isEmail(value)) {
                            callback();
                        } else {
                            callback(this.$t('errorFormat', {field: this.$t('mail')}));
                        }
                    } else {
                        callback();
                    }
                },
                //身份证校验
                identificationNum: (rule, value, callback) => {
                    let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    if(!reg.test(value)) {
                        callback(this.$t('errorFormat', {field: this.$t('identityNo')}))
                    }
                }
            }
            return {
                //个人注册表单信息
                formData: {
                    //姓名，企业名称
                    orgName: '',
                    //性别
                    sex: 'male',
                    //手机号
                    mobile: '',
                    //身份证号码
                    certificateNumber: '',
                    //邮箱
                    email: '',
                    //地址
                    place: '',
                    //详细地址
                    address: '',
                    //备注
                    description: '',
                    //登录名
                    loginName: '',
                    //密码
                    password: '',
                    //确认密码
                    rePassword: ''
                },
                //企业注册表单信息
                formDataCompany: {
                    //企业编号
                    enterpriseNumber: '',
                    //姓名，企业名称
                    orgName: '',
                    //联系人
                    linkName: '',
                    //性别
                    sex: 'male',
                    //手机号
                    mobile: '',
                    //个人：身份证号码，企业：社会信用代码
                    certificateNumber: '',
                    //邮箱
                    email: '',
                    //地址
                    place: '',
                    //详细地址
                    address: '',
                    //备注
                    description: '',
                    //登录名
                    loginName: '',
                    //密码
                    password: '',
                    //确认密码
                    rePassword: ''
                },
                //个人注册表单校验规则
                personalRuleValidate: {
                    orgName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('name')}), trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('gender')}), trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('telephone')}), trigger: 'blur' },
                        { validator: validateMethods.mobile, trigger: 'blur'}
                    ],
                    certificateNumber: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('identityNo')}), trigger: 'blur' },
                        { validator: validateMethods.identificationNum, trigger: 'blur'}
                    ],
                    dialogImageUrl: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('identiImg')}), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('email')}), trigger: 'blur' },
                        { validator: validateMethods.email, trigger: 'blur'}
                    ],
                    place: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('address')}), trigger: 'blur' },
                    ],
                    loginName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('loginName')}), trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('password')}), trigger: 'blur' },
                    ],
                    rePassword: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('password')}), trigger: 'blur' },
                        { validator: validateMethods.isEqNewPwd, trigger: 'blur' },
                    ],
                },
                //企业注册表单校验
                companyRuleValidate: {
                    enterpriseNumber: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('name')}), trigger: 'blur' },
                    ],
                    orgName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('name')}), trigger: 'blur' },
                    ],
                    linkName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('gender')}), trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('telephone')}), trigger: 'blur' },
                    ],
                    certificateNumber: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('identityNo')}), trigger: 'blur' },
                    ],
                    dialogImageUrl: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('identiImg')}), trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('email')}), trigger: 'blur' },
                    ],
                    place: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('address')}), trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('address')}), trigger: 'blur' },
                    ],
                    loginName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('loginName')}), trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('password')}), trigger: 'blur' },
                    ],
                    rePassword: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('password')}), trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            //改变语言
            changeLang(lang) {
                this.$store.commit('setLang',lang);
            },
            /**
             * 个人注册表单提交
             */
            personelSubmit() {
                this.$refs.personalForm.validate((valid) => {
                    if(valid) {

                    }
                })
            },
            reset() {

            },
            /**
             * 上传图片成功
             */
            uploadSuc(data) {
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url: '../../assets/images/';

    .register {
        height: 100%;
        overflow: auto;
        background-color: #fff;
        background-image: get_url('login-bg.png');
        background-size: 100% 100%;
        background-attachment: fixed;

            height: 100%;
            .header {
                position: relative;
                z-index: 99;
                @include block_outline(100%,100px);
                @include clearfix;
                padding: 40px 80px 0 80px;
                line-height: 53px;
                .logo {
                    float: left;
                }
                .lang {
                    float: right;
                    span {
                        float: left;
                        &:first-child {
                            font-size: $font_size_18px;
                            color: $color_333;
                            margin-right: 10px;
                            cursor: pointer;
                        }
                        &:nth-child(2) {
                            font-size: $font_size_18px;
                            color: $color_3F3F3F;
                            margin-right: 10px;
                        }
                        &:last-child {
                            font-size: $font_size_14px;
                            color: $color_3F3F3F;
                            cursor: pointer;
                        }
                    }
                }
            }

            .content-wrapper {
                width: 100%;
                margin: 0 auto 80px;
                position: relative;

                .content {
                    margin: 0 auto;
                    width: 1100px;
                    img {
                        margin-top: 100px;
                    }

                    .form-content {
                        position: relative;
                        width: 920px;
                        margin: 0 auto;

                        h4 {
                            margin: 23px 0 20px 0;
                            font-size: $font_size_22px;
                            color: $color_3A444A;
                            font-weight: normal;
                        }

                        .form-tab {
                            box-shadow: $color_F0F0F0 0px 0px 20px;
                            background-color: $color_fff;

                            .register-steps {
                                margin: 40px auto 0;
                                width: 730px;
                            }

                            .modal-footer{
                                margin-bottom: 61px;
                                /deep/ .ivu-btn{
                                    padding: 5px 30px;
                                    margin: 0 10px;
                                }
                            }
                        }
                    }
                }
            }

    }
</style>
