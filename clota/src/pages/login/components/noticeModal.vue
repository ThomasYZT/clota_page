<!--
    公告模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="title"
           :class-name="'vertical-center-modal ' + $style['system-notice-modal']"
           width="600"
           :mask-closable="false"
           @on-cancel="confirm()">

        <div class="modal-body">
            <div class="content" :class="{'no-img' : noticeImg.length === 0}">
                {{content}}
            </div>
            <img v-for="(item, index) in noticeImg" :key="index" :class="{'just-one' : noticeImg.length === 1}" class="notice-img" :src="item" alt="">
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
                noticeImg : [],
                //标题
                title : '',
            }
        },
        methods: {
            /**
             * 确认
             */
            confirm () {
                this.visible = false;
                this.content = '';
                this.noticeImg = [];
                this.title = '';
            },
            show () {

            },
            /**
             * 获取公告信息
             */
            findUsingNotice () {
                ajax.post('findUsingNotice',null,false).then(res => {
                    if (res.success) {
                        this.content = res.data ? res.data.content : '';
                        this.noticeImg = res.data && res.data.picturePath ? res.data.picturePath.split(';') : '';
                        this.title = res.data ? res.data.title : '';
                        this.visible = true;
                    } else {
                        this.content = '';
                        this.noticeImg = [];
                        this.title = '';
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
    .modal-body {
        min-height: 164px;
        width: 90%;
        margin: 0 auto;
        .content {
            margin-bottom: 15px;
            font-size: 12px;
            color: #606266;
        }

        .no-img {
            height: 164px;
            line-height: 164px;
        }

        .notice-img {
            width: 48%;
            &:last-child {
                margin-left: 10px;
            }
        }

        .just-one {
            width: 100%;
        }
    }

</style>
<style module>
    .system-notice-modal {
        text-align: center !important;
    }
</style>
