<!--
    公告模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('systemServiceNotice')"
           class-name="vertical-center-modal notice-modal"
           width="600"
           :mask-closable="false"
           @on-cancel="confirm()">

        <div class="modal-body">

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t("close")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components: {},
        data() {
            return {
                //是否显示模态框
                visible : false,
                //公告内容
                content : '',
                //公告图片
                noticeImg : '',
            }
        },
        methods: {
            /**
             * 确认
             */
            confirm () {
                this.visible = false;
                this.content = '';
                this.noticeImg = '';
            },
            show () {

            },
            /**
             * 获取公告信息
             */
            findUsingNotice () {
                ajax.post('findUsingNotice').then(res => {
                    if (res.success) {

                    } else {

                    }
                });
            }
        },
        created () {
            this.findUsingNotice();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .notice-modal {

    }
</style>
