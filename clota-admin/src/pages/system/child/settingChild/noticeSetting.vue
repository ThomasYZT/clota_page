<!--通知设置-->

<template>
    <div class="notice-setting">
        <div class="sms-label-title">
            客服警报发送方式
        </div>
        <RadioGroup v-model="serviceAlarmType" vertical>
            <Radio label="sms">
                <span>短信</span>
            </Radio>
            <Radio label="mail">
                <span>邮件</span>
            </Radio>
        </RadioGroup>
        <div class="sms-label-title">
            运维警报发送方式
        </div>
        <RadioGroup v-model="optionAlarmType" vertical>
            <Radio label="sms">
                <span>短信</span>
            </Radio>
            <Radio label="mail">
                <span>邮件</span>
            </Radio>
        </RadioGroup>
        <div class="btn-area">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //客服报警方式
                optionAlarmType : '',
                //运维报警方式
                serviceAlarmType : ''
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .notice-setting{
        position: relative;
        @include block_outline();

        .sms-label-title{
            padding-top: 30px;
            @include block_outline($height : 70px);
            font-size: $font_size_16px;
            color: $color_666;
        }

        .btn-area{
            width: 100%;
            @include absolute_pos(absolute,$bottom : 20px);
            text-align: center;

            .ivu-btn-90px{
                margin: 0 10px;
            }
        }
    }
</style>
