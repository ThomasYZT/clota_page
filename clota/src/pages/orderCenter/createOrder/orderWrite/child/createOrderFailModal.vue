<!--下单失败提示框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="lang === 'zh-CN' ? 420 : 450"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="product-err"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('notice')}}</span>
        </div>
        <div class="target-body">
            <ul class="pro-list">
                <li class="detail title">
                    {{$t('placeOrderFail')}}
                </li>
                <li class="product-name">{{$t('productName')}}：</li>
                <li v-for="item in productList"
                    :key="item.productId"
                    v-w-title="item.productName"
                    class="detail list">{{item.productName}}</li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
                <li class="detail error" v-if="type === 'balanceNotEnough'">
                    {{$t('balanceLeftNotEnought')}}
                </li>
                <li class="detail error" v-else>
                    <!--原因：产品库存不足-->
                    {{$t('repertoryLeftNotEnought')}}
                </li>
            </ul>
        </div>
        <div slot="footer">
            <Button type="primary"
                    @click="confirm">{{$t('cancelOrder')}}</Button><!--取消订单-->
            <Button type="error"
                    :disabled="!canRemoveProduct"
                    @click="delProduct">{{$t('delProductFromOrder')}}</Button><!--从订单中删除此产品-->
        </div>
    </Modal>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //模态框类别
            type : {
                type : String,
                default : ''
            },
            //产品列表
            'product-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //是否可以移除产品
            'can-remove-product' : {
                type : Boolean,
                default : true
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === true) {
                }
            },
            /**
             * 确认提示信息
             */
            confirm () {
                this.$emit('input', false);
                this.$router.replace({
                    name : 'createOrder'
                });
            },
            /**
             * 删除下单失败的产品
             */
            delProduct () {
                this.$emit('del-failed-product',this.productList.map(item => item.productId));
                this.changeValue(false);
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-err{

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: $font_size_16px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        /deep/ .ivu-modal-body{
            padding: 0;
        }

        .target-body{
            min-height: 164px;
            font-size: $font_size_14px;
            padding: 0 30px 0 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            .pro-list{
                max-width: 100%;
                position: relative;

                .product-name{
                    font-size: $font_size_14px;
                    color: #606266;
                }

                .detail{
                    line-height: 25px;
                    @include overflow_tip();

                    &.error{
                        font-size: $font_size_12px;
                        color: $color_yellow;
                    }

                    &.title{
                        font-size: $font_size_16px;
                        color: $color_333;
                    }

                    &.list{
                        color: #606266;
                    }
                }

                .hint{
                    content : '';
                    @include absolute_pos(absolute,$top : 2px,$left : -20px);

                    .ivu-icon-information-circled{
                        font-size: $font_size_16px;
                        color: $color_yellow;
                    }
                }
            }
        }

        /deep/ .ivu-modal-footer{
            .ivu-btn{
                min-width: 148px;
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
</style>
