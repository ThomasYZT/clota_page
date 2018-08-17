<!--服务器列表-->

<template>
    <div class="server-list">
        <div class="title">
            {{$t('serveList')}}
            <span class="server-care" @click="toServer">
                {{$t('more')}}
                <span class="iconfont icon-pull-down"></span>
            </span>
        </div>
        <div class="table-list">
            <table-com
                :table-data="tableData"
                table-height="268px"
                :column-data="columnData">
                <!--系统类型-->
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{$t('bit',{length : scoped.row.systmeBit})}}
                    </template>
                </el-table-column>
                <!--监控频率-->
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{scoped.row.monitoringFrequencc}}{{$t('minute')}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
    </div>
</template>

<script>
    import tableCom from './tableCom';
    import {columns} from './serverListConfig';
    import ajax from '@/api/index.js';

    export default {
        components: {
            tableCom
        },
        data() {
            return {
                //表格数据
                tableData: [],
                //表头配置
                columnData: columns
            }
        },
        methods: {
            /**
             * 跳转到服务器列表页面
             */
            toServer () {
                this.$router.push({
                    name : 'server'
                });
            },
            /**
             * 查询服务器
             */
            queryAllServerMsg () {
                ajax.post('queryAllServerMsg',{
                    page : 1,
                    pageSize : 9999
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data.list ? res.data.list : [];
                    }else{
                        this.tableData = [];
                    }
                }).catch(() => {
                    this.tableData = [];
                });
            }
        },
        created () {
            this.queryAllServerMsg();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .server-list {
        float: left;
        @include block_outline($width: unquote('calc(100% - 425px)'), $height: 315px);
        @include card();

        .title {
            @include block_outline($height: 45px);
            line-height: 45px;
            padding: 0 20px;
            font-size: $font_size_16px;
            color: $color_353B5E;

            .server-care {
                float: right;
                font-size: $font_size_12px;
                color: $color_1890FF;
                cursor: pointer;
            }
        }

        .table-list {
            @include block_outline($height: 268px);

            /deep/ .el-table td,
            /deep/ .el-table th {
                padding: 8px 0 !important;
            }
        }

        .icon-pull-down::before{
            display: inline-block;
            color: $color_blue;
            transform: rotate(-90deg) scale(0.8);
        }
    }
</style>
