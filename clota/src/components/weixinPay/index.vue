<!--微信扫码支付-->

<template>
    <Modal
        :title="$t('微信支付')"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="weixin-pay"
        class-name="vertical-center-modal">
        <img :src="qrCodeSrc" class="qr-code" alt="">
        <div class="scan-img">
            <img src="../../assets/images/icon-wait-pay.svg" alt="">
        </div>
        <div class="cancel-area">
            <Button type="ghost" @click="revocation">{{$t('cancleTrade')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
	export default {
        props : {
            //支付链接
            'pay-link' : {
                type : String,
                default : ''
            },
            value : Boolean,
            //交易id
            'transaction-id' : {
                type : String,
                default : ''
            }
        },
		data () {
			return {
                //二维码图片
                qrCodeSrc : '',
                //定时器
                timer : null,
                //轮询查询时间
                loopSearchTime : 1200000,
                //是否在查询支付结果中
                searchIng : false,
            };
		},
		methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
                if (type === true) {
                    this.$QRcode.toDataURL(this.payLink, {
                        errorCorrectionLevel : 'H',
                        type : 'image/jpeg',
                        rendererOpts : {
                            quality : 0.5
                        },
                        width : this.width
                    }).then(res => {
                        this.qrCodeSrc = res;
                    });
                    this.timer = setInterval(() => {
                        if (this.loopSearchTime <= 0) {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.changeValue(false);
                            this.$emit('pay-unknow');
                        } else {
                            if (!this.searchIng) {
                                this.queryPayResult();
                            }
                        }
                    },3000);
                } else {
                    if (this.timer !== null) {
                        this.revocation();
                    }
                }
            },
            /**
             * 查询支付结果
             */
            queryPayResult () {
                this.searchIng = true;
                ajax.post('queryConsumeUpdateBiz',{
                    transactionId : this.transactionId
                },null,false).then(res => {
                    if (res.success && res.data === 'success') {
                        this.$emit('pay-success');
                        this.changeValue(false);
                        clearInterval(this.timer);
                        this.timer = null;
                    } else if (res.data === 'fail') {
                        this.$emit('pay-fail');
                        this.changeValue(false);
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }).finally(() => {
                    this.searchIng = false;
                    this.loopSearchTime -= 3000;
                });
            },
            /**
             * 撤销
             */
            revocation () {
                ajax.post('revocation',{
                    transactionId : this.transactionId
                }).then(res => {
                    if (!res.success) {
                        this.changeValue(false);
                        clearInterval(this.timer);
                        this.timer = null;
                        this.$Message.error(this.$t('cancelTradeFail'));
                    } else {
                        this.changeValue(false);
                        clearInterval(this.timer);
                        this.timer = null;
                        this.$emit('cancel-success');
                    }
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .weixin-pay{

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        /deep/ .ivu-modal-footer{
            display: none;
        }

        .qr-code{
            width: 180px;
            height: 180px;
        }

        /deep/ .ivu-btn {
            margin-top: 50px;
        }

        .scan-img{
            @include block_outline($height : 140px);
            text-align: center;
            padding-top: 25px;
        }

        .cancel-area{
            text-align: center;
        }
    }
</style>
