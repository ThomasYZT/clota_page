<template>
    <!--默认账户本金/赠送金额可使用范围设置-->
    <Modal
        v-model="visible"
        title="默认账户本金可使用范围设置"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="本金可使用范围设置">
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-wrap" v-if="tableData.length > 0">
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="save" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                visible: false,
                step: 0,
                tableData: [
                    { name: '温泉酒店A' },
                    { name: '温泉酒店B' },
                    { name: '温泉酒店C' },
                ],
                multipleSelection: [],
            }
        },
        methods: {

            show () {
                this.visible = true;
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //关闭模态框
            hide(){
                this.visible = false;
            },

            save () {

            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 450px;


        }
    }
</style>
