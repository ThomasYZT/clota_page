<!--
    我分配的销售政策列表模版元素
    作者：杨泽涛
-->
<template>
    <div class="my-distribute-policy">
        <div class="btn-wrap" v-if="(role === 'partner' || role === 'scenic')">
            <span>{{$t('saleChannels')}}：</span>
            <!--所属渠道：-->
            <Select v-model="channelId" @on-change="queryAllocatedPolicy">
                <Option v-for="(item,index) in allocatedChannels"
                        :key="index"
                        :value="item.id"
                        v-w-title="item.orgName">
                    {{$t(item.orgName)}}
                </Option>
            </Select>
        </div>

        <!--我分配的销售政策表格-->
        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="myAllocatedPolicyHead"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="filterParam.pageNo"
            :page-size-d.sync="filterParam.pageSize"
            :border="true"
            @query-data="queryAllocatedPolicy">
        </table-com>
    </div>
</template>

<script>
    import { myAllocatedPolicyHead } from '../../policyConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { configVariable } from '@/assets/js/constVariable';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //分配过销售政策的销售渠道列表
            allocatedChannels : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //所属渠道
                channelId : '',
                //我分配的销售政策表头
                myAllocatedPolicyHead : myAllocatedPolicyHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //过滤参数
                filterParam : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                }
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //当前机构角色
            role () {
                return this.manageOrgs.nodeType;
            }
        },
        methods : {
            /**
             * 查询分配给我的销售政策
             */
            queryAllocatedPolicy () {
                ajax.post('queryAllocatedPolicy', {
                    ...this.filterParam,
                    channelId : this.channelId === 'all' ? '' : this.channelId,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .my-distribute-policy {
        .btn-wrap {
            height: 58px;
            line-height: 56px;
            padding: 0px 30px;
            @include clearfix();

            /deep/ .ivu-btn {
                min-width: 88px;
                margin-right: 7px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                margin-right: 15px;
            }

            /deep/ .ivu-input{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .el-dropdown{
                line-height: 29px;
                color: $color_blue;
                border: 1px solid $color_blue;
                padding: 0 15px;
                border-radius: 4px;
                cursor: pointer;
            }

            .float-right{
                float: right;
            }

            .tips{
                font-size: $font_size_12px;
                color: $color_yellow;
            }

            /deep/ .ivu-select-item {
                overflow: hidden;
                text-overflow:ellipsis;
            }
        }
    }
</style>
