<!--
    公告模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :class-name="'vertical-center-modal ' + $style['system-notice-modal']"
           width="600"
           :mask-closable="false"
           @on-cancel="confirm()">
        <div class="modal-body">
            <div class="header">
                <span>{{title}}</span>
            </div>
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
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //公告内容
                content : '',
                //公告图片
                noticeImg : [],
                //标题
                title : '',
            };
        },
        methods : {
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
                this.findUsingNotice();
            },
            /**
             * 获取公告信息
             */
            findUsingNotice () {
                ajax.post('findUsingNotice',null,false).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.content = res.data.content;
                            this.noticeImg = res.data.picturePath ? res.data.picturePath.split(';') : '';
                            this.title = res.data.title;
                            this.visible = true;
                        } else {
                            this.visible = false;
                        }
                    } else {
                        this.content = '';
                        this.noticeImg = [];
                        this.title = '';
                    }
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal-body {
        min-height: 200px;
        width: 90%;
        margin: 0 auto;
        .content {
            margin-bottom: 15px;
            font-size: 12px;
            color: #606266;
            word-break: break-all;
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

        .header {
            margin: 12px 0 28px 0;
            color: #354052;
            font-size: 16px;
            text-align: center;
        }
    }
    /deep/ .ivu-modal-body {
        max-height: 423px;
        overflow: auto;
    }
    /deep/ .ivu-modal-header {
        display: none;
    }
</style>
<style module>
    .system-notice-modal {
        text-align: center !important;
    }
</style>
