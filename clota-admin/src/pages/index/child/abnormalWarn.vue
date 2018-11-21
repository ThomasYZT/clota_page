<!--异常事件报警-->

<template>
    <div class="abnormal-warn">
        <div class="title">{{$t('warnAlarm')}}</div>
        <div class="table-list-area">
            <ul class="event-list" v-if="totalCount > 0">
                <li class="event"
                    v-for="(item,i) in warningList"
                    :key="i">
                    <ul class="event-info">
                        <li class="event-name">
                            <span class="iconfont"
                                  :class="{'icon-warn' : item.warningLevel === '2',
                                  'icon-error' : item.warningLevel === '1',
                                  'icon-mind' : item.warningLevel === '3'}"></span>
                            {{item.message}}
                        </li>
                        <li class="server-name">{{item.serverName}}</li>
                        <li class="event-time">{{item.ctime}}</li>
                        <li class="watch" @click="toDetail('serverDetail')">查看</li>
                    </ul>
                </li>
            </ul>
            <!--无数据-->
            <no-data v-if="totalCount < 1">
            </no-data>
        </div>
        <div class="page-area" v-if="totalCount > 0">
            <el-pagination
                :current-page="pageNo"
                :page-sizes="pageSizeConfig"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="sizeChange"
                @current-change="pageNoChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { configVariable } from '../../../assets/js/constVariable';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        components : {
            noData
        },
        data () {
            return {
                //总共条数
                totalCount : 0,
                //事件
                warningList : [],
                //每页大小配置
                pageSizeConfig : configVariable.pageSizeConfig,
                //每页大小
                pageSize : configVariable.pageDefaultSize,
                //当前页码
                pageNo : 1,
            };
        },
        methods : {
            /**
             * 跳转详情
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : data,
                    params : {
                        orderType : "team"
                    }
                });
            },
            /**
             * 获取异常事件报警
             */
            getExceptionAlarm () {
                ajax.get('exceptionAlarm',{
                    page : this.pageNo,
                    pageSize : this.pageSize,
                    warningType : '0'
                }).then(res => {
                    if (res.status === 200) {
                        this.totalCount = Number(res.data.totalRecord);
                        this.warningList = res.data.list ? res.data.list : [];
                    } else {
                        this.totalCount = 0;
                        this.warningList = [];
                    }
                }).catch(err => {
                    this.totalCount = 0;
                    this.warningList = [];
                });
            },
            /**
             * 改变每页的条数
             * @param pageSize
             */
            sizeChange (pageSize) {
                this.pageSize = pageSize;
                this.getExceptionAlarm();
            },
            /**
             * 页码改变
             * @param pageNo
             */
            pageNoChange (pageNo) {
                this.pageNo = pageNo;
                this.getExceptionAlarm();
            }
        },
        created () {
            this.getExceptionAlarm();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .abnormal-warn {
        position: relative;
        float: left;
        @include block_outline($width: unquote('calc(100% - 425px)'), $height: 309px);
        @include card();

        .title {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E8E8E;
            line-height: 45px;
            padding: 0 20px;
            font-size: $font_size_16px;
            color: $color_353B5E;
        }

        .table-list-area {
            padding: 0 20px;
            @include block_outline($height: 204px);

            .event-list {
                overflow: auto;
                @include block_outline();

                .event {
                    @include block_outline($height: 40px);
                    border-bottom: 1px solid $color_E6EAEE;

                    .event-info {
                        @include block_outline();

                        .event-name,
                        .server-name,
                        .watch,
                        .event-time {
                            float: left;
                            @include block_outline(unquote('calc((100% - 50px) / 3)'));
                            line-height: 40px;
                            font-size: $font_size_14px;
                            color: $color_666;
                        }

                        .event-name {
                            padding-left: 20px;


                            .iconfont{
                                margin-right: 10px;
                            }
                        }

                        .watch {
                            float: left;
                            @include block_outline(50px);
                            color: $color_0082D5;
                            cursor: pointer;
                        }
                    }
                }
            }
        }

        .page-area {
            @include block_outline($height: 57px);
            text-align: center;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }
    }
</style>
