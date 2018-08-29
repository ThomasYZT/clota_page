<template>
    <!-- 销售渠道分组 -->
    <div class="saleChannelsGroup">
        <div class="orgHeader">
            <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addGroup"
                    size="default"><span class="add-icon">+</span>新增分组
            </Button>
            <Button type="ghost" style="float: left" size="default">批量操作</Button>
            <div class="search">
                <edit-dropdown :dataList="dataList" @deleteList="deleteList" @saveList="saveList"></edit-dropdown>
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
                    label="渠道编码">
                    <template slot-scope="scope">
                        <div class="cellText"><span class="code">309287482</span></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="渠道名称">
                    <template slot-scope="scope">
                        <div>星火旅行社1</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="销售渠道类型">
                    <template slot-scope="scope">
                        <div>A级销售渠道</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="move" @click="moveInGroupBtn">移动到</span>
                            <span class="span-blue" @click="moveOutGroupBtn">移出分组</span>
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
        <!-- 移动分组弹窗 -->
        <move-out-group ref="moveOutGroupModal" @upDataList='init' :moveName="moveName"></move-out-group>
        <!-- 删除分组弹窗 -->
        <delete-group ref="deleteGroupModal" @upDataList='init' :pattnerName="pattnerName"></delete-group>
        <!-- 新增分组 -->
        <kw-popover ref="addPopover" :el="popoverEl" placement="bottom" align="left" :offset="offset">
            <div class="add-group-popover">
                <div class="popover-content">
                    <p>新增分组名称</p>
                    <Input :placeholder="$t('inputField', {field: ''})"/>
                </div>
                <div class="popover-footer">
                    <Button type="primary" size="small">保存</Button>
                    <Button type="ghost" size="small">取消</Button>
                </div>
            </div>
        </kw-popover>
        <!-- 移动分组 -->
        <kw-popover ref="movePopover" :el="popoverEl" placement="left" align="top">
            <div class="add-group-popover">
                <div class="popover-content">
                    <p>将所选销售渠道移至分组</p>
                    <Select>
                        <Option value="132">123</Option>
                    </Select>
                </div>
                <div class="popover-footer">
                    <Button type="primary" size="small">保存</Button>
                    <Button type="ghost" size="small">取消</Button>
                </div>
            </div>
        </kw-popover>
    </div>
</template>


<script>
    // 下拉编辑组件
    import editDropdown from '../../../components/editDropdown/editDropdown.vue';
    // 移动分组弹窗
    import moveOutGroup from '../model/moveOutGroup.vue';
    // 删除分组弹窗
    import deleteGroup from '../model/deleteGroup.vue';
    // 移动分组下拉
    import kwPopover from '../../../components/popover/popover.vue';

    export default {
        components: {
            editDropdown,
            moveOutGroup,
            deleteGroup,
            kwPopover
        },
        data() {
            return {
                //表单数据
                tableData: [{
                    date: '2016-05-03',
                }],
                //下拉列表数据
                dataList: [{
                    name: 'A级销售渠道',
                    id: 1,
                }, {
                    name: 'B级销售渠道',
                    id: 2,
                }, {
                    name: 'C级销售渠道',
                    id: 3,
                }],
                moveName: '销售渠道', //移出名称
                pattnerName: 'A级销售渠道', //删除分组名称
                popoverEl: '', //移动分组下拉变量
                // 下拉组件位置定义
                offset: {
                    top: 8,
                }
            }
        },
        methods: {
            // 新增分组
            addGroup(event) {
                this.popoverEl = event.currentTarget;
                this.$refs.addPopover.show();
            },
            // 移动列表
            moveInGroupBtn(event) {
                this.popoverEl = event.currentTarget;
                this.$refs.movePopover.show();
            },
            // 移出分组
            moveOutGroupBtn() {
                this.$refs.moveOutGroupModal.show();
            },
            // 删除列表
            deleteList() {
                this.$refs.deleteGroupModal.show();
            },
            // 保存列表
            saveList(value) {
                console.log(value)
            },
            //初始化
            init() {

            },
        },
        computed: {},
        created() {
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    .add-group-popover {
        padding: 17px 20px;

        .popover-content {
            width: 240px;
            p {
                font-size: $font_size_12px;
                color: #666666;
                line-height: 16px;
                margin-bottom: 10px;
            }
        }
        .popover-footer {
            margin-top: 30px;
            text-align: right;
            button:first-child {
                margin-right: 10px;
            }
        }
    }

    .saleChannelsGroup {
        @include block_outline();
        background: $color_fff;
    }
</style>
