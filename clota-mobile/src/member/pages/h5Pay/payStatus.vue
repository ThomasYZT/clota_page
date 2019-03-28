<!--
    支付结果页面
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <div class="status-wrapper">
            <div class="status" v-if="isSuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('paySuccess')}}</p>
            </div>
            <div class="status" v-else-if="isSuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('payFailure')}}</p>
            </div>

            <!-- 返回按钮 -->
            <x-button class="button" @click.native="toAccount">{{$t('backToAccount')}}</x-button>
        </div>
    </div>
</template>

<script>
    import { querystring } from 'vux';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                isSuccess : null,
                status : '',
                payFormData : {}
            };
        },
        computed : {
            ...mapGetters([
                'isLogin'
            ])
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {

                //微信内支付宝支付结果
                if (params && params.status && params.payFormData) {
                    this.status = params.status;
                    this.payFormData = params.payFormData;
                    if (params.status === 'success') {
                        this.isSuccess = true;
                        // //调用内部系统充值接口
                        // this.rechargeAccount();
                    } else {
                        this.$vux.toast.text(this.$t('payFailure'));
                        this.isSuccess = false;
                    }

                //微信内公众号支付、非微信的微信支付、支付宝支付结果
                } else {
                    let data = querystring.parse(location.href.split('?')[1]);

                    if (data && data.RespCode === '00') {
                        this.payFormData = localStorage.getItem('payFormData') ? JSON.parse(localStorage.getItem('payFormData')) : {};
                        this.isSuccess = true;
                        // //调用内部系统充值接口
                        // this.rechargeAccount();
                    } else {
                        this.$vux.toast.text(this.$t('payFailure'));
                        this.isSuccess = false;
                    }
                }
            },
            /**
             * 内部系统储值账户充值
             */
            rechargeAccount () {
                ajax.post('rechargeAccount', {
                    memberId : this.payFormData.memberId,
                    cardId : this.payFormData.cardId,
                    accountTypeId : this.payFormData.accountTypeId,
                    // paymentTypeId : this.payFormData.paymentTypeId,
                    paymentType : this.payFormData.paymentTypeId === 'wx' ? 'weixin' : 'alipay',
                    amount : this.payFormData.amount,
                    remark : this.payFormData.remark,
                    transctionId : this.payFormData.transactionId
                }).then(res => {
                    if (res.success) {
                        this.isSuccess = true;
                    } else {
                        this.$vux.toast.text(this.$t('chargeFailure'));
                        this.isSuccess = false;
                    }
                })
            },
            /**
             * 若已登录前往我的账户页面，否则为切换浏览器的情况，提示返回微信
             */
            toAccount () {
                if (this.isLogin) {
                    this.$router.push({
                        name : 'account'
                    })
                } else {
                    this.$vux.toast.text(this.$t('pleaseBackToWX'));
                }
            },
            /**
             * 监听物理键返回
             */
            physicalBack () {
                this.$router.push({
                    name : 'home'
                });
            }
        },
        mounted () {
            //监听微信物理返回
            let state = {
                title : "title",
                url : "#"
            };
            history.pushState(state, "title", "#");
            window.addEventListener("popstate", this.physicalBack, false);
        },
        beforeDestroy () {
            window.removeEventListener("popstate", this.physicalBack);
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .pay-status {
        height: 100%;
        .status-wrapper {
            width: 100%;
            height: 300px;
            position: absolute;
            top: 40%;
            margin-top: -150px;
            text-align: center;

            .status {
                .status-icon {
                    width: 150px;
                }

                .status-message {
                    margin-top: 20px;
                    font-size: 18px;
                }
            }
        }
    }

</style>
