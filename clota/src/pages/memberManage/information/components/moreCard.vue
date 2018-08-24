<template>
    <!--更多卡劵-->
    <div class="more-card">

        <div class="tabs-wrap">
            <ButtonGroup>
                <Button :type="status === 'used' ? 'primary' : 'ghost'" @click="changeStatus('used')">未过期</Button>
                <Button :type="status === 'noOverdue' ? 'primary' : 'ghost'" @click="changeStatus('noOverdue')">已使用</Button>
                <Button :type="status === 'overdue' ? 'primary' : 'ghost'" @click="changeStatus('overdue')">已过期</Button>
            </ButtonGroup>
            <span v-if="type && type === 'view' && tableData.totalRow > 5" class="more" @click="showCouponModal">查看更多</span>
        </div>

        <div class="table-wrap">
            <el-table
                :data="tableData.data"
                :border="false"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="会员编码"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="卡券名称"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="使用条件">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类别"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="有效期"
                    width="200">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>

    export default {
        props: ['status','table-data','type'],
        components: {},
        data () {
            return {}
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
