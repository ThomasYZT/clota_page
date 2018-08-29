<template>
    <!--优惠券信息--查看更多-->
    <Modal
        v-model="visible"
        :title="$t('applicationScope')"
        class-name="view-more-coupon-modal vertical-center-modal"
        width="950"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <more-card :status="status" :table-data="tableData"></more-card>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="hide" >{{$t("back")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import moreCard  from './moreCard.vue'

    export default {
        props: ['status','table-data'],
        components: {
            moreCard,
        },
        data () {
            return {
                visible: false,
            }
        },
        methods: {

            show () {
                this.visible = true;
            },

            //关闭模态框
            hide(){
                this.visible = false;
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .view-more-coupon-modal{

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>
