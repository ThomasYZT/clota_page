<template>
    <!--  自营渠道页面 -->
    <div class="partner">
        <div class="orgHeader">
            <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" size="default"
                    @click="addSelfSupportBtn"><span class="add-icon">+</span>新增自营渠道
            </Button>
            <Button style="float: left" type="ghost" size="default">批量操作</Button>
            <div class="search">
                <Input suffix="ios-search" placeholder="请输入任意信息进行查询"/>
            </div>
        </div>
        <div class="selectionTable">
            <el-table
                :data="tableData"
                :border="true"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="自营渠道编码">
                    <template slot-scope="scope">
                        <div class="cellText"><span class="code">309287482</span></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="自营渠道名称">
                    <template slot-scope="scope">
                        <div>星火旅行社1</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="销售渠道分组">
                    <template slot-scope="scope">
                        <div>A级销售渠道</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="自营渠道类型">
                    <template slot-scope="scope">
                        <div>2018-10-09</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="URL/IP">
                    <template slot-scope="scope">
                        <div>2018-10-09</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="状态"
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
                        <div>{{$t('remark')}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span>{{$t('modify')}}</span>
                            <span class="span-yellow">禁用</span>
                            <span class="span-gray" @click="deleteSelfSupportBtn">{{$t('del')}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </div>
        <add-self-support ref="addSelfSupport" @upDataList='init'></add-self-support>
        <delete-list ref="delListModal"
                     @deletions="deletions"
                     :deleteName="deleteName"
                     :name="name"></delete-list>
    </div>
</template>


<script>
    // 表格筛选下拉模块
    import filterDrop from '../../../components/filterDrop/filterDrop.vue';
    // 新增自营渠道弹窗
    import addSelfSupport from '../model/addSelfSupport.vue';
    // 删除自营渠道弹窗
    import deleteList from '../model/deleteList.vue';

    export default {
        components: {
            filterDrop,
            addSelfSupport,
            deleteList,
        },
        data() {
            return {
                // 表格数据
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
                },
                enableValue: true,  //启用，未启用变量
                name: '售票处终端001', //删除弹窗名字
                deleteName: '删除渠道', //删除内容名字
            }
        },
        methods: {
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
            enable() {
                this.enableValue = !this.enableValue;
                if (this.enableValue) {
                    this.$Message.success('您已启用合作伙伴：星火旅社1');
                } else {
                    this.$Message.warning('您已禁用合作伙伴：星火旅社1');
                }
            },
            // 新增自营渠道事件
            addSelfSupportBtn() {
                this.$refs.addSelfSupport.show();
            },
            // 删除列表弹窗
            deleteSelfSupportBtn() {
                this.$refs.delListModal.show();
            },
            //确认删除
            deletions() {
            },
            // 初始化加载数据
            init() {

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
</style>
