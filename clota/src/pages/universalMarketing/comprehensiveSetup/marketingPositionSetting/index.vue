<!--
    营销地理位置设置
    作者：杨泽涛
-->
<template>
    <div class="marketing-position-setting">
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="add">{{$t('add')}}</Button>
            <Button type="default" :class="{disabled : chosedColomn.length === 0}" class="ivu-btn-108px error" :disabled="chosedColomn.length === 0" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>
        </div>

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

        </tableCom>

        <addLngLatModal ref="addLngLatModal"></addLngLatModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '../../../../components/tableCom/tableCom';
    import { marketingPositionHead } from '../tableHeadConfig';
    import addLngLatModal from './components/addLngLatModal';
    export default {
        components : {
            tableCom,
            addLngLatModal
        },
        data () {
            return {
                columnData : marketingPositionHead,
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
                this.$refs.addLngLatModal.toggle();
            },
            /**
             * 批量删除
             */
            deleteBatch () {

            },
            /**
             * 表格栏被check时
             * @param list
             */
            selectionChange (list) {
                this.chosedColomn = list;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-position-setting {
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
