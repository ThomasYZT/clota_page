<template>
    <!--  自营渠道页面 -->
    <div class="channel">
        <div class="filter-box">
            <Button type="primary" style="float: left;margin-right: 10px" size="default"
                    @click="newSelfSupportBtn('add')"><span class="add-icon">+ {{$t('新增自营渠道')}}</span>
            </Button>
            <!--<Button style="float: left" type="ghost" size="default">批量操作</Button>
            <div class="search">
                <Input suffix="ios-search" placeholder="请输入任意信息进行查询"/>
            </div>-->
            <el-dropdown trigger="click"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="ghost" style="float: left" size="default">{{$t('batchOperate')}}</Button><!--批量操作-->

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in batchOperate"
                                      :key="index"
                                      :disabled="chosenRowData.length <= 0"
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
        <div class="selectionTable">

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
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.saleGroupName ? scope.row.saleGroupName : '未分组'}}
                    </template>
                </el-table-column>

                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.type=='online' ? '线上' : '线下'}}
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
                    fixed="right"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <!--修改-->
                        <span class="operate-btn blue"
                              @click="newSelfSupportBtn('modify', scope.row)">{{$t('modify')}}
                        </span>
                        <span class="divide-line"></span>
                        <!--启用/禁用-->
                        <span :class="['operate-btn', scope.row.status=='valid' ? 'org' : 'blue']"
                              @click="enable(scope.row)">{{scope.row.status=='valid' ? $t('disabled') : $t('commissioned')}}
                        </span>
                        <span class="divide-line"></span>
                        <!--删除-->
                        <span :class="['operate-btn', 'red']"
                              v-if="scope.row.type=='online'"
                              @click="showDelModal(scope.row)">{{$t('del')}}
                        </span>
                        <Tooltip placement="top-end" :transfer="true" v-if="scope.row.type=='offline'">
                            <span :class="['operate-btn', 'gray']">{{$t('del')}}</span>
                            <div slot="content">
                                <div class="tip-trade">{{$t('线下渠道主要是售票闸机等，只能在组织架构内增加/删除，不允许在此页面增加或删除。')}}</div>
                            </div>
                        </Tooltip>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <add-self-support ref="addSelfSupport" @on-add-success="queryList"></add-self-support>
        <!--<delete-list ref="delListModal"
                     @deletions="handleDeletions"
                     :deleteName="deleteName"
                     :name="name"></delete-list>-->
        <del-modal ref="delListModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('isDoing')}}{{$t('delete')}}：
                <span class="yellow-label" v-w-title="name">{{name}}</span>
                <span style="color: #333;" v-if="rowIds.length>1">等{{rowIds.length}}个渠道</span>
            </span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('sureToDel')}}</span><!--本操作不可撤销，是否确认删除？-->
        </del-modal>
    </div>
</template>


<script>
    // 表格筛选下拉模块
    import filterDrop from '../../../components/filterDrop/filterDrop.vue';
    // 新增自营渠道弹窗
    import addSelfSupport from '../model/addSelfSupport.vue';
    // 删除自营渠道弹窗
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index';
    import {saleChannelHead} from '../orgStructure';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable, batchOperate} from '@/assets/js/constVariable';
    import map from 'lodash/map';

    export default {
        components: {
            filterDrop,
            addSelfSupport,
            delModal,
            tableCom
        },
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    keyword: '',
                },
                // 表格表头字段名
                columnData: saleChannelHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,

                // 表格筛选下拉菜单
                /*listFilters: {
                    stateFilter: [{name: '全部', state: 'all'}, {name: '已签到', state: 'ok'}, {name: '未签到', state: 'leak'}],
                    alertFilter: [{name: '不限', alert: 'all'}, {name: '异常', alert: 'alert'}, {
                        name: '正常',
                        alert: 'normal'
                    }],
                },*/
                enableValue: true,  //启用，未启用变量
                name: '', //删除弹窗名字
                deleteName: '删除渠道', //删除内容名字
                rowIds: [], //自营渠道ids
                // 批量操作下拉选项
                batchOperate: batchOperate,
                // 已勾选的数据
                chosenRowData: [],
            }
        },
        methods: {
            // 初始化加载获取员工列表数据
            queryList() {

                ajax.post('querySelfOwnedChannel', this.queryParams).then(res => {
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
            // 点击启用，未启用事件
            enable(scopeRow, isBatch) {
                let partnerObj = {};
                if (scopeRow.status=='valid') {
                    partnerObj.successTip = '您已禁用自营渠道';
                    partnerObj.failTip = '禁用失败';
                    partnerObj.status = 'invalid';
                } else if (scopeRow.status=='invalid') {
                    partnerObj.successTip = '您已启用自营渠道';
                    partnerObj.failTip = '启用失败';
                    partnerObj.status = 'valid';
                }

                ajax.post('updateChannelStatus', {
                    ids: isBatch==true ? this.rowIds.join(',') : scopeRow.id,
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
             * 新增/修改合自营渠道
             * @param type - 新增/修改 类型
             * @param scopeRow - 修改时的行数据
             **/
            newSelfSupportBtn(type, scopeRow) {
                let obj = type=='add' ? {type: type} : {item: scopeRow, type: type};
                this.$refs.addSelfSupport.show(obj);
            },
            /**
             * 删除某一个或多个自营渠道
             * @param data - 被删除的行数据
             * @param isBatch - 是否批量操作  Boolean
             */
            showDelModal(data, isBatch) {
                if (isBatch==true) {
                    this.rowIds = data.map(item => item.id);
                    this.name = data.length>1 ? `${data[0].channelName}、${data[1].channelName}` : `${data[0].channelName}`;
                } else {
                    this.rowIds = [data.id];
                    this.name = data.channelName;
                }

                this.$refs.delListModal.show({
                    title : this.$t(this.deleteName),
                    confirmCallback : () => {
                        this.handleDeletions();
                    }
                });

            },
            //确认删除
            handleDeletions() {

                ajax.post('deleteChannels', {
                    ids: this.rowIds.join(',')
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
                this.chosenRowData = selection;
                if (selection.length>0){
                    this.rowIds = map(selection, 'id');
                }
            },
            /**
             * 选择批量操作
             * @param dropItem - 选择的操作方式  String
             */
            handleCommand(dropItem) {
                if (this.chosenRowData.length<=0) {
                    this.$Message.warning('请勾选批量操作项');
                    return;
                }
                switch (dropItem.status) {
                    case 'valid' :
                    case 'invalid' :
                        this.enable(dropItem, true);
                        break;
                    case 'del' :
                        let onlineData = this.chosenRowData.filter((item, i) => {
                            // 过滤出线上的自营渠道类型，因线下类型不可删除
                            return item.type == 'online';
                        });
                        if (onlineData && onlineData.length>0) {
                            this.showDelModal(onlineData, true);
                        } else {
                            this.$Message.warning('线下渠道主要是售票闸机等，只能在组织架构内增加/删除，不允许在此页面增加或删除。')
                        }
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

    .channel {
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
        .gray {
            color: $color_gray;
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

    .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -27px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }

    .red-label {
        color: $color_red;
    }
</style>
