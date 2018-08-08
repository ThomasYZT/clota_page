<template>
    <!-- 角色权限详情（风景） -->
    <div class="partner">
        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/orgManage/rolePermission">角色权限</BreadcrumbItem>
                <BreadcrumbItem>详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="org-header">
            <ul class="clearfix">
                <li>
                    <span>公司/景区名称：</span>
                    <span>长隆欢乐世界</span>
                </li>
                <li>
                    <span>业态类型：</span>
                    <span>票务</span>
                </li>
                <li>
                    <span>角色权限：</span>
                    <span>产品管理员</span>
                </li>
            </ul>
            <div class="clearfix">
                <Button type="primary" style="float: left;margin-right: 10px" size="default" @click="addEmployee">增加员工
                </Button>
                <Button class="ivu-btn-error" style="float: left" size="default">批量删除</Button>
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
                    label="员工姓名">
                    <template slot-scope="scope">
                        <div class="cellText">张小床</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="员工账号">
                    <template slot-scope="scope">
                        <div>zhangxiaoc</div>
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
                    label="部门">
                    <template slot-scope="scope">
                        <div>采购部</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="管理景区">
                    <template slot-scope="scope">
                        <div>长隆欢乐世界</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span v-if="detailType == 'company'" @click="modify">修改</span>
                            <span class="span-red" @click="deleteListBtn">删除</span>
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
        <add-scenery-employee ref="addScEmModal" @upDataList='init'></add-scenery-employee>
        <add-company-employee ref="addCoEmModal" @upDataList='init'></add-company-employee>
    </div>
</template>


<script>
    import ajax from '@/api/ajaxList'
    //新增员工（风景角色）
    import addSceneryEmployee from '../../model/addSceneryEmployee.vue'
    //新增员工（公司角色）
    import addCompanyEmployee from '../../model/addCompanyEmployee.vue'

    export default {
        components: {
            addSceneryEmployee,
            addCompanyEmployee
        },
        data() {
            return {
                // 表单数据
                tableData: [{
                    date: '2016-05-03',
                }],
                //当前详情类型变量
                detailType: '',
            }
        },
        methods: {
            //新增员工
            addEmployee() {
                if (this.detailType == 'scenery') {
                    this.$refs.addScEmModal.show();
                } else {
                    this.$refs.addCoEmModal.show();
                }
            },
            // 修改
            modify() {

            },
            //删除
            deleteListBtn() {

            },
            init() {
                if (this.$route.query && this.$route.query.detailType) {
                    this.detailType = this.$route.query.detailType;
                }
            }
        },
        computed: {},
        created() {
            this.init();
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    @import '../../commonFile/common';

    .org-header {
        padding: 8px 10px;
        ul {
            margin-bottom: 10px;
            li {
                float: left;
                font-size: $font_size_14px;
                color: $color_333;
                margin-right: 50px;
                span:last-child {
                    color: $color_666;
                }
            }
        }
    }
</style>
