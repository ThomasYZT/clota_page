<!--
内容：核销成功
作者：
日期：
-->

<template>
    <div class="verify-ok">
        <div class="tip">
            <img src="@/assets/images/verify-ok-img.png" />
            <div class="verify-success">
                <div class="title">{{$t('colonSetting',{ key : $t('verifySucNum') })}}</div>
                <ul class="order-num-list">
                    <li class="order-serno"
                        v-for="(item,index) in verifySucList"
                        :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="verify-fail">
                <div class="title">{{$t('colonSetting',{ key : $t('verifyFailNum') })}}</div>
                <ul class="order-num-list">
                    <li class="order-serno"
                        v-for="(item,index) in verifyFailList"
                        :key="index">{{item}}</li>
                </ul>
            </div>
            <Button type="primary"
                    style="width: 105px"
                    @click="goVerifyManage">{{$t('back')}}</Button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //核销成功的订单
                verifySucList : [],
                //核销失败的订单
                verifyFailList : []
            };
        },
        methods : {
            goVerifyManage () {
                this.$router.push({
                    name : 'verifyManage'
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由参数
             */
            getParams (params) {
                if (params && params.orderInfo.fail && params.orderInfo.success) {
                    this.verifySucList = params.orderInfo.success;
                    this.verifyFailList = params.orderInfo.fail;
                } else {
                    this.$router.back();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .verify-ok {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }

    .tip {
        text-align: center;
        @include center_center();

        > p {
            margin: 13px 0 50px 0;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            color: #333333;
            letter-spacing: 1.43px;
        }

        .verify-fail .title {
            color: $color_err;
        }
        .verify-success,
        .verify-fail{
            display: block;
            text-align: left;
            color: #333333;
            margin-bottom: 15px;
            min-width: 200px;

            .title{
                font-size: 17px;
            }

            .order-num-list{

                .order-serno{
                    font-size: 15px;
                    text-indent: 40px;
                }
            }
        }

        img{
            display: block;
            width: 172px;
            height: 103px;
        }
    }
</style>
