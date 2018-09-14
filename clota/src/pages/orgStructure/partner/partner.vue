<template>
    <!-- 合作伙伴 -->
    <div class="partner">
        <div class="filter-box">
            <Button type="primary" style="float: left;margin-right: 10px" @click="newPartnerBtn('add')"
                    size="default"><span class="add-icon">+ {{$t('新增合作伙伴')}}</span>
            </Button>
            <el-dropdown trigger="click"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="ghost" style="float: left" size="default">{{$t('batchOperate')}}</Button><!--批量操作-->

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in batchOperate" :key="index"
                                      :command="item">{{$t(item.label)}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
                   icon="ios-search"
                   :placeholder="$t('请输入任意信息进行查询')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <div class="selection-table">

            <table-com
                :ofsetHeight="170"
                :show-pagination="true"
                :column-data="columnData"
                :table-data="tableData"
                :total-count="totalCount"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                :column-check="true"
                @query-data="queryList"
                @selection-change="changeSelection">

                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{new Date(scope.row.startDate).format('yyyy-MM-dd')}}
                    </template>
                </el-table-column>

                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{new Date(scope.row.endDate).format('yyyy-MM-dd')}}
                    </template>
                </el-table-column>

                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status=='valid'">
                            <span class="status-sign valid"></span>已启用
                        </span>
                        <span v-if="scope.row.status=='invalid'">
                            <span class="status-sign invalid"></span>未启用
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="operate-btn blue" @click="newPartnerBtn('modify', scope.row)">{{$t('modify')}}</span>
                        <span class="divide-line"></span>
                        <span :class="['operate-btn', scope.row.status=='valid' ? 'org' : 'blue']"
                              @click="enable(scope.row)">{{scope.row.status=='valid' ? $t('disabled') : $t('commissioned')}}
                        </span><!--启用/禁用-->
                        <span class="divide-line"></span>
                        <span class="operate-btn red" @click="showDelModal(scope.row)">{{$t('del')}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--新增/修改合作伙伴-->
        <add-partner ref="addPartnerModal" @on-add-success="queryList"></add-partner>
        <!--删除合作伙伴-->
        <delete-list ref="delListModal"
                     @deletions="handleDeletions"
                     :deleteName="deleteName"
                     :name="name"></delete-list>
    </div>
</template>


<script>
    // 表格筛选下拉模块
    import filterDrop from '../../../components/filterDrop/filterDrop.vue';
    //新增合作伙伴弹窗
    import addPartner from '../model/addPartner.vue';
    // 删除合作伙伴弹窗
    import deleteList from '../model/deleteList.vue';
    import ajax from '@/api/index';
    import {partnerListHead} from '../orgStructure';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable, batchOperate} from '@/assets/js/constVariable';
    import map from 'lodash/map';

    export default {
        components: {
            filterDrop,
            addPartner,
            deleteList,
            tableCom
        },
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                    nodeType: 'partner'
                },
                filterParam: {
                    keyword: '',
                },
                // 表格表头字段名
                columnData: partnerListHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,


                /*
                // 表格筛选下拉菜单
                listFilters: {
                    stateFilter: [{name: '全部', state: 'all'}, {name: '已签到', state: 'ok'}, {name: '未签到', state: 'leak'}],
                    alertFilter: [{name: '不限', alert: 'all'}, {name: '异常', alert: 'alert'}, {
                        name: '正常',
                        alert: 'normal'
                    }],
                },*/
                enableValue: true,  //启用，未启用变量
                name: '', //删除弹窗名字
                deleteName: '删除合作伙伴', //删除内容名字
                partnerIds: [], //合作伙伴ids
//                scopeRowData: {}, //当前被操作的行数据
                // 批量操作下拉选项
                batchOperate: batchOperate,
                // 已勾选的数据
                chosenPartners: [],
            }
        },
        methods: {
            // 初始化加载获取员工列表数据
            queryList() {

                ajax.post('queryPartnerList', this.queryParams).then(res => {
                    if (res.success) {
                        if (res.data && res.data.data) {
                            this.tableData = res.data.data;
                            this.totalCount = res.data.totalRow;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    }
                });
            },
            // 搜索员工
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },

            // 筛选下拉组件
            renderHeader(h, params) {
                return h(filterDrop, {
                    props: {
                        colParams: params.column,
                        filters: this.listFilters
                    },
                    on: {
                        'state-filter': this.handleAlertFilter,
                        'alert-filter': this.handleAlertFilter,
                    }
                });
            },
            // 筛选点击事件
            handleAlertFilter() {

            },
            //启用或者禁用
            enable(scopeRow, isBatch) {
                let partnerObj = {};
                if (scopeRow.status=='valid') {
                    partnerObj.successTip = '您已禁用合作伙伴';
                    partnerObj.failTip = '禁用失败';
                    partnerObj.status = 'invalid';
                } else if (scopeRow.status=='invalid') {
                    partnerObj.successTip = '您已启用合作伙伴';
                    partnerObj.failTip = '启用失败';
                    partnerObj.status = 'valid';
                }

                ajax.post('updatePartnerStatus', {
                    ids: isBatch==true ? this.partnerIds.join(',') : scopeRow.id,
                    status: partnerObj.status
                }).then(res => {
                    if (res.success) {
                        if (isBatch==true) {
                            // 批量操作提示语
                            this.$Message.success(partnerObj.successTip + '：' + this.$t('batchOperate'));
                        } else {
                            // 单个操作提示语
                            this.$Message.success(partnerObj.successTip + '：' + scopeRow.channelName);
                        }

                        this.queryList();
                    } else {
                        this.$Message.error(res.message ? res.message : partnerObj.failTip);
                    }
                });
            },
            /**
             * 新增/修改合作伙伴
             * @param type - 新增/修改 类型
             * @param scopeRow - 修改时的行数据
             **/
            newPartnerBtn(type, scopeRow) {
                let obj = type=='add' ? null : {item: scopeRow, type: type};
                this.$refs.addPartnerModal.show(obj);
            },
            /**
             * 删除某一个或多个合作伙伴
             * @param data - 被删除的行数据
             * @param isBatch - 是否批量操作  Boolean
             */
            showDelModal(data, isBatch) {
                if (isBatch==true) {
                    this.name = `${data[0].channelName}、${data[1].channelName}<span style="color: #333;">等${data.length}个合作伙伴</span>`;
                } else {
                    this.partnerIds = [data.id];
                    this.name = data.channelName;
                }

                this.$refs.delListModal.show();
            },
            //确认删除
            handleDeletions() {

                ajax.post('deletePartners', {
                    ids: this.partnerIds.join(',')
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', {tip: this.$t('del')}));
                        this.handleSearch();
                    }
                });
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.chosenPartners = selection;
                if (selection.length>0){
                    this.partnerIds = map(selection, 'id');
                }
            },
            handleCommand(dropItem) {
                if (this.chosenPartners.length<=0) {
                    this.$Message.warning('请勾选批量操作项');
                    return;
                }
                switch (dropItem.status) {
                    case 'valid' :
                    case 'invalid' :
                        this.enable(dropItem, true);
                        break;
                    case 'del' :
                        this.showDelModal(this.chosenPartners, true);
                        break;
                }
            },
        },
        computed: {},
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    .partner {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px 4px 0 0;

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                width: 350px;
                float: right;
            }

            /deep/ .ivu-btn-ghost {
                border-color: $color_blue;
                color: $color_blue;
            }
        }

        .divide-line {
            display: inline-block;
            width: 1px;
            height: 14px;
            margin: 0 5px;
            margin-bottom: -2px;
            background: #E1E1E1;
        }

        .operate-btn {
            cursor: pointer;
        }

        .blue {
            color: $color_blue;
        }
        .org {
            color: $color_yellow;
        }
        .red {
            color: $color_red;
        }

        .status-sign {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .valid:after {
            background: $color_green;
        }
        .invalid:after {
            background: $color_BBC5D5;
        }
    }

    .el-dropdown-menu {
        width: 88px;
    }
</style>
