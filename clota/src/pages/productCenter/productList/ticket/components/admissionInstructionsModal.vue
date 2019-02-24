<!--
    入园须知模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal admission-instructions"
               transfer
               width="400"
               :title="title"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="content">
                <div v-if="admissionInstructions" v-html="admissionInstructions"></div>
                <div v-else class="no-content">
                    <span>该园区暂无入园须知</span>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('close')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //模态框是否显示
                visible : false,
                //模态框标题
                title : '',
                //入园须知内容
                admissionInstructions : ''
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.admissionInstructions = data.admissionInstructions;
                this.title = data.parkName + "入园须知";
                this.visible = true;
            },
            /**
             * 关闭模态框
             */
            hide () {
                this.admissionInstructions = "";
                this.title = "";
                this.visible = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        min-height: 200px;
    }

    .admission-instructions {
        .content {
            position: relative;
            height: 200px;
            width: 100%;
            .no-content {
                @include center_center();
            }
        }
    }
</style>
