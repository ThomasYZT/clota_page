<!--
内容：分业态经营状况、分产品经营状况 - 不同经营类别的经营状况
作者：djc
日期：
-->

<template>
    <div class="differ-operation-state">
        <diff-date-data
            :card-title="cardTitle"
            :column-data="tableHead"
            :table-data="tableData"
            @on-change="handleDateChanged">
        </diff-date-data>
    </div>
</template>
<script>
    import ajax from '@/api/index.js';
    import diffDateData from '../../components/diffDateData.vue';

    export default {
        components : {
            diffDateData
        },
        props : {
            ajaxUrl : String,
            cardTitle : String,
            tableHead : {
                type : Array,
                default () {
                    return []
                }
            },
        },
        data () {
            return {
                tableData : [],
            }
        },
        computed : {
        },
        created () {
        },
        mounted () {
        },
        watch : {
            /*operationType : {
                handler (val, oldVal) {
                    if (val == 'productName') {
                        this.ajaxUrl = 'workbench-getOrderAmountGroupByProductName';
                        this.tableHead = productNameOperateHead;
                        this.cardTitle = 'operateByProductName';
                    } else if (val == 'productType') {
                        this.ajaxUrl = 'workbench-getOrderAmountGroupByProductType';
                        this.tableHead = productTypeOperateHead;
                        this.cardTitle = 'operateByProductType';
                    }
                },
                immediate : true
            }*/
        },
        methods : {
            /**
             * 查询营业状况数据
             */
            handleDateChanged (daterange) {
                ajax.post(this.ajaxUrl, {
                    startDate : daterange[0].format('yyyy-MM-dd'),
                    endDate : daterange[1].format('yyyy-MM-dd')
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data || [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    .differ-operation-state {
        float: left;
        width: 50%;
    }
</style>
