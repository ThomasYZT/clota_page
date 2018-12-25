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
            <Button class="batch-return-card"
                    type="primary"
                    @click="batchReturnCard">{{$t('批量退卡')}}</Button>
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
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
            };
        },
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
            },
            /**
             * 批量退卡
             */
            batchReturnCard () {
                this.$router.push({
                    name : 'batchRefundCard'
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
        position: relative;
        height: calc(100% - 70px);
        overflow: auto;

        .batch-return-card{
            z-index: 9;
            @include absolute_pos(absolute,$top : 14px,$left : 405px);
        }

        .content-wrap {
            width: 850px;
            margin: 20px auto;
        }
    }
</style>
