<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="policy-to-me-list">
        <!--表格搜索栏 仅合作伙伴、景区可见--分销给我的销售政策列表-->
        <div class="btn-wrap" v-if="(role === 'partner' || role === 'scenic')">
            <span>{{$t('scenePlace')}}：</span>
            <Select v-model="chooseOrgId" @on-change="queryDistPolicyList"> <!--所属景区：-->
                <Option v-for="(item,index) in scenicList" :key="index"
                        :value="item.id">{{$t(item.orgName)}}
                </Option>
            </Select>
            <div class="float-right">
                <Input v-model.trim="keywords"
                       :placeholder="$t('inputField',{field: $t('salePolicyName')})"
                       @on-enter="queryDistPolicyList"/>
                <Button type="primary" @click="queryDistPolicyList">{{$t("query")}}</Button>
            </div>
        </div>

        <!--分销给我的销售政策-->
        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="distributePolicyHead"
            :table-data="distPolicyData"
            :total-count="dTotal"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            @query-data="queryDistPolicyList"
            :border="true">
            <el-table-column
                slot="column5"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="normal" @click="check(scope.row)">{{$t('check')}}</li><!--查看-->
                        <li v-if="canAddAllocation && scope.row.canDistribution && scope.row.canDistribution === 'true'"
                            class="normal"
                            @click="distribute(scope.row)">{{$t('distribution')}}</li><!--分销-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!-- 分销 -->
        <distribution-modal @complete="distributeComplete($event)"
                            ref="distributionModal"></distribution-modal>
    </div>
</template>

<script>
    import { distributePolicyHead } from '../../policyConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import distributionModal from '../policyToMe/components/distributionModal';
    import { configVariable } from '@/assets/js/constVariable';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            scenicList : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        components : {
            tableCom,
            distributionModal
        },
        data () {
            return {
                //分销给我销售政策列表表头
                distributePolicyHead : distributePolicyHead,
                //表格数据
                distPolicyData : [],
                //表格数据总条数
                dTotal : 0,
                // 获取分销列表数据的请求参数
                queryParams : {
                    selectType : 'to',
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                },
                //关键字
                keywords : '',
                //所属景区
                chooseOrgId : '',
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //是否可以新建分销
            canAddAllocation () {
                return this.permissionInfo && 'addAllocation' in this.permissionInfo;
            },
            //当前机构角色
            role () {
                return this.manageOrgs.nodeType;
            }
        },
        methods : {
            // 查询分销给我的销售政策列表
            queryDistPolicyList () {
                ajax.post('queryPolicy', {
                    ...this.queryParams,
                    keyword : this.keywords,
                    chooseOrgId : this.chooseOrgId
                }).then((res) => {
                    this.dTotal = res.data.totalRow || 0;
                    this.distPolicyData = res.data ? res.data.data : [];
                });
            },
            /**
             * 查看分销详情 -- 分配给我的分销政策
             */
            check (data) {
                this.$router.push({
                    name : 'distributeDetail',
                    params : {
                        listItem : data
                    }
                });
            },
            /**
             *  分销操作
             */
            distribute (data) {
                if (!this.canAddAllocation) return;
                this.$refs.distributionModal.toggle(data);
            },
            /**
             * 分销成功
             */
            distributeComplete (data) {
                this.$router.push({
                    name : 'distributeDetail',
                    params : {
                        listItem : data
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .policy-to-me-list {
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
        }
    }

</style>
