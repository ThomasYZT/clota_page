<!--
    图片合成器组件
    作者：杨泽涛
-->
<template>
    <div id="img-synthesizer"
         class="img-synthesizer">
        <img v-if="src64"
             style="height: 100%;"
             @load="imgLoad"
             ref="poster"
             :src="'data:image/jpeg;base64,' + src64">
        <vue-draggable-resizable v-if="isCodeShow" :w="50" :h="50" :parent="true">
            <vueQRcode :downloadable="false" :codeUrl="codeUrl" :width="140"></vueQRcode>
        </vue-draggable-resizable>
    </div>
</template>

<script>
    import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
    import vueQRcode from './vueQRcode';
    export default {
        props : {
            //选择的底图
            chosedPost : {
                type : Object,
                default () {
                    return {};
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
            return {
                //是否显示二维码图片
                isCodeShow : false,
            };
        },
        methods : {
            imgLoad () {
                this.isCodeShow = true;
            }
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
    }
</style>
