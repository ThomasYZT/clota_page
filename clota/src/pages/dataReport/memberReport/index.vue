<!--会员报表 - 主页面-->

<template>
    <div class="container">
        <!-- 报表选择组件 -->
        <report-selector v-if="$route.name !== 'consumeRecord'"
                         @reportChange="routerChange"
                         :filterable="filterable"
                         :selectButton.sync="type"
                         :cardType.sync="cardType">
        </report-selector>

        <router-view :type="type" :cardType="cardType">

        </router-view>

    </div>
</template>

<script>
    import reportSelector from './components/reportSelector';
    export default {
        components : {
            reportSelector
        },
        data () {
            return {
                //数据表类型
                type : 'tendency',
                //会员类型
                cardType : 'all'
            };
        },
        computed : {
            //是否显示头部过滤器
            filterable () {
                return this.$route.name === 'scoreReport' || this.$route.name === 'mutipleChannelReport';
            }
        },
        methods : {
            /**
             * 选择新的数据报表类型，改变路由
             * @param {string} data
             */
            routerChange (data) {
                this.$router.push({
                    name : data
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .container {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .label {
            margin: 10px 0;
        }
    }
</style>


