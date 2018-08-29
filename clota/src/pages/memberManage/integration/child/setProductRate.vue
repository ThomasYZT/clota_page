<template>
    <!--会员管理--会员积分--设置积分率折扣率（类型/产品）-->
    <div class="integration-set-rate-for-product">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="'按类别或产品设置积分、折扣率'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="rate-content">
            <div class="title-wrap">店铺：{{ memberInfo.deptName }}</div>
            <div class="filter-wrap">
                <Input v-model.trim="queryParams.keyword"
                       placeholder="请输入产品名称"
                       style="width: 240px;margin-right: 15px;" />
                <Button type="primary" @click="queryList">{{$t('query')}}</Button>
                <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    v-if="tableCanMount"
                    :ofsetHeight="215"
                    :show-pagination="true"
                    :page-no-d.sync="pageNo"
                    :page-size-d.sync="pageSize"
                    :column-data="columnData"
                    :total-count="totalCount"
                    :table-data="tableData"
                    :border="true"
                    @query-data="queryList">
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{(scope.row.prodScoreRate !== '' && scope.row.prodScoreRate !== null ? (scope.row.prodScoreRate + ':' + 1) : '') | contentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column5"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <ul class="operate-list">
                                <li
                                    v-if="!isNotEmpty(scope.row.prodScoreRate) || !isNotEmpty(scope.row.prodDiscountRate)"
                                    @click="showModifyModal(scope.row)">设置积分、折扣率</li>
                                <li v-else @click="showModifyModal(scope.row)">修改积分、折扣率</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            ref="modifyRate"
            :integra-data="integraData"
            title="设置卡级店铺消费积分和折扣权益"
            :confirm-operate="setStoreDiscount">
        </modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from '../components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './setProductRateConfig';
    import ajax from '@/api/index.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            modifyRateModal,
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //跳转信息
                memberInfo: {},
                // 查询数据
                queryParams: {
                    keyword: '',
                },
                // 表格数据
                tableData: [],
                //总条数
                total: 50,
                //表头配置
                columnData : columnData,
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前操作的行数据
                currentData : {},
                //上级路由列表
                // beforeRouterList: ,
                //会员卡级别名称
                levelName : ''
            }
        },
        methods: {
            /**
             * 显示设置店铺折扣率模态框
             * @param data
             */
            showModifyModal ( data ) {
                this.currentData = data;
                this.$refs.modifyRate.show();
            },

            /**
             * 查询产品信息
             */
            queryList () {
                ajax.post('memberDiscountOfProductList',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    deptDiscountId : this.memberInfo.id,
                    productName : this.queryParams.keyword,
                    orgId : this.memberInfo.orgId,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData =  [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData =  [];
                    this.totalCount = 0;
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params){
                if(params.memberInfo && Object.keys(params.memberInfo).length > 0){
                    this.memberInfo = params.memberInfo;
                    this.levelName = params.levelName;
                }else{
                    this.$router.push({
                        name : 'integration'
                    })
                }
            },
            /**
             * 重置查询条件
             */
            reset () {
                this.queryParams.keyword = '';
                this.queryList();
            },
            /**
             * 设置产品折扣率
             * @param formData 表单数据
             * @param callback 新增完成回调
             */
            setStoreDiscount (formData,callback) {
                ajax.post('setMemberDiscountOfProduct',{
                    id : this.currentData.id,
                    storeDiscountId : this.memberInfo.id,
                    prodDiscountRate : formData.discountRate,
                    prodScoreRate : formData.scoreRate,
                    productId : this.currentData.productId,
                    remark : formData.remark
                }).then(res => {
                    if(res.success){
                        this.$Message.success('设置成功');
                        this.queryList();
                    }else{
                        this.$Message.error('设置失败');
                    }
                }).finally(() => {
                    callback();
                });
            },
            /**
             * 判断val是否为空
             * @param val
             */
            isNotEmpty(val) {
                return val !== null && val !== '' && val !== undefined;
            },
        },
        computed : {
            //表格是否需要显示
            tableCanMount () {
                return this.memberInfo && !!this.memberInfo.levelId;
            },
            //面包屑路由信息
            beforeRouterList () {
                return [
                    {
                        name: this.$t('integration'),
                        router: {
                            name: 'integration'
                        }
                    },
                    {
                        name: this.levelName + this.$t('integration'),
                        router: {
                            name: 'setRate'
                        }
                    }
                ]
            },
            //传递给模态框的积分折扣率信息
            integraData () {
                if(this.currentData && Object.keys(this.currentData).length > 0){
                    return {
                        discountRate : this.currentData.prodDiscountRate,
                        remark : this.currentData.remark,
                        scoreRate : this.currentData.prodScoreRate,
                    }
                }else{
                    return {};
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .integration-set-rate-for-product {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box {
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .rate-content{
            @include block_outline($height : unquote('calc(100% - 70px)'));
            padding: 20px 30px 0 30px;

            .title-wrap{
                font-size: $font_size_18px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .filter-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{
                height: calc(100% - 100px);
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }
        }

        .operate-list{
            @include table_operate();
        }

    }

</style>
