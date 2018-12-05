<!--tab列表item-->

<template>
    <div class="table-list">
        <scroll-wrap :class="{ 'order-with-btn' : chosedOrder.length > 0 }"
                     :item-data="data"
                     @pull-down="onPullingDown"
                     @pull-up="onPullingUp">
            <template v-for="item in data">
                <order-item :show-radio="showRadio"
                            :key="item.id"
                            :order-detail="item"
                            :choosed="chosedOrder.includes(item)"
                            @chose-item="getChoseItem">
                </order-item>
            </template>
        </scroll-wrap>
        <div class="deposit-btn" v-if="chosedOrder.length > 0">
            <div class="commission">
                {{$t('colonSetting',{ key : $t('可提现佣金') })}}
                <span class="money">{{expectedSalary | moneyFilter(2,'￥') | contentFilter}}</span></div>
            <div class="dis-select" @click="disSelect">取消选择</div>
            <div class="apply-deposit" @click="applyDeposit">申请提现</div>
        </div>
    </div>
</template>

<script>
    import orderItem from './order-item';
    import scrollWrap from '@/components/scroll/scrollWrap';
    import ajax from '@/api/index.js';
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
                for (let i = 0,j = this.chosedOrder.length; i < j; i++) {
                    if (this.chosedOrder[i]['productId'] === order.productId) {
                        this.chosedOrder.splice(i,1);
                        return;
                    }
                }
                this.chosedOrder.push(order);
            },
            /**
             * 取消选择所有订单
             */
            disSelect () {
                this.chosedOrder = [];
            },
            /**
             * 下拉刷新
             * @param{Function} callback 加载完成回调
             */
            onPullingDown (callback) {
                this.$emit('pull-down',callback);
            },
            /**
             * 上拉加载
             * @param{Function} callback 加载完成回调
             */
            onPullingUp (callback) {
                this.$emit('pull-up',callback);
            },
            /**
             * 将订单信息转化为对象格式
             * @param{Array} data 订单信息数据
             * @return{Object} 对象化数据
             */
            arrayToJson (data) {
                let result = {};
                for (let i = 0,j = data.length; i < j; i++ ) {
                    result[data[i]['orderId']] = data[i];
                }
                return result;
            },
            /**
             * 申请提现
             */
            applyDeposit () {
                ajax.post('market_orderSalaryWithdrawApply',{
                    orderIds : this.chosedOrder.map(item => item.orderId),
                    amount : this.expectedSalary
                }).then(res => {
                    if (res.success) {
                        this.$vux.toast.show({
                            text : this.$t('operateSuc',{ msg : this.$t('申请提现') }),
                        });
                        this.chosedOrder = [];
                        this.$emit('fresh-data');
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('申请提现') }),
                            type : 'cancel'
                        });
                    }
                });
            }
        },
        computed : {
            //可提现佣金之和
            expectedSalary () {
                return this.chosedOrder.reduce((price,item) => {
                    return item.expectedSalary + price;
                },0);
            }
        },
        watch : {
            data (newVal) {
                let newOrderData = this.arrayToJson(newVal);
                //判断新增的数据是否有已经选择订单，如果没有需要删除掉已经选择的订单
                for (let j = 0,i = this.chosedOrder.length - 1; i >= j; i--) {
                    if (!(this.chosedOrder[i]['orderId'] in newOrderData)) {
                        this.chosedOrder.splice(i,1);
                    }
                }
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
            border-top: 0.5px solid #E1E1E1;
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
                border-left: 0.5px solid #E1E1E1;
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
