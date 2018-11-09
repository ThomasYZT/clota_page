<!--
内容：关联实体卡
作者：djc
日期：
-->

<template>
    <div class="associate-entity-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'associateEntityCard'"></header-tabs>
        <div class="content">
            <member-info @click-row-todo="toFunc">
            </member-info>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import headerTabs from './components/newCardTabs.vue';
    import memberInfo from './components/memberInfo';

    export default {
        components : {
            headerTabs,
            memberInfo
        },
        props : {},
        data () {
            return {};
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 跳转到对应的操作页面
             * @param{Object} rowData 行数据
             */
            toFunc (rowData) {
                this.$router.push({
                    name : 'applyAssociateCard',
                    params : {
                        memberInfo : rowData
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .associate-entity-card{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        .content{
            @include block_outline($height : unquote('calc(100% - 68px)'));
        }
    }
</style>
