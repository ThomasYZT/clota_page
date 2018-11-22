<template>
    <!--节假日活动特殊积分、折扣率设置-->
    <div class="member-integration">
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="60"
            @query-data="queryList">
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{(scope.row.scoreRate !== '' && scope.row.scoreRate !== null ? (scope.row.scoreRate + ':' + 1) : '') | contentFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.startTime | timeFormat('yyyy-MM-dd','')}} - {{scope.row.endTime | timeFormat('yyyy-MM-dd','')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                show-overflow-tooltip
                slot-scope="row"
                :resizable="false"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li v-if="!isNotEmpty(scope.row.scoreRate) || !isNotEmpty(scope.row.discountRate)"
                            @click="showModifyModal(scope.row)">{{$t('setIntegralDiscountRate')}}</li><!--设置积分、折扣率-->
                        <li v-else @click="showModifyModal(scope.row)">{{$t('ModifyIntegralDiscountRate')}}</li><!--修改积分、折扣率-->
                        <li :class="{disabled : !isNotEmpty(scope.row.scoreRate) || !isNotEmpty(scope.row.discountRate)}"
                            @click="setRateToStore(scope.row)">{{$t('setIntegralDiscountByShop')}}</li><!--按店铺设置积分、折扣率-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            :is-activity="true"
            :integra-data="currentData"
            ref="modifyRate"
            :title="$t('entireIntegralDiscountRateSet')"
            :confirm-operate="setMemberDiscountOfMember"><!--总体积分率折扣率设置-->
        </modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from './components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { specialColumnData } from './integrationConfig';
    import ajax from '@/api/index.js';

    export default {
        components : {
            modifyRateModal,
            tableCom
        },
        data () {
            return {
                //表头配置
                columnData : specialColumnData,
                // 表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前操作的
                currentData : {}
            };
        },
        methods : {

            /**
             * 显示设置积分、折扣率的模态框
             * @param data
             */
            showModifyModal ( data ) {
                this.$refs.modifyRate.show(data.levelId);
                this.currentData = data;
            },

            /**
             * 跳转到按店铺设置积分、折扣率页面
             * @param data
             */
            setRateToStore ( data ) {
                if (!this.isNotEmpty(data.scoreRate) || !this.isNotEmpty(data.discountRate)) {
                    return;
                }
                this.$router.push({
                    name : 'activityStore',
                    params : {
                        memberInfo : data
                    }
                });
            },

            /**
             * 查询会员积分和折扣率数据
             */
            queryList () {
                ajax.post('memberDiscountOfMemberList',{
                    pageNo : 1,
                    pageSize : 9999,
                    isActivity : true
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 判断val是否为空
             * @param val
             */
            isNotEmpty (val) {
                return val !== null && val !== '' && val !== undefined;
            },
            /**
             * 设置会员积分、折扣率
             */
            setMemberDiscountOfMember (formData,callback) {
                ajax.post('setMemberDiscountOfMember',{
                    id : this.currentData.id,
                    levelId : this.currentData.levelId,
                    discountRate : formData.discountRate,
                    scoreRate : formData.scoreRate,
                    remark : formData.remark,
                    isActivity : true,
                    startTime : formData.startTime ? formData.startTime.format('yyyy-MM-dd 00:00:00') : '',
                    endTime : formData.endTime ? formData.endTime.format('yyyy-MM-dd 23:59:59') : '' ,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('settingSuccess')); // 设置成功
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('settingFail')); // 设置失败
                    }
                }).finally(() => {
                    callback();
                });
            },

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-integration {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .operate-list{
            @include table_operate();
        }
    }
</style>

