<!--
    停用/启用在线收款账户
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           class-name="vertical-center-modal"
           width="400"
           :mask-closable="false"
           :title="$t(title)">

        <i-row class="content">
            <i-col span="18" offset="6">
                <div class="payment-item">
                    <span>{{$t('colonSetting', { key : $t('collectionAccountType') })}}</span>
                    <span>
                    {{$t('payType.' + accountInfo.accountType) | contentFilter}}
                </span>
                </div>
                <div class="payment-item">
                    <span>{{$t('colonSetting', { key : 'MerchantID' })}}</span>
                    <span>{{accountInfo.merchantId | contentFilter}}</span>
                </div>
                <div class="payment-item">
                    <span>{{$t('colonSetting', { key : 'partnerID' })}}</span>
                    <span>{{accountInfo.partnerId | contentFilter}}</span>
                </div>
            </i-col>
        </i-row>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm">{{$t("confirm")}}</Button>
            <Button type="ghost" @click="toggle">{{$t("cancel")}}</Button>
        </div>

        <del-modal ref="delModal">
            <span class="content-text">
                <span class="yellow-label">
                    {{$t('areYouSureAccount', { field : (accountInfo.useStatus === 'enabled' ? $t('stopUsing') : $t('commissioned')) + $t('payType.' + accountInfo.accountType)  })}}
                </span>
            </span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('whetherSure')}}？</span>
        </del-modal>
    </Modal>
</template>

<script>
    import delModal from '@/components/delModal/index';
    import ajax from '@/api/index';
    export default {
        components: {
            delModal
        },
        data() {
            return {
                //是否显示模态框
                visible : false,
                //模态框标题
                title : '',
                //收款账户信息
                accountInfo : {}
            }
        },
        methods: {
            /**
             * 隐藏/显示模态框
             * @param {*} data
             */
            toggle (data) {
                if (data) {
                    this.accountInfo = data;
                    this.title = this.accountInfo.useStatus === 'enabled' ? 'startOnlineAccount' : 'stopOnlineAccount'
                } else {
                    this.accountInfo = {};
                    this.title = '';
                }
                this.visible = !this.visible;
            },
            /**
             *  点击确认按钮
             */
            confirm () {
                this.visible = false;
                this.$refs.delModal.show({
                    title : this.$t('notice'),
                    confirmCallback: () => {
                        this.updateOnlineAccount();
                    },
                    cancelCallback: () => {
                        this.visible = true;
                    }
                })
            },
            /**
             * 修改账户状态
             */
            updateOnlineAccount () {
                ajax.post('updateOnlineAccount', {
                    id : this.accountInfo.id,
                    useStatus : this.accountInfo.useStatus === 'enabled' ? 'not_enabled' : 'enabled'
                }).then(res => {
                    if (res.success) {
                        this.$emit('updateAccount');
                        this.$Message.success(this.$t('successTip', { tip : this.$t('operate') }));
                        this.toggle();
                        this.visible = false;
                        this.$store.dispatch('getOnlineAccountList');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('operate') }));
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .payment-item{
        line-height: 22px;
        color: $color_666;
        margin-top: 5px;

        .using-btn {
            color: $color_blue;
            cursor: pointer;
        }
    }

    .content {
        margin-top: 20px;
        font-size: 14px;
    }

    /deep/ .ivu-modal-body {
        min-height: 164px;
    }
</style>
