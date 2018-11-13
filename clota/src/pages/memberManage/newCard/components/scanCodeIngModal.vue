<!--等待扫码中-->

<template>
    <Modal
        :title="$t('请扫码会员支付二维码')"
        :mask-closable="false"
        :value="value"
        :width="380"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="scan-codeing-modal"
        class-name="vertical-center-modal">
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
    .scan-codeing-modal{

        /deep/ .ivu-modal-footer{
            display: none;
        }
    }
</style>
