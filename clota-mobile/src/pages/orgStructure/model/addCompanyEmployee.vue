<template>
    <!-- 添加员工（公司） -->
    <Modal
        v-model="visible"
        class="addCompanyEmployee"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="820"
        @on-cancel="hide">
        <!--自定义页头-->
        <div slot="header" class="ivu-modal-header-inner">
            <span>新增员工</span>
        </div>
        <!--内容区域-->
        <div class="content clearfix">
            <div class="content-left">
                <div class="search">
                    <Input v-model="keywards" placeholder="搜索姓名"></Input>
                </div>
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
                    </el-table>
                </div>
            </div>
            <div class="content-right">
                <div class="title">景区</div>
                <CheckboxGroup v-model="choseScenery">
                    <Checkbox label="株洲欢乐世界"></Checkbox>
                    <Checkbox label="深圳方特游乐园"></Checkbox>
                    <Checkbox label="水立方欢乐世界"></Checkbox>
                </CheckboxGroup>
            </div>
        </div>

        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button size="small" type="primary">{{$t("save")}}</i-button>
                <i-button type="ghost" size="small" @click="hide">{{$t('cancel')}}</i-button>
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
                //搜索关键字
                keywards: '',
                //选择的景区
                choseScenery: [],
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

    /deep/ .addCompanyEmployee {
        .ivu-modal-body {
            padding: 0;
        }
        .ivu-checkbox-wrapper {
            font-size: $font_size_14px;
            color: $color_333;
            width: 100%;
            line-height: 20px;
            margin-bottom: 16px;
        }
    }

    .addCompanyEmployee {
        .content {
            height: 533px;
            overflow: auto;
            .content-left {
                width: calc(100% - 275px);
                float: left;
                padding: 10px 20px 0 20px;
                box-sizing: border-box;
                border-right: 1px solid #eeeeee;
                .search {
                    padding: 0 3px 10px 3px;
                }
            }
            .content-right {
                width: 275px;
                float: right;
                padding: 15px 25px;
                .title {
                    font-size: $font_size_14px;
                    color: $color_333;
                    line-height: 20px;
                    margin-bottom: 14px;
                }
            }
        }
    }
</style>
