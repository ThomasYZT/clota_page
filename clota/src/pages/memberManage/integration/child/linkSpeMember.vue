<template>
    <!--会员管理--会员积分--设置积分率折扣率-->
    <div class="integration-set-rate">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="'linkSpecialMemClassify'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="rate-content">
            <div class="filter-wrap">
                <Input v-model.trim="keyword"
                       :placeholder="$t('inputMemNameOPhone')"
                       :style="{ 'width' : lang === 'zh-CN' ? '240px' : '400px' }"
                       style="margin-right: 15px;" />
                <Button type="primary" @click="queryList">{{$t('query')}}</Button>
                <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="167"
                    :show-pagination="true"
                    :column-data="columnData"
                    :table-data="tableData"
                    :total-count="totalCount"
                    :page-no-d.sync="pageNo"
                    :page-size-d.sync="pageSize"
                    :border="true"
                    @query-data="queryList">
                    <el-table-column
                        slot="column5"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <ul class="operate-list">
                                <li @click="contactType(scope.row)">{{$t('linkSpecialMemClassify')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>


        <!--总体积分率折扣率设置modal-->
        <link-belong-modal ref="linkBelong"
                           :member-info="currentData"
                           @fresh-data="queryList">
        </link-belong-modal>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './linkSpeMemberConfig';
    import ajax from '@/api/index.js';
    import linkBelongModal from '../components/linkBelongModal.vue';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            linkBelongModal,
            breadCrumbHead
        },
        data () {
            return {
                //关键字
                keyword : '',
                // 表格数据
                tableData : [],
                //表头配置
                columnData : columnData,
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前操作的行数据
                currentData : {},
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'specialMember',
                        router : {
                            name : 'specialMember'
                        }
                    }
                ],
            };
        },
        methods : {
            /**
             * 重置查询条件
             */
            reset () {
                this.keyword = '';
                this.queryList();
            },
            /**
             * 关联类别模态框显示
             */
            contactType (data) {
                this.currentData = data;
                this.$refs.linkBelong.show();
            },
            /**
             * 获取所有会员信息
             */
            queryList () {
                ajax.post('queryMemberPage',{
                    keyWord : this.keyword,
                    pageSize : this.pageSize,
                    pageNo : this.pageNo,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .integration-set-rate {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box {
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }

        /deep/ .ivu-btn-primary{
            margin-right: 5px;
        }

        .rate-content{
            @include block_outline($height : unquote('calc(100% - 50px)'));
            padding: 10px 30px 0 30px;

            .filter-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{
                height: calc(100% - 100px);
            }
        }

    }

</style>
