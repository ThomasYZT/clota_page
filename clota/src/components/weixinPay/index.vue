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
        <Button type="primary" @click="checkPay">{{$t('已完成付款')}}</Button>
    </Modal>
</template>

<script>
	export default {
        props : {
            //支付链接
            'pay-link' : {
                type : String,
                default : ''
            },
            value : Boolean
        },
		data () {
			return {
			    //二维码图片
			    qrCodeSrc : ''
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
                }
            },
            /**
             * 判断是否完成付款
             */
            checkPay () {
                this.$emit('checkPayResult');
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
    }
</style>
