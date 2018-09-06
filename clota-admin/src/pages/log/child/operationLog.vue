<!--运维后台操作日志-->

<template>
    <div class="operation-log">
        <!--筛选表头-->
        <filter-head :log-type="logType" @fresh-data="getFilterInfo">
        </filter-head>
        <table-com
            v-if="logType !== ''"
            :column-data="columns"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="170"
            @query-data="getLogData">
        </table-com>
    </div>
</template>

<script>
    import filterHead from './operationLogChild/filterHead';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {operationLogHead,saasLogHead} from './operationLogConfig';
    import ajax from '@/api/index.js';
    export default {
        components : {
            breadCrumbHead,
            filterHead,
            tableCom
        },
        data() {
            return {
                //表格数据
                tableData : [],
                //总共条数
                totalCount : 0,
                //日志类型
                logType : '',
                spaceOffset : 140,
                //筛选条件
                filterData : {},
                pageSize : 10,
                pageNo :1
            }
        },
        methods: {
            /**
             * 获取日志类型
             */
            getLogData () {
                if(this.logType === 'operate'){
                   this.maintainBackgroundOPLog('maintainBackgroundOPLog');
                }else if(this.logType === 'sass'){
                    this.maintainBackgroundOPLog('saaSPlatformOPLog');
                }
            },
            /**
             * 获取操作日志
             * @param url 查询接口
             */
            maintainBackgroundOPLog (url) {
                ajax.post(url,Object.assign({
                    pageSize : this.pageSize,
                    page : this.pageNo,
                },this.filterData)).then(res => {
                    if(res.status === 200){
                        this.totalCount = Number(res.data.totalRecord);
                        this.tableData = res.data.list ? res.data.list : [];
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                        this.$Message.error(res.message || this.$t('dataError'));
                    }
                });
            },
            /**
             * 获取筛选条件
             * @param data
             */
            getFilterInfo (data) {
                this.filterData = data;
                this.getLogData();
            },
        },
        watch : {
            '$route':{
                handler (newVal,oldVal) {
                    if(newVal && newVal.meta){
                        this.logType = newVal.meta.subMenuType;
                        if(oldVal){
                            this.getLogData();
                        }
                    }
                },
                immediate : true
            }
        },
        computed :{
            //表头配置
            columns () {
                if(this.logType === 'operate'){
                    return operationLogHead;
                }else if(this.logType === 'sass'){
                    return saasLogHead;
                }else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .operation-log{
        @include block_outline();
        min-height: 100%;
        background: $color_fff;
        overflow: auto;
        padding: 0 30px;
    }
</style>
