<!--预览图片-->

<template>
    <viewer ref="viewer" :images="images">
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
            };
        },
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
