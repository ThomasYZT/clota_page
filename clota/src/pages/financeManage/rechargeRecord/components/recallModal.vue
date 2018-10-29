<template>
    <!--撤回充值申请-->
    <Modal
        v-model="visible"
        :title="$t('withdrawRechargeRequest')"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <p>{{$t('isWithdrawRechargeRequest')}}?</p>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="buyNow()">{{$t('checkPass')}}</Button>
            <Button type="error" @click="buyNow()">{{$t('reject')}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['row-data'],
        components: {},
        data () {
            return {
                visible: false,
                //表单数据
                formData: {
                    payer: '',
                    rechargeAmount: 0,
                    rechargeType: '',
                    transactionNo: '',
                    remark: '',
                },

            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep({}, data.item, this.formData);
                }
                this.visible = true;
            },


            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    payer: '',
                    rechargeAmount: 0,
                    rechargeType: '',
                    transactionNo: '',
                    remark: '',
                };

            },

            // 立即购买
            buyNow ( params ) {
                /*ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success(this.$t('操作成功',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('操作失败',{'tip' : this.$t('add')}));
                    }
                })*/
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            > p {
                margin: 65px;
                text-align: center;
                font-size: 14px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                width: 88px;
            }
        }

    }
</style>
