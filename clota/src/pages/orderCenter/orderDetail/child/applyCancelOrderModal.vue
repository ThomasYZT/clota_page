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
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('cancelOrderNotice')}}
            </span>
        </div>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="error" @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="toggle">{{$t('cancel')}}</Button>
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
            };
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
                        this.$Message.success(this.$t('successTip', { tip : this.$t('applayCancelOrder') }));
                        this.toggle();
                        this.$emit('applySuccess');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('applayCancelOrder') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .apply-cancel-order-modal {
        position: relative;
        .tip {
            display: inline-block;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            vertical-align: middle;
        }
    }

    /deep/ .ivu-modal-body {
        min-height: 164px;
    }
    /deep/ .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -20px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }
</style>
