<template>
    <!--会员管理--会员卡券-->
    <div class="member-card">

        <div class="tabs-wrap">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane label="已创建" name="created"></TabPane>
                <TabPane label="已作废" name="cancellation"></TabPane>
            </Tabs>
        </div>

        <div class="btn-wrap">
            <template v-if="tabsName === 'created'"> <Button type="primary" @click="add">+ 新增卡券</Button></template>
            <template v-else><Button type="error" @click="showDeleteModal">批量删除</Button></template>
        </div>

        <div class="table-wrap">
            <el-table
                :data="createdData"
                :border="true"
                max-height="450"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="no"
                    label="卡券串码"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="卡券名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类别"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="condition"
                    label="使用条件"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="range"
                    label="有效期"
                    width="320">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <template v-if="tabsName === 'created'">
                                <span class="span-blue" @click="modifyFunc(scope)">修改</span>
                                <span class="span-blue" @click="cancelFunc(scope)">作废</span>
                            </template>
                            <template v-else>
                                <span class="span-blue" @click="reOpen(scope)">重新启用</span>
                            </template>

                            <span @click="showModal(scope)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="page-wrap" v-if="createdData.length > 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="parseInt(queryParams.pageNo)"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="parseInt(queryParams.pageSize)"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)">
            </el-pagination>
        </div>

        <!--删除卡劵modal-->
        <Modal
            v-model="visible"
            title="删除卡券"
            class-name="delete-card-modal vertical-center-modal"
            width="420"
            :mask-closable="false"
            @on-cancel="hide">
            <div class="modal-body">
                <div class="left"><span class="iconfont icon-question"></span></div>
                <div class="right">
                    您正在删除卡券：<span class="name">代金券100元</span><br>
                    <span class="notice">本操作不可撤销，</span>是否确认删除？
                    </div>
            </div>
            <div slot="footer" class="modal-footer">
                <Button type="error" @click="deleteCardFunc" >确定</Button>
                <Button type="ghost" @click="hide" >取消</Button>
            </div>

        </Modal>

    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                tabsName: 'created',
                createdData: [
                    {
                        no: '0083928399273',
                        name: '100元',
                        type: '代金券',
                        condition: '满300可用',
                        range: '2018.09.01 12:00:00-2018.09.08 22:00:00',
                    },
                    {
                        no: '0083928399273',
                        name: '九五折',
                        type: '折扣券',
                        condition: '满100可用',
                        range: '2018.09.01 12:00:00-2018.09.08 22:00:00',
                    },
                    {
                        no: '0083928399273',
                        name: '套餐一份',
                        type: '兑换券',
                        condition: '仅限张记手擀面使用',
                        range: '2018.09.01 12:00:00-2018.09.08 22:00:00',
                    },
                    {
                        no: '0083928399273',
                        name: '九三折',
                        type: '折扣券',
                        condition: '满100可用',
                        range: '2018.09.01 12:00:00-2018.09.08 22:00:00',
                    },
                ],
                total: 50,
                queryParams: {
                    pageNo: '1',
                    pageSize: '10',
                },
                multipleSelection: [],
                visible: false,
            }
        },
        methods: {

            /**
             * 切换tab
             * @param name
             */
            changeTab (name) {
                this.tabsName = name;
            },

            add () {
                this.$router.push({ name: 'addCard', query: { type: 'add' }});
            },

            showDeleteModal () {

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            modifyFunc ( data ) {
                console.log(data);
                this.$router.push({ name: 'addCard', query: { type: 'modify' }});
            },

            reOpen ( data ) {
                console.log(data);
                this.$router.push({ name: 'addCard', query: { type: 'modify' }});
            },

            cancelFunc ( data ) {
                console.log(data);
                this.$Message.success("作废成功！");
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },


            showModal () {
                this.visible = true;
            },

            //关闭模态框
            hide(){
                this.visible = false;
            },

            deleteCardFunc () {
                console.log('删除')
            },


        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .tabs-wrap{
            /deep/ .ivu-tabs-nav{
                margin-left: 30px;
            }
        }

        .btn-wrap{
            height: 58px;
            line-height: 56px;
            padding: 0 30px;
        }

        .table-wrap{

        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }
    }

    .delete-card-modal{
        .modal-body{
            padding: 45px 60px;
            text-align: left;
            @include clearfix();
            .left{
                float: left;
                width: 14px;
                text-align: right;
                span{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background-color: pink;
                    vertical-align: middle;
                }
            }
            .right{
                float: right;
                width: calc(100% - 14px);
                font-size: $font_size_14px;
                color: $color_333;
                letter-spacing: 1px;
                line-height: 24px;
                padding-left: 10px;
                .name{
                    color: $color_yellow;
                }
                .notice{
                    color: $color_red;
                }
            }
        }
    }
</style>
