<!--订单操作日志-->

<template>
    <div class="order-operate-log">
        <div class="title">订单操作日志</div>
        <Steps direction="vertical" size="small" class="ivu-steps-clota">
            <Step icon="blue" title="已完成" content="这里是该步骤的描述信息">
                <span class="time">2016-10-11  11:30:10</span>
                <span class="operater">操作者：广州长隆旅行社 张三 </span>
            </Step>
            <Step icon="red" title="已完成" content="这里是该步骤的描述信息">
                <span class="time">2016-10-11  11:30:10</span>
                <span class="operater">操作者：广州长隆旅行社 张三 </span>
            </Step>
            <Step icon="green" title="已完成" content="这里是该步骤的描述信息">
                <span class="time">2016-10-11  11:30:10</span>
                <span class="operater">操作者：广州长隆旅行社 张三 </span>
            </Step>
            <Step icon="blue" title="已完成" content="这里是该步骤的描述信息">
                <span class="time">2016-10-11  11:30:10</span>
                <span class="operater">操作者：广州长隆旅行社 张三 </span>
            </Step>
        </Steps>
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
    .order-operate-log{

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
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
    }
</style>
