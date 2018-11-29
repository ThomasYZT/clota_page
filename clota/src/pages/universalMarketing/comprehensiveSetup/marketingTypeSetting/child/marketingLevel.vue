<!--
    营销等级
    作者：杨泽涛
-->
<template>
    <div class="marketing-level">
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="add">{{$t('add') + $t('level')}}</Button>
            <Button type="default" :class="{disabled : chosedColomn.length === 0}" class="ivu-btn-108px error" :disabled="chosedColomn.length === 0" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>
        </div>

        <tableCom :column-data="columnData"
                  :table-data="tableData"
                  :border="true"
                  :column-check="true"
                  :show-pagination="true"
                  :total-count="totalCount"
                  :ofset-height="180"
                  :page-no-d.sync="filterData.pageNo"
                  :page-size-d.sync="filterData.pageSize"
                  @selection-change="selectionChange"
                  @query-data="getData">
            <el-table-column
                slot="column6"
                slot-scope="row"
                show-overflow-tooltip
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="modify(scope.$index)" >{{$t('modify')}}</li>
                        <li class="red-label" @click="deleteBatch(scope.$index)">{{$t('del')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </tableCom>

        <addMarketingLevelModal ref="addMarketingLevelModal"></addMarketingLevelModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '../../../../../components/tableCom/tableCom';
    import { marketingLevelHead } from '../../tableHeadConfig';
    import addMarketingLevelModal from '../components/addMarketingLevelModal';
    export default {
        components : {
            tableCom,
            addMarketingLevelModal
        },
        data () {
            return {
                columnData : marketingLevelHead,
                tableData : [],
                totalCount : 0,
                filterData : {
                    pageNo : 0,
                    pageSize : 10
                },
                chosedColomn : [],
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
             * 新增
             */
            add () {
                this.$refs.addMarketingLevelModal.toggle();
            },
            /**
             * 批量删除
             */
            deleteBatch () {

            },
            /**
             * 表格栏被check时
             * @param {array} list
             */
            selectionChange (list) {
                this.chosedColomn = list;
            },
            /**
             * 修改
             * @param {object} data
             */
            modify (data) {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-level {
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
        }
    }
</style>
