<!--
    支付结果页面
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <div class="status-wrapper">
            <div class="status" v-show="isSuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('reserveSucessfully')}}</p>
                <div class="success-label">
                    {{$t('reserveSuccessfullyNotice')}}
                </div>
            </div>
            <div class="status" v-show="isSuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('reserveFaield')}}</p>
            </div>

            <!-- 返回按钮 -->
            <x-button v-show="isSuccess !== null" class="button" @click.native="toAccount">{{$t('continueToReserve')}}</x-button>
        </div>
    </div>
</template>

<script>
    import { querystring } from 'vux'
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import ajax from '@/marketing/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                isSuccess : null,
                status : '',
                payFormData : {},
                //支付来源，销售用户或游客直接下单
                fromUser : ''
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
             * @param toRoute
             */
            getParams (params,toRoute) {
                if (toRoute && toRoute.query.userType) {
                    this.fromUser = toRoute.query.userType;
                }
                //到付
                if (params && params.payType === 'collect') {
                    this.payFormData = localStorage.getItem('payFormData') ? JSON.parse(localStorage.getItem('payFormData')) : {};
                    this.fromUser = this.payFormData.from;
                    //下单
                    this.createOrder();
                } else {
                    this.payFormData = localStorage.getItem('payFormData') ? JSON.parse(localStorage.getItem('payFormData')) : {};
                    this.fromUser = this.payFormData.from;
                    //微信内支付宝支付结果
                    if (params && params.status && params.payFormData) {
                        this.status = params.status;
                        if (params.status === 'success') {
                            this.isSuccess = true;
                            if (this.payFormData.paymentTypeId === 'wx') {
                                //下单
                                // this.createOrder();
                                this.isSuccess = true;
                            }
                        } else {
                            this.isSuccess = false;
                        }
                    } else {//微信内公众号支付、非微信的微信支付、支付宝支付结果
                        let data = querystring.parse(location.href.split('?')[1]);
                        if (data && data.RespCode === '00') {
                            //下单
                            // this.createOrder();
                            this.isSuccess = true;
                        } else {
                            this.isSuccess = false;
                        }
                    }
                }
            },
            /**
             * 若已登录前往我的产品页面，否则为切换浏览器的情况，提示返回微信
             */
            toAccount () {
                if (this.fromUser === 'marketer') {
                    this.$router.replace({
                        name : 'marketingProduct'
                    });
                } else {
                    this.$router.replace({
                        name : 'marketingTourist'
                    });
                }
            },
            /**
             * 监听物理键返回
             */
            physicalBack () {
                // this.$router.push({
                //     name : 'home'
                // });
            },
            /**
             * 新建订单
             */
            createOrder () {
                let createOrderParams = {};
                try {
                    createOrderParams = localStorage.getItem('create-order-detail') ? JSON.parse(localStorage.getItem('create-order-detail')) : {};
                } catch (e) {
                    createOrderParams = {};
                }
                if (this.payFormData.paymentTypeId === 'collect') {
                    Object.assign(createOrderParams,{
                        paymentType : 'collect'
                    });
                } else {
                    Object.assign(createOrderParams,{
                        paymentType : 'deposit'
                    });
                }
                ajax.post('market_addVisitorOrder',Object.assign({
                    transctionId : this.payFormData.transactionId,
                    orderId : this.payFormData.bizId,
                    from : this.payFormData.from
                },createOrderParams)).then(res => {
                    if (res.success) {
                        this.isSuccess = true;
                    } else if (res.code && res.code !== '300') {
                        this.isSuccess = false;
                        this.$vux.toast.text(this.$t('errorMsg.' + res.code));
                    } else {
                        this.isSuccess = false;
                    }
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
            height: 280px;
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

                .success-label{
                    width: calc(100% - 46px);
                    margin: 10px auto 0;
                    text-align: center;
                    font-size: $font_size_14px;
                    color: $color_999;
                }
            }
        }

        .button{
            margin-top: 50px;
        }
    }

</style>
