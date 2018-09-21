<!--个人信息-->

<template>
    <div class="person-info">
        <div class="title-info">
            <div class="per-img">
                <img src="../../assets/images/icon-ali-pay.svg" alt="">
                <span class="edit">编辑</span>
            </div>
        </div>
        <div class="cell-list">
            <cell title="姓名" is-link value="姓名">
                <div class="arrow-wrap">
                    <i class="iconfont icon-arrow" style="color:#B3BDC2"></i>
                </div>
            </cell>
            <cell title="性别" is-link value="女"></cell>
            <cell title="电话" is-link value="17237387333"></cell>
            <cell title="交易密码" is-link value="17237387333"></cell>
            <cell title="证件号码" is-link value="17237387333"></cell>
            <cell title="微信" disabled is-link value="17237387333"></cell>
            <cell title="支付宝" is-link value="17237387333"></cell>
            <cell title="QQ" is-link value="17237387333"></cell>
            <cell title="E-mail" is-link value="17237387333"></cell>
            <cell title="成长值" is-link value="17237387333"></cell>
            <cell title="实体卡卡号" is-link value="17237387333"></cell>
            <cell title="地址" is-link value="17237387333"></cell>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .person-info{
        background: rgba(242,243,244,1);
        min-height: 100%;
        overflow: auto;
        @include padding_place($height : 8px);

        .title-info{
            @include block_outline($height : 122px);
            background: $color_fff;

            .per-img{
                position: relative;
                @include block_outline(74px,94px,false);
                margin: 0 auto;
                padding-top: 20px;
                border-radius: 100px;
                overflow: hidden;

                img{
                    @include block_outline(100%,100%,false);
                    border-radius: 100px;
                }

                .edit{
                    @include block_outline($height : 17px);
                    line-height: 17px;
                    background: rgba($color_000,0.5);
                    @include absolute_pos(absolute,$bottom : 0px);
                    text-align: center;
                    font-size: 10px;
                    color: $color_fff;
                }
            }
        }

        .cell-list{
            margin-top: 8px;
            background: $color_fff;

            .arrow-wrap {
                text-align: right;

                .info {
                    color: #353B48;
                    margin-right: 10px;
                }
            }

            /deep/ .weui-cell{
                height: 45px;

                &:before{
                    background: #e8e8e8;
                }

                .vux-label{
                    font-size: $font_size_14px;
                    color: #172434;
                }

                .weui-cell__ft{
                    font-size: $font_size_14px;
                    color: #353B48;
                }
            }
        }
    }
</style>
