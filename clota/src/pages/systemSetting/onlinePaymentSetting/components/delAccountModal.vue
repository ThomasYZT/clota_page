<template>
    <!--删除账户-->
    <Modal
        v-model="visible"
        :title="$t(modalTitle)"
        class-name="add-account-modal vertical-center-modal"
        width="420"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div>
                <i class="iconfont icon-help"></i>
                {{$t('youAreDeleting')}} <span class="payment-name">{{accountData.paymentName}}</span>
            </div>
            <p><span class="warn-tip">{{$t('operationIrrevocable')}}</span>{{$t('sureToDel')}}</p>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="error" @click="confirmDel()" >{{$t('confirm')}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';

    export default {
        props : ['modal-title'],
        components : {},
        data () {
            return {
                visible : false,
                accountData : {}
            };
        },
        watch : {

        },
        methods : {

            show ( data ) {
                if ( data ) {
                    this.accountData = Object.assign({}, data.item);
                    this.index = data.index;
                }
                this.visible = true;
            },

            //关闭模态框
            hide () {
                this.visible = false;

            },


            // 确定删除
            confirmDel () {
                ajax.post('deleteOnlineAccount', {
                    id : this.accountData.id
                }).then((res) => {
                    if (res.success) {
                        this.$Message.success(this.$t(this.title) + this.$t('successTip', { tip : '' }) + '！');
                    } else {
                        this.$Message.warning('queryChannelSet ' + this.$t('failureTip', { tip : 'del' }) + '！');
                    }
                });
                this.$emit('on-delete');
                this.visible = false;
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 14px;
            font-size: 14px;
            color: #333;
            letter-spacing: 1px;
            line-height: 24px;
            text-align: center;

            .icon-help, .warn-tip {
                color: $color_red;
            }
            .payment-name {
                color: $color_yellow;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
