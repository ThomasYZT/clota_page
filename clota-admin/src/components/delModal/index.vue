<!--删除模态框-->

<template>
    <Modal
        title="Title"
        v-model="modalShow"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="del-node"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="warn-info">
            <slot>
                {{msg}}
            </slot>
        </div>
        <div slot="footer">
            <Button type="error" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
        },
        data () {
            return {
                //要显示的信息
                msg : '',
                //标题信息
                title : '',
                //是否显示模态框
                modalShow : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {

            },
            /**
             * 取消删除
             */
            cancel () {
                this.modalShow = false;
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            },
            /**
             * 确认删除
             */
            confirm () {
                this.modalShow = false;
                if (this.confirmCallback) {
                    this.confirmCallback();
                }
            },
            /**
             * 显示 模态框
             * @param msg
             * @param title
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ msg,title,confirmCallback = null,cancelCallback }) {
                this.modalShow = true;
                this.msg = msg;
                this.title = title;
                if (confirmCallback && typeof confirmCallback == 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback == 'function') {
                    this.cancelCallback = cancelCallback;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .del-node {
        & /deep/ .ivu-modal {
            width: 420px !important;
            height: 280px;
        }

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

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 164px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .warn-info {
            @include center_center();
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;

            .red-label {
                color: $color_err;
            }
        }
    }
</style>
