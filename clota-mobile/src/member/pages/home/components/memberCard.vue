<!--
    会员卡组件
    作者：杨泽涛
-->
<template>
    <div class="member-card"
         :class="[memberVipCardClass]">
        <div class="member-status" v-if="info.status === 'frozen'">{{$t('frozen')}}</div>
        <div class="card-content">
            <div class="person-info">
                <div class="left">
                    <div class="img-wrapper">
                        <img @click="showImg" class="person-img" :src="userInfo.portrait ? userInfo.portrait : memberHeadImg" alt="">
                    </div>
                    <span class="username" @click="toPersonInfo">
                      <span class="name">
                      {{info.custName | contentFilter}}
                      </span>
                      <span class="iconfont icon-arrow"></span>
                  </span>
                </div>
                <div class="right">
                    <div  class="card-level" style="display: flex;align-items: center;">
                        <i class="iconfont icon-level"></i>
                        <span class="level-name">{{info.levelDesc}}</span>
                    </div>
                </div>
            </div>

            <div class="bottom-info-wrapper">

                <div class="company-info">
                    <span>{{info.orgName | contentFilter}}</span>
                </div>
                <div class="card-info">
                    <div style="font-weight: bold;font-size: 18px;">{{info.cardCode | formatCardCode}}</div>
                    <div v-show="info.inCode" @click="toEnterScenicCode">
                        <span>{{$t('enterSenicCode')}}</span>
                        <i class="iconfont icon-code"></i>
                        <i class="iconfont icon-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <!--预览图片-->
        <previewer
            v-transfer-dom
            class="poster-preview"
            :options="options"
            :list="prevList"
            ref="previewer">
        </previewer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //会员卡信息
            info : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                options : {
                    getThumbBoundsFn : (index) => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        thumbnail = this.$el.querySelector('.person-img');
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                },
            };
        },
        computed : {
            ...mapGetters({
                isLoading : 'isLoading',
                userInfo : 'userInfo',
                cardInfo : 'cardInfo'
            }),
            //预览图片列表
            prevList () {
                return [{
                    src : this.userInfo.portrait ? this.userInfo.portrait : this.memberHeadImg,
                    w : '100%',
                }];
            },
            //vip卡类名
            memberVipCardClass () {
                let cardType = '';
                cardType += 'personal-card ';
                if (this.info.cardForm === 'sale') {
                    cardType += 'sale-card';
                } else {
                    switch (this.info.levelNum) {
                        case 1:
                            cardType += 'one-level ';
                            break;
                        case 2:
                            cardType += 'two-level ';
                            break;
                        case 3:
                            cardType += 'three-level ';
                            break;
                        case 4:
                            cardType += 'four-level ';
                            break;
                        default:
                            cardType += 'four-level ';
                    }
                }
                return cardType;
                // let cardType = '';
                // if (this.info.cardTypeId === '1') {
                //     //业主卡
                //     cardType += 'owner-card ';
                //     return cardType;
                // } else if (this.info.cardTypeId === '2') {
                //     //个人卡
                //     cardType += 'personal-card ';
                //     switch (this.info.levelNum) {
                //         case 1:
                //             cardType += 'one-level ';
                //             break;
                //         case 2:
                //             cardType += 'two-level ';
                //             break;
                //         case 3:
                //             cardType += 'three-level ';
                //             break;
                //         case 4:
                //             cardType += 'four-level ';
                //             break;
                //         default:
                //             cardType += 'four-level ';
                //     }
                //     return cardType;
                // } else if (this.info.cardTypeId === '3') {
                //     //企业卡
                //     cardType = 'company-card ';
                //     return cardType;
                // }
            },
            //头像信息
            memberHeadImg () {
                if (this.info && this.info.portrait) {
                    return this.info.portrait;
                } else {
                    return require('../../../../assets/images/defaut-face.png');
                }
            }
        },
        filters : {
            /**
             * 格式化会员卡号
             * @param{String} val 会员卡号
             * @return {string}
             */
            formatCardCode (val) {
                if (!val) return '-';
                val = val.toString();
                return val.replace(/(.{4})/g,'$& ');
            }
        },
        methods : {
            /**
             *  跳转到会员二维码
             */
            toMemberCode () {
                this.$router.push({
                    name : 'memberCode'
                });
            },
            /**
             * 跳转到会员详情
             */
            toPersonInfo () {
                this.$router.push({
                    name : 'personInfo'
                });
            },
            /**
             *  放大显示头像
             */
            showImg () {
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 跳转入园二维码
             */
            toEnterScenicCode () {
                this.$router.push({
                    name : 'scenicCode'
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-card {
        position: relative;
        width: 347px;
        height: 170px;
        margin: 11px auto;
        border-radius: 13px;
        background-size: 100% 100%;
        overflow: hidden;

        .member-status{
            @include absolute_pos(absolute,$right : 0,$bottom : 0);
            @include block_outline(120px,20px);
            color: $color_err;
            background: $color_fff;
            text-align: center;
            transform: rotate(-45deg) translate(35px,0px);
        }

        //业主卡样式
        &.owner-card {
            color: #fff;
            background-image: url("../../../../assets/images/owner-card.png");

            .card-level {
                background-color: rgba(220, 220, 220, .2);
            }
        }
        //个人卡样式
        &.personal-card {
            color: #fff;
            &.one-level {
                background-image: url("../../../../assets/images/personal-card-lv1.png");
                box-shadow: #a8adc8 0 5px 10px;
                .card-level{
                    background: rgba(220, 220, 220, .2);
                }
            }
            &.sale-card{
                background-image: url("../../../../assets/images/icon-sale-card.png");
                box-shadow: #a8adc8 0 5px 10px;
                .card-level{
                    background: rgba(220, 220, 220, .2);
                }
            }
            &.two-level {
                background-image: url("../../../../assets/images/personal-card-lv2.png");
                box-shadow: #dfcc9b 0 5px 10px;
                .card-level{
                    background: rgba(220, 220, 220, .2);
                }
            }
            &.three-level {
                background-image: url("../../../../assets/images/personal-card-lv3.png");
                box-shadow: #ceaf9b 0 5px 10px;
                .card-level{
                    background: rgba(220, 220, 220, .2);
                }
            }
            &.four-level {
                color: #F0D890;
                background-image: url("../../../../assets/images/personal-card-lv4.png");
                box-shadow: #B1B1B1 0 5px 10px;
                .card-level{
                    background: rgba(220, 220, 220, .2);
                }
            }
        }
        //企业卡样式
        &.company-card {
            color: #fff;
            background-image: url("../../../../assets/images/year-card.png");
            .card-level {
                background: rgba(220, 220, 220, .2);
            }
        }

        .card-content {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 21.2px;

            .person-info {
                display: flex;
                height: 33px;
                width: 100%;

                div {
                    &.left {
                        flex: 1 0;
                        display: flex;
                        flex-direction: row;
                        .img-wrapper {
                            display: inline-block;
                            position: relative;
                            width: 33px;
                            height: 100%;
                            border-radius: 50%;
                            background-color: rgba(255,255,255,0.1);

                            img.person-img {
                                position: absolute;
                                margin-right: 12px;
                                border-radius: 50%;
                                left: 1.5px;
                                top: 1.5px;
                                width: 30px;
                                height: 30px;
                                display: inline-block;
                            }
                        }

                        span.username {
                            margin-left: 5px;
                            display: inline-block;
                            width: calc(100% - 60px);
                            height: 100%;
                            line-height: 32.65px;
                            vertical-align: top;
                            font-size: 14px;
                            @include overflow_tip();

                            .name{
                                vertical-align: middle;
                            }

                            .icon-arrow{
                                font-size: 12px!important;
                                vertical-align: middle;
                                line-height: 16px;
                                margin-top: 8px;
                            }
                        }
                    }
                    &.right {
                        text-align: right;
                        position: relative;

                        .card-level {
                            margin-top: 4px;
                            padding: 0 15px;
                            width: auto;
                            min-width: 50px;
                            height: 24px;
                            display: inline-block;
                            border-radius: 15px;
                            font-size: 8px;
                            line-height: 24px;
                            text-align: center;

                            .icon-level{
                                font-size: $font_size_12px;
                            }

                            .level-name{
                                font-size: $font_size_12px;
                                margin-left: 3px;
                            }

                            i {
                                font-size: 8px;
                                opacity: 1;
                            }
                            span {
                                opacity: 1;
                            }
                        }

                    }
                }
            }

            .bottom-info-wrapper {
                position: absolute;
                width: 282.6px;
                bottom: 21.2px;

                .company-info {
                    position: relative;
                    height: 19px;
                    width: 100%;
                    margin-bottom: 9px;
                    font-size: 14px;
                }

                .card-info {
                    display: flex;
                    bottom: 0;
                    height: 19px;
                    line-height: 19px;
                    width: 304.6px;
                    font-size: 14px;

                    div {
                        text-align: left;
                        &:first-child {
                            flex: 1 0;
                            white-space: nowrap;
                        }
                        &:last-child {
                            flex: 1 0;
                            height: 19px;
                            line-height: 19px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>
<style module>
    .modalImg{
        width: 100%;
    }
</style>
<style>
    .poster-preview .pswp__bg{
        background: rgba(0,0,0,0.5)!important;
    }
</style>
