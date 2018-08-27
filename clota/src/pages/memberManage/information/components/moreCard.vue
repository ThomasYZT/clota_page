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
            <table-com
                :auto-height="true"
                :table-com-min-height="300"
                :ofsetHeight="170"
                :column-data="columnData"
                :table-data="tableData.data"
                :border="true">
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
                        title: '会员编码',
                        minWidth: 120,
                        field: 'id'
                    },
                    {
                        title: '卡券名称',
                        minWidth: 220,
                        field: 'name'
                    },
                    {
                        title: '使用条件',
                        minWidth: 130,
                        field: 'content'
                    },
                    {
                        title: '类别',
                        minWidth: 100,
                        field: 'type'
                    },
                    {
                        title: '有效期',
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
