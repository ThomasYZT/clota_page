<!--首页顶部显示的个指标-->

<template>
    <div class="index-template">
        <img :src="icon" class="label-img" alt="">
        <div class="detail-info">
            <span class="label-name">{{labelName}}</span>
            <span class="number">{{labelNum}}</span>
            <span class="circle-rate">
            <span class="rate" v-if="labelRate !== ''">
                <span class="iconfont"
                      :class="{'icon-arrow-up' : labelCurve === 'up', 'icon-arrow-down' : labelCurve === 'down'}">
                </span>
                {{labelRate}}%
            </span>
            <span class="desc" v-if="labelRate !== ''">{{$t('circleName')}}</span>
          </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            //指标名字
            'label-name': {
                type: String,
                default: ''
            },
            //指标数量
            'label-num': {
                type: Number,
                default: 0
            },
            //指标同比率
            'label-rate': {
                type: [String, Number],
                default: ''
            },
            //配图
            'icon' : {
                type : [Object,String],
                default () {
                    return {};
                }
            },
        },
        data() {
            return {}
        },
        methods: {},
        computed : {
            //同比上周，当前指标是上升，还是下降
            labelCurve () {
                if(this.labelRate === '-'){
                    return '-';
                }else{
                    if(this.labelRate > 1){
                        return  'up';
                    }else if(this.labelRate < 1){
                        return 'down';
                    }else{
                        return '';
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .index-template {
        @include block_outline(unquote('calc((100% - 60px) / 4)'), 110px);
        @include card();
        float: left;
        margin-right: 20px;
        padding: 16px 30px;

        &:nth-last-of-type(1) {
            margin-right: 0;
        }

        .label-img {
            float: left;
            @include block_outline(52px, 52px, false);
            margin-top: 13px;
            border-radius: 26px;
        }

        .detail-info {
            @include block_outline(unquote('calc(100% - 82px)'));
            float: right;

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
                padding: 5px 0 2px 0;
                line-height: 17px;

                .rate,
                .desc {
                    float: left;
                    font-size: $font_size_12px;
                    @include block_outline(50%);
                }

                .rate {
                    color: $color_353B5E;

                    .icon-arrow-up{
                        display: inline-block;
                        font-size: 12px;
                        transform: scale(0.8);
                        vertical-align: middle;
                    }

                    .icon-arrow-down::before{
                        color: $color_err;
                    }
                }

                .desc {
                    color: $color_999;
                }
            }
        }
    }
</style>
