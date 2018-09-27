<template>
    <div class="loginPage">
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
        <!-- 登录模块 -->
        <div class="login">
            <div class="content">
                <img src="../../assets/images/login-img.svg" alt="">
                <div class="form-content">
                    <h1>{{ $t("project-title") }}</h1>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <Form-item prop="user">
                            <div>
                                <Input type="text"
                                       prefix="ios-contact"
                                       v-model.trim="formInline.user"
                                       :placeholder="$t('userName')"/>
                                <span class="icon"></span>
                            </div>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password"
                                   prefix="logo-usd"
                                   v-model.trim="formInline.password"
                                   :placeholder="$t('password')"/>
                        </Form-item>
                        <Form-item class="auto-reme">
                            <Checkbox v-model="rememberAccount">{{ $t("rememberAccount") }}</Checkbox>
                        </Form-item>
                        <div class="error-area">
                            {{errMsg}}
                        </div>
                        <Form-item>
                            <div class="submit"
                                 :class="{'is-loging' : isLoging}"
                                 @click="handleSubmit('formInline')">
                                {{ isLoging ? $t('loging') : $t("login") }}
                            </div>
                        </Form-item>
                    </Form>
                </div>
            </div>
            <div class="copyright">{{ $t("copyright") }}</div>
        </div>
    </div>
</template>


<script>
    import ajax from '@/api/index';
    import MD5 from 'crypto-js/md5';

    export default {
        components: {},
        data() {
            return {
                formInline: {
                    user: '', //登录账号
                    password: '' //登录密码
                },
                ruleInline: {
                    user: [
                        {required: true, message: this.$t("uesrNameText"), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t("passwordText"), trigger: 'blur'},
                    ]
                },
                //错误提示信息
                errMsg : '',
                //是否在登录中
                isLoging : false,
                //是否记住密码
                rememberAccount : false
            }
        },
        methods: {
            //改变语言
            changeLang(lang) {
                this.$store.commit('setLang',lang);
            },
            //登录提交表单
            handleSubmit(name) {
                this.errMsg = '';
                if(this.rememberAccount){
                    localStorage.setItem('logName',this.formInline.user);
                }else {
                    localStorage.removeItem('logName');
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.isLoging) return;
                        this.isLoging = true;
                        ajax.post('login',{
                            loginName : this.formInline.user,
                            password : MD5(this.formInline.password).toString(),
                        }).then((res) => {
                            if (res.success) {
                                sessionStorage.setItem('userInfo',JSON.stringify(res.data));
                                sessionStorage.setItem('accountName',this.formInline.user);
                                sessionStorage.setItem('token',res.data ? res.data.token : '');
                                this.$store.dispatch('getUserInfo',res.data).then(route => {
                                    this.$router.push({
                                        path: route.path
                                    },() => {
                                        setTimeout(() => {
                                            this.isLoging = false;
                                        },500);
                                    });
                                });
                            }else if(res.toString() === 'Error: Network Error'){//网络错误
                                this.errMsg = this.$t('serverFail');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            }else if(res.code === 'A001'){//账号或密码错误
                                this.errMsg = this.$t('accoutOrPassErr');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            }else if(res.code === 'A002'){//账户未启用，或已关闭
                                this.errMsg = this.$t('accountFundError');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            }else if(res.code === 'A009'){//账户没有菜单权限，请联系管理员开通权限
                                this.errMsg = this.$t('accountPrivaligeError');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            }else if(res.code === 'O005'){//该机构或上级机构未启用
                                this.errMsg = this.$t('accountInvalid');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            } else {
                                this.errMsg = this.$t('loginError');
                                setTimeout(() => {
                                    this.isLoging = false;
                                },500);
                            }
                        }).catch(err => {
                            this.errMsg = this.$t('loginError');
                            setTimeout(() => {
                                this.isLoging = false;
                            },500);
                        });
                    }
                })
            },
            /**
             * 判断是否有存储所在机构的索引，如果没有则默认存储第一个
             * @param data 组织树所有权限数据
             */
            setOrgIndex (data) {
                let orgIndex = localStorage.getItem('orgId');
                if(orgIndex === '' || orgIndex === null){
                    orgIndex = data[0].id;
                    localStorage.setItem('orgIndex',data[0].id);
                }
                for(let i = 0,j = data.length;i < j;i++){
                    if(orgIndex === data[i].id){
                        this.$store.commit('updateManageOrgs',data[i]);
                        break;
                    }
                }
            }
        },
        computed: {},
        created() {
            this.formInline.user =  localStorage.getItem('logName') ? localStorage.getItem('logName') : '';
            this.rememberAccount =  !!localStorage.getItem('logName');
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    $img_base_url: '../../assets/images/';
    .loginPage {
        height: 100%;
        background-color: #fff;
        background-image: get_url('login-bg.png');
        background-position: center;
        background-size: cover;
    }

    .header {
        position: absolute;
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

    .login {
        @include block_outline();
        margin: 0 auto;
        position: relative;
        .content {
            @include absolute_pos(absolute,0,0,0,0);
            margin: auto auto;
            width: 1100px;
            height: 600px;
            img {
                margin-top: 100px;
            }
        }
        .form-content {
            position: relative;
            width: 368px;
            margin-top: 100px;
            float: right;
            h1 {
                font-size: $font_size_24px;
                color: $color_333;
                margin-bottom: 40px;
                text-align: center;
            }
            .submit {
                background-image: linear-gradient(90deg, #006FBC 0%, #00A5C8 96%);
                box-shadow: 0 6px 8px 0 rgba(40, 84, 166, 0.20);
                border-radius: 4px;
                font-size: $font_size_16px;
                color: $color_fff;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                margin-top: 10px;

                &.is-loging{
                    opacity: 0.5;
                }
            }

            .error-area{
                @include block_outline($height : 25px);
                line-height: 25px;
                text-align: center;
                color: $color_red;
            }

            .auto-reme{
                margin-bottom: 10px;
            }

        }
        .copyright {
            font-size: $font_size_12px;
            color: $color_696969;
            text-align: center;
            line-height: 17px;
            width: 100%;
            @include absolute_pos(absolute, $bottom: 40px)
        }

    }
</style>
