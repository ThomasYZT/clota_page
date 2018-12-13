<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="get-card-url"></div>
</template>

<script>
    //
    import ajax from '../../api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { genderEnum } from '@/assets/js/constVariable.js';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import { validator } from 'klwk-ui';

    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                //微信用户信息
                wxUserInfo : {},
                // 卡的拓展信息
                cardExt: {}
            }
        },
        methods: {
            /**
             * 获取路由信息
             */
            getParams () {
                let queryParams = this.getUrlString(location.href);
                if (queryParams && queryParams.code) {
                    this.getOAuth2UserInfo(queryParams.code);
                }
            },
            /**
             * 获取微信用户信息
             * @param{String} code 微信回调code
             */
            getOAuth2UserInfo (code) {
                // 已经存在用户信息则不用获取
                let wxUserInfo = localStorage.getItem('wxUserInfo') && localStorage.getItem('wxUserInfo')!=={} ? JSON.parse(localStorage.getItem('wxUserInfo')) : {};
                if (wxUserInfo && wxUserInfo.openId) {
                    this.wxUserInfo = wxUserInfo;
                    this.queryUnboundCard();
                    return false;
                }
                ajax.post('getOAuth2UserInfo',{
                    code : code,
                    lang : this.lang,
                    companyCode : this.companyCode
                }).then(res => {
                    if (res.success) {
                        this.wxUserInfo = res.data ? res.data : {};
                        //存储token信息
                        localStorage.setItem('wxUserInfo', JSON.stringify(this.wxUserInfo));
                    } else {
                        //错误信息为空，表示获取到了用户信息
                        if (!res.errcode) {
                            this.wxUserInfo = res.data ? res.data : {};
                            //存储token信息
                            localStorage.setItem('wxUserInfo', JSON.stringify(this.wxUserInfo));
                        } else {
                            this.wxUserInfo = {};
                        }
                    }
                    this.queryUnboundCard();
                });
            },
            /**
             * 获取url的参数
             * @param{String} url url地址
             * @returns {Array} query参数
             *
             */
            getUrlString (url) {
                let obj = {};
                if (url.indexOf('?') !== -1) {
                    let query = url.split("?")[1];
                    let queryArr = query.split("&");
                    queryArr.forEach(function (item) {
                        let key = item.split("=")[0];
                        let value = item.split("=")[1];
                        obj[key] = value;
                    });
                }
                return obj;
            },
            /**
             * 是否领取会员卡至微信卡包
             */
            queryUnboundCard () {
                ajax.post('queryUnboundCard', {
                    openId: this.wxUserInfo.openId
                }).then((res) => {
                    if(res.success) {
                        this.getWxMpCardId(res.data ? res.data.cardCode : '');
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 获取卡Id
             */
            getWxMpCardId (cardCode) {
                ajax.post('getWxMpCardId').then((res) => {
                    if(res.success) {
                        this.getCardExt(res.data, cardCode);
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 获取卡的拓展信息
             */
            getCardExt (cardId, cardCode) {
                ajax.post('getCardExt', {
                    companyCode: this.companyCode,
                    code: cardCode,
                    cardId: cardId,
                    openId: this.wxUserInfo.openId
                }).then((res) => {
                    if(res.success) {
                        this.cardExt = res.data ? res.data : {};
                        this.getCard();
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 领取卡包
             */
            getCard () {
                let cardExt = {
                    code: this.cardExt.code,
                    openid: this.cardExt.openId,
                    timestamp: this.cardExt.timestamp,
                    nonce_str: this.cardExt.nonceStr,
                    signature: this.cardExt.signature
                };
                this.$wechat.addCard({
                    cardList: [
                        {
                            cardId: this.cardExt.cardId,
                            cardExt: JSON.stringify(cardExt)
                        }
                    ],
                    success: res => {
                        console.log(res);
                    },
                    fail: res => {
                        this.$vux.toast.text(this.$t('getCardFail'));
                    },
                    complete: () => {
                        this.isShowCard = false;
                    }
                });
            }
        },
        computed :{
            ...mapGetters({
                lang : 'lang',
                companyCode : 'companyCode'
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../../assets/images/';

    .register {
        height: 100%;
        width: 100%;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;

        /deep/ .weui-cell__primary{
            padding-right: 10px;
        }

        .msg {
            margin-left: 14px;
            padding: 10px 0;
            color: #FF8C69;
            font-size: 12px;
            font-style: italic;
        }

        /deep/ .weui-cell.vux-tap-active.weui-cell_access {
            height: 100% !important;
        }

        .vux-datetime::before {
            border-top: 0;
        }

        .validate{
            height: 100%;
            padding: 0 18px;
            text-align: center;
            font-size: $font_size_12px;
            color: #046FDB;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #F5F5F5;

            &.time-counting{
                color: #C5C5C5;
            }
        }
    }
</style>
