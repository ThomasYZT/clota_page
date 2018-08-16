<template>
    <!--会员管理--基础设置--头部组件-->
    <div class="header">
        <div class="router-item" v-for="(item,index) in routerList" @click="triggerLink(item)">
            <span class="split-line" v-if="index > 0"></span>
            <span :class="{'name': true, 'active': routerName === item.name}">{{item.desc}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['routerName'],
        components: {},
        data () {
            return {
                // 路由列表
                routerList: [
                    { name: 'memberSetting', desc: '基础设置' },
                    { name: 'channelSetting', desc: '渠道设置' },
                    { name: 'levelSetting', desc: '会员级别' },
                    { name: 'growthSetting', desc: '成长值设置' },
                    { name: 'fundSetting', desc: '储值设置' },
                    { name: 'consumeSetting', desc: '积分消费管理' },
                ],
            }
        },
        methods: {

            /**
             * 点击tab路由跳转
             * @param data
             */
            triggerLink ( data ) {
                this.$router.push({ name: data.name })
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .header{
        margin: 0 20px;
        border-bottom: 2px solid $color_E1E1E1;
        height: 68px;
        line-height: 66px;
        @include clearfix();

        .router-item{
            float: left;
            display: inline-block;
            width: 16%;
            font-size: $font_size_16px;
            color: $color-666;
            letter-spacing: 2.29px;
            text-align: center;
            cursor: pointer;

            .name{

                &.active{
                    color: $color_blue;
                }
            }

            .split-line{
                width: 2px;
                height: 25px;
                line-height: 25px;
                display: inline-block;
                float: left;
                background-color: $color_E1E1E1;
                margin-top: 22px;
            }
        }
    }
</style>
