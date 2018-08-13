<template>
    <!--优惠券信息--查看更多-->
    <Modal
        v-model="visible"
        title="应用范围"
        class-name="view-more-coupon-modal vertical-center-modal"
        width="950"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="会员编码"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="卡券名称"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="使用条件">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="有效期"
                        width="200">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="hide" >返回</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                visible: false,
                // 表格数据
                tableData: [
                    {
                        id: '309287482',
                        name: '张三',
                        content: '店内总价不超过100元订单结算时使用',
                        type: '折扣券',
                        time: '20180.09.09-2020.02.09',
                    },
                    {
                        id: '309287482',
                        name: '张三',
                        content: '店内总价不超过100元订单结算时使用',
                        type: '折扣券',
                        time: '20180.09.09-2020.02.09',
                    },
                ],
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

</style>
