<!--卡信息-->

<template>
    <div class="year-card-info">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">{{title}}</span>
        </div>
        <div class="detail">
            <ul class="info-detail">
                <li class="field">
                    <span class="key">{{$t('yearCardCode')}}：</span>
                    <span class="value">0187978739892</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('startTime')}}：</span>
                    <span class="value">2018-08-01 08:00:00</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('endTime')}}：</span>
                    <span class="value">2018-08-01 08:00:00</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //卡标题信息
            'title' : {
                type : String,
                default : ''
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .year-card-info{
        background: $color_fff;

        .detail{
            padding: 9.5px 24px;
        }
    }
</style>
