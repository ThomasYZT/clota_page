<template>
    <!--应用范围-->
    <Modal
        v-model="visible"
        title="应用范围"
        class-name="use-range-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">
                <el-table
                    :width="810"
                    :data="cashData"
                    :border="false"
                    style="width: 100%">
                    <el-table-column
                        prop="money"
                        label="本金">
                    </el-table-column>
                    <el-table-column
                        prop="send"
                        label="赠送金额">
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
                cashData: [
                {
                    money: '温泉酒店',
                    send: '景区自营票购买',
                },
                {
                    money: '张记手擀面',
                    send: '温泉酒店',
                },
            ]
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
