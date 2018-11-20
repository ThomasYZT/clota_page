<!--
    会员积分页面内部组件
    作者：杨泽涛
-->
<template>
    <div class="score-item">
        <div class="info">
            <p class="ticket-name">{{$t(info.purpose)}}</p>
            <p class="time">{{info.createdTime}}</p>
        </div>
        <div class="check">
            <p>{{ (info.amount > 0 ? '+' + info.amount : info.amount )  + $t('score')}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            info : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {},
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .score-item {
        position: relative;
        display: flex;
        height: 70px;
        width: 100%;

        &:after {
            position: absolute;
            bottom: 0;
            left: 19px;
            content: ' ';
            width: calc(100% - 33px);
            border-bottom: 1px solid #E8E8E8;
        }

        .check, .info {
            flex-grow: 1;
        }

        .check {
            margin-right: 14px;
            line-height: 70px;
            text-align: right;
            font-size: 18px;

            .add {

            }
        }

        .info {
            padding: 14.5px 0 14px 19px;


            .ticket-name {
                font-size: 14px;
            }

            .time {
                font-size: 12px;
                color: #8395A7;
            }
        }
    }
</style>
