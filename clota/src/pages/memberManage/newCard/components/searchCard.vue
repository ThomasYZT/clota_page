<!--
内容：搜索会员卡、业主卡信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="search-box">
            <Input v-model.trim="filterParams.keyword"
                   style="width: 280px;"
                   :placeholder="$t('请输入关键字')" /><!--请输入姓名、手机号、会员编号、证件编号-->
            <Button type="primary" class="ivu-btn-90px" @click="">{{$t('搜索')}}</Button><!--搜索-->
        </div>

        <table-com
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :table-com-min-height="250"
            :border="true">
            <el-table-column
                slot="column0"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Radio></Radio>
                </template>
            </el-table-column>

        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import {cardInfoHead} from '../openCardsConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components: {
            tableCom
        },
        props: {},
        data() {
            return {
                // 表头配置
                columnData: cardInfoHead,
                // 表格数据
                tableData: [

                ],
                filterParams: {
                    keyword: '',   //
                },
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>

    .search-box {
        margin: 20px;
        .ivu-btn-90px {
            margin-left: 8px;
        }
    }
</style>
