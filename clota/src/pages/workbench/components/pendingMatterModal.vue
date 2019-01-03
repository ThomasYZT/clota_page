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
                slot="column1"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.type ? $t('colonSetting', { key : $t( 'penddingMatter.' + scope.row.type) }) : '-'}}</span>
                    <!-- 产品 -->
                    <template v-if="scope.row.type.includes('product')">
                        <span>{{scope.row.content.productName | contentFilter}}</span>
                        <span>{{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}</span>
                    </template>
                    <!-- 销售政策 -->
                    <template v-else-if="scope.row.type.includes('policy')">
                        <span>{{scope.row.content.policyName | contentFilter}}</span>
                        <span>{{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}</span>
                    </template>
                    <!-- 充值 -->
                    <template v-else-if="scope.row.type.includes('recharge')">
                        {{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}
                        <span v-if="scope.row.type.includes('apply')">{{$t('apply_recharge')}}</span>
                        <span v-else-if="scope.row.type.includes('pass')">{{$t('apply_recharge')}}</span>
                        <span v-else-if="scope.row.type.includes('reject')">{{$t('reject_recharge')}}</span>
                        <span>{{$t('colonSetting', { key : $t('money') })}}{{scope.row.content.amount | moneyFilter | contentFilter}}</span>
                    </template>
                    <!-- 退票 -->
                    <template v-else-if="scope.row.type.includes('refund')">
                        <!-- 退票申请 -->
                        <template v-if="scope.row.type.includes('apply')">
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}，</span>
                            <span>{{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}</span>
                        </template>
                        <!-- 退票结果 -->
                        <template v-else>
                            <span>{{$t('colonSetting', { key : $t('reject') })}}{{scope.row.content.rejectNum | contentFilter}}，</span>
                            <span>{{$t('colonSetting', { key : $t('passed') })}}{{scope.row.content.passNum | contentFilter}}，</span>
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}</span>
                        </template>
                    </template>
                    <!-- 改签 -->
                    <template v-else-if="scope.row.type.includes('alter')">
                        <!-- 改签申请 -->
                        <template v-if="scope.row.type.includes('apply')">
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}，</span>
                            <span>{{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}</span>
                        </template>
                        <!-- 改签结果 -->
                        <template v-else>
                            <span>{{$t('colonSetting', { key : $t('reject') })}}{{scope.row.content.rejectNum | contentFilter}}，</span>
                            <span>{{$t('colonSetting', { key : $t('passed') })}}{{scope.row.content.passNum | contentFilter}}，</span>
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}</span>
                        </template>
                    </template>
                    <!-- 团队订单 -->
                    <template v-else-if="scope.row.type.includes('team')">
                        <template v-if="scope.row.type.includes('create')">
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}</span>
                            <span>{{scope.row.content.org | contentFilter}}/{{scope.row.content.account | contentFilter}}</span>
                        </template>
                        <template v-else>
                            <span v-if="scope.row.type.includes('pass')">{{$t('passed')}}</span>
                            <span v-else>{{$t('reject')}}</span>
                            <span>{{$t('colonSetting', { key : $t('orderId') })}}{{scope.row.content.orderNo | contentFilter}}</span>
                        </template>
                    </template>
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
                    {{scope.row.classify ? $t('pendingMatters.' + scope.row.classify) : '-' }}
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
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
    import { routerPackage } from '../scenicService/util';
    import { mapGetters } from 'vuex';

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
            };
        },
        computed : {
            ...mapGetters([
                'routerInfo'
            ])
        },
        methods : {
            /**
             * 查询机构待处理事项
             */
            getAllPendingMatters () {
                ajax.post('workbench-queryUnfinishedWorkBack').then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.filter((item) => {
                            if (item.finishStatus === "false") {
                                item.content = item.content ? JSON.parse(item.content) : '';
                                item.extData = item.extData ? JSON.parse(item.extData) : '';
                                item.routerObj = routerPackage(item, this.routerInfo);
                            }
                            return item.finishStatus === "false";
                        }) : [];
                        this.tableData = this.tableData.filter((item) => {
                            return item.routerObj;
                        });
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
                        this.$emit("updateWorkBackNum");
                    }
                });
            },
            /**
             * 查看待处理事项：跳转至对应的页面
             */
            jumpToPages (scopeData) {
                let routerObj = routerPackage(scopeData.row, this.routerInfo);
                if (routerObj) {
                    //console.log(routerObj)
                    this.$router.push(routerObj);
                    this.handleMatters(scopeData);
                } else {
                    this.$Message.warning(this.$t('accountPrivaligeError'));
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    /*@import '~@/assets/scss/base';*/

    /deep/ .ivu-modal-footer {
        display: none;
    }
</style>
