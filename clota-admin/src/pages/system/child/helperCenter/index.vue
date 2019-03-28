<!--
    帮助中心
    作者：杨泽涛
-->
<template>
    <div class="helper-center">
        <div class="menu-wrapper">
            <menuTree :nowfileItem.sync="nowfileItem" :cancelFile.sync="cancelFile" :updateInfo="updateInfo"></menuTree>
        </div>

        <div class="article-wrapper">
            <editPanel :nowfileItem="nowfileItem" @cancel="cancel" @updatePageList="updatePageList"></editPanel>
        </div>
    </div>
</template>

<script>
    import menuTree from './components/menuTree';
    import editPanel from './components/editPanel';
    export default {
        components : {
            menuTree,
            editPanel
        },
        data () {
            return {
                nowfileItem : {
                    name : '',
                    type : '',
                    folderId : ''
                },
                //取消保存的文件
                cancelFile : {},
                //更新信息
                updateInfo : {},
            };
        },
        methods : {
            /**
             * 取消新建文件
             * @param file
             */
            cancel (file) {
                this.cancelFile = file;
            },
            /**
             * 新增文件更新列表事件
             * @param {object} data
             */
            updatePageList (data) {
                this.updateInfo = data;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .helper-center {
        padding: 20px;
        @include block_outline();
        display: flex;
        overflow: auto;
        background: $color_fff;

        .menu-wrapper {
            height: 100%;
            width: 25%;
            padding: 0 10px;
            flex: 1 0;
            flex-basis: 25%;
            overflow: auto;
            border-right: 1px solid $color_gray;
        }
        .menu-wrapper::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }

        .article-wrapper {
            height: 100%;
            width: 75%;
            padding: 0 20px;
            flex: 1 0;
            flex-basis: 75%;
            overflow: auto;
        }

        .article-wrapper::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
    }
</style>
