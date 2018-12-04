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
                            :value="item.id">
                        <div class="policy-desc" v-w-title="item.policyDesc">{{$t(item.policyDesc)}}</div>
                    </Option>
                </Select>
            </li>
            <li>
                <Button type="primary" @click="searchList">{{$t("query")}}</Button>
                <Button type="ghost" @click="reset">{{$t("reset")}}</Button>
            </li>
        </ul>
    </div>
</template>
<script>
    import ajax from '@/api/index';

    export default {
        components : {},
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
        computed : {},
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
                        this.marketingTypes = this.marketingTypes.concat(res.data || []);
                    }
                });
            },
            /**
             * 获取营销级别列表数据
             * @param typeId
             **/
            getMarketingLevels (typeId) {
                if (typeId.includes('all')) {
                    this.marketingLevels = this.allMarketLevel;
                } else {
                    ajax.post('marketing-listLevel', {
                        pageNo : 1,
                        pageSize : 9999,
                        typeId : typeId || this.filterParams.marketTypeId
                    }).then(res => {
                        if (res.success) {
                            this.marketingLevels = res.data ? this.allMarketLevel.concat(res.data.data || []) : this.allMarketLevel;
                        } else {
                            this.marketingLevels = this.allMarketLevel;
                        }
                    });
                }
            },
            getSalesPolicy () {
                ajax.post('queryPolicy', {
                    pageNo : 1,
                    pageSize : 9999,
                    selectType : 'from'
                }).then(res => {
                    if (res.success && res.data) {
                        this.salesPolicy = res.data.data || [];
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

        .policy-desc {
            padding-right: 12px;
            @include overflow_tip();
        }
    }

    /deep/ .ivu-btn-primary {
        margin-right: 8px;
    }
</style>
