<!--
    分销信息组件
    作者：杨泽涛
-->
<template>
    <div class="distribution-info">
        <div class="title">分销信息</div>

        <div class="content">
            <span>销售政策： {{allocationInfo.policyName}}</span>

            <div class="rank-wrapper">
                <div class="rank-progress" v-for="(item,index) in allocationInfo.settleLink"
                     :key="index">
                    <img v-if="index !== 0" src="../../../../../assets/images/arrow.svg">
                    <div class="price-board">
                        <div class="stress-info">
                            <span>{{item.settlePrice | moneyFilter}}</span>
                        </div>
                        <div>
                            <span>{{item.orgSettleName}}分销单价</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            allocationInfo: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
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

            .rank-wrapper {
                display: flex;
                justify-content: center;
                .rank-progress {
                    max-width: 300px;
                    display: flex;
                    margin: 20px 0;

                    img {
                        margin: 0 65px;
                        width: 40px;
                    }

                    .price-board {
                        display: flex;
                        flex-direction: column;

                        div {
                            flex: 1 0;
                            text-align: center;
                            span {
                                font-size: $font_size_12px;
                                color: #999999;
                            }
                        }

                        .stress-info {
                            margin-bottom: 5px;
                            span {
                                font-size: $font_size_18px;
                                color: #353B48;
                            }
                        }
                    }

                }
            }

        }
    }
</style>
