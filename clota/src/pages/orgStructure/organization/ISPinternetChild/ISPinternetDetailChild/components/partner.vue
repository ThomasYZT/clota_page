<!--合作伙伴-->

<template>
    <div class="partner">
        <!--<table-com-->
            <!--:table-data="tableData"-->
            <!--:column-data="paratner"-->
            <!--:title="$t('partner')"-->
            <!--:show-page="true"-->
            <!--:total="totalCount"-->
            <!--@get-new-data="getSubCompany">-->
        <!--</table-com>-->

        <div class="pick-up-title" >
            <span class="label">{{$t('org-partner')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
            {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-arrow-down" :class="{'icon-reverse' : isPackUp}"></span>
          </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <table-com
                    v-if="tableShow"
                    default-page-layout="total, prev, pager, next"
                    :column-data="paratner"
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
                        slot="column0"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{(pageNo - 1) * pageSize + scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row.status === 'valid' ? 'hasStart' : 'hasNotStart')}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import { paratner } from './partnerConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {};
                }
            },
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            },
        },
        components : {
            tableCom,
        },
        data () {
            return {
                //合作伙伴表头配置
                paratner : paratner,
                //表格数据
                tableData : [],
                //合作伙伴总数
                totalCount : 0,
                pageNo : 1,
                pageSize : 10,
                //合作伙伴列表是否收起
                isPackUp : false
            };
        },
        methods : {
            /**
             * 获取合作伙伴信息
             */
            queryList () {
                ajax.post('queryPartnerList',{
                    orgId : this.searchParams.id,
                    nodeType : 'partner',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                   if (res.success) {
                       this.tableData = res.data ? res.data.data : [];
                       this.totalCount = res.data.totalRow;
                   } else {
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
        },
        watch : {
            //默认展开的初始值
            isDefaultPackUp : {
                handler (newVal) {
                    if (newVal === true) {
                        this.isPackUp = true;
                    } else {
                        this.isPackUp = false;
                    }
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .partner{
        @include block_outline($height : auto);

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
                vertical-align: middle;
                cursor: pointer;

                .icon-arrow-down{
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
    }
</style>
