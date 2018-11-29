<!--
内容：数据筛选组件
作者：djc
日期：
-->

<template>
    <div class="withdraw-filter">
        <ul class="clearfix">
            <li>
                <span class="filter-label">{{$t('审核状态')}}</span>
                <Select v-model="filterParams.auditStatus" class="field-item">
                    <!--<Option v-for="item in orderEnterprise"
                            :key="item.id"
                            :value="item.id">
                        {{$t(item.orgName)}}
                    </Option>-->
                </Select>
            </li>
            <li>
                <span class="filter-label">{{$t('营销类别')}}</span>
                <Select v-model="filterParams.marketingType" class="field-item">

                </Select>
            </li>
            <li>
                <span class="filter-label">{{$t('营销等级')}}</span>
                <Select v-model="filterParams.marketingLevel" class="field-item">

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

    export default {
        components : {},
        props : {},
        data () {
            return {
                filterParams : {
                    auditStatus : '',
                    marketingType : '',
                    marketingLevel : '',
                },
                // 重置使用的初始筛选条件
                resetFilter : {}
            }
        },
        computed : {},
        created () {
            this.resetFilter = JSON.stringify(this.filterParams);
        },
        mounted () {
        },
        watch : {},
        methods : {
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

            },
        }
    };
</script>

<style lang="scss" scoped>
    .withdraw-filter {
        padding: 15px 20px 0 20px;

        ul > li {
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
