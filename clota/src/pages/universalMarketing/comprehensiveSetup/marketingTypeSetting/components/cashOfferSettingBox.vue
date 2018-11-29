<!--
    提现设置组件
    作者：杨泽涛
-->
<template>
    <div class="cash-offer-setting-box">
        <div class="content">
            <div class="icon-area">
                <img class="picture" src="../../../../../assets/images/cash-offer.svg" alt="">
            </div>
            <div class="info">
                <h4 class="title">{{$t('cashOfferDays')}}
                    <Tooltip :content="$t('setDaysCashOffer')" placement="right">
                        <i class="iconfont icon-help"></i>
                    </Tooltip>
                </h4>
                <span class="value">{{99}}</span>
            </div>
        </div>

        <div class="box-footer">
            <i class="iconfont icon-edit"></i>
            <span @click="edit">{{$t('edit')}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {};
        },
        methods : {
            /**
             * 编辑
             */
            edit () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .cash-offer-setting-box {
        width: 360px;
        height: 178px;
        border: 1px solid #E9E9E9;
    }

    .content {
        height: 137px;
        width: 100%;
        display: flex;

        .icon-area {
            padding-top: 30px;
            flex: 1 0;
            flex-basis: 20%;
            text-align: center;

            .picture {
                width: 38px;
                height: 38px;
            }
        }

        .info {
            padding-top: 30px;
            flex: 1 0;
            flex-basis: 80%;

            .title {
                height: 24px;
                line-height: 24px;
                font-size: 18px;
                color: #000;
                i {
                    color: $color_gray;
                }
            }

            .value {
                font-size: 28px;
                color: #000;
            }
        }
    }

    .box-footer {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: $color_blue;
        background-color: #F7F9FA;

        span, i {
            cursor: pointer;
        }
    }
</style>
