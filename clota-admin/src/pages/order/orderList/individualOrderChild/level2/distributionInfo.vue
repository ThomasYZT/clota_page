<!--
    分销信息组件
    作者：杨泽涛
-->
<template>
    <div class="distribution-info">
        <div class="title">{{$t('allowcationInfo')}}</div>

        <div class="content">
            <span class="info-list">{{$t('marketingPolicy')}}： {{allocationInfo.policyName}}</span>

            <div class="rank-wrapper">
                <div class="rank-progress" v-for="(item,index) in distributionLinks"
                     :key="index">
                    <div class="process-price" v-if="index !== 0">
                        <div class="stress-info">
                            <span>{{item.settlePrice | moneyFilter}}</span>
                        </div>
                        <img  src="../../../../../assets/images/arrow.svg">
                    </div>
                    <div class="price-board" v-w-title="item.content">
                        {{item.content}}
                        <!--<div class="stress-info">-->
                            <!--<span>{{item.settlePrice | moneyFilter}}</span>-->
                        <!--</div>-->
                        <!--<span v-w-title="">{{item.content}}</span>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
            allocationInfo : {
                type : Object,
                default () {
                    return {};
                }
            },
            //退票手续费收入
            totalRefundFee : {
                type : [String,Number],
                default : 0
            },
            //当前查看详情角色
            'view-type' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {};
        },
        methods : {},
        computed : {
            //分销价格链路表
            distributionLinks () {
                if (this.allocationInfo && this.allocationInfo.settleLink) {
                    let settleLink = this.allocationInfo.settleLink;
                    if (settleLink.length > 0) {
                        let costPriceInfo = {
                            ...settleLink[0],
                            settlePrice : settleLink[0]['inPrice'],
                            content : this.$t('scenicUnitPrice')
                        };
                        return [].concat(costPriceInfo,settleLink.map(item => {
                            return {
                                ...item,
                                content : item.orgName + this.$t('allowcationPriceOf')
                            };
                        }));
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .distribution-info {
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        .content {
            padding: 15px 15px;
            background: #FAFAFA;
            border-radius: 5px;

            .info-list{
                display: inline-block;
                margin-right: 40px;
            }

            .rank-wrapper {
                display: flex;
                justify-content: center;
                .rank-progress {
                    max-width: 300px;
                    display: flex;
                    margin: 20px 0;

                    .process-price{
                        text-align: center;

                        .stress-info{
                            height: 33px;
                            line-height: 40px;
                            font-size: $font_size_18px;
                            color: #353B48;
                        }
                    }

                    img {
                        margin: 0 65px;
                        width: 40px;
                    }

                    .price-board {
                        line-height: 54px;
                        font-size: $font_size_12px;
                        color: #999999;
                        display: inline-block;
                        @include overflow_tip();
                    }

                }
            }

        }
    }
</style>
