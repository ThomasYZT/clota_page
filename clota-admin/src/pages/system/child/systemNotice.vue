<!--系统公告-->

<template>
    <div class="notice">
        <div class="create-notice">
            <Button type="primary">
                <span @click="addNotice">+ {{$t('publishNotice')}}</span>
            </Button>
        </div>
        <table-com
            :ofsetHeight="118"
            :show-pagination="true"
            :column-data="systemHead"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="sysListParams.page"
            :page-size-d.sync="sysListParams.pageSize"
            :border="true"
            @query-data="queryList">
             <el-table-column
                slot="columnimages"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <template v-if="scoped.row.images && scoped.row.images.length > 0">
                        <img class="row-image"
                             v-for="(item,index) in scoped.row.images"
                             :key="index"
                             :src="item">
                    </template>
                    <template v-else>-</template>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnstate"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.state === 'true' ? $t('inUse') : $t('outUse')  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="columnoperate"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                fixed="right"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="normal" @click="watchNotice(scoped.row)">{{$t('look')}}</li>
                        <template v-if="scoped.row.state === 'true'">
                            <li class="yellow-label" @click="stopNotice(scoped.row)">{{$t('disabled')}}</li>
                        </template>
                        <template v-else>
                            <li class="normal"  @click="openNotice(scoped.row)">{{$t('startUsing')}}</li>
                            <li class="normal" @click="editNotice(scoped.row)">{{$t('modify')}}</li>
                        </template>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import { systemHead } from './systemNoticeConfig';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
        },
        data () {
            return {
                //表头配置
                systemHead : systemHead,
                // 账户列表的请求参数
                sysListParams : {
                    page : 1,
                    pageSize : 10
                },
                // 列表数据
                tableData : [],
                // 列表数据总数
                total : 0,
            };
        },
        methods : {
            /**
             * 查询账户信息列表
             */
            queryList () {
                ajax.post('noticeList', this.sysListParams).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list || [];
                        this.total = res.data.totalRecord ? parseInt(res.data.totalRecord) : 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 新建公告
             */
            addNotice () {
                this.$router.push({
                    name : 'editSystemNotice',
                    params : {
                        type : 'add'
                    }
                });
            },
            /**
             * 停用公告
             * @param data
             */
            stopNotice (data) {
                if (data) {
                    this.switchNotice(data, 'invalid');
                }
            },
            /**
             * 启用公告
             * @param data
             */
            openNotice (data) {
                if (data) {
                    this.switchNotice(data, 'normal');
                }
            },
            /**
             * 启/停用公告信息
             * @param data
             * @param state true为启用 false为停用
             */
            switchNotice ( data, state) {
                ajax.post('switchNotice', {
                    id : data.id,
                    state : state
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success( state === 'normal' ?
                            this.$t('successTip',{ tip : this.$t('startUsing') + data.title }) :
                            this.$t('successTip',{ tip : this.$t('stopUsing') + data.title }));
                        this.queryList();
                    } else {
                        this.$Message.error( res.message || (state === 'normal' ?
                            this.$t('failureTip',{ tip : this.$t('startUsing') + data.title }) :
                            this.$t('failureTip',{ tip : this.$t('stopUsing') + data.title })));
                    }
                });
            },
            /**
             * 编辑公告
             * @param data
             */
            editNotice (data) {
                this.$router.push({
                    name : 'editSystemNotice',
                    params : {
                        type : 'edit',
                        info : data
                    }
                });
            },
            /**
             * 查看公告
             * @param data
             */
            watchNotice (data) {
                this.$router.push({
                    name : 'editSystemNotice',
                    params : {
                        type : 'look',
                        info : data
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .notice{
        @include block_outline();
        padding: 0 30px;

        .create-notice{
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .row-image{
            width: 30px;
            height: 30px;
            display: inline-block;
            margin-right: 5px;
        }

        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }
    }
</style>
