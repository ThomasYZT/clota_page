<!--
    生成链接模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal generate-link-modal"
               transfer
               width="600"
               :title="$t('生成链接')"
               @on-cancel="hide"
               :mask-closable="false">
            <!-- 步骤1 -->
            <div class="step-1" v-if="editing">

            </div>

            <!-- 步骤2 -->
            <div class="step-2" v-else>

            </div>

            <div v-if="editing"
                 slot="footer"
                 class="modal-footer">
                <Button type="primary" @click="nextStep()" >{{$t("生成")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
            <div v-else
                 slot="footer"
                 class="modal-footer">
                <Button type="ghost" @click="hide" >{{$t("返回")}}</Button>
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
                //数据是否处于编辑中
                editing : true,
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
             * 下一步 生成链接
             */
            nextStep () {
                this.editing = false;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.rowData = {};
                this.editing = true;
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
    .generate-link-modal {

    }
</style>
