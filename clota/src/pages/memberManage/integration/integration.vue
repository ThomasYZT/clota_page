<template>
    <!--会员管理--会员积分--积分、折扣率设置-->
    <div class="member-integration">

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :total-count="totalCount"
            :ofset-height="60"
            @query-data="queryList">
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div class="operation">
                        <span class="span-blue"
                              v-if="isEmpty(scope.row.scoreRate) && isEmpty(scope.row.discountRate)"
                              @click="showModifyModal(scope.row)">
                            设置积分、折扣率
                        </span>
                        <span class="span-blue"
                              v-else
                              @click="showModifyModal(scope.row)">
                            修改积分、折扣率
                        </span>
                        <span class="span-blue"
                              @click="setRateToStore(scope.row)">
                            按店铺设置积分、折扣率
                        </span>
                    </div>
                </template>
            </el-table-column>
        </table-com>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            ref="modifyRate"
            title="总体积分率折扣率设置"
            :confirm-operate="setMemberDiscountOfMember">
        </modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from './components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './integrationConfig';
    import ajax from '@/api/index.js';
    import lifeCycle from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycle],
        components: {
            modifyRateModal,
            tableCom
        },
        data () {
            return {
                //表头配置
                columnData : columnData,
                // 表格数据
                tableData: [],
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10
            }
        },
        methods: {

            /**
             * 显示设置积分、折扣率的模态框
             * @param data
             */
            showModifyModal ( data ) {
                this.$refs.modifyRate.show(data.levelId);
            },

            /**
             * 跳转到按店铺设置积分、折扣率页面
             * @param data
             */
            setRateToStore ( data ) {
                this.$router.push({
                    name: 'setRate',
                    params : {
                         memberInfo : data
                    }
                });
            },

            /**
             * 查询会员积分和折扣率数据
             */
            queryList ({pageNo,pageSize} = {pageNo : this.pageNo,pageSize : this.pageSize}) {
                ajax.post('memberDiscountOfMemberList',{
                    pageNo,
                    pageSize
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData =  [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData =  [];
                    this.totalCount = 0;
                });
            },
            /**
             * 判断val是否为空
             * @param val
             */
            isEmpty(val) {
                return val !== null && val !== '' && val !== undefined;
            },
            /**
             * 设置会员积分、折扣率
             */
            setMemberDiscountOfMember(formData,callback) {
                ajax.post('setMemberDiscountOfMember',{
                    levelIds : this.levelIds,
                    discountRate : formData.discountRate,
                    scoreRate : formData.scoreRate,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('设置成功');
                        this.queryList();
                    }else{
                        this.$Message.error('设置失败');
                    }
                }).finally(() => {
                    callback();
                });
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-integration {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
    }
</style>

