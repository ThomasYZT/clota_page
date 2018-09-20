<!--
内容：支付协议
作者：
日期：
-->

<template>
    <div class="pay-protocol">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('支付协议设置')">
        </bread-crumb-head>

        <h3>{{$t('支付协议')}}</h3>
        <div class="container">
            <Button type="primary" v-if=""
                    @click="">{{$t('edit')}}
            </Button>

            
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import breadCrumbHead from '@/components/breadCrumbHead/index';

    export default {
        components: {breadCrumbHead},
        props: {},
        data() {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'memberSetting',   // 基础设置
                        router: {name: 'memberSetting'},
                    },
                ],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .pay-protocol {

    }
</style>
