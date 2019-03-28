<!--
    会员积分报表
    作者：杨泽涛
-->
<template>
    <div class="score-report">
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
    .score-report {
        width: 100%;
        height: calc(100% - 59px);
    }
</style>
