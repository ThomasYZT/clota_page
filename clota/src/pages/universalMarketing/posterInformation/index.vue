<!--
    海报信息
    作者：杨泽涛
-->
<template>
    <div class="poster-information">
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="uploadPoster">{{$t('uploadPoster')}}</Button>
            <Button type="default" :class="{disabled : chosedColomn.length === 0}" class="ivu-btn-108px error" :disabled="chosedColomn.length === 0" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>

            <Input class="input-field"
                   v-model.trim="filterData.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputField', {field: $t('posterName')})"
                   @on-enter="getData"
                   @on-click="getData" />
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
                      @selection-change="selectionChange"
                      @query-data="getData">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <Tooltip theme="light" placement="right" transfer>
                            <span>{{scope.row.posterName | contentFilter}}</span>
                            <div slot="content" class="tooltip-content">
                                <img :src="scope.row.posterUrl">
                            </div>
                        </Tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{$t(scope.row.posterType) | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    show-overflow-tooltip
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li><span @click="download(scope.row.posterUrl)">{{$t('download')}}</span></li>
                            <li class="red-label" @click="deleteBatch(scope.row.id)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </tableCom>
        </div>

        <uploadPosterModal ref="uploadPosterModal" @addSuccess="getData"></uploadPosterModal>

        <delModal ref="delModal">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                <span class="result">{{$t('sureToDelPoster')}}</span>
                <span class="warn-tip">{{$t('operationIrrevocable')}}{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '../../../components/tableCom/tableCom';
    import { posterInfoHead } from './tableHeadConfig';
    import uploadPosterModal from './components/uploadPosterModal';
    import delModal from '../../../components/delModal/index';
    export default {
        components : {
            tableCom,
            uploadPosterModal,
            delModal
        },
        data () {
            return {
                columnData : posterInfoHead,
                tableData : [],
                totalCount : 0,
                filterData : {
                    pageNo : 1,
                    pageSize : 10,
                    keyword : ''
                },
                chosedColomn : [],
            };
        },
        methods : {
            /**
             * 获取表格数据
             */
            getData () {
                ajax.post('marketing-posterList', this.filterData).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 上传海报信息
             */
            uploadPoster () {
                this.$refs.uploadPosterModal.toggle({
                    type : 'show'
                });
            },
            /**
             * 批量删除
             * @param {string} id
             */
            deleteBatch (id) {
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        let posterIds;
                        if (id) {
                            posterIds = id;
                        } else {
                            posterIds = this.chosedColomn.map((item) => {
                                return item.id;
                            }).join(',');
                        }
                        ajax.post('marketing-deletePoster',{
                            posterIds : posterIds
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                                this.getData();
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                            }
                        });
                    }
                });
            },
            /**
             * 表格栏被check时
             * @param {object} list
             */
            selectionChange (list) {
                this.chosedColomn = list;
            },
            /**
             * 下载
             * @param {string} url
             */
            download (url) {

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

            .disabled {
                background-color: $color_gray;
                border-color: $color_gray;
            }

            .input-field {
                width: 350px;
                float: right;
            }
        }
    }

    .tooltip-content {
        width: 340px;
        height: 185px;
        line-height: 185px;
        background-color: #fff;
        border-radius: 8px;
        img {
            width: 100%;
        }
    }

    .del-modal {
        width: 80%;
        .icon-help {
            color: #EB6751;
        }

        .type-name {
            color: $color_yellow;
        }

        .result {
            color: $color_red;
        }
    }


</style>
