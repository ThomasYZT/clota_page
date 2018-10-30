<!--
内容：核销成功
作者：
日期：
-->

<template>
    <div class="verify-ok">
        <div class="tip">
            <img src="@/assets/images/verify-ok-img.png" />
            <p>{{$t('verifySuccess')}} !</p><!--核销成功 !-->
            <Button type="primary"
                    style="width: 105px"
                    @click="goVerifyManage">{{$t('back')}}</Button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        data() {
            return {}
        },
        methods: {
            goVerifyManage() {
                this.$router.push({
                    name: 'verifyManage'
                });
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

        img{
            display: block;
            width: 172px;
            height: 103px;
        }
    }
</style>
