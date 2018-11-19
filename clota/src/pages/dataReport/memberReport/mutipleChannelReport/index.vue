<!--
    各渠道会员数据报表
    作者：杨泽涛
-->
<template>
    <div class="multiple-channel-report">
        <!-- 趋势图 -->
        <tendency :cardType="cardType"></tendency>
    </div>
</template>

<script>
    import tendency from './child/tendency';
    export default {
        props : {
            cardType : {
                type : String,
                default () {
                    return '';
                }
            }
        },
        components : {
            tendency,
        },
        data () {
            return {};
        },
        methods : {

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .multiple-channel-report {
        width: 100%;
        height: calc(100% - 59px);
    }
</style>
