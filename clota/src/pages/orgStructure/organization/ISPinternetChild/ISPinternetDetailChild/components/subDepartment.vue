<!--下属部门-->

<template>
    <div class="sub-department">
        <div class="pick-up-title" >
            <span class="label">{{$t('subDepartment')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <table-com
                    v-if="tableShow"
                    :column-data="partMentHead"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="queryList">
                    <el-table-column
                        slot="columnstatus"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.status === 'close' ? $t('outUse') : $t('startUsing')}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import {partMentHead} from './subDepartmentConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {}
                }
            }
        },
        components : {
            tableCom,
        },
        data() {
            return {
                //下属部门表头配置
                partMentHead : partMentHead,
                //表格数据
                tableData : [],
                //下属景区总数
                totalCount : 0,
                pageNo : 1,
                pageSize : 10,
                //是否收起
                isPackUp : false,
            }
        },
        methods: {
            /**
             * 查询下属部门信息
             */
            queryList () {
                ajax.post('getSubNode',{
                    orgId : this.searchParams.id,
                    orgType : 'department',
                    // page : this.pageNo,
                    // pageSize : this.pageSize,
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            }
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .sub-department{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }

        .pick-up-title{
            @include block_outline($height: 59px);
            padding: 25px 0 10px 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }
        }

        .operate-info{
            @include table_operate();

            .reset-pass{
                color: $color_blue;
            }

            .delete{
                color:$color_err
            }
        }
    }
</style>
