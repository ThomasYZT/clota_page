<!--短信套餐列表-->

<template>
    <div class="package">
        <div class="create-package">
            <Button type="primary" @click="addPackage">
                新建套餐
            </Button>
        </div>
        <table-com
            :column-data="packageHead"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="120"
            @query-data="queryList">
            <el-table-column
                slot="columnprice"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    {{scoped.row['price'] | moneyFilter | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="editPackage(scoped.row)">修改</li>
                        <li class="red-label" @click="delPackage(scoped.row)">删除</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--删除套餐模态框-->
        <del-modal ref="delModal">
            <span style="padding: 0 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width : 100%;">您正在删除套餐：{{currendData.packageName}}</span>
            <span><span style="color:#ed3f14;">本操作不可撤销</span>，是否继续？</span>
        </del-modal>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import { packageHead } from './notePackageConfig';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index.js';

    export default {
        components : {
            tableCom,
            delModal
        },
        data () {
            return {
                //总条数
                totalCount : 0,
                //表头配置
                packageHead : packageHead,
                //短信套餐数据
                tableData : [],
                //页码
                pageNo : 1,
                //每页的条数
                pageSize : 10,
                //当前操作的数据
                currendData : {}
            };
        },
        methods : {
            /**
             * 新建套餐
             */
            addPackage () {
                this.$router.push({
                    name : 'editnotePackage',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 修改套餐
             * @param data
             */
            editPackage (data) {
                this.$router.push({
                    name : 'editnotePackage',
                    params : {
                        type : 'edit',
                        id : data.id
                    }
                });
            },
            /**
             * 查询短信套餐列表
             */
            queryList () {
                ajax.post('smsPackageList',{
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 删除套餐
             * @param data
             */
            delPackage (data) {
                this.currendData = data;
                this.$refs.delModal.show({
                    title : '删除套餐',
                    confirmCallback : () => {
                        this.confirmDel(data.id);
                    }
                });
            },
            /**
             * 删除套餐
             * @param id 套餐id
             */
            confirmDel (id) {
                ajax.post('deleteSmsPackage',{
                    id : id
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('删除成功');
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || '删除失败');
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .package{
        @include block_outline();
        padding: 0 30px;

        .create-package{
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .operate-info {
            @include table_operate();

            .operate-list {
                color: $color_blue;
            }

            .stop{
                color : $color_yellow
            }

            .del{
                color: $color_err;
            }
        }
    }
</style>
