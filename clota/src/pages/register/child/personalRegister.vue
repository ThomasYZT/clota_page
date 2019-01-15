<!--
    个人注册
    作者：杨泽涛
-->
<template>
    <div class="personal-register">
        <Form :model="formData"
              ref="personalForm"
              :label-width="130"
              label-position="left"
              :rules="personalRuleValidate">
            <Steps :current="0"
                   direction="vertical" class="register-steps">
                <Step title="">
                    <FormItem :label="$t('inputPersonalInfo')"
                              :label-width="300">
                    </FormItem>
                    <!-- 选择姓名 -->
                    <FormItem :label="$t('name')" prop="orgName">
                        <Input v-model="formData.orgName" :placeholder="$t('inputField', { field : $t('name') })"></Input>
                    </FormItem>
                    <!-- 请选择性别 -->
                    <FormItem :label="$t('gender')" prop="sex">
                        <RadioGroup v-model="formData.sex">
                            <Radio label="male">{{$t('male')}}</Radio>
                            <Radio label="female">{{$t('female')}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <!-- 手机号 -->
                    <FormItem :label="$t('mobilePhone')" prop="mobile">
                        <Input v-model="formData.mobile" :placeholder="$t('inputField', { field : $t('mobilePhone') })"></Input>
                    </FormItem>
                    <!-- 身份证号码 -->
                    <FormItem :label="$t('IDNumber')" prop="certificateNumber">
                        <Input v-model="formData.certificateNumber" :placeholder="$t('inputField', { field : $t('IDNumber') })"></Input>
                    </FormItem>
                    <!-- 身份证照片 -->
                    <FormItem :label="$t('identiImg')" prop="attach">
                        <img-uploader ref="imgUpload"
                                      @upload-success="uploadSuc"
                                      @remove-img="removeIDimg"
                                      :format="['png','jpeg']"
                                      :quantity-limit="2"></img-uploader>
                    </FormItem>
                    <!-- 邮箱地址 -->
                    <FormItem :label="$t('mail')" prop="email">
                        <Input v-model="formData.email" :placeholder="$t('inputField', { field : $t('mail') })"></Input>
                        <span class="tip">{{$t('emailUseToGetAuditNotice')}}</span>
                    </FormItem>
                    <!--地点-->
                    <FormItem :label="$t('location')" prop="place">
                        <city-plugin ref="citySelect" @select="placeSelect" style="width: 280px;">
                        </city-plugin>
                    </FormItem>
                    <!-- 详细地址 -->
                    <FormItem :label="$t('detailAddr')" prop="address">
                        <Input v-model="formData.address" :placeholder="$t('inputField', { field : $t('detailAddr') })"></Input>
                    </FormItem>
                    <!-- 备注 -->
                    <FormItem :label="$t('remark')" prop="description">
                        <Input v-model="formData.description" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :placeholder="$t('remarkIfSpecial')"></Input>
                    </FormItem>

                </Step>
                <Step title="">
                    <FormItem :label-width="180" :label="$t('setLoginInfo')">
                    </FormItem>
                    <!-- 登录名 -->
                    <FormItem :label="$t('loginName')" prop="loginName">
                        <Input v-model="formData.loginName" :placeholder="$t('inputField', { field : $t('loginName') })"></Input>
                    </FormItem>
                    <!-- 登陆密码 -->
                    <FormItem :label="$t('loginPassword')" prop="password">
                        <Input type="password"  v-model="formData.password" :placeholder="$t('inputField', { field : $t('loginPassword') })"></Input>
                    </FormItem>
                    <!-- 确认登陆密码 -->
                    <FormItem :label="$t('surePasswordAgain')" prop="rePassword">
                        <Input type="password"  v-model="formData.rePassword" :placeholder="$t('inputField', { field : $t('loginPassword') })"></Input>
                    </FormItem>

                    <div class="modal-footer">
                        <i-button type="primary" @click="personelSubmit()" >{{$t('submit')}}</i-button>
                        <i-button type="ghost" @click="reset()" >{{$t("reset")}}</i-button>
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
            //校验第二次输入的密码和第一次是否相同 个人注册
            const isEqNewPwd = (rule, value, callback) => {
                if (value != this.formData.password) {
                    callback(new Error(this.$t('passwordNotEqual')));
                } else {
                    callback();
                }
            };

            return {
                //个人注册表单信息
                formData : {
                    //合作伙伴类型
                    partnerType : 'person',
                    //姓名，企业名称
                    orgName : '',
                    //性别
                    sex : 'male',
                    //手机号
                    mobile : '',
                    //身份证号码
                    certificateNumber : '',
                    //身份证照片
                    attach : [],
                    //邮箱
                    email : '',
                    //地址
                    place : '',
                    //省
                    province : '',
                    //市
                    city : '',
                    //县、区域
                    district : '',
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
                //校验第二次输入的密码和第一次是否相同 个人注册
                isEqNewPwd : isEqNewPwd
            };
        },
        computed : {
            //个人注册表单校验规则
            personalRuleValidate () {
                return {
                    orgName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('name') }), trigger : 'blur' },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('name'),length : 20 }),trigger : 'blur' }
                    ],
                    sex : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('gender') }), trigger : 'blur' },
                    ],
                    mobile : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('telephone') }), trigger : 'blur' },
                        { validator : validateMethods.mobile, trigger : 'blur' }
                    ],
                    certificateNumber : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('identityNo') }), trigger : 'blur' },
                        { validator : validateMethods.identificationNum, trigger : 'blur' }
                    ],
                    attach : [
                        { required : true, type : 'array', min : 2, message : this.$t('pleaseUpload', { field : this.$t('posAndNagIDImg') }), trigger : 'blur' }
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
                        { validator : this.isEqNewPwd, trigger : 'blur' },
                    ],
                }
            }
        },
        methods : {
            /**
             * 个人注册表单提交
             */
            personelSubmit () {
                this.$refs['personalForm'].validate((valid) => {
                    if ( valid ) {
                        this.personalRegist();
                    }
                });
            },
            /**
             *  个人注册
             */
            personalRegist () {
                // this.formData.password = MD5(this.formData.password).toString();
                // this.formData.attach = JSON.stringify(this.formData.attach);
                let formData = defaultsDeep({
                    password : MD5(this.formData.password).toString(),
                    attach : JSON.stringify(this.formData.attach),
                }, this.formData);
                ajax.post('register', formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('register') }));
                        this.$refs.tipModal.show(this.formData.email);
                    } else {
                        this.$Message.error(this.$t(res.message));
                    }
                });
            },
            /**
             *  表单重置 个人注册
             */
            reset () {
                this.$refs['personalForm'].resetFields();
                this.$refs.imgUpload.reset();
                this.$refs.citySelect.reset();
                this.formData.province = '';
                this.formData.city = '';
                this.formData.district = '';
            },
            /**
             * 上传图片成功 个人注册
             */
            uploadSuc (data) {
                this.formData.attach = data;
                this.$refs.personalForm.validateField('attach');
            },
            /**
             * 删除身份证照片 个人注册
             */
            removeIDimg (data) {
                this.formData.attach = data;
                this.$refs.personalForm.validateField('attach');
            },
            /**
             * 省市县选择 个人注册
             */
            placeSelect (value) {
                this.formData.place = value.value ? value.value : '';
                this.formData.province = value.province ? value.province.provinceid : '';
                this.formData.city = value.city ? value.city.cityid : '';
                this.formData.district = value.area ? value.area.areaid : '';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .personal-register {

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
    /deep/ .ivu-form-item-label {
        text-indent: -4px;
    }
</style>
