<!--系统设置-->

<template>
    <div class="system-setting"
         :style="{right : operateLine ? '-10px' : '-250px'}"
         @click.stop="">
        <div class="img-area">
            <img src="../../assets/images/icon-no-data.png" alt="">
        </div>
        <div class="account-name">
            admin
        </div>
        <div class="person-center">个人中心</div>
        <div class="lang-wrap">
            <div class="lang-list">
                <div class="chinese"
                     :class="{active : lang === 'zh-CN'}"
                     @click="changeLang('zh-CN')">中文</div>
                <div class="english"
                     :class="{active : lang === 'en'}"
                     @click="changeLang('en')">英文</div>
                <div class="label"
                     :style="{left : lang === 'zh-CN' ? '0px' : '100px'}"></div>
            </div>
        </div>
        <div class="skin">
            <div class="skin-title">主题皮肤</div>
            <div class="skin-blue">

            </div>
            <div class="skin-black">

            </div>
            <div class="skin-pink">

            </div>
        </div>
        <div class="log-out">
            <span @click="logOut">退出系统</span>
        </div>
    </div>
</template>

<script>
    import common from '../../assets/js/common';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {}
        },
        methods: {
            /**
             * 切换语言
             * @param lang
             */
            changeLang (lang) {
                this.$store.commit('setLang',lang)
            },
            /**
             * 退出登录
             */
            logOut () {
                common.loginOut();
                this.$store.commit('changeOperateLine',false);
            }
        },
        computed : {
            ...mapGetters({
                lang: 'lang',
                operateLine : 'operateLine'
            }),
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .system-setting{
        @include block_outline(240px);
        @include absolute_pos(absolute,$top : 0,$right : -10px);
        z-index: 90;
        background: #FFFFFF;
        box-shadow: -2px 0 14px 0 rgba(0,0,0,0.10);
        border-radius: 1px;
        padding: 20px 0 ;
        transition: all 0.3s;

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
            cursor: pointer;
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

            .skin-blue{
                @include block_outline($height : 108px);
                background-image: linear-gradient(-45deg, #0055B8 100%, #00C2CD 0%);
                border-radius: 4px;
                margin-bottom: 25px;
            }

            .skin-black{
                @include block_outline($height : 108px);
                background-image: linear-gradient(-59deg, #182577 5%, #57AFDA 100%);
                border-radius: 4px;
                margin-bottom: 25px;
            }

            .skin-pink{
                @include block_outline($height : 108px);
                background-image: linear-gradient(-37deg, #553E9B 0%, #E47C96 94%);
                border-radius: 4px;
                margin-bottom: 25px;
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

            span{
                cursor: pointer;
            }
        }
    }
</style>
