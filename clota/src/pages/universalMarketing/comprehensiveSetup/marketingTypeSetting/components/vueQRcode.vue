<!--
    二维码生成组件
    作者：杨泽涛
-->
<template>
    <div>
        <div v-if="previewable" v-viewer class="qr-code">
            <img class="can-preview" v-if="show" :src="src" alt="">
        </div>
        <div v-else class="qr-code">
            <img v-if="show" :src="src" alt="">
        </div>
        <p class="download-btn" @click="download">下载</p>
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
            },
            //是否有图片预览功能
            previewable : {
                type : Boolean,
                default : false
            },
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
            },
            download () {
                let a = document.createElement('a');
                a.href = this.src;
                a.setAttribute('download', 'code');
                a.click();
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

    .can-preview {
        cursor: pointer;
    }

    .download-btn {
        margin-bottom: 5px;
        color: $color_blue;
        font-size: 12px;
        cursor: pointer;
    }
</style>
