<template>
    <!-- 角色权限 -->
    <div class="partner">
        <div class="orgHeader">
            <Button type="primary" @click="addRole">新增角色</Button>
            <Input v-model.trim="keyWrod"
                   style="width: 353px;"
                   placeholder="请输入任意信息进行查询"
                   icon="ios-search"
                   @on-click="queryList"
                   @on-enter="queryList"/>
        </div>
        <div class="content">
            <table-com
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="120"
                @query-data="queryList">
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li @click="toDetail(scoped.row)">详情</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>


<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {roleHead} from './rolePermissionConfig';
    import ajax from '@/api/index.js';
    export default {
        components: {
            tableCom
        },
        data() {
            return {
                // 表单数据
                tableData: [],
                //查询关键字
                keyWrod : '',
                //表头配置
                columns : roleHead,
                pageNo : 1,
                pageSize : 10,
                //总条数
                totalCount : 0
            }
        },
        methods: {
            /**
             * 获取权限信息
             */
            queryList () {
                ajax.post('queryRoles',{
                    keyword : this.keyWrod,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 跳转到角色详情
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'addRole',
                    params : {
                        id : data.id,
                        type : 'edit'
                    }
                });
            },
            /**
             * 新增角色权限
             */
            addRole () {
                this.$router.push({
                    name : 'addRole',
                    params : {
                        type : 'add'
                    }
                });
            }
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';

    .partner {
        @include block_outline();
        background: $color_fff;

        .orgHeader{
            @include block_outline($height : 60px);
            padding: 14px 20px 0 20px;

            /deep/ .ivu-input-type{
                float: right;
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
