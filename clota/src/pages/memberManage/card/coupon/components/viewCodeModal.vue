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
               :title="$t('colonSetting', { key : $t('productTypeManage') })"
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
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.visible = true;
            },
            hide () {
                this.visible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal {
        /deep/ .ivu-modal-body {
            height: 500px;
            overflow: auto;
        }
    }
    .view-code-modal {

    }
</style>
