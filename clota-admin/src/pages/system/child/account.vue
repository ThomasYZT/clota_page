<!--账号管理-->

<template>
    <div class="account">
        <div class="create-account">
            <Button type="primary">
                <span @click="addAccount">+ {{$t('addAccount')}}</span>
            </Button>
        </div>
        <table-com
            :ofsetHeight="118"
            :show-pagination="true"
            :column-data="accountHead"
            :table-data="tableData"
            :total-count="total"
            :page-no-d.sync="accListParams.page"
            :page-size-d.sync="accListParams.pageSize"
            :border="false"
            @query-data="queryList">
            <el-table-column
                slot="columnloginName"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
            </el-table-column>
            <el-table-column
                slot="columnroleName"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                :filters="roleList"
                :filter-method="filterRole"
                filter-placement="bottom-end"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.roleName | contentFilter }}</span>
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
                :min-width="row.minWidth"
                show-overflow-tooltip
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="normal" @click="editAccount(scoped.row)">{{$t('edit')}}</li>
                        <template v-if="scoped.row.state === 'true'">
                            <li class="yellow-label" @click="stopAccount(scoped.row)">{{$t('stopUsing')}}</li>
                        </template>
                        <template v-else>
                            <li class="normal"  @click="openAccount(scoped.row)">{{$t('startUsing')}}</li>
                        </template>
                        <li class="red-label" @click="delAccount(scoped.row)">{{$t('delete')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--删除账号模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete') + $t('accountName')}}<span class="yellow-label">{{operateData.loginName}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import { accountHead } from './accountConfig';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            delModal
        },
        data () {
            return {
                //表头配置
                accountHead : accountHead,
                // 账户列表的请求参数
                accListParams : {
                    page : 1,
                    pageSize : 10
                },
                // 列表数据
                tableData : [],
                // 列表数据总数
                total : 0,
                //角色筛选列表
                roleList : [],
                //当前操作数据(修改/停用/启用/删除)
                operateData : {},
            };
        },
        created () {
            //查询角色列表
            this.queryRoleList();
        },
        methods : {

            /**
             * 查询角色列表
             */
            queryRoleList () {
                ajax.post('roleList', {}).then(res => {
                    if (res.status === 200) {
                        this.roleList = res.data || [];
                    } else {
                        this.roleList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 查询账户信息列表
             */
            queryList () {
                ajax.post('userList', this.accListParams).then(res => {
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
            //角色筛选
            filterRole (value, row) {
                return row.roleName === value;
            },
            /**
             * 新建账号
             */
            addAccount () {
                this.$router.push({
                    name : 'addAccount',
                    params : {
                        type : 'add',
                    }
                });
            },
            /**
             * 停用账号
             * @param data
             */
            stopAccount (data) {
                if (data) {
                    this.switchUser(data, 'false');
                }
            },
            /**
             * 启用账号
             * @param data
             */
            openAccount (data) {
                if (data) {
                    this.switchUser(data, 'true');
                }
            },
            /**
             * 启/停用账户信息
             * @param data
             * @param flag true为启用 false为停用
             */
            switchUser ( data, flag) {
                ajax.post('switchAccount', {
                    id : data.id,
                    flag : flag
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success( this.$t('success') + flag === 'true' ?
                            this.$t('startUsing') :
                            this.$t('stopUsing') + this.$t('accountName') + '：' + data.loginName);
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 删除账号
             * @param data
             */
            delAccount (data) {
                this.operateData = data;
                this.$refs.delModal.show({
                    title : this.$t('delete') + this.$t('accountName'),
                    confirmCallback : () => {
                         this.deleteUser(data);
                    }
                });
            },
            /**
             * 删除账号
             * @param data
             */
            deleteUser ( data ) {
                ajax.post('deleteUser',{
                    id : data.id
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('success') + this.$t('delete') + this.$t('accountName') + '：' + data.loginName);
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 编辑账号
             * @param data
             */
            editAccount (data) {
                  this.$router.push({
                    name : 'addAccount',
                    params : {
                        type : 'edit',
                        info : data
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .account{
        @include block_outline();
        padding: 0 30px;

        .create-account{
            @include block_outline($height: 62px);
            padding: 15px 0;
        }

        .operate-info {
            @include table_operate();
        }

        .content-text{
            padding: 0 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }

    }

    .yellow-label{
        color: $color_yellow;
    }

    .red-label {
        color: $color_err;
    }

</style>
