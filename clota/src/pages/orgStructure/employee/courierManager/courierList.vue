<!--
    导游管理
    作者：杨泽涛
-->
<template>
    <div class="container">
        <div class="tool-box">
            <Button type="primary"
                    icon="android-add"
                    style="float: left;margin-right: 10px"
                    @click="getNewPartner('add')"
                    size="default">{{$t('addNewCourier')}}
            </Button>
            <Input class="input-field"
                   v-model.trim="queryParams.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputField', { field : $t('tourGuideName') + '/' + $t('IDNumber') })"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>

        <div class="table-wrapper">
            <tableCom
                :ofsetHeight="120"
                :show-pagination="true"
                :column-data="courierInfoHead"
                :table-data="tableData"
                :total-count="totalCount"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                @query-data="queryList">
                <el-table-column
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="180"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li class="blue-label" @click="getNewPartner('edit',scoped.row)">{{$t('modify')}}</li>
                            <li class="red-label" @click="delMember(scoped.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </tableCom>
        </div>

        <editModal ref="functionnalModal" @refresh="queryList()"> </editModal>

        <delModal ref="delModal">
            <div class="remove-group">
                <span class="red-bale">
                <Icon type="help-circled"></Icon>{{$t('isDoing')}}{{$t('courier')}}：
                <span style="color : #f8a334;">{{currentData.staffName}}</span> <br/>
                <span style="color:#EB6751;">{{$t('operationIrrevocable')}}</span>{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '../../../../components/delModal/index';
    import editModal from './components/editCourierModal';
    import { configVariable } from '@/assets/js/constVariable.js';
    import { courierInfoHead } from './courierListHead.js';
    export default {
        components : {
            tableCom,
            editModal,
            delModal
        },
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    keyword : '',
                    staffType : 'guide',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                courierInfoHead : courierInfoHead,
                tableData : [],
                totalCount : 0,
                currentData : {}
            };
        },
        methods : {
            //新增/修改导游
            getNewPartner (type, scopeRow) {
                this.$refs.functionnalModal.show({
                    type : type,
                    scopeRow : scopeRow
                });
            },
            // 搜索导游
            handleSearch () {
                this.queryParams.pageNo = 1;
                this.queryList();
            },
            /**
             * 获取列表信息
             */
            queryList () {
                ajax.post('queryPagedOrgStaff',this.queryParams).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 删除导游模态框
             */
            delMember (scopeRow) {
                this.currentData = scopeRow;
                this.$refs.delModal.show({
                    title : this.$t('delete') + this.$t('courier'),
                    confirmCallback : () => {
                        this.delete(scopeRow);
                    }
                });
            },
            /**
             * 删除导游
             */
            delete (data) {
                ajax.post('batchDeleteOrgStaff', JSON.stringify([data]),
                    {
                        headers : { 'Content-Type' : 'application/json;charset-UTF-8' }
                    }
                ).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('delete') }));
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('delete') }));
                    }
                });
            }

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .container {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px;

        .tool-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                width: 350px;
                float: right;
            }
        }

        @at-root .remove-group{
            @include block_outline();
            @include center_center();
            padding: 5px 50px 0 70px;
            color: $color_333;
            font-size: $font_size_14px;

            .red-bale{
                position: relative;
                display: inline-block;
                width: 100%;

                .ivu-icon{
                    @include absolute_pos(absolute,$left : -19px,$top : 2px);
                    font-size: 15px;
                    color: #EB6751;
                }
            }

        }
    }
</style>
