
<!--确认提示模态框-->

<template>
    <Modal
        :value="value"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="confirm-modal"
        :width="420"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="target-body">
            <slot></slot>
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">
                {{$t('关闭')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //标题
            title : {
                type : String,
                default : ''
            },
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            }
        },
        data () {
            return {
                //模态框是否显示
                modalShow : false
            };
        },
        methods : {
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前模态框是否显示
             */
            visibleChange (type) {

            },
            /**
             * 确认结果
             */
            confirm () {
                this.$emit('input',false);
                this.$emit('confirm-result');
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .confirm-modal{
        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        .target-body{
            @include center_center();
            padding: 20px;
            font-size: $font_size_14px;
            color: $color_333;
            word-break: break-all;
        }

        /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 164px);
        }
        /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
