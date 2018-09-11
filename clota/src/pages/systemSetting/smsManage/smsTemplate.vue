<!--
内容：短信模板 - 列表
作者：djc
日期：
-->

<template>
    <div class="sms-template">
        <div class="filter-box">
            <Button type="primary" @click="$router.push({name: 'addSmsTemplate'})">{{$t('add')}}</Button>
            <Button type="primary" :disabled="selectedTpl.length < 1">{{$t('批量删除')}}</Button>
            <Input class="input-field"
                   v-model.trim="filterParam.name"
                   icon="ios-search"
                   :placeholder="$t('inputField', {field: $t('模板名称')})"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            :column-check="true"
            @query-data="queryList"
            @selection-change="changeSelection">
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div class="tpl-content" v-w-title="scope.row.templateContent">{{scope.row.templateContent}}</div>
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate" @click="goEditSms(scope.row)">{{$t('edit')}}</span>
                    <!--<span class="operate" @click="checkSmsDetail(scope.row)">{{$t('check')}}</span>&lt;!&ndash;查看&ndash;&gt;-->
                </template>
            </el-table-column>
        </table-com>

        <!--查看短信模板信息 - 弹窗-->
        <check-tpl-modal ref="checkTplModal"></check-tpl-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {smsTplHead} from './smsTemplateConfig';
    import checkTplModal from './components/checkTplModal.vue';

    export default {
        components: {tableCom, checkTplModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    name: '',
                },
                // 表格表头字段名
                columnData: smsTplHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
                // 已勾选的模板
                selectedTpl: [],
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            queryList() {
                this.tableData = [
                    {
                        'code': '00002103965',
                        'templateName': '星火旅行社1',
                        'templateType': '票内业态',
                        'templateContent': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'isInlay': '是',
                        'createdTime': '2018-04-17 15:31:00',
                    },{
                        'code': '00002103964',
                        'templateName': '星火旅行社2',
                        'templateType': '票内业态',
                        'templateContent': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'isInlay': '是',
                        'createdTime': '2018-04-16 15:31:00',
                    },{
                        'code': '00002103963',
                        'templateName': '星火旅行社3',
                        'templateType': '票内业态',
                        'templateContent': '银科环企智慧旅游平台】尊敬的$name(先生科环发快递了了二)',
                        'isInlay': '是',
                        'createdTime': '2018-04-15 15:31:00',
                    },

                ];
                this.totalCount = this.tableData.length;
            },

            // 搜索短信套餐
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },
            /**
             * 跳转至编辑模板，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            goEditSms(scopeRow) {
                this.$router.push({
                    name: 'addSmsTemplate',
                    query: {type: 'modify'},
                    params: scopeRow
                });
            },
            /**
             * 查看短信模板详情，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            checkSmsDetail(scopeRow) {
                this.$refs.checkTplModal.show({item: scopeRow});
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection(selection) {
                this.selectedTpl = selection;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .operate {
        color: $color_blue;
        cursor: pointer;
    }

    .filter-box {
        padding: 15px 30px 15px;
        overflow: hidden;
        .input-field {
            width: 350px;
            float: right;
        }
    }

    .tpl-content {
        @include overflow_tip();
    }
</style>
