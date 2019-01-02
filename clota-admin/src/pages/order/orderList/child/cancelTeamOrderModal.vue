<!--取消团队订单确认框-->

<template>
    <Modal
        :title="$t('申请取消订单')"
        :mask-closable="false"
        :value="value"
        :width="420"
        @input="changeValue"
        class="cancel-team-order"
        class-name="vertical-center-modal">
        <div :class="[$style.body]">
            {{$t('申请取消订单后，订单所含产品不可取票或核销。是否继续？')}}
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default () {
                    return false;
                }
            },
            //订单详情
            orderDetail : {
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
             * 隐藏模态框
             */
            cancel () {
                this.changeValue(false);
            },
            /**
             * 模态框状态改变
             * @param{Object} data 模态框状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 确认
             */
            confirm () {
                this.changeValue(false);
                this.applyCancleTeamOrder();
            },
            /**
             * 申请取消订单
             */
            applyCancleTeamOrder () {
                ajax.post('applyCancleTeamOrder',{
                    orderIds : this.orderDetail.id,
                    remark : '',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('applayCancelOrder') }));
                        this.$emit('fresh-data');
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
    .cancel-team-order{

    }
</style>
<style module>
    .body{
        height: 132px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        padding: 0 50px;
    }
</style>
