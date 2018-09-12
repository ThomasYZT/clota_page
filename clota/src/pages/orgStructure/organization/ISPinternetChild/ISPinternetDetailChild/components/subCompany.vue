<!--下属公司-->

<template>
    <div class="sub-company">
        <div class="pick-up-title" >
            <span class="label">下属公司</span>
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
                    :column-data="companies"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="queryList">
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import {companies} from './subCompanyConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //表格查询参数
            'search-params' : {
                type : Object,
                default () {
                    return {}
                }
            },
            //当前组织架构类型
            'activeTap' : {
                type : String,
                default : ''
            }
        },
        components : {
            tableCom,
        },
        data() {
            return {
                //下属公司表头配置
                companies : companies,
                //表格数据
                tableData : [],
                //下属公司总数
                totalCount : 0,
                //是否收起
                isPackUp : true,
                pageNo : 1,
                pageSize :10
            }
        },
        methods: {
            /**
             * 查询下属公司信息
             */
            queryList () {
                ajax.post('getSubNodePage',{
                    orgId : this.searchParams.id,
                    nodeType : 'company',
                    page : this.pageNo,
                    pageSize : this.pageSize,
                    manageType : this.activeTap,
                }).then(res => {
                   if(res.success){
                       this.tableData = res.data ? res.data.data : [];
                       this.totalCount = res.data.totalRow;
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
                return this.searchParams && !!this.searchParams.id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .sub-company{
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

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
