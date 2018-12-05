<!--
    二维码生成组件
    作者：杨泽涛
-->
<template>
    <div class="qr-code">
        <img v-if="show" :src="src" alt="">
    </div>
</template>

<script>
    export default {
        props : {
            //要转换的url值
            codeUrl : {
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
                src : '',
                show : false,
            };
        },
        methods : {
            getQRcode () {
                this.show = false;
                this.$QRcode.toDataURL(this.codeUrl, {
                    errorCorrectionLevel : 'H',
                    type : 'image/jpeg',
                    rendererOpts : {
                        quality : 0.5
                    },
                    width : this.width
                }).then(res => {
                    this.src = res;
                    this.show = true;
                });
            }
        },
        watch : {
            codeUrl : {
                handler () {
                    this.getQRcode();
                },
                immediate : true
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
