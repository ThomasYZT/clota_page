<template>
    <!-- 合作伙伴 -->
    <div class="partner">
        <div class="filter-box">
            <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="newPartnerBtn('add')"
                    size="default"><span class="add-icon">+ {{$t('新增合作伙伴')}}</span>
            </Button>
            <Button type="ghost" style="float: left" size="default">批量操作</Button>
            <!--<div class="search">
                <Input suffix="ios-search" placeholder="请输入任意信息进行查询"/>
            </div>-->
            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
                   icon="ios-search"
                   :placeholder="$t('请输入任意信息进行查询')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <div class="selection-table">
            <!--<el-table
                :data="tableData"
                :border="true"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="合作伙伴编码">
                    <template slot-scope="scope">
                        <div class="cellText"><span class="code">309287482</span></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="合作伙伴名称">
                    <template slot-scope="scope">
                        <div>星火旅行社1</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="合作伙伴名称">
                    <template slot-scope="scope">
                        <div>A级销售渠道</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="合作协议起始日期">
                    <template slot-scope="scope">
                        <div>2018-10-09</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="合作协议结束日期">
                    <template slot-scope="scope">
                        <div>2018-10-09</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="协议状态"
                    :render-header="renderHeader">
                    <template slot-scope="scope">
                        <div class="cellText">
                <span @click="enable">
                  <span :class="enableValue?'icon_enable':'icon_notEnable'"></span><span>已启用</span>
                </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    :label="$t('remark')">
                    <template slot-scope="scope">
                        <div>这是动物园门票，这是动物园门票，</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span>{{$t('modify')}}</span>
                            <span class="span-yellow">禁用</span>
                            <span class="span-gray" @click="deletePartnerBtn">{{$t('del')}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>-->

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
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="operate-btn" @click="newPartnerBtn('modify', scope.row)">{{$t('modify')}}</span>
                        <span class="divide-line"></span>
                        <span class="operate-btn" @click="enable(scope.row)">{{scope.row.status=='valid' ? $t('disabled') : $t('commissioned')}}</span><!--禁用-->
                        <span class="divide-line"></span>
                        <span class="operate-btn" @click="showDelModal(scope.row)">{{$t('del')}}</span>
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
    import {configVariable} from '@/assets/js/constVariable';

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


                /*// 表格数据
                tableData: [{
                    date: '2016-05-03',
                }],
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
            enable(scopeRow) {
                this.partnerIds = [scopeRow.id];

                let partnerObj = {};
                if (scopeRow.status=='valid') {
                    partnerObj.successTip = '您已启用合作伙伴';
//                    partnerObj.failTip = '新增合作伙伴失败';
                } else if (scopeRow.status=='invalid') {
                    partnerObj.successTip = '您已禁用合作伙伴';
//                    partnerObj.failTip = '修改合作伙伴失败';
                }

                ajax.post('updateChannelStatus', {
                    ids: this.partnerIds.join(','),
                    status: scopeRow.status=='valid' ? 'invalid' : 'valid'
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(partnerObj.successTip + '：' + scopeRow.channelName);
                        this.queryList();
                    }
                });
            },
            //新增/修改合作伙伴
            newPartnerBtn(type, scopeRow) {
                let obj = type=='add' ? null : {item: scopeRow, type: type};
                this.$refs.addPartnerModal.show(obj);
            },
            //删除合作伙伴
            showDelModal(scopeRow) {
//                this.scopeRowData = scopeRow;
                this.partnerIds = [scopeRow.id];
                this.name = scopeRow.channelName;
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
                this.partnerIds = selection;
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

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                width: 350px;
                float: right;
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
    }
</style>
