<!--
内容：提现记录数据筛选组件
作者：djc
日期：
-->

<template>
    <div class="withdraw-filter">
        <ul class="clearfix">
            <li>
                <span class="filter-label">{{$t('auditStatus')}}</span>
                <Select v-model="filterParams.auditStatus" class="field-item">
                    <Option v-for="item in auditStatusList"
                            :key="item.value"
                            :value="item.value">
                        {{$t(item.label)}}
                    </Option>
                </Select>
            </li>
            <li>
                <span class="filter-label">{{$t('marketType')}}</span>
                <Select v-model="filterParams.marketTypeId" class="field-item">
                    <Option v-for="item in marketingTypes"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.typeName)}}
                    </Option>
                </Select>
            </li>
            <li>
                <span class="filter-label">{{$t('marketingLevel')}}</span>
                <Select v-model="filterParams.marketLevelId" class="field-item">
                    <Option v-for="item in marketingLevels"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.levelName)}}
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
    import { auditStatusList } from '../cashRecordConfig';
    import ajax from '@/api/index';

    export default {
        components : {},
        props : {},
        data () {
            return {
                filterParams : {
                    auditStatus : 'reject_no_req,reject,success,auditing,pass',// reject_no_req,reject,success,auditing,pass
                    marketTypeId : 'all',
                    marketLevelId : 'all',
                },
                // 重置使用的初始筛选条件
                resetFilter : {},
                // 审核状态列表
                auditStatusList : auditStatusList,
                // 营销类别列表
                marketingTypes : [{ id : 'all', typeName : 'all' }],
                // 营销等级列表
                marketingLevels : [],
                // 全部营销等级
                allMarketLevel : [{ id : 'all', levelName : 'all' }],
            }
        },
        computed : {},
        created () {
            this.resetFilter = JSON.stringify(this.filterParams);
            this.getMarketingTypes();
        },
        mounted () {
        },
        watch : {
            // 营销类别改变的同时更新营销等级列表
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
    .withdraw-filter {
        padding: 15px 20px 0 20px;

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
    }

    /deep/ .ivu-btn-primary {
        margin-right: 8px;
    }
</style>
