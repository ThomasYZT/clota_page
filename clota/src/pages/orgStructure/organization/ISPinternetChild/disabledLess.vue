<!--禁用租户提示框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="del-node"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <!--<span class="title" v-w-title="$t('delete') + nodeDetail.title">{{$t('delete')}}{{nodeDetail.title}}</span>-->
            <span class="title"
                  v-w-title="$t('disabled') + lessDetail.name">
                {{$t('disabled')}}{{lessDetail.name}}
            </span>
        </div>
        <div class="warn-info">
            <Icon type="ios-help-circle"/>
            <span class="red-label">{{$t('affirm')}}{{$t('disabled')}}{{lessDetail.name}}?</span>
        </div>
        <div slot="footer">
            <Button type="error"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //绑定的模态框是否显示的变量
            value : {
                type : Boolean,
                default : false
            },
            //租户详情
            'less-detail' : {
                type : Object,
                default () {
                    return {};
                }
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

            },
            /**
             * 取消禁用
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 确认禁用
             */
            confirm () {
                this.$emit('input', true);
                this.$emit('confirm-disabled');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .del-node {
        & /deep/ .ivu-modal {
            width: 600px !important;
            height: 380px;
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
            @include block_outline($height: 270px);
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
