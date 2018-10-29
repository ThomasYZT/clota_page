<!--
内容：分销信息
作者：
日期：
-->

<template>
    <div class="">
        <!--分销信息-->
        <div class="block-title">{{$t('allowcationInfo')}}</div>
        <div class="content-wrap">
            <!--销售政策-->
            <div>{{$t('marketingPolicy')}}：<span>{{moduleInfo.policyName | contentFilter}}</span></div>
            <div class="settle-link clearfix">
                <div class="link-item" v-for="(item, index) in moduleInfo.settleLink" :key="index">
                    <div class="link-item-desc">
                        <span>{{item.settlePrice | moneyFilter}}</span>
                        <p>{{item.orgSettleName | contentFilter}}</p>
                    </div>
                    <span class="img-link">
                        <img src="@/assets/images/arrow-link.svg" />
                    </span>
                </div>
                <!--<div class="link-item">
                    <div class="link-item-desc">
                        <span>75.00</span>
                        <p>景区分配单价</p>
                    </div>
                    <span class="img-link">
                        <img src="@/assets/images/arrow-link.svg" />
                    </span>
                </div>
                <div class="link-item">
                    <div class="link-item-desc">
                        <span>85.00</span>
                        <p>星星旅行社分销单价</p>
                    </div>
                    <span class="img-link">
                        <img src="@/assets/images/arrow-link.svg" />
                    </span>
                </div>
                <div class="link-item">
                    <div class="link-item-desc">
                        <span>75.00</span>
                        <p>星星旅行社分销单价</p>
                    </div>
                    <span class="img-link">
                        <img src="@/assets/images/arrow-link.svg" />
                    </span>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {
            moduleInfo: Object,
        },
        data() {
            return {}
        },

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .block-title {
        margin: 15px 0;
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
    }

    .content-wrap {
        background: #FAFAFA;
        border-radius: 2px;
        height: 120px;
        padding: 15px;
    }

    .settle-link {
        padding: 20px 80px 0;
    }

    .link-item {
        float: left;
        &:last-child {
            .img-link {
                display: none;
            }
        }

        .link-item-desc {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            font-size: 18px;
            color: #353B48;
            > p {
                font-size: 12px;
                color: #999999;
            }
        }
        .img-link {
            margin: 0 30px;
        }
    }
</style>
