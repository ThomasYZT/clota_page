<!--添加游客错误提示框-->

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
        <div class="targe-body">
            <ul class="pro-list">
                <li v-for="item in touristErrList"
                    :key="item.productId"
                    v-w-title="`${item.visitorName}最多购买${item.maxCount}个${item.productName}。`"
                    class="detail">{{item.visitorName}}最多购买{{item.maxCount}}个{{item.productName}}。</li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
            </ul>
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
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
            //添加游客错误信息列表
            'tourist-err-list' : {
                type : Array,
                default () {
                    return [];
                }
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

        .targe-body{
            @include block_outline($height : 164px);
            font-size: $font_size_14px;
            padding: 0 30px 0 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            .pro-list{
                max-width: 100%;
                position: relative;

                .detail{
                    line-height: 25px;
                    @include overflow_tip();
                }

                .hint{
                    content : '';
                    @include absolute_pos(absolute,$top : 3px,$left : -20px);

                    .ivu-icon-information-circled{
                        font-size: $font_size_16px;
                        color: $color_yellow;
                    }
                }
            }
        }
    }
</style>
