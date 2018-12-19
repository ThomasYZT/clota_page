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
                    <span class="lang-list" :class="{ active : lang === 'zh-CN' }" @click="changeLang('zh-CN')">中文</span>
                    <span class="lang-split-line">|</span>
                    <span class="lang-list" :class="{ active : lang === 'en' }" @click="changeLang('en')">English</span>
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
                            <personalRegister ref="personalRegister"></personalRegister>
                        </TabPane>
                        <!-- 公司注册 -->
                        <TabPane :label="$t('companyRegist')" name="company">
                            <companyRegister ref="companyRegister"></companyRegister>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import companyRegister from './child/companyRegister';
    import personalRegister from './child/personalRegister';
    import { mapGetters } from 'vuex';
    export default {
        components: {
            companyRegister,
            personalRegister
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                lang : 'lang'
            })
        },
        methods: {
            //改变语言
            changeLang(lang) {
                this.$store.commit('setLang',lang);
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url: '../../assets/images/';

    .register {
        height: 100%;
        overflow: auto;
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
                    .lang-list{
                        float: left;
                        font-size: $font_size_16px;
                        cursor: pointer;
                        color: #9d9d9d;

                        &.active{
                            font-size: $font_size_18px;
                            color: $color_333;
                        }
                    }
                    &.active{
                        font-size: $font_size_18px;
                        color: $color_333;
                    }
                    .lang-split-line{
                        float: left;
                        margin : 0 10px;
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
                        }
                    }
                }
            }

        /deep/ .ivu-steps-vertical .ivu-steps-head {
            position: relative;
            width: 40px;
            height: 40px;
            background-color: rgba(0,99,186,.2);
            border-radius: 50%;
        }

        /deep/ .ivu-steps .ivu-steps-head-inner {
            position: absolute;
            top: 9.05px;
            left: 9.05px;
            width: 21.9px;
            height: 21.9px;
            line-height: 21.9px;
            border: none;
            border-radius: 50%;
        }

        /deep/ .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
            background-color: #2f70df;
        }
        /deep/ .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner {
            background-color: #2f70df;
        }

        /deep/ .ivu-steps-vertical .ivu-steps-tail {
            left: 20px;
            top: 7px;
        }
    }
</style>
