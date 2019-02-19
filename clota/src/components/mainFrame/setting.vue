<!--系统设置-->

<template>
    <div class="system-setting"
         :style="{width : operateLine ? '240px' : '0'}"
         @click.stop="">
        <div class="img-area">
            <img src="../../assets/images/square-avatar.svg" alt="">
        </div>
        <div class="account-name">
            {{accountName | contentFilter}}
        </div>
        <div class="person-center">
            <span class="center-name" @click="toPersonCenter">
                {{$t('personalCenter')}} <span class="iconfont icon-arrow-right"></span>
            </span>
        </div>
        <div class="helper-center-entry">
            <div class="font-wrapper">
                <i class="iconfont icon-help"></i>
                <span class="helper-center" @click="toHelperCenter">{{$t('goToHelperCenter')}}</span>
            </div>
            <div class="arrow-wrapper">
                <span class="iconfont icon-arrow-right"></span>
            </div>
        </div>
        <div class="lang-wrap">
            <div class="lang-list">
                <div class="chinese"
                     :class="{active : lang === 'zh-CN'}"
                     @click="changeLang('zh-CN')">{{$t('chinese')}}</div>
                <!--<div class="chinese disabled"-->
                     <!--:class="{active : lang === 'zh-CN'}">中文</div>-->
                <!--<div class="english disabled"-->
                     <!--:class="{active : lang === 'en'}">English</div>-->
                <div class="english"
                     :class="{active : lang === 'en'}"
                     @click="changeLang('en')">{{$t('english')}}</div>
                <div class="label"
                     :style="{left : lang === 'zh-CN' ? '0px' : '100px'}"></div>
            </div>
        </div>
        <div class="skin">
            <div class="skin-title">{{$t('themeSkin')}}</div>
            <div class="blue-theame" @click="chagneSkin('blue-theame')">
                <transition name="fade">
                    <img v-if="skinType === 'blue-theame'"
                         src="../../assets/images/icon-theame-chose.svg" alt="">
                </transition>
            </div>
            <div class="black-theame" @click="chagneSkin('black-theame')">
                <transition name="fade">
                    <img v-if="skinType === 'black-theame'"
                         src="../../assets/images/icon-theame-chose.svg" alt="">
                </transition>
            </div>
            <div class="pink-theame" @click="chagneSkin('pink-theame')">
                <transition name="fade">
                    <img v-if="skinType === 'pink-theame'"
                         src="../../assets/images/icon-theame-chose.svg" alt="">
                </transition>
            </div>
        </div>
        <div class="log-out">
            <span @click="logOut">{{$t('logout')}}</span>
        </div>
    </div>
</template>

<script>
    import common from '../../assets/js/common';
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                //用户名
                accountName : ''
            };
        },
        methods : {
            /**
             * 切换语言
             * @param {*} lang
             */
            changeLang (lang) {
                this.$store.commit('setLang',lang);
            },
            /**
             * 退出登录
             */
            logOut () {
                common.loginOut();
                this.$store.commit('changeOperateLine',false);
            },
            /**
             * 修改皮肤
             * @param {*} skin
             */
            chagneSkin (skin) {
                this.$store.commit('updateSkin',skin);
            },
            getAccountName () {
                this.accountName = sessionStorage.getItem('accountName') ? sessionStorage.getItem('accountName') : '';
            },
            /**
             * 跳转到个人中心页面
             */
            toPersonCenter () {
                this.$router.push({
                    name : 'personalInfo'
                });
                this.$store.commit('changeOperateLine',false);
            },
            /**
             * 前往帮助中心
             */
            toHelperCenter () {
                this.$router.push({
                    name : 'helperCenter'
                });
                this.$store.commit('changeOperateLine',false);
            }
        },
        created () {
            this.getAccountName();
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                operateLine : 'operateLine',
                skinType : 'skinType'
            }),
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .system-setting{
        @include block_outline(0);
        @include absolute_pos(absolute,$top : 0,$right : 0);
        z-index: 9999;
        background: #FFFFFF;
        box-shadow: -2px 0 14px 0 rgba(0,0,0,0.10);
        border-radius: 1px;
        padding: 20px 0 ;
        transition: all 0.3s;
        overflow: hidden;

        .img-area{
            @include block_outline(58px,58px);
            margin: 0 auto;

            img{
                display: block;
                @include block_outline();
                border-radius: 30px;
            }
        }

        .account-name{
            @include block_outline($height : 40px);
            padding-top: 20px;
            line-height: 20px;
            font-size: $font_size_18px;
            text-align: center;
            color: $color_333;
        }

        .person-center{
            font-size: $font_size_12px;
            margin: 5px 0 ;
            color: $color_blue;
            text-align: center;

            .center-name{
                cursor: pointer;

                .icon-arrow-right{
                    font-size: 12px;
                }
            }
        }

        .helper-center-entry {
            @include block_outline($height : 50px);
            display: flex;
            line-height: 50px;
            text-align: center;
            font-size: 14px;
            color: $color_blue;

            .font-wrapper {
                flex: 1 0;
                flex-basis: 80%;
                text-align: center;
            }

            .arrow-wrapper {
                flex: 1 0;
                flex-basis: 20%;
                text-align: left;
            }

            .helper-center {
                cursor: pointer;
            }
        }

        .lang-wrap{
            @include block_outline($height : 70px);
            padding: 20px;
            border-top: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;

            .lang-list{
                position: relative;
                @include block_outline();
                background: $color_fafa;
                border-radius: 15px;

                .chinese,
                .english{
                    position: relative;
                    z-index: 2;
                    @include block_outline(50%);
                    float: left;
                    font-size: $font_size_18px;
                    color: $color_gray;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                    transition: all 0.5s;

                    &.disabled{
                        color: $color_gray;
                        cursor: not-allowed;
                    }

                    &.active{
                        color: $color_fff;
                        transition: all 0.3s;
                    }
                }

                .label{
                    @include block_outline(50%);
                    @include absolute_pos(absolute,$left : 0,$top : 0);
                    border-radius: 15px;
                    background: #2F70DF;
                    z-index: 1;
                    transition: all 0.3s;
                }
            }
        }

        .skin{
            padding: 0 28px;
            overflow: auto;
            height: calc(100% - 224px);

            .skin-title{
                @include block_outline($height : 60px);
                line-height: 20px;
                text-align: center;
                font-size: $font_size_14px;
                color: $color_333;
                padding: 20px 0;
            }

            .blue-theame,
            .black-theame,
            .pink-theame{
                display: flex;
                align-items: center;
                justify-content: center;
                @include block_outline($height : 108px);
                border-radius: 4px;
                margin-bottom: 25px;
                cursor: pointer;

                img{
                    display: block;
                    @include block_outline(51px,51px);
                }
            }
        }

        .log-out{
            @include block_outline($height : 40px);
            @include absolute_pos(absolute,$bottom : 0);
            border-top: 1px solid #EEEEEE;
            line-height: 40px;
            font-size: $font_size_14px;
            color: $color_red;
            text-align: center;
            background: $color_fff;

            span{
                cursor: pointer;
            }
        }
    }
</style>
