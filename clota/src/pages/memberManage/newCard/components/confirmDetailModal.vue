<!--确认会员信息-->

<template>
    <Modal
        :title="$t('pleaseConfirmData')"
        :mask-closable="false"
        :value="value"
        :width="580"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="confirm-member-info"
        class-name="vertical-center-modal">
        <slot>

        </slot>
        <div slot="footer">
            <Button type="ghost"
                    v-if="showCancel"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('confirm')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //是否显示取消按钮
            'show-cancel' : {
                type : Boolean,
                default : true
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 取消操作，隐藏模态框
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 确认信息
             */
            save () {
                this.$emit('confirm-data');
            },
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .confirm-member-info{

        /deep/ .word-wrap{
            @include overflow_tip();
            @include block_outline($width : auto);
        }

        /deep/ .ivu-form-item{
            margin-bottom: 0;
        }

        /deep/ .ivu-modal-body{
            overflow: auto;
            max-height: 400px;
            min-height: 200px;
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;

            .ivu-form{
                width: 100%;
                overflow: auto;
            }

            .ivu-form-item-content{
                color: $color_666;
                margin-left: 0!important;
            }

            .ivu-form-item-label{
                padding-right: 5px;
                padding-left: 10px;
                width: auto!important;
            }
        }

        /deep/ .card-title{
            font-size: $font_size_14px;
            color: $color_000;
            clear: both;
            padding: 10px 0 5px 10px;
        }

        /deep/ .hr{
            @include block_outline($height : 10px);
            height: 10px;
            clear: both;
        }
    }
</style>
