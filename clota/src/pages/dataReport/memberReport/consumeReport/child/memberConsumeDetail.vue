<!--
    会员个人消费详情
    作者：杨泽涛
-->
<template>
    <div class="member-consume-detail">
        <breadCrumbHead :locale-router="$t('consumeRecord')"
                        :before-router-list="beforeRouterList"></breadCrumbHead>

        <div class="statistic">
            <span class="label">{{$t('colonSetting', { key: $t('memberName') })}}</span>
            <span class="info">{{listItem.memberName | contentFilter}} | {{listItem.phoneNum | contentFilter}}</span>
            <span class="label">{{$t('colonSetting', { key: $t('memberCardType') })}}</span>
            <span class="info">{{listItem.cardTypeName | contentFilter}} | {{listItem.cardLevelName | contentFilter}}</span>
        </div>

        <div class="statistic">
            <span class="label">{{$t('colonSetting', { key: $t('consumeMoneyTotal') })}}</span>
            <span class="value">{{listItem.actAmount | contentFilter}} </span>
            <span class="label">{{$t('colonSetting', { key: $t('consumeTime') })}}</span>
            <span class="info">| {{listItem.createdTime | contentFilter}}</span>
        </div>

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="204"
            :page-no-d.sync="filterData.pageNo"
            :page-size-d.sync="filterData.pageSize"
            @query-data="getData">
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="check(scope.row)">{{$t('check')}}</li>
                    </ul>
                    <Tooltip placement="bottom" :transfer="true">
                        <div v-html="statusFilter(scope.row.status)"></div>
                        <div slot="content">
                            <Timeline>
                                <TimelineItem v-for="(item, index) in timeLineData" :key="index">
                                    <p class="time">{{item.createdTime}}</p>
                                    <p class="content">{{$t('colonSetting', { key : $t('packageCount') } )}}{{item.amount | contentFilter}}</p>
                                    <p class="content">{{$t('colonSetting', { key : $t('unitPrice') } )}}{{item.price | moneyFilter}}</p>
                                </TimelineItem>
                            </Timeline>
                        </div>
                    </Tooltip>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '../../../../../components/tableCom/tableCom';
    import ajax from '../../../../../api/index';
    import { memberConsumeDetailHead } from '../../tableHeadConfig';
    import lifeCycleMixins from '../../../../../mixins/lifeCycleMixins';
    import breadCrumbHead from '../../../../../components/breadCrumbHead/index';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('consumeReport'),
                        router : {
                            name : 'consumeReport',
                            params : {
                                selectButton : "datasheet"
                            }
                        }
                    }
                ],
                //过滤条件数据
                filterData : {
                    //页数
                    pageNo : 1,
                    //每页条数
                    pageSize : 10
                },
                //表格表头配置
                columnData : memberConsumeDetailHead,
                //表格数据
                tableData : [],
                //记录总条数
                totalCount : 0,
                //路由数据
                listItem : [],
                //时间查看消费记录数据
                timeLineData : [],
            };
        },
        methods : {
            /**
             * 获取个人消费数据
             */
            getData () {
                ajax.post('queryPagedMemberOrderItemCount', {
                    startDate : this.filterData.date ? this.filterData.date[0].format('yyyy-MM-dd') : '',
                    endDate : this.filterData.date ? this.filterData.date[1].format('yyyy-MM-dd') : '',
                    orgId : this.listItem.orgId,
                    memberId : this.listItem.memberId,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 获取路由参数
             * @param {*} params
             */
            getParams (params) {
                if (params && params.listItem) {
                    this.listItem = params.listItem;
                    this.getData();
                } else {
                    this.$router.push({
                        name : 'consumeReport'
                    });
                }
            },
            /**
             * 查看日期
             */
            check () {
                ajax.post('queryMemberOrderItemList', {
                    memberId : this.listItem.memberId,
                    orgId : this.listItem.orgId,
                    itemId : this.listItem.id
                }).then(res => {
                    if (res.success) {
                        this.timeLineData = res.data ? res.data : [];
                    } else {
                        this.timeLineData = [];
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-consume-detail {

        .statistic {
            padding: 16px 22px;
            .label {
                font-size: 14px;
                color: #333333;
            }

            .value {
                font-size: 18px;
                color: #22BB5F;
                margin-right: 30px;
            }

            .info {
                font-size: 14px;
                color: #666666;
                margin-right: 30px;
            }
        }
    }
</style>
