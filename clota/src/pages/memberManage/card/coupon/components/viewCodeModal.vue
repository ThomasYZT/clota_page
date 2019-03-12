<!--
    查看券码模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal view-code-modal"
               transfer
               width="600"
               :title="$t(title)"
               @on-cancel="hide"
               :mask-closable="false">

            <div slot="footer" class="modal-footer">
                <Button type="ghost" @click="hide" >{{$t("close")}}</Button>
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
        computed : {
            //模态框标题
            title () {
                if (this.rowData && Object.keys(this.rowData).length > 0) {
                    return this.rowData.couponType;
                } else {
                    return '';
                }
            }
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
             * 隐藏
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

    .view-code-modal {

    }
</style>
