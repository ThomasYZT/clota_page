<!--
    申请取消订单模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('applyCancelOrder')"
           class-name="apply-cancel-order-modal vertical-center-modal"
           width="400"
           :mask-closable="false"
           @on-cancel="toggle()">

        <div class="tip">
            <span>申请取消订单后，订单所含产品不可取票或核销。是否继续？</span>
        </div>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="toggle()">{{$t('cancel')}}</Button>
        </div>

    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            return {
                detail : {},
                //控制是否显示模态框
                visible : false,
            }
        },
        methods : {
            /**
             * 控制是否显示模态框
             * @param {object} data
             */
            toggle (data) {
                if (data) {
                    this.detail = data;
                    this.visible = true;
                } else {
                    this.visible = false;
                    this.reset();
                }
            },
            /**
             * 模态框重置
             */
            reset () {
                this.detail = {};
            },
            /**
             * 确认
             */
            confirm () {
                ajax.post('applyCancelTeamOrder', {
                    orderIds : this.detail.orderId,
                    remark : '',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('cancelOrder') }));
                        this.toggle();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('cancelOrder') }));
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .apply-cancel-order-modal {

        height: 280px;
    }
</style>
