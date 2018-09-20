<!--无数据组件-->

<template>
    <div class="component-noData-tip">
        <img src="../../assets/images/icon-no-data.png" v-if="lang === 'zh-CN'" alt="">
        <img src="../../assets/images/icon-no-data-en.png" v-if="lang === 'en'" alt="">
    </div>
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                lang : 'lang'
            })
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    .component-noData-tip {
        text-align: center;
        @include center_center();

        img{
            display: block;
            width: 150px;
            height: 150px;
        }
    }
</style>
