<!--
    企业注册
    作者：杨泽涛
-->
<template>
    <div class="company-register">
        <Form :model="formDataCompany"
              ref="companyForm"
              :label-width="130"
              label-position="left"
              :rules="companyRuleValidate">
            <Steps :current="0"
                   direction="vertical" class="register-steps">
                <Step title="">
                    <FormItem :label-width="180" :label="$t('pleaseInputCompanyBaseInfo')">
                    </FormItem>
                    <!-- 企业编号 -->
                    <FormItem :label="$t('companyNo')" prop="enterpriseNumber">
                        <Input v-model="formDataCompany.enterpriseNumber" :placeholder="$t('inputField', { field : $t('companyNo') })"></Input>
                    </FormItem>
                    <!-- 企业名称 -->
                    <FormItem :label="$t('company_name')" prop="orgName">
                        <Input v-model="formDataCompany.orgName" :placeholder="$t('inputField', { field : $t('company_name') })"></Input>
                    </FormItem>
                    <!-- 联系人 -->
                    <FormItem :label="$t('person')" prop="linkName">
                        <Input v-model="formDataCompany.linkName" :placeholder="$t('inputField', { field : $t('person') })"></Input>
                    </FormItem>
                    <!-- 手机号 -->
                    <FormItem :label="$t('mobilePhone')" prop="mobile">
                        <Input v-model="formDataCompany.mobile" :placeholder="$t('inputField', { field : $t('mobilePhone') })"></Input>
                    </FormItem>
                    <!-- 社会信用代码 -->
                    <FormItem :label="$t('SocialCreditCode')" prop="certificateNumber">
                        <Input v-model="formDataCompany.certificateNumber" :placeholder="$t('inputField', { field : $t('SocialCreditCode') })"></Input>
                    </FormItem>
                    <!-- 营业执照附件 -->
                    <FormItem :label="$t('Appendixofbusinesslicense')" prop="attach">
                        <img-uploader  ref="imgUpload"
                                       @upload-success="uploadSuc2"
                                       @remove-img="removeIDimg2"
                                       :format="['png','jpeg']"
                                       :quantity-limit="1"></img-uploader>
                    </FormItem>
                    <!-- 邮箱地址 -->
                    <FormItem :label="$t('email')" prop="email">
                        <Input v-model="formDataCompany.email" :placeholder="$t('inputField', { field : $t('email') })"></Input>
                        <span class="tip">{{$t('emailUseToGetAuditNotice')}}</span>
                    </FormItem>
                    <!--地点-->
                    <FormItem :label="$t('location')" prop="place">
                        <city-plugin ref="citySelect" @select="placeSelect2" style="width: 280px;">
                        </city-plugin>
                    </FormItem>
                    <!-- 详细地址 -->
                    <FormItem :label="$t('detailAddr')" prop="address">
                        <Input v-model="formDataCompany.address" :placeholder="$t('inputField', { field : $t('detailAddr') })"></Input>
                    </FormItem>
                    <!-- 备注 -->
                    <FormItem :label="$t('remark')" prop="description">
                        <Input v-model="formDataCompany.description" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :placeholder="$t('remarkIfSpecial')"></Input>
                    </FormItem>
                </Step>
                <Step title="" >
                    <FormItem :label-width="180" :label="$t('setLoginInfo')">
                    </FormItem>
                    <!-- 登录名 -->
                    <FormItem :label="$t('loginName')" prop="loginName">
                        <Input v-model="formDataCompany.loginName" :placeholder="$t('inputField', { field : $t('loginName') })"></Input>
                    </FormItem>
                    <!-- 登陆密码 -->
                    <FormItem :label="$t('loginPassword')" prop="password">
                        <Input type="password" v-model="formDataCompany.password" :placeholder="$t('inputField', { field : $t('loginPassword') })"></Input>
                    </FormItem>
                    <!-- 确认登陆密码 -->
                    <FormItem :label="$t('surePasswordAgain')" prop="rePassword">
                        <Input type="password" v-model="formDataCompany.rePassword" :placeholder="$t('inputField', { field : $t('loginPassword') })"></Input>
                    </FormItem>

                    <div class="modal-footer">
                        <Button type="primary" @click="companySubmit()" >{{$t('submit')}}</Button>
                        <Button type="ghost" @click="reset()" >{{$t("reset")}}</Button>
                    </div>
                </Step>
            </Steps>
        </Form>

        <tipModal ref="tipModal"></tipModal>
    </div>
</template>

<script>
    import { validateMethods } from '../validateMethods';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ImgUploader from '../components/ImgUploader';
    import ajax from '../../../api/index';
    import MD5 from 'crypto-js/md5';
    import tipModal from '../components/tipModal';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        components : {
            cityPlugin,
            ImgUploader,
            tipModal
        },
        data () {
            //校验第二次输入的密码和第一次是否相同 企业注册
            const isEqNewPwd2 = (rule, value, callback) => {
                if (value != this.formDataCompany.password) {
                    callback(new Error(this.$t('passwordNotEqual')));
                } else {
                    callback();
                }
            };
            return {
                //企业注册表单信息
                formDataCompany : {
                    //合作伙伴类型
                    partnerType : 'company',
                    //企业编号
                    enterpriseNumber : '',
                    //姓名，企业名称
                    orgName : '',
                    //联系人
                    linkName : '',
                    //性别
                    sex : 'male',
                    //手机号
                    mobile : '',
                    //个人：身份证号码，企业：社会信用代码
                    certificateNumber : '',
                    //邮箱
                    email : '',
                    //地址
                    place : '',
                    //详细地址
                    address : '',
                    //备注
                    description : '',
                    //登录名
                    loginName : '',
                    //密码
                    password : '',
                    //确认密码
                    rePassword : ''
                },
                //企业注册表单校验
                companyRuleValidate : {
                    //企业编号
                    enterpriseNumber : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('companyNo') }), trigger : 'blur' },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('companyNo'),length : 20 }),trigger : 'blur' }
                    ],
                    //企业名称
                    orgName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('company_name') }), trigger : 'blur' },
                        { max : 50,message : this.$t('errorMaxLength',{ field : this.$t('company_name'),length : 50 }),trigger : 'blur' }
                    ],
                    //联系人
                    linkName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('person') }), trigger : 'blur' },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('person'),length : 20 }),trigger : 'blur' }
                    ],
                    mobile : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('telephone') }), trigger : 'blur' },
                        { validator : validateMethods.mobile, trigger : 'blur' }
                    ],
                    //社会信用代码
                    certificateNumber : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('SocialCreditCode') }), trigger : 'blur' },
                        { validator : validateMethods.socialCode, trigger : 'blur' },
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('SocialCreditCode'),length : 100 }),trigger : 'blur' }
                    ],
                    attach : [
                        { required : true, type : 'array', min : 1, message : this.$t('pleaseUpload', { field : this.$t('Appendixofbusinesslicense') }), trigger : 'blur' }
                    ],
                    email : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('email') }), trigger : 'blur' },
                        { validator : validateMethods.email, trigger : 'blur' }
                    ],
                    place : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('address') }), trigger : 'blur' },
                    ],
                    //详细地址
                    address : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('detailAddr'),length : 100 }),trigger : 'blur' }
                    ],
                    description : [
                        { max : 200,message : this.$t('errorMaxLength',{ field : this.$t('remark'),length : 200 }),trigger : 'blur' }
                    ],
                    loginName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('loginName') }), trigger : 'blur' },
                        { max : 10,message : this.$t('errorMaxLength',{ field : this.$t('loginName'),length : 10 }),trigger : 'blur' }
                    ],
                    password : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('password') }), trigger : 'blur' },
                        { max : 15,message : this.$t('errorMaxLength',{ field : this.$t('password'),length : 15 }),trigger : 'blur' }
                    ],
                    rePassword : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('password') }), trigger : 'blur' },
                        { validator : isEqNewPwd2, trigger : 'blur' },

                    ],
                }
            };
        },
        methods : {

            /**
             * 企业注册表单提交
             */
            companySubmit () {
                this.$refs['companyForm'].validate((valid) => {
                    if (valid) {
                        this.companyRegist();
                    }
                });
            },

            /**
             * 企业注册
             */
            companyRegist () {
                let formData = defaultsDeep({
                    password : MD5(this.formDataCompany.password).toString(),
                    attach : JSON.stringify(this.formDataCompany.attach),
                }, this.formDataCompany);
                // this.formDataCompany.password = MD5(this.formDataCompany.password).toString();
                // this.formDataCompany.attach = JSON.stringify(this.formDataCompany.attach);
                ajax.post('register', formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('register') }));
                        this.$refs.tipModal.show(this.formDataCompany.email);
                    } else {
                        this.$Message.error(this.$t(res.message));
                    }
                });
            },

            /**
             * 上传图片成功 企业注册
             */
            uploadSuc2 (data) {
                this.formDataCompany.attach = data;
                this.$refs.companyForm.validateField('attach');
            },

            /**
             * 删除身份证照片 企业注册
             */
            removeIDimg2 (data) {
                this.formDataCompany.attach = data;
                this.$refs.companyForm.validateField('attach');
            },

            /**
             * 省市县选择 企业注册
             */
            placeSelect2 (value) {
                this.formDataCompany.place = value.value ? value.value : '';
                this.formDataCompany.province = value.province ? value.province.provinceid : '';
                this.formDataCompany.city = value.city ? value.city.cityid : '';
                this.formDataCompany.district = value.area ? value.area.areaid : '';
            },
            /**
             *  表单重置 个人注册
             */
            reset () {
                this.$refs['companyForm'].resetFields();
                this.$refs.imgUpload.reset();
                this.$refs.citySelect.reset();
                this.formData.province = '';
                this.formData.city = '';
                this.formData.district = '';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .company-register {

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

        .tip {
            font-size: 12px;
            color: $color_yellow;
        }
    }
</style>
