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
                    <span class="value">{{cardInfo.vipCardNo | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('startTime')}}：</span>
                    <span class="value">{{cardInfo.validFrom | timeFormat('yyyy-MM-dd HH:mm:ss') | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('endTime')}}：</span>
                    <span class="value">{{cardInfo.validTo | timeFormat('yyyy-MM-dd HH:mm:ss') | contentFilter}}</span>
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
            },
            //卡信息
            'card-info' : {
                type : Object,
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
