<!--禁用租户提示框-->

<template>
    <Modal
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        :width="420"
        @on-visible-change="visibleChange"
        class="del-node"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">
                {{$t('提示')}}
            </span>
        </div>
        <div class="warn-info">
            <Icon type="ios-help-circle"/>
            <span class="normal-label" v-if="operateType === 'close'">{{$t('您正在禁用')}}</span>
            <span class="normal-label" v-else>{{$t('您正在启用')}}</span>
            <span class="red-label" v-w-title="lessDetail.orgName">{{lessDetail.orgName}}</span>
            <span class="normal-label">{{$t('，是否继续?')}}</span>
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
            },
            //当前操作类型
            'operate-type' : {
                type : String,
                default : ''
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
            @include block_outline($height: 160px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .warn-info {
            @include center_center();
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;
            flex-direction: row;

            .red-label {
                color: $color_err;
                max-width: 200px;
                @include overflow_tip();
            }
        }
    }
</style>
