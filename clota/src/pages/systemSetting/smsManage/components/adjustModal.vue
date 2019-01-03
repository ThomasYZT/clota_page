<!--
    调整短信数量模态框
    作者：杨泽涛
-->
<template>
    <Modal
        v-model="visible"
        :title="$t('adjustSysAmount')"
        class-name="vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="toggle">
        <Form ref="form"
              label-position="left"
              :label-width="150">
            <Form-item :label="$t('smsPackageName')">
                <span>{{listItem.packageName | contentFilter}}</span>
            </Form-item>
            <Form-item :label="$t('setMealPrice')">
                <span>{{listItem.price | moneyFilter | contentFilter}}</span>
            </Form-item>
            <Form-item :label="$t('packageSmsCount')">
                <span>{{listItem.smsCount | contentFilter}}</span>
            </Form-item>
            <Form-item :label="$t('payType')">
                <span>{{listItem.payType === 'weixin' ? $t('payType.weixin') : $t('payType.alipay')}}</span>
            </Form-item>
            <Form-item :label="$t('paymentStatus')">
                <span>{{listItem.txnStatus ? $t('txnStatus.' + listItem.txnStatus) : '-'}}</span>
            </Form-item>
            <Form-item :label="$t('systemStatus')">
                <span>{{listItem.bizStatus ? $t('bizStatus.' + listItem.bizStatus) : '-'}}</span>
            </Form-item>
            <!--<Form-item :label="$t('failureReason')">-->

            <!--</Form-item>-->
        </Form>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="confirm">{{$t('confirm')}}</Button>
            <Button class="btn-88px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>


        <delModal ref="delModal">
            <span>{{$t('sureToaddSmsAmount')}}</span>{{listItem.smsCount | contentFilter}}{{$t('item')}}?
        </delModal>

    </Modal>
</template>

<script>
    import delModal from '../../../../components/delModal/index';
    import ajax from '../../../../api/index';
    export default {
        components : {
            delModal
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表项数据
                listItem : {}
            };
        },
        methods : {
            /**
             *  切换显示/隐藏模态框
             */
            toggle (data) {
                if (data) {
                    this.listItem = data;
                } else {
                    this.listItem = {};
                }
                this.visible = !this.visible;
            },
            /**
             * 确认调整
             */
            confirm () {
                this.visible = false;
                this.$refs.delModal.show({
                    title : '',
                    confirmCallback : () => {
                        this.adjust();
                    },
                    cancelCallback : () => {
                        this.visible = true;
                    }
                });
            },
            /**
             * 调整短信数量
             */
            adjust () {
                ajax.post('queryConsumeUpdateBiz' , {
                    transactionId : this.listItem.transactionId
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('adjust') }));
                        this.$emit('adjust');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('adjust') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
