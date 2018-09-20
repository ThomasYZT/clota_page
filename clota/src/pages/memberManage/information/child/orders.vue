<template>
    <!--  我的订单 -->
    <div class="channel">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('我的订单')">
        </bread-crumb-head>

        <div class="filter-box">
            <Input v-model.trim="filterParam.keyWord"
                   class="input-field"
                   :placeholder="$t('请输入产品名称、交易号')"
                   :style="{width : lang === 'zh-CN' ? '240px' : '400px'}"/>
            <Button type="primary" :disabled="!filterParam.keyWord" @click="handleSearch">{{$t("query")}}</Button>
            <Button type="ghost" :disabled="!filterParam.keyWord" @click="reset">{{$t("reset")}}</Button>
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
                @query-data="queryList">
                <!--<el-table-column
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
                </el-table-column>-->
                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    fixed="right"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">

                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>


<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import {orderListHead} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable, batchOperate} from '@/assets/js/constVariable';
    import map from 'lodash/map';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            breadCrumbHead,
            tableCom
        },
        data() {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'memberInfo',   // 会员信息
                        router: {name: 'memberInfo'},
                    },
                    {
                        name: 'memberDetail',   // 会员详情
                        router: {name: 'infoDetail'},
                    },
                ],

                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    keyword: '',
                },
                // 表格表头字段名
                columnData: orderListHead,
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

                /*ajax.post('querySelfOwnedChannel', this.queryParams).then(res => {
                    if (res.success) {
                        if (res.data && res.data.data) {
                            this.tableData = res.data.data;
                            this.totalCount = res.data.totalRow;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    }
                });*/
            },

            // 搜索员工
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },

            //重置查询数据
            reset () {
                this.filterParam.keyWord = "";
                this.queryList();
            },

            // 筛选下拉组件
            /*renderHeader(h, params) {
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
            },*/
            // 筛选点击事件
            handleAlertFilter() {

            },
            /**
             * 删除某一个或多个自营渠道
             * @param data - 被删除的行数据
             * @param isBatch - 是否批量操作  Boolean
             */
            showDelModal(data, isBatch) {
                if (isBatch==true) {
                    let channelNames = data.length>1 ? `${data[0].channelName}、${data[1].channelName}` : `${data[0].channelName}`;

                    this.name = `<span class="operate-name" v-w-title="channelNames">${channelNames}</span>
                                 <span style="color: #333;">等${data.length}个渠道</span>`;
                    this.$refs.delListModal.show();
                } else {
                    this.rowIds = [data.id];
                    this.name = data.channelName;
                    if (data.type=='online') {
                        this.$refs.delListModal.show();
                    }
                }

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
        computed: {
            ...mapGetters({
                lang : 'lang'
            })
        },
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .channel {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px 4px 0 0;

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                float: left;
                margin-right: 20px;
            }

            /deep/ .ivu-btn-ghost {
                margin-left: 5px;
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
</style>
