<!--
内容：营销产品数据筛选组件
作者：djc
日期：
-->

<template>
    <div class="marketing-filter-box">
        <ul class="clearfix">
            <li>
                <span class="filter-label">{{$t('营销类别')}}</span>
                <Select v-model="filterParams.marketTypeId" class="field-item">
                    <Option v-for="item in marketingTypes"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.typeName)}}
                    </Option>
                </Select>
            </li>
            <li>
                <span class="filter-label">{{$t('营销等级')}}</span>
                <Select v-model="filterParams.marketLevelId" class="field-item">
                    <Option v-for="item in marketingLevels"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.levelName)}}
                    </Option>
                </Select>
            </li>
            <li>
                <!--销售政策-->
                <span class="filter-label">{{$t('product-policy')}}</span>
                <Select v-model="filterParams.policyId" class="field-item">
                    <Option v-for="item in salesPolicy"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name">
                        <div class="policy-name" v-w-title="item.name">{{item.name}}</div>
                    </Option>
                </Select>
            </li>
            <li>
                <Button type="primary" @click="searchList">{{$t("query")}}</Button>
                <Button type="ghost" @click="reset">{{$t("reset")}}</Button>
            </li>
        </ul>
        <!--销售政策描述-->
        <div class="policy-desc">
            {{$t('colonSetting', { key : $t('销售政策描述') })}}
            <span class="content">{{(policyItem ? policyItem.policyDesc : policyItem) | contentFilter}}</span>
            <Button type="primary" @click="checkPolicyDetail">{{$t("viewDetail")}}</Button>
        </div>
        <!--查看销售政策详情弹窗-->
        <policy-detail-modal ref="detailView"></policy-detail-modal>
    </div>
</template>
<script>
    import ajax from '@/api/index';
    import policyDetailModal from '@/pages/productCenter/marketingPolicy/components/policyDetailModal.vue';

    export default {
        components : { policyDetailModal },
        props : {},
        data () {
            return {
                filterParams : {
                    marketTypeId : 'all',
                    marketLevelId : 'all',
                    policyId : '',
                },
                // 重置使用的初始筛选条件
                resetFilter : {},
                // 营销类别列表
                marketingTypes : [{ id : 'all', typeName : 'all' }],
                // 营销等级列表
                marketingLevels : [],
                // 全部营销等级
                allMarketLevel : [{ id : 'all', levelName : 'all' }],
                // 销售政策列表
                salesPolicy : [],
            }
        },
        computed : {
            policyItem () {
                return this.salesPolicy.find(item => {
                    return this.filterParams.policyId == item.id;
                });
            }
        },
        created () {
            this.resetFilter = JSON.stringify(this.filterParams);
            this.getMarketingTypes();
            this.getSalesPolicy();
        },
        mounted () {
        },
        watch : {
            'filterParams.marketTypeId' : {
                handler (val, oldVal) {
                    this.getMarketingLevels(val);
                },
                immediate : true
            },
            // 监听筛选条件只要有改变，就查询列表数据
            filterParams : {
                handler (val, oldVal) {
                    this.searchList();
                },
                deep : true
            }
        },
        methods : {
            /**
             * 获取营销类别列表数据
             **/
            getMarketingTypes () {
                ajax.post('marketing-typeList').then(res => {
                    if (res.success) {
                        this.marketingTypes = res.data ? res.data : [];
                        this.filterParams.marketTypeId = this.marketingTypes.length > 0 ? this.marketingTypes[0].id : '';
                    } else {
                        this.marketingTypes = [];
                    }
                });
            },
            /**
             * 获取营销级别列表数据
             * @param typeId
             **/
            getMarketingLevels (typeId) {
                ajax.post('marketing-listLevel', {
                    pageNo : 1,
                    pageSize : 9999,
                    typeId : typeId || this.filterParams.marketTypeId
                }).then(res => {
                    if (res.success) {
                        this.marketingLevels = res.data ? res.data.data : [];
                        this.filterParams.marketLevelId = this.marketingLevels.length > 0 ? this.marketingLevels[0].id : '';
                    } else {
                        this.marketingLevels = [];
                    }
                });
            },
            getSalesPolicy () {
                ajax.post('queryPolicy', {
                    pageNo : 1,
                    pageSize : 9999,
                    selectType : 'from'
                }).then(res => {
                    if (res.success) {
                        this.salesPolicy = res.data ? res.data.data : [];
                        //默认选中第一个政策
                        this.filterParams.policyId = this.salesPolicy.length > 0 ? this.salesPolicy[0].id : '';
                    } else {
                        this.salesPolicy = [];
                    }
                });
            },
            /**
             * 获取提现记录列表数据
             */
            searchList () {
                this.$emit('on-search', this.filterParams);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.filterParams = JSON.parse(this.resetFilter);
            },
            /**
             * 查看销售政策详情
             */
            checkPolicyDetail () {
                //显示弹窗
                if (this.policyItem) {
                    this.$refs.detailView.toggle(this.policyItem, 'marketing');
                } else {
                    this.$Message.error(this.$t('selectField', { msg : this.$t('marketingPolicy') }));
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-filter-box {
        padding: 15px 20px;

        > ul > li {
            float: left;
            margin-right: 20px;
        }
        .filter-label {
            float: left;
            padding: 4px 10px 4px 0;
        }
        .field-item {
            width: 150px;
        }

        .policy-name {
            padding-right: 12px;
            @include overflow_tip();
        }

        .policy-desc {
            margin-top: 10px;
            .content {
                display: inline-block;
                width: 653px;
            }
        }
    }

    /deep/ .ivu-btn-primary {
        margin-right: 8px;
    }
</style>
