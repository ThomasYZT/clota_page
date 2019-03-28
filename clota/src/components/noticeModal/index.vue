<!--提示信息框-->

<template>
    <Modal
        title="Title"
        v-model="modalShow"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="notice-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="warn-info">
            <slot>
            </slot>
        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{confirmBtn}}</Button>
            <Button v-if="showCancel" class="ivu-btn-90px" @click="cancel">{{cancelBtn}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        data () {
            return {
                //标题信息
                title : '',
                //是否显示模态框
                modalShow : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //确认文本
                confirmBtn : '',
                //取消文本
                cancelBtn : '',
                //是否显示取消按钮
                showCancel : true
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param{Boolean} type 模态框状态
             */
            visibleChange (type) {
                if (type === false) {
                    if (this.cancelCallback) {
                        this.cancelCallback();
                    }
                }
            },
            /**
             * 取消删除
             */
            cancel () {
                this.hide();
            },
            /**
             * 确认删除
             */
            confirm () {
                if (this.confirmCallback) {
                    this.confirmCallback();
                } else {
                    this.cancel();
                }
            },
            /**
             * 显示 模态框
             * @param msg
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ title,confirmCallback = null,cancelCallback,confirmBtn = this.$t('confirm'),cancelBtn = this.$t('cancel'),showCancel = true }) {
                this.modalShow = true;
                this.title = title;
                this.showCancel = showCancel;
                this.confirmBtn = confirmBtn;
                this.cancelBtn = cancelBtn;
                if (confirmCallback && typeof confirmCallback === 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback === 'function') {
                    this.cancelCallback = cancelCallback;
                }
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.modalShow = false;
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .notice-modal {
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
            padding: 10px 0;
            position: relative;
            width: 100%;
            min-height: 164px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .warn-info {
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;

            .red-label {
                color: $color_err;
            }

            /deep/ .ivu-form-item{
                margin-bottom: 0!important;
            }
        }
    }
</style>
