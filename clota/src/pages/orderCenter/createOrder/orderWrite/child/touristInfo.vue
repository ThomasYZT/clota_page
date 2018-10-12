<!--游客信息 -->

<template>
    <div class="tourist-info">
        <div class="title">
            游客信息
            <Button type="primary">添加游客</Button>
        </div>
        <div class="person-info-list">
            <div class="name">
                张三  /  189262626226
            </div>
            <div class="card-info">
                <div class></div>
            </div>
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
    .tourist-info{
        padding: 0 30px;

        .title{
            position: relative;
            padding: 16px 0;
            @include block_outline($height : 60px);
            font-size: $font_size_16px;
            color: $color_333;
            line-height: 30px;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
            }

            .ivu-btn{
                float: right;
            }
        }

        .person-info-list{
            border: 1px solid #E9E9E9;
            border-radius: 4px 4px 0 0;

            .name{
                @include block_outline($height : 44px);
                padding: 0 24px;
                font-size: $font_size_16px;
                color: rgba(0,0,0,0.85);
                font-weight: bold;
                border-bottom: 1px solid $color_eee;
            }

            .card-info{
                padding: 20px;
            }
        }
    }
</style>
