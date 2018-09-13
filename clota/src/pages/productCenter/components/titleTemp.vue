<template>
    <!--表单title组件-->
    <div class="title-wrap">
        <div class="line"></div>
        <span class="name">{{$t(title)}}</span>
    </div>

</template>

<script>
    export default {
        props: ['title'],
        components: {},
        data () {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .title-wrap{
        @include block_outline($height : 30px);
        text-align: center;
        font-size: $font_size_16px;
        color: $color_333;
        margin-bottom: 15px;
        margin-top: 10px;

        .line{
            position: relative;
            top: 15px;
            @include block_outline($height : 1px);
            background-color: $color_E1E1E1;
        }

        .name{
            border: 1px solid $color_E1E1E1;
            border-radius: 96px;
            line-height: 30px;
            padding: 3px 20px;
            background: $color_fff;
            z-index: 1;
            position: relative;
        }

    }
</style>
