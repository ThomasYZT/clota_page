<!--
内容：退卡
作者：djc
日期：
-->

<template>
    <div class="refunded-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'refundedCard'"></header-tabs>
        <div class="search-box">
            <Input v-model.trim="filterParams.keyword"
                   style="width: 280px;"
                   :placeholder="$t('请输入关键字')" /><!--请输入姓名、手机号、会员编号、证件编号-->
            <Button type="primary" class="ivu-btn-90px" @click="">{{$t('搜索')}}</Button><!--搜索-->
        </div>

        <div class="detail-container">
            <!--持卡人的个人信息-->
            <cardholder-info></cardholder-info>
            <!--会员卡信息-->
            <card-info></card-info>
            <!--储值账户信息-->
            <store-account-info></store-account-info>
            <!--积分账户信息-->
            <integral-account-info></integral-account-info>
        </div>
        <div class="footer">
            <Button type="primary" class="ivu-btn-90px">{{$t('退卡')}}</Button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {configVariable} from '@/assets/js/constVariable';
    import cardholderInfo from './components/cardholderInfo.vue';
    import cardInfo from './components/cardInfo.vue';
    import storeAccountInfo from './components/storeAccountInfo.vue';
    import integralAccountInfo from './components/integralAccountInfo.vue';
    import headerTabs from './components/newCardTabs.vue';

    export default {
        components: {
            headerTabs,
            cardholderInfo,
            cardInfo,
            storeAccountInfo,
            integralAccountInfo,
        },
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParams: {
                    keyword: '',   //
                },
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
    @import "~@/assets/scss/base";
    .refunded-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }

    .search-box {
        margin: 20px 20px 0;
        .ivu-btn-90px {
            margin-left: 8px;
        }
    }

    .detail-container {
        height: calc(100% - 50px);
        padding: 15px 20px;
    }

    .footer {
        margin: 20px;
        text-align: center;
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
</style>
