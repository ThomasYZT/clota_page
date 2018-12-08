<!--
内容：销售用户信息数据筛选组件
作者：djc
日期：
-->

<template>
    <div class="filter-box">
        <ul class="clearfix">
            <li>
                <span class="filter-label">{{$t('营销类别')}}</span>
                <Select v-model="filterParams.marketTypeId"
                        class="field-item">
                    <Option v-for="item in marketingTypes"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.typeName)}}
                    </Option>
                </Select>
            </li>
            <li>
                <i-input v-model.trim="filterParams.keyword"
                         style="width: 240px;"
                         :placeholder="$t('请输入查询内容')"
                         @on-enter="searchList">
                </i-input><!--请输入查询内容-->
            </li>
            <li>
                <Button type="primary" @click="searchList">{{$t("query")}}</Button>
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
                    keyword : '',
                },
                // 营销类别列表
                marketingTypes : [{ id : 'all', typeName : 'all' }],
            }
        },
        computed : {},
        created () {
            this.getMarketingTypes();
        },
        mounted () {
        },
        watch : {
            'filterParams.marketTypeId' : {
                handler (val, oldVal) {
                    this.searchList();
                }
            },
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
             * 获取营销产品列表数据
             */
            searchList () {
                this.$emit('on-search', this.filterParams);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .filter-box {
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
    }

    /deep/ .ivu-btn-primary {
        margin-right: 8px;
    }
</style>
