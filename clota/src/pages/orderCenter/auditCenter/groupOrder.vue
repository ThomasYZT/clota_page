<!--
内容：团队订单预审核
作者：djc
日期：
-->

<template>
    <div class="group-order">
        团队订单预审核
    </div>
</template>
<script type="text/ecmascript-6">
    import auditFilter from './components/auditFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {groupOrderHead} from './auditConfig';
    import ajax from '@/api/index.js';

    export default {
        components: { auditFilter, tableCom },
        props: {},
        data() {
            return {
                //表头配置
                columnData : groupOrderHead,
                //表格数据
                tableData: [],
                //总条数
                totalCount : 0,
                //表格是否显示
                tableShow : false,
                //筛选条件
                queryParams : {
                    pageNo :1,
                    pageSize : 10
                },
                //选择的产品
                selectedProduct : [],
                //是否显示预定模态框
                showReserveModal : false,
                //选择的产品列表
                productList : []
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * 查询所有产品信息
             */
            queryList () {
                ajax.post('queryReserveProductList',{
                    ...this.queryParams
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>

</style>
