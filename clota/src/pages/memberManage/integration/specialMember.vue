<template>
    <!--会员管理--会员积分--特殊会员权益管理-->
    <div class="member-special">

        <div class="content-item">
            <div class="title-wrap">特殊会员权益管理</div>
            <div class="btn-wrap">
                <Button type="primary" @click="showAddTypeModal">+ 新增特殊会员类别</Button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="true"
                    style="width: 100%">
                    <el-table-column
                        prop="type"
                        label="员工分类">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"  @click="linkTo(scope)">关联会员信息</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="content-item">
            <div class="title-wrap">按分类设置权益</div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    style="width: 100%">
                    <el-table-column
                        prop="level"
                        label="会员级别">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"  @click="showModifyModal(scope)">修改积分、折扣率</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--新增特殊会员类别-->
        <add-special-type-modal ref="addSpecialType"></add-special-type-modal>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal ref="modifyRate" title="修改积分折扣率"></modify-rate-modal>

    </div>
</template>

<script>

    import addSpecialTypeModal from './components/addSpecialTypeModal.vue'
    import modifyRateModal from './components/modifyRateModal.vue'

    export default {
        components: {
            addSpecialTypeModal,
            modifyRateModal,
        },
        data () {
            return {
                // 表格数据
                tableData: [
                    {
                        level: '普通会员',
                        type: '普通员工',
                    },
                    {
                        level: '黄金会员',
                        type: '经理级',
                    },
                    {
                        level: '铂金会员',
                        type: '项目老总',
                    },
                    {
                        level: '钻石会员',
                        type: '董事长',
                    },
                ],
            }
        },
        methods: {

            showAddTypeModal () {
                this.$refs.addSpecialType.show();
            },

            linkTo ( data ) {
                console.log(data);
                this.$router.push({ name: 'linkSpeMember', query: { info: data.row }});
            },

            showModifyModal ( data ) {
                console.log(data);
                this.$refs.modifyRate.show();
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-special{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding: 20px 30px;

        .content-item{
            margin-bottom: 30px;

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .btn-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{

            }

        }

    }
</style>
