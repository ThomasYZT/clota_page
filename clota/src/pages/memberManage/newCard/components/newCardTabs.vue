<template>
    <!--会员管理--新开卡--头部组件-->
    <div class="header">
        <idler-wheel-tap :default-index="defaultIndex">
            <div slot="before" class="navigate_before" slot-scope="row">
                <i class="ivu-icon ivu-icon-ios-arrow-forward" @click="row.toLeft()"></i>
            </div>
            <div class="router-item"
                 v-for="(item,index) in routerList"
                 :key="index"
                 @click="triggerLink(item)">
                <span class="split-line" v-if="index > 0"></span>
                <span :class="{'name': true, 'active': routerName === item.name}"
                      v-w-title="$t(item.desc)">{{ $t(item.desc) }}</span>
            </div>
            <div slot="next" class="navigate_next" slot-scope="row">
                <i class="ivu-icon ivu-icon-ios-arrow-forward" @click="row.toRight()"></i>
            </div>
        </idler-wheel-tap>
    </div>
</template>
<script>
    import idlerWheelTap from '@/components/idlerWheelTap/index';
    export default {
        props : ['routerName'],
        components : {
            idlerWheelTap
        },
        data () {
            return {
                // 路由列表
                routerList : [
                    { name : 'newCard', desc : 'newCard' }, // 新开卡
                    { name : 'newBatchCard', desc : 'newBatchCard' }, // 批量开卡
                    { name : 'renewal', desc : 'renewal' }, // 续期
                    { name : 'associateEntityCard', desc : 'associateEntityCard' }, // 关联实体卡
                    { name : 'replenishCard', desc : 'replenishCard' }, // 补卡
                    { name : 'reportLoss', desc : 'reportLoss' }, // 挂失
                    { name : 'refundedCard', desc : 'refundedCard' }, // 退卡
                ],
            };
        },
        methods : {

            /**
             * 点击tab路由跳转
             * @param data
             */
            triggerLink ( data ) {
                this.$router.push({ name : data.name });
            },

        },
        computed : {
            //当前所在的默认列表序号
            defaultIndex () {
                for (let i = 0,j = this.routerList.length; i < j; i++) {
                    if (this.routerName === this.routerList[i]['name']) {
                        return i;
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .header{
        margin: 0 20px;
        border-bottom: 1px solid $color_E1E1E1;
        height: 68px;
        line-height: 66px;
        @include clearfix();

        /deep/ .idler-wheel-tap{
            text-align: center;
        }

        /deep/ .navigate_before,
        /deep/ .navigate_next {
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;

            .ivu-icon {
                font-size: 30px;
                color: rgba($color_000, 0.2);
                transition: color 0.3s;
            }
        }

        .navigate_next{
            @include block_outline($width: 30px);
            box-shadow: -1px 0 2px 0 rgba(255, 255, 255, 0.20);
            border-left: 1px solid rgba(255, 255, 255, 0.10);
        }

        .navigate_before {
            @include block_outline($width: 30px);
            border-right: 1px solid rgba(255, 255, 255, 0.10);
            box-shadow: 1px 0 2px 0 rgba(255, 255, 255, 0.20);
            text-align: right;

            .ivu-icon {
                transform: rotate(180deg);
            }
        }

        .router-item{
            display: inline-block;
            min-width: 12%;
            font-size: $font_size_16px;
            color: $color-666;
            letter-spacing: 2.29px;
            text-align: center;
            cursor: pointer;
            padding: 0 20px;

            .name{
                display: inline-block;
                /*width: calc(100%  - 20px);*/
                word-break: break-all;
                @include overflow_tip();

                &.active{
                    color: $color_blue;
                }
            }

            .split-line{
                width: 1px;
                height: 25px;
                line-height: 25px;
                display: inline-block;
                float: left;
                background-color: $color_E1E1E1;
                margin-top: 22px;
                margin-left: -20px;
            }
        }
    }
</style>
