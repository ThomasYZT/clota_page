<!--
    支付结果页面
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <div class="status-wrapper">
            <div class="status" v-if="isSuccess === true">
                <img class="status-icon" src="../../../assets/images/pay-success.svg" alt="">
                <p class="status-message">{{$t('下单成功')}}</p>
            </div>
            <div class="status" v-else-if="isSuccess === false">
                <img class="status-icon" src="../../../assets/images/pay-failure.svg" alt="">
                <p class="status-message">{{$t('下单失败')}}</p>
            </div>

            <!-- 返回按钮 -->
            <x-button class="button" @click.native="toAccount">{{$t('返回产品列表')}}</x-button>
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
                        //调用内部系统充值接口
                        this.rechargeAccount();
                    } else {
                        this.isSuccess = false;
                    }

                //微信内公众号支付、非微信的微信支付、支付宝支付结果
                } else {
                    let data = querystring.parse(location.href.split('?')[1]);
                    if (data && data.RespCode === '00') {
                        this.payFormData = localStorage.getItem('payFormData') ? JSON.parse(localStorage.getItem('payFormData')) : {};
                        //调用内部系统充值接口
                        this.rechargeAccount();
                    } else {
                        this.isSuccess = false;
                    }
                }
            },
            /**
             * 内部系统储值账户充值
             */
            rechargeAccount () {
                this.createOrder();
                // ajax.post('market_updateTransction', {
                //     // memberId : this.payFormData.memberId,
                //     // cardId : this.payFormData.cardId,
                //     // accountTypeId : this.payFormData.accountTypeId,
                //     // // paymentTypeId : this.payFormData.paymentTypeId,
                //     // paymentType : this.payFormData.paymentTypeId === 'wx' ? 'weixin' : 'alipay',
                //     // amount : this.payFormData.amount,
                //     // remark : this.payFormData.remark,
                //     orderId : this.payFormData.orderId,
                //     transctionId : this.payFormData.transactionId
                // }).then(res => {
                //     if (res.success) {
                //         this.isSuccess = true;
                //     } else {
                //         this.isSuccess = false;
                //     }
                // });
            },
            /**
             * 若已登陆前往我的账户页面，否则为切换浏览器的情况，提示返回微信
             */
            toAccount () {
                this.$router.push({
                    name : 'marketingTourist'
                });
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
                let createOrderParams = localStorage.getItem('create-order-detail') ? JSON.parse(localStorage.getItem('create-order-detail')) : {};
                ajax.post('market_addVisitorOrder',Object.assign({
                    transctionId : this.payFormData.transactionId
                },createOrderParams)).then(res => {

                    if (res.success) {
                        // this.$router.replace({
                        //     name : 'marketingCreateOrderToPay',
                        //     params : {
                        //         productName : this.productDetail.productName,
                        //         totalAmount : this.totalAmount,
                        //         orderId : res.data ? res.data : ''
                        //     }
                        // });
                        this.isSuccess = true;
                    } else if (res.code && res.code !== '300') {
                        this.isSuccess = false;
                        this.$vux.toast.text(this.$t('errorMsg.' + res.code));
                    } else {
                        this.isSuccess = false;
                        // this.$vux.toast.text(this.$t('下单失败'));
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
