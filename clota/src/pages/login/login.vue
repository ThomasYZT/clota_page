<template>
    <div class="loginPage">
        <!-- 页面头部 -->
        <div class="header">
            <div class="logo">
                <img src="../../assets/images/logo.svg" alt="">
            </div>
            <div class="lang">
                <span @click="changeLang">简体中文</span>
                <span>|</span>
                <span @click="changeLang">English</span>
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
                                       v-model="formInline.user"
                                       :placeholder="$t('userName')"/>
                                <span class="icon"></span>
                            </div>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password"
                                   prefix="logo-usd"
                                   v-model="formInline.password"
                                   :placeholder="$t('password')"/>
                        </Form-item>
                        <Form-item>
                            <Checkbox>{{ $t("autoLogin") }}</Checkbox>
                        </Form-item>
                        <Form-item>
                            <div class="submit" @click="handleSubmit('formInline')">{{ $t("login") }}</div>
                        </Form-item>
                    </Form>
                </div>
            </div>
            <div class="copyright">{{ $t("copyright") }}</div>
        </div>
    </div>
</template>


<script>
    import ajax from '@/api/index'

    export default {
        components: {},
        data() {
            return {
                formInline: {
                    user: 'admin', //登录账号
                    password: 'admin' //登录密码
                },
                ruleInline: {
                    user: [
                        {required: true, message: this.$t("uesrNameText"), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t("passwordText"), trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            //改变语言
            changeLang() {
                this.$store.commit('setLang', 'lang');
            },
            //登录提交表单
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('token','token');
                        this.$store.dispatch('getUserInfo').then(route => {
                            this.$router.push({
                                path: route.path
                            });
                        });
                        // ajax.login({}).then((res) => {
                        //     if (res.success) {
                        //         this.$Message.success(this.$t("loginSuccess") + '!');
                        //     } else {
                        //         this.$Message.error(this.$t("loginError") + '!');
                        //     }
                        // });
                    } else {
                        this.$Message.error(this.$t("formValidate") + '!');
                    }
                })
            }
        },
        computed: {},
        created() {
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
        @include clearfix;
        padding: 40px 80px;
        height: 53px;
        line-height: 53px;
        box-sizing: content-box;
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
        min-height: 100%;
        width: $content_min_width;
        margin: 0 auto;
        position: relative;
        .content {
            min-height: 600px;
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
                margin-top: 25px;
                text-align: center;
                cursor: pointer;
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
