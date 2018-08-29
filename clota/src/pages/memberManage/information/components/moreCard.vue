<template>
    <!--更多卡劵-->
    <div class="more-card">

        <div class="tabs-wrap">
            <ButtonGroup>
                <Button :type="status === 'used' ? 'primary' : 'ghost'" @click="changeStatus('used')">{{$t("notExpired")}}</Button>
                <Button :type="status === 'noOverdue' ? 'primary' : 'ghost'" @click="changeStatus('noOverdue')">{{$t("used")}}</Button>
                <Button :type="status === 'overdue' ? 'primary' : 'ghost'" @click="changeStatus('overdue')">{{$t("expired")}}</Button>
            </ButtonGroup>
            <span v-if="type && type === 'view' && tableData.totalRow > 5" class="more" @click="showCouponModal">{{$t("check") + $t("more")}}</span>
        </div>

        <div class="table-wrap">
            <table-com
                :auto-height="true"
                :table-com-min-height="300"
                :ofsetHeight="170"
                :column-data="columnData"
                :table-data="tableData.data"
                :border="true">
                <el-table-column
                    slot="column0"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    slot="column1"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    slot="column2"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    slot="column4"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
            </table-com>
        </div>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['status','table-data','type'],
        components: {
            tableCom,
        },
        data () {
            return {
                //表头配置
                columnData: [
                    {
                        title: 'memberCode',
                        minWidth: 120,
                        field: 'id'
                    },
                    {
                        title: 'couponName',
                        minWidth: 220,
                        field: 'name'
                    },
                    {
                        title: 'useCondition',
                        minWidth: 130,
                        field: 'content'
                    },
                    {
                        title: 'types',
                        minWidth: 100,
                        field: 'type'
                    },
                    {
                        title: 'validityPeriod',
                        minWidth: 200,
                        field: 'time'
                    },
                ],
            }
        },
        methods: {

            showCouponModal () {
                this.$emit('view-more');
            },

            //切换优惠券状态查询
            changeStatus ( val ) {
                this.$emit('change-status', val);
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .more-card{

        .tabs-wrap{
            margin-top: 15px;
            margin-bottom: 10px;
            @include clearfix();

            .more{
                font-size: $font_size_14px;
                float: right;
                color: $color-blue;
                cursor: pointer;
            }
        }
    }



</style>
