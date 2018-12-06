<!--
内容：查看全部待处理事项
作者：djc
日期：
-->

<template>
    <Modal
        v-model="visible"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="650"
        :title="$t('pendingMatters')"
        @on-cancel="hide">

        <!--内容区域-->
        <table-com
            :ofsetHeight="200"
            :height="300"
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :border="false"
            @query-data="getAllPendingMatters">
            <el-table-column
                slot="column0"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column2"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t('pendingMatters.' + scope.row.classify)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                fixed="right">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="jumpToPages(scope)">{{$t('check')}}</li><!--查看-->
                        <li @click="handleMatters(scope)">{{$t('ignore')}}</li><!--忽略-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--自定义页脚-->
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { allPendingMattersHead } from '../workbenchConfig';

    export default {
        components : {
            tableCom
        },
        props : {},
        data () {
            return {
                visible : false, //显示模态框变量
                //表头配置
                columnData : allPendingMattersHead,
                //表格数据
                tableData : [],
            }
        },
        computed : {},
        created () {
        },
        methods : {
            /**
             * 查询机构待处理事项
             */
            getAllPendingMatters () {
                ajax.post('workbench-queryUnfinishedWorkBack').then(res => {
                    if (res.success) {
                        this.tableData = res.data || [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 显示模态框
             */
            show () {
                this.getAllPendingMatters();
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;
                this.$emit('on-hide');
            },
            /**
             * 查看/忽略待处理事项
             */
            handleMatters (scopeData) {
                ajax.post('workbench-updateWorkBacklogStatus', {
                    id : scopeData.row.id
                }).then(res => {
                    if (res.success) {
                        this.tableData.splice(scopeData.$index, 1);
                    }
                });
            },
            /**
             * 查看待处理事项：跳转至对应的页面
             */
            jumpToPages (scopeData) {
                this.handleMatters(scopeData);
                //TODO 问产品经理，查看跳转页面的逻辑？
                /*let routerObj = {};
                switch (scopeData.row.type) {
                    case '' :
                        routerObj = {
                            name : ''
                        }
                        break;
                }

                this.$router.push(routerObj);*/
            }
        }
    };
</script>

<style lang="scss" scoped>
    /*@import '~@/assets/scss/base';*/

    /deep/ .ivu-modal-footer {
        display: none;
    }
</style>
