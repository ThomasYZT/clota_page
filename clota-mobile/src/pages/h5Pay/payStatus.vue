<!--
    支付结果页面
    作者：杨泽涛
-->
<template>
    <div class="pay-status">
        <div class="status-wrapper">
            <div v-if="isSuccess === true">
                <img src="../../assets/images/pay-success.svg" alt="">
                <p>{{$t('paySuccess')}}</p>
            </div>
            <div v-else-if="isSuccess === false">
                <img src="../../assets/images/pay-success.svg" alt="">
                <p>{{$t('payFailure')}}</p>
            </div>

            <!-- 返回按钮 -->
            <x-button class="button" @click.native="toAccount">{{$t('backToAccount')}}</x-button>
        </div>
    </div>
</template>

<script>
    import { querystring } from 'vux'
    import lifeCycleMixins from '../../mixins/lifeCycleMixins';
    import ajax from '@/api/index.js';
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
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {

                if (params && params.status && params.payFormData) {
                    this.status = params.status;
                    this.payFormData = params.payFormData;
                    if (params.status === 'success') {
                        this.isSuccess = true;
                        this.rechargeAccount();
                    } else {
                        this.isSuccess = false;
                    }
                } else {
                    let data = querystring.parse(location.href.split('?')[1]);

                    if (data && data.RespCode === '00') {
                        this.payFormData = localStorage.getItem('payFormData') ? JSON.parse(localStorage.getItem('payFormData')) : {};

                        this.rechargeAccount();
                    } else {
                        this.isSuccess = false;
                    }
                    //支付结果同步
                    alert('无同步接口')
                    //alert(JSON.stringify(data));

                    //this.syncPayTransactionResult(data);

                }
            },
            /**
             * 获取url的参数
             * @param url
             * @returns {Array}
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
             * 储值账户充值
             */
            rechargeAccount () {
                ajax.post('rechargeAccount', {
                    memberId : this.payFormData.memberId,
                    cardId : this.payFormData.cardId,
                    accounId : this.payFormData.accounId,
                    paymentTypeId : this.payFormData.paymentTypeId,
                    amount : this.payFormData.amount,
                    remark : this.payFormData.remark,
                    transctionId : this.payFormData.transactionId
                }).then(res => {
                    this.isSuccess = true;
                })
            },
            /**
             * 前往我的账户页面
             */
            toAccount () {
                history.length = 0;
                location.href = location.origin + '/#/account';
            },
            /**
             * 支付结果同步接口
             */
            syncPayTransactionResult (params) {
                ajax.post(' ', params).then(res => {
                    if (res.success) {

                    } else {

                    }
                })
            }
        },
        mounted () {
            // let state = {
            //     title : "payStatus",
            //     url : "#"
            // };
            // history.pushState(state, "", "#");
            // window.addEventListener("popstate", function () {
            //     if (history.state.payStatus) {
            //         window.location.href = location.origin + '/#/account';//指定回退的地址
            //     }
            // }, false);
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

            div {
                img {
                    width: 150px;
                }

                p {
                    margin-top: 20px;
                    font-size: 18px;
                }
            }
        }
    }

</style>
