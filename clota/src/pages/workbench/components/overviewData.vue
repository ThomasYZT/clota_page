<!--
内容：工作台顶部概览数据
作者：djc
日期：
-->

<template>
    <div class="overview-tpl" :class="{ 'en-status' : lang === 'en' }">
        <span :class="['iconfont', 'label-img', icon]" :style="{'color': iconColor}"></span>
        <div class="detail-info"  :class="{ 'only-num' : !showRate}">
            <span class="label-name" v-w-title="labelName">{{labelName}}</span>
            <span class="number">{{labelNum}}</span>
            <span class="circle-rate" v-if="showRate">
                <span class="rate">
                    <span class="iconfont"
                          :class="{'icon-up' : labelCurve === 'positive', 'icon-down' : !labelCurve || labelCurve === 'negative'}">
                    </span>
                    {{getRate(labelRate) | contentFilter }}%
                </span>
                <span class="desc">{{$t('thanYestoday')}}</span>
          </span>
        </div>
    </div>
</template>
<script>
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';

    export default {
        components : {},
        props : {
            //指标名字
            'label-name' : {
                type : String,
                default : ''
            },
            //指标数量
            'label-num' : {
                type : [Number, String],
                default : 0
            },
            //指标同比率
            'label-rate' : {
                type : [String, Number],
                default : ''
            },
            //配图
            'icon' : {
                type : [Object, String],
                default () {
                    return {};
                }
            },
            //icon颜色配置
            iconColor : {
                type : String
            },
            //同比上周，当前指标是上升，还是下降
            labelCurve : {
                type : String,
                default : 'negative'
            },
            //是否隐藏比上周数据
            'show-rate' : {
                type : Boolean,
                default : true
            }
        },
        data () {
            return {};
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
            //同比上周，当前指标是上升，还是下降
            /*labelCurve () {
                if (this.labelRate === '-') {
                    return '-';
                } else {
                    if (this.labelRate > 1) {
                        return 'up';
                    } else if (this.labelRate < 1) {
                        return 'down';
                    } else {
                        return '';
                    }
                }
            }*/
        },
        methods : {
            /**
             * 获取同比增长率
             * @param val
             */
            getRate (val) {
                if (common.isNotEmpty(val)) {
                    let rate = (parseFloat(val).toFixed(2) * 100).toFixed(2);
                    return rate;
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .overview-tpl {
        @include block_outline(unquote('calc((100% - 61px) / 4)'), 125px);
        float: left;
        margin-right: 20px;
        padding: 25px 30px;
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        &.en-status{
            padding: 25px 10px;

            .detail-info {
                @include block_outline(unquote('calc(100% - 60px)'));
            }

            .label-name{
                display: inline-block;
                @include overflow_tip();
            }
        }

        &:nth-last-of-type(1) {
            margin-right: 0;
        }

        .label-img {
            float: left;
            line-height: normal;
            margin-top: 8px;
            font-size: 52px;
        }

        .detail-info {
            @include block_outline(unquote('calc(100% - 82px)'));
            float: right;

            &.en-status{
                @include block_outline(unquote('calc(100% - 60px)'));
            }

            &.only-num {
                margin-top: 8px;
            }

            .label-name {
                @include block_outline($height: 24px, $is_block: false);
                line-height: 24px;
                color: $color_999;
            }

            .number {
                @include block_outline($height: 30px, $is_block: false);
                line-height: 30px;
                font-size: $font_size_22px;
                color: $color_353B5E;
            }

            .circle-rate {
                @include block_outline($height: 24px, $is_block: false);
                /*padding: 5px 0 2px 0;*/
                line-height: 17px;

                .rate {
                    float: left;
                    font-size: $font_size_12px;
                    @include block_outline(50%);
                    .desc {
                        font-size: $font_size_12px;
                    }
                }

                .rate {
                    color: $color_353B5E;

                    .icon-up {
                        display: inline-block;
                        font-size: 12px;
                        vertical-align: middle;
                    }

                    .icon-down::before {
                        color: $color_err;
                    }

                    .icon-up::before {
                        color: $color_green;
                    }
                }

                .desc {
                    color: $color_999;
                }
            }
        }
    }
</style>
