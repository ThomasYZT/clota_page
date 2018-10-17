<!--下单失败提示框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="420"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="product-err"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('提示')}}</span>
        </div>
        <div class="target-body">
            <ul class="pro-list">
                <li class="detail title">
                    以下产品下单失败
                </li>
                <li class="product-name">产品名称：</li>
                <li v-for="item in productList"
                    :key="item.productId"
                    v-w-title="item.productName"
                    class="detail list">{{item.productName}}</li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
                <li class="detail error" v-if="type === 'balanceNotEnough'">
                    原因：上级分销商可用额度不足
                </li>
                <li class="detail error" v-else>
                    原因：上级分销商可用额度不足
                </li>
            </ul>
        </div>
        <div slot="footer">
            <Button type="primary"
                    @click="confirm">{{$t('取消订单')}}</Button>
            <Button type="error"
                    :disabled="!canRemoveProduct"
                    @click="delProduct">{{$t('从订单中删除此产品')}}</Button>
        </div>
    </Modal>
</template>

<script>
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
        data() {
            return {}
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                }
            },
            /**
             * 确认提示信息
             */
            confirm () {
                this.$emit('input', false);
                this.$router.replace({
                    name : 'createOrder'
                })
            },
            /**
             * 删除下单失败的产品
             */
            delProduct () {
                this.$emit('del-failed-product',this.productList.map(item => item.productId));
            }
        }
    }
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
                    @include absolute_pos(absolute,27px);
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
                        padding-left: 65px;
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
                width: 148px;
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
</style>
