<!--
    导出券码模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal export-code-modal"
               transfer
               width="600"
               :title="$t('导出')"
               @on-cancel="hide"
               :mask-closable="false">

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="exportData" >{{$t("save")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表行数据
                rowData : {},
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.rowData = data;
                this.visible = true;
            },
            /**
             * 导出
             */
            exportData () {

            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.rowData = {};
                this.visible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 300px;
        overflow: auto;
    }
    .export-code-modal {

    }
</style>
