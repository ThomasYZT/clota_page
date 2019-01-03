<!--下单其它信息-->

<template>
    <div class="other-info">
        <div class="title">{{$t('others')}}</div>
        <ul class="per-info">
            <li class="list">
                <span class="key">{{$t('orderOrg')}}：</span>
                <span class="value">{{infoData.orderOrgName | contentFilter}}</span>
            </li>
            <li class="list">
                <span class="key">{{$t('sellingOrg')}}：</span>
                <span class="value">{{infoData.saleOrgName | contentFilter}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props : {
            //其它下单信息
            'info-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .other-info{
        padding: 0 30px;
        margin-bottom: 25px;

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
        }

        .per-info{
            @include block_outline($height : 25px);
            padding-left: 20px;

            .list{
                float: left;
                font-size: $font_size_14px;
                margin-right: 100px;
                line-height: 25px;

                .key{
                    color: $color_999;
                }

                .value{
                    color: $color_333;
                }
            }
        }
    }
</style>
