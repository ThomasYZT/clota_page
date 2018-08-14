<template>
    <!--会员管理--会员积分--积分、折扣率设置-->
    <div class="member-integration">

        <div class="table-wrap">
            <el-table
                :data="tableData"
                :border="true"
                max-height="450"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="会员级别"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="integRate"
                    label="积分率"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="discountRate"
                    label="折扣率"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="span-blue" v-if="scope.row.level === '普通会员'" @click="showModifyModal(scope)">设置积分、折扣率</span>
                            <span class="span-blue" v-else @click="showModifyModal(scope)">修改积分、折扣率</span>
                            <span class="span-blue" @click="setRateToStore(scope)">按店铺设置积分、折扣率</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal ref="modifyRate" title="总体积分率折扣率设置"></modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from './components/modifyRateModal.vue'

    export default {
        components: {
            modifyRateModal,
        },
        data () {
            return {
                // 表格数据
                tableData: [
                    {
                        level: '普通会员',
                        integRate: '-',
                        discountRate: '-',
                    },
                    {
                        level: '黄金会员',
                        integRate: '0.5',
                        discountRate: '0.95',
                    },
                    {
                        level: '铂金会员',
                        integRate: '1',
                        discountRate: '0.8',
                    },
                    {
                        level: '钻石会员',
                        integRate: '2',
                        discountRate: '0.6',
                    },
                ],
                multipleSelection: [],
            }
        },
        methods: {

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            showModifyModal ( data ) {
                console.log(data);
                this.$refs.modifyRate.show();
            },

            setRateToStore ( data ) {
                console.log(data);
                this.$router.push({ name: 'setRate', query: { info: data.row }});
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-integration {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .table-wrap{

        }
    }
</style>

