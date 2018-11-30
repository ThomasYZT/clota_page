<!--tab列表item-->

<template>
    <div class="table-list">
        <scroll-wrap :class="{ 'order-with-btn' : chosedOrder.length > 0 }"
                     :item-data="data">
            <template v-for="item in data">
                <order-item :show-radio="showRadio"
                            :key="item.id"
                            :order-detail="item"
                            :choosed="chosedOrder.includes(item.id)"
                            @chose-item="getChoseItem">
                </order-item>
            </template>
        </scroll-wrap>
        <div class="deposit-btn" v-if="chosedOrder.length > 0">
            <div class="commission">{{$t('colonSetting',{ key : $t('可提现佣金') })}}<span class="money">{{15 | moneyFilter(2,'￥') | contentFilter}}</span></div>
            <div class="dis-select" @click="disSelect">取消选择</div>
            <div class="apply-deposit">申请提现</div>
        </div>
    </div>
</template>

<script>
    import orderItem from './order-item';
    import scrollWrap from '@/components/scroll/scrollWrap';
    export default {
        props : {
            //是否显示单选框
            'show-radio' : {
                type : Boolean,
                default : false
            },
            //订单信息
            'data' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //选择的订单
                chosedOrder : []
            };
        },
        components : {
            scrollWrap,
            orderItem
        },
        methods : {
            /**
             * 选择订单
             * @param{Object} order 订单信息
             */
            getChoseItem (order) {
                if (this.chosedOrder.includes(order.id)) {
                    for (let i = 0,j = this.chosedOrder.length; i < j; i++) {
                        if (this.chosedOrder[i] === order.id) {
                            this.chosedOrder.splice(i,1);
                            break;
                        }
                    }
                } else {
                    this.chosedOrder.push(order.id);
                }
            },
            /**
             * 取消选择所有订单
             */
            disSelect () {
                this.chosedOrder = [];
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .table-list{
        @include block_outline();
        position: relative;

        /deep/ .flex-box{
            background: transparent;
        }

        .deposit-btn{
            @include absolute_pos(absolute,$bottom : 0);
            background: $color_fff;
            @include block_outline($height : 44px);
            display: flex;
            line-height: 44px;
            border-top: 1px solid #E1E1E1;
            padding-left: 14px;

            .dis-select,
            .apply-deposit{
                height: 100%;
                font-size: $font_size_16px;
                padding: 0 20px;
            }

            .apply-deposit{
                background: #F17E40;
                color: $color_fff;
            }

            .dis-select{
                color: #303030;
                border-left: 1px solid #E1E1E1;
            }

            .commission{
                flex: 1;
                font-size: $font_size_12px;
                @include overflow_tip();

                .money{
                    color: #F7981C;
                }
            }
        }

        .order-with-btn{
            height: calc(100% - 44px);
        }
    }
</style>
