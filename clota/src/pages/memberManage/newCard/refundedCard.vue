<!--
内容：退卡
作者：djc
日期：
-->

<template>
    <div class="refunded-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'refundedCard'"></header-tabs>
        <div class="container">
            <member-info @click-row-todo="toFunc">
            </member-info>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { configVariable } from '@/assets/js/constVariable';
    import headerTabs from './components/newCardTabs.vue';
    import memberInfo from './components/memberInfo';

    export default {
        components : {
            headerTabs,
            memberInfo,
        },
        props : {},
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
            };
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
                    name : 'applyRefundedCard',
                    params : {
                        memberInfo : rowData
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";
    .refunded-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }

    /deep/ .form-item-wrap{
        display: flex;
        height: 30px;
        line-height: 30px;
        font-size: $font_size_14px;
        color: $color-666;
        >label{
            color: $color-333;
        }
        >span{
            flex: 1;
            display: inline-block;
            vertical-align: middle;
            @include overflow_tip();
        }
    }

    .container {
        height: calc(100% - 70px);
        overflow: auto;
        .content-wrap {
            width: 850px;
            margin: 20px auto;
        }
    }
</style>
