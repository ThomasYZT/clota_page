<!--
内容：批量开卡
作者：djc
日期：
-->

<template>
    <div class="batch-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'newBatchCard'"></header-tabs>
        <div class="container">
            <div class="content-wrap">
                <!--选择会员卡类型、级别-->
                <select-card @on-change-card="handleCardChanged"></select-card>
                <!--实体卡信息-->
                <h3>{{$t('entityCardInfo')}}</h3>
                <table-com
                    :show-pagination="false"
                    :column-data="columnData"
                    :table-data="tableData"
                    :table-com-min-height="250"
                    :border="true">
                    <!--<el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">

                        </template>
                    </el-table-column>-->

                </table-com>
                <div class="table-bottom">
                    {{$t('总价')}}：<span class="total-money">{{5}} {{$t('yuan')}}</span>
                </div>
                <!--收款方式-->
                <h3>{{$t('收款方式')}}</h3>
                <RadioGroup v-model="cardParam.payType">
                    <Radio label="wx">{{$t('微信')}}</Radio><!--微信-->
                    <Radio label="zfb">{{$t('支付宝')}}</Radio><!--支付宝-->
                    <Radio label="cash">{{$t('现金')}}</Radio><!--支付宝-->
                </RadioGroup>
                <!--footer 按钮-->
                <div class="content-footer">
                    <Button type="primary"
                            :loading="loading"
                            @click="">
                        {{$t('submit')}}
                    </Button>
                    <!--<Button type="ghost"
                            @click="goBack">
                        {{$t("cancel")}}
                    </Button>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import headerTabs from './components/newCardTabs.vue';
    import selectCard from './components/selectCardType.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { batchEntityCardHead } from './openCardsConfig';

    export default {
        components: {
            headerTabs,
            selectCard,
            tableCom,
        },
        props: {},
        data() {
            return {
                // 提交按钮loading
                loading: false,
                // 表头配置
                columnData: batchEntityCardHead,
                // 表格数据
                tableData: [
                    {
                        index: 1,
                        cardFaceNum: '752387494',
                        physicalCardNo: '94375934895'
                    }
                ],
                cardParam: {
                    // 收款方式
                    payType: 'wx',
                },

            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 所选择会员卡的类型、级别发生改变后的处理
             * @param cardData  String  会员卡的类型、级别
             */
            handleCardChanged(cardData) {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .batch-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        h3 {
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }

        .table-bottom {
            text-align: right;
            margin: 10px 15px;
        }

        .total-money {
            color: $color_yellow;
        }

        .content-footer {
            margin: 20px 0 40px 0;
            text-align: center;

            /deep/ .ivu-btn {
                width: 108px;
                &:nth-child(1) {
                    margin-right: 20px;
                }
            }
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
