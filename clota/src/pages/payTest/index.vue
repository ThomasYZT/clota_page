<!--
    支付测试
    作者：杨泽涛
-->
<template>
    <div class="pay-test">
        <div v-html="html"></div>
    </div>
</template>

<script>
    import ajax from '../../api/index'
    export default {
        components : {},
        data () {
            return {
                html : ''
            };
        },
        methods : {
            alipayTradeWebPay () {
                ajax.post('alipayTradeWapPay', {
                    txnShortDesc : '测试下单',
                    merchantOrderNo : '12234211212121',
                    txnAmt : '0.01',
                    orgId : '1083659432518356992'
                }).then(res => {
                    if (res.success) {
                        this.html = res.data ? res.data : '';
                        this.$nextTick(() => {
                            document.forms[0].submit();
                        })
                    }
                })
            }
        },
        created () {
            this.alipayTradeWebPay();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
