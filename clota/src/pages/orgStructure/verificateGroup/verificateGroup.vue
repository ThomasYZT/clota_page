<template>
    <div class="verificateGroup">
        <div class="orgHeader">
            <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addGroup"
                    size="default"><span class="add-icon">+</span>新增分组
            </Button>
            <Button style="float: left" type="ghost" size="default" @click="modifyVerificateBtn">批量操作</Button>
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
                    label="编码">
                    <template slot-scope="scope">
                        <div class="cellText"><span class="code">309287482</span></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="核销款台名称">
                    <template slot-scope="scope">
                        <div>星火旅行社1</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="款台类型">
                    <template slot-scope="scope">
                        <div>A级销售渠道</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="服务器名称">
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
                            <span class="span-blue" @click="moveGroup">移出分组</span>
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
        <!-- 编辑核销 -->
        <modify-verificate ref="modifyVerificateModal" @upDataList='init'></modify-verificate>
        <!-- 移出分组 -->
        <move-out-group ref="moveOutGroupModal" @upDataList='init' :moveName="moveName"></move-out-group>
        <!-- 新增分组 -->
        <kw-popover ref="addPopover" :el="popoverEl" placement="bottom" align="left" :offset="offset">
            <div class="add-group-popover">
                <div class="popover-content">
                    <p>新增分组名称</p>
                    <Input :placeholder="$t('inputField', {field: ''})"/>
                </div>
                <div class="popover-footer">
                    <Button type="primary" size="small">{{$t("save")}}</Button>
                    <Button type="ghost" size="small">{{$t("cancel")}}</Button>
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
                    <Button type="primary" size="small">{{$t("save")}}</Button>
                    <Button type="ghost" size="small">{{$t("cancel")}}</Button>
                </div>
            </div>
        </kw-popover>
    </div>
</template>


<script>
    import editDropdown from '../../../components/editDropdown/editDropdown.vue';
    // 编辑核销弹窗
    import modifyVerificate from '../model/modifyVerificate.vue';
    // 移出分组弹窗
    import moveOutGroup from '../model/moveOutGroup.vue';
    // 移动分组下拉
    import kwPopover from '../../../components/popover/popover.vue';

    export default {
        components: {
            editDropdown,
            modifyVerificate,
            moveOutGroup,
            kwPopover
        },
        data() {
            return {
                // 表单数据
                tableData: [{
                    date: '2016-05-03',
                }],
                // 下拉列表数据
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
                moveName: '核销设备', // 移出弹窗名字
                popoverEl: '', //移动分组变量
                // 移动分组位置变量
                offset: {
                    top: 8,
                }
            }
        },
        methods: {
            // 编辑核销
            modifyVerificateBtn() {
                this.$refs.modifyVerificateModal.show();
            },
            // 新增分组
            addGroup(event) {
                this.popoverEl = event.currentTarget;
                this.$refs.addPopover.show();
            },
            // 移动分组
            moveInGroupBtn(event) {
                this.popoverEl = event.currentTarget;
                this.$refs.movePopover.show();
            },
            //  移出分组
            moveGroup() {
                this.$refs.moveOutGroupModal.show();
            },
            // 删除分组
            deleteList() {
                this.$refs.deleteGroupModal.show();
            },
            // 保存分组
            saveList(value) {
                console.log(value)
            },
            // 初始化
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

    .verificateGroup {
        @include block_outline();
        background: $color_fff;
    }
</style>
