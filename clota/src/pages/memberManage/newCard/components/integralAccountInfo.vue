<!--
内容：积分账户信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('integerAccountName')}}</div>
        <div class="table-wrap">
            <table-com
                :auto-height="true"
                :table-com-min-height="250"
                :column-data="columnData"
                :table-data="tableData"
                :border="false">
            </table-com>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components : { tableCom },
        props : {
            //积分账户信息
            'account-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                // 表头信息
                columnData : [
                    {
                        title : 'pointBalance',
                        minWidth : 180,
                        field : 'accountBalance',
                    },
                ],
            };
        },
        computed : {
            //表格数据
            tableData () {
                if (this.accountInfo && Object.keys(this.accountInfo).length > 0) {
                    return [this.accountInfo];
                } else {
                    return [];
                }
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {}
    };
</script>

<style lang="scss" scoped>
    .table-wrap {
        width: 300px;
    }
</style>
