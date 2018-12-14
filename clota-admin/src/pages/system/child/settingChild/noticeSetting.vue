<!--通知设置-->

<template>
    <div class="notice-setting">
        <!--客服警报发送方式-->
        <div class="sms-label-title">{{$t('msgServiceSendMode')}}</div>
        <RadioGroup v-model="copySettingData.msgServiceSendMode" vertical>
            <Radio :label="1">
                <span>{{$t('smsSetting')}}</span>
            </Radio>
            <Radio :label="2">
                <span>{{$t('m_mail')}}</span>
            </Radio>
        </RadioGroup>
        <!--运维警报发送方式-->
        <div class="sms-label-title">{{$t('msgMaintainSendMode')}}</div>
        <RadioGroup v-model="copySettingData.msgMaintainSendMode" vertical>
            <Radio :label="1">
                <span>{{$t('smsSetting')}}</span>
            </Radio>
            <Radio :label="2">
                <span>{{$t('m_mail')}}</span>
            </Radio>
        </RadioGroup>
        <div class="btn-area">
            <slot name="footer" :rowData="copySettingData"></slot>
        </div>
    </div>
</template>

<script>

    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props : ['setting'],
        data () {
            return {
                //复制数据，用于当前修改
                copySettingData : {},
            };
        },
        created () {
            this.copySettingData = defaultsDeep({}, this.setting);
        },
        watch : {
            setting : function (val) {
                this.copySettingData = defaultsDeep({}, val);
            }
        },
    };
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
