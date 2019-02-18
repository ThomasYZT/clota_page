<!--
    图片合成器组件
    作者：杨泽涛
-->
<template>
    <div class="img-synthesizer">
        <img id="img-synthesizer-poster" ref="poster" :src="'data:image/jpeg;base64,' + src64">
        <!--<img id="img-synthesizer-poster" ref="poster" :src="chosedPost.posterUrl">-->
        <vue-draggable-resizable :x="50" :y="50" :parent="true">
            <vueQRcode :downloadable="false" v-if="codeUrl" :codeUrl="codeUrl" :width="140"></vueQRcode>
        </vue-draggable-resizable>
    </div>
</template>

<script>
    import vueQRcode from './vueQRcode';
    export default {
        props : {
            //选择的底图
            chosedPost : {
                type : Object,
                default () {
                    return {}
                },
            },
            //选择的底图
            src64 : {
                type : String,
                default : '',
            },
            //二维码链接
            codeUrl : {
                type : String,
                default : '',
            }
        },
        components : {
            vueQRcode,
        },
        data () {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .img-synthesizer {
        position: relative;
        display: inline-block;
        width: auto;
        height: 100%;
        img {
            height: 100%;
        }
    }
</style>
