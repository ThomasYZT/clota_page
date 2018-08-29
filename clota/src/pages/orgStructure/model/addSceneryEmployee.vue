<template>
    <!-- 添加员工（风景） -->
    <Modal
        v-model="visible"
        class="addSceneryEmployee"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="600"
        @on-cancel="hide">
        <!--自定义页头-->
        <div slot="header" class="ivu-modal-header-inner">
            <span>新增员工</span>
        </div>
        <!--内容区域-->
        <div class="content">
            <p>已选：{{checkedNum}}人</p>
            <div class="selectionTable">
                <el-table
                    :data="tableData"
                    :border="true"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
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
                </el-table>
            </div>
        </div>

        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button size="small" type="primary">{{$t("save")}}</i-button>
                <i-button type="ghost" size="small" @click="hide">取消</i-button>
            </template>
        </div>

    </Modal>

</template>

<script type="text/ecmascript-6">
    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                // 表单数据
                tableData: [{
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                }, {
                    date: '2016-05-03',
                },],
                checkedNum: 0
            }
        },
        computed: {},
        created() {
        },
        watch: {},
        methods: {
            //表格选中的数据
            handleSelectionChange(data) {
                if (data) {
                    this.checkedNum = data.length;
                }
            },
            /**
             * 显示模态框
             * @param data {data有值表示查看，反之新增}
             */
            show(data) {
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide() {
                this.visible = false;
            },
            /**
             * 创建自定义指标表单校验
             */
            submit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {

                    } else {
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    /deep/ .addSceneryEmployee {
        .ivu-modal-body {
            padding: 0 15px;
        }
        .el-table {
            height: 488px;
            overflow: auto;
        }
    }

    .addSceneryEmployee {
        .content {
            p {
                font-size: $font_size_14px;
                color: $color_606266;
                line-height: 41px;
                padding: 0 20px;
            }
        }
    }
</style>
