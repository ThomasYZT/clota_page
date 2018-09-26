<!--成员信息-->

<template>
    <div class="member-info">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">{{$t('memberInfo')}}</span>
        </div>
        <div class="detail">
            <ul class="info-detail bottom-dashed">
                <li class="field bit-title">
                    <span class="value">成员01</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('name')}}：</span>
                    <span class="value">王家人</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('sex')}}：</span>
                    <span class="value">男</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('phone')}}：</span>
                    <span class="value">17638263872</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('idCard')}}：</span>
                    <span class="value">103039840948394809（身份证）</span>
                </li>
            </ul>
            <ul class="info-detail bottom-dashed">
                <li class="field bit-title">
                    <span class="value">成员01</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('name')}}：</span>
                    <span class="value">王家人</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('sex')}}：</span>
                    <span class="value">男</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('phone')}}：</span>
                    <span class="value">17638263872</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('idCards')}}：</span>
                    <span class="value">103039840948394809（身份证）</span>
                </li>
            </ul>
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
    .member-info{
        margin-top: 8.5px;
        background: $color_fff;

        .detail{
            padding: 9.5px 24px;
            padding-bottom: 0;
        }

        .bottom-dashed{
            position: relative;
            padding-bottom: 9.5px;

            &:not(:nth-of-type(1)){
                padding-top: 10px;
            }

            &:not(:nth-last-of-type(1)):after{
                @include block_outline(unquote('calc(100% + 24px)'),0.5px);
                content: '';
                border-bottom: 1px dashed #e8e8e8;
                @include absolute_pos(absolute,$bottom : 0px);
            }
        }
    }
</style>
