<!--
    头部数据信息组件
    作者：杨泽涛
-->
<template>
    <div class="head-info">
        <div class="info-box" v-for="(item, index) in info" :key="index">
            <span v-if="item.type === 'money'" class="value">{{item.value | moneyFilter | contentFilter}}</span>
            <span v-else class="value">{{item.value | contentFilter}}</span>
            <span class="label">{{$t(item.label) | contentFilter}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
            info : {
                type : Array,
                default () {
                    return [];
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
    .head-info {
        height: 80px;
        margin: 19px 30px;
        background-color: rgba(47,112,223,0.03);
        display: flex;
        flex-wrap: nowrap;

        .info-box {
            margin-top: 10px;
            flex: 1 0;
            flex-basis: 20%;
            text-align: center;

            .value {
                display: inline-block;
                height: 35px;
                width: 100%;
                font-size: 28px;
                color: #000;
            }

            .label {
                display: inline-block;
                height: 35px;
                width: 100%;
                font-size: 14px;
                color: #999999;
            }
        }
    }
</style>
