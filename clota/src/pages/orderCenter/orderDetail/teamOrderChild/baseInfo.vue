<!--团队订单基本信息-->

<template>
    <div class="team-order-base-info">
        <div class="title">团队订单基本信息</div>
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                    <li class="col">订单编号:111</li>
                </ul>
            </li>
        </ul>
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
    .team-order-base-info{
        background: #F5F7FA;
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 ;

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 60px);
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

        .order-detail{

            .list{
                overflow: auto;

                .col{
                    float: left;
                }
            }
        }
    }
</style>
