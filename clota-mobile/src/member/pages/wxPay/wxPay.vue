<template>
    <div class="wx-pay">
        <x-button class="button"
                  @click.native="wxPayConfig">微信支付测试</x-button>
    </div>
</template>

<script>
    import ajax from '../../api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data () {
            return {
                goodInfo: {
                    body: '测试商品', // 商品信息
                    total_fee: 1, // 订单总金额
                    trade_type: 'JSAPI', // 交易类型
                    product_id: '1',// 商品ID
                },
                //微信用户信息
                wxUserInfo : {}
            }
        },
        mixins : [lifeCycleMixins],
        methods: {
            /**
             * 获取支付配置
             */
            wxPayConfig () {
                let payParams = Object.assign({
                    openid: this.wxUserInfo.openId
                }, this.goodInfo);
                ajax.post('payUnifiedorder', JSON.stringify(payParams), { headers: {
                    'Content-Type': 'application/json;charset-UTF-8'
                }}).then((res) => {
                    if(res.success && res.data) {
                        this.wxPay(res.data);
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 微信支付
             */
            wxPay (data) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        'appId': data.appid, //公众号名称，由商户传入
                        'timeStamp':data.timeStamp, //时间戳，自1970年以来的秒数
                        'nonceStr': data.nonce_str, //随机串
                        'package': 'prepay_id=' + data.prepay_id,
                        'signType': data.signType, //微信签名方式：
                        'paySign': data.paySign //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ){
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            console.log(res)
                        }
                    });
            },
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
            }
        },
        computed :{
            ...mapGetters({
                lang : 'lang'
            })
        }
    }
</script>
