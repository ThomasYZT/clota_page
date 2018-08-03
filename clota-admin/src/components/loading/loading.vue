<template>
    <div class="w-loading" v-show="visible">
        <img class="w-loading-img" :src="src">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['visible', 'type'],
        computed: {
            src() {
                let src = ''
                switch (this.type) {
                    case 'normal':
                        src = require('./icon-loading-normal.gif')
                        break
                    case 'table':
                    default: 
                        src = require('./icon-loading-list.gif')
                        break
                }
                return src
            }
        }
    }
</script>

<style lang="scss">
    .w-loading {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
        z-index: 888;
        background: white;
    }
</style>
