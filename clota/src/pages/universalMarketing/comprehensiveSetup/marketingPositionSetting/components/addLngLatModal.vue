<!--
    新增经纬度模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('addNewLngLat')"
           class-name="vertical-center-modal add-lng-lat"
           width="600"
           :mask-closable="false">

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="save" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
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
             * 显示、隐藏模态框
             */
            toggle () {
                this.visible = !this.visible;
            },
            /**
             * 保存
             */
            save () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
