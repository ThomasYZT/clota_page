<!--
    海报信息
    作者：杨泽涛
-->
<template>
    <div class="poster-information">
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="uploadPoster">{{$t('uploadPoster')}}</Button>
            <Button type="default" class="ivu-btn-108px error" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>
        </div>

        <div class="table-area">
            <tableCom :column-data="columnData"
                      :table-data="tableData"
                      :border="true"
                      :column-check="true"
                      :show-pagination="true"
                      :total-count="totalCount"
                      :ofset-height="120"
                      :page-no-d.sync="filterData.pageNo"
                      :page-size-d.sync="filterData.pageSize"
                      @query-data="getData">

            </tableCom>
        </div>

        <uploadPosterModal ref="uploadPosterModal"></uploadPosterModal>
    </div>
</template>

<script>
    import tableCom from '../../../components/tableCom/tableCom';
    import { posterInfoHead } from './tableHeadConfig';
    import uploadPosterModal from './components/uploadPosterModal';
    export default {
        components : {
            tableCom,
            uploadPosterModal
        },
        data () {
            return {
                columnData : posterInfoHead,
                tableData : [],
                totalCount : 0,
                filterData : {
                    pageNo : 0,
                    pageSize : 10
                }
            };
        },
        methods : {
            /**
             * 获取表格数据
             */
            getData () {
                this.tableData = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},];
                this.totalCount = 20;
            },
            /**
             * 上传海报信息
             */
            uploadPoster () {
                this.$refs.uploadPosterModal.toggle();
            },
            /**
             * 批量删除
             */
            deleteBatch () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .poster-information {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        .btn-area {
            padding: 14px 30px;

            /deep/ .error {
                background-color: #EB6751;
                border-color: #EB6751;
                color: #fff;
            }

            .ivu-btn-108px {
                margin-right: 10px;
            }
        }
    }
</style>
