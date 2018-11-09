<!--确认会员信息-->

<template>
    <Modal
        :title="$t('请确认信息')"
        :mask-closable="false"
        :value="value"
        :width="600"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="confirm-member-info"
        class-name="vertical-center-modal">
        <slot>

        </slot>
        <div slot="footer">
            <Button type="ghost"
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

        /deep/ .ivu-form-item{
            margin-bottom: 0;
        }

        /deep/ .ivu-modal-body{
            overflow: auto;
            max-height: 400px;
        }
    }
</style>
