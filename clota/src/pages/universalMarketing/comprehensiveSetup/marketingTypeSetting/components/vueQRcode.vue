<!--
    二维码生成组件
    作者：杨泽涛
-->
<template>
    <div class="qr-code">
        <img :src="src" alt="">
    </div>
</template>

<script>
    export default {
        props : {
            //要转换的url值
            url : {
                type : String,
                default : '',
                required : true
            },
            //qrcode的宽度值
            width : {
                type : Number,
                default : 100
            }
        },
        data () {
            return {
                src : ''
            };
        },
        methods : {
            getQRcode () {
                this.$QRcode.toDataURL(this.url,{
                    errorCorrectionLevel : 'H',
                    type : 'image/jpeg',
                    rendererOpts : {
                        quality : 0.5
                    },
                    width : this.width
                }).then(res => {
                    this.src = res;
                });
            }
        },
        created () {
            this.getQRcode();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
