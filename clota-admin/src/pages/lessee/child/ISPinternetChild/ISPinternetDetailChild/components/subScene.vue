<!--下属景区-->

<template>
    <div class="sub-scene">
        <div class="pick-up-title" >
            <span class="label">下属景区</span>
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
                    :column-data="region"
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
    import {region} from './subSceneConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    export default {
        components : {
            tableCom,
        },
        props : {
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                //下属景区表头配置
                region : region,
                //表格数据
                tableData : [],
                //下属景区总数
                totalCount : 0,
                //是否收起
                isPackUp : true,
                pageNo : 1,
                pageSize :10
            }
        },
        methods: {
            /**
             * 查询下属景区信息
             */
            queryList () {
                ajax.post('getSubsidiaries',{
                    id : this.searchParams.id,
                    nodeType : 'scenic'
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data ? res.data : [];
                    }else{
                        this.tableData = [];
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
    .sub-scene{
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

            .custome{
                color: $color_blue;
            }
        }
    }
</style>
