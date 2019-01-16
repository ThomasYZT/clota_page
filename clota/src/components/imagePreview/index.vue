<!--预览图片-->

<template>
    <viewer ref="viewer"
            class="viewer-lip"
            @inited="inited"
            :options="options"
            :images="images">
        <slot></slot>
    </viewer>
</template>

<script>
    export default {
        props : {
            //图片列表
            'images' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                options : {
                    "button" : false,
                    "navbar" : true,
                    "title" : false,
                    "toolbar" : true,
                    "tooltip" : true,
                    "movable" : true,
                    "zoomable" : true,
                    "rotatable" : true,
                    "scalable" : true,
                    "transition" : true,
                    "fullscreen" : true,
                    "keyboard" : true,
                    "url" : "data-source"
                },
                viewer : ''
            };
        },
        methods : {
            inited (viewer) {
                this.viewer = viewer;
            },
            /**
             * 图片预览显示
             */
            show () {
                this.viewer.show();
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .viewer-lip{
        display: none;
    }
</style>
