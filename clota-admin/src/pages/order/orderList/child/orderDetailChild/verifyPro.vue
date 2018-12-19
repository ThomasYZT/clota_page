<!--核销信息-->

<template>
    <div class="note-table">
        <div class="table-name">
            <span class="label">核销信息</span>
            <span class="back-up"
                  @click="isPackUpLoad = !isPackUpLoad">
            {{$t(isPackUpLoad ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUpLoad}"></span>
          </span>
        </div>
        <transition name="fade">
            <div v-if="isPackUpLoad">
                <table-com
                    :table-data="tableData"
                    :column-data="comVerify"
                    :is-pack-up="true"
                    :show-page="true"
                    :total="comTotalCount"
                    @get-new-data="getComVerifyInfo">
                    <div class="employee-account" slot="table-title">
                        <span class="note-record">{{$t('入园核销日志')}}</span>
                    </div>
                    <el-table-column
                        slot="column5"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <ul class="operate-info">
                                <li class="operate-list" @click="synchronizate(scoped.row)">同步</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
                <table-com
                    :table-data="tableData"
                    :column-data="productVerify"
                    :is-pack-up="true"
                    :show-table-bar="false"
                    :show-page="true"
                    :total="verTotalCount"
                    @get-new-data="getComVerifyInfo">
                    <div class="employee-account" slot="table-title">
                        <span class="note-record">{{$t('项目核销日志')}}</span>
                    </div>
                </table-com>
            </div>
        </transition>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { comVerify,productVerify } from './verifyProConfig';
    export default {
        props : {
            //订单类型
            'order-type' : {
                type : String,
                default : ''
            }
        },
        components : {
            tableCom,
        },
        data () {
            return {
                //表格数据
                tableData : [
                    {
                        aa : '2016-05-03',
                        realName : '王小虎',
                        address : '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        aa : '2016-05-03',
                        realName : '王小虎',
                        address : '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                //入园核销日志总数
                comTotalCount : 100,
                //项目核销日志总数
                verTotalCount : 100,
                //是否展开表格
                isPackUpLoad : true,
            };
        },
        methods : {
            /**
             * 获取入园核销日志
             * @param data
             */
            getComVerifyInfo (data) {
                console.log(data);
            },
            /**
             * 同步入园核销日志
             * @param data
             */
            synchronizate (data) {
                this.$Message.success('同步成功');
            }
        },
        computed : {
            //入园核销表头
            comVerify () {
                if (this.orderType === 'custom') {
                    return comVerify;
                } else if (this.orderType === 'team') {
                    return comVerify.slice(0,3);
                } else {
                    return [];
                }
            },
            //项目核销表头
            productVerify () {
                if (this.orderType === 'custom') {
                    return productVerify;
                } else if (this.orderType === 'team') {
                    return productVerify.slice(0,3);
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .note-table{

        .table-name {
            @include block_outline($height: 49px);
            padding: 25px 0 0 0;

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
            }
        }

        .operate-info{
            @include table_operate();

            .operate-list{
                color: $color_blue;
            }
        }

        .employee-account {
            @include block_outline(auto);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;

            .note-record{
                display: block;
                margin-bottom: 5px;
                font-size: $font_size_13px;
                color: $color_333;
            }

        }
        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }

        .back-up {
            font-size: $font_size_14px;
            color: $color_blue;
            display: inline-block;
            margin-left: 10px;
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
</style>
