<template>
    <!--会员管理--会员积分--设置积分率折扣率-->
    <div class="integration-set-rate">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="memberInfo.levelName + '积分、折扣率设置'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="rate-content">
            <div class="title-wrap">会员：{{ memberInfo.levelName }}</div>
            <div class="filter-wrap">
                <Input v-model.trim="queryParams.keyword"
                       placeholder="请输入店铺名称"
                       style="width: 240px" />
                <Button type="primary" @click="queryList">查 询</Button>
                <Button type="ghost" @click="reset">重 置</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    v-if="tableCanMount"
                    :page-no-d.sync="pageNo"
                    :page-size-d.sync="pageSize"
                    :ofsetHeight="220"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    @query-data="queryList">
                    <el-table-column
                        slot="column3"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue" @click="showModifyModal(scope.row)">设置积分、折扣率</span>
                                <span class="span-blue" @click="setProductRate(scope.row)">按产品设置积分、折扣率</span>
                            </div>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            ref="modifyRate"
            title="设置卡级店铺消费积分和折扣权益"
            :confirm-operate="setStoreDiscount">
        </modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from '../components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './setRateConfig';
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
                tableData: [
                    {}
                ],
                //总条数
                total: 50,
                //会员级别id
                levelDiscountId : '',
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
                beforeRouterList: [
                    {
                        name: this.$t('integration'),
                        router: {
                            name: 'integration'
                        }
                    }
                ],
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
             * 跳转到按商品进行折扣的页面
             * @param data
             */
            setProductRate ( data ) {
                this.$router.push({
                    name: 'setProductRate',
                    params : {
                        memberInfo : Object.assign({
                            levelId : this.memberInfo.levelId,
                            productName : data.productName
                        },data),
                        levelName : this.memberInfo.levelName
                    }
                });
            },

            /**
             * 查询店铺信息
             */
            queryList () {
                ajax.post('memberDiscountOfStoreList',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    levelDiscountId : this.memberInfo.levelId,
                    orgName : this.queryParams.keyword,
                }).then(res => {
                    if(res.success){
                        // this.tableData = res.data.data ? res.data.data : [];
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
                    this.levelDiscountId = params.memberInfo.levelId;
                    this.memberInfo = params.memberInfo;
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
             * 设置店铺折扣率
             * @param formData 表单数据
             * @param callback 新增完成回调
             */
            setStoreDiscount (formData,callback) {
                ajax.post('setMemberDiscountOfStore',{
                    levelDiscountId : this.memberInfo.levelId,
                    orgIds : this.currentData.orgId,
                    discountRate : formData.discountRate,
                    scoreRate : formData.scoreRate,
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
            }
        },
        computed : {
            //表格是否需要显示
            tableCanMount () {
                return this.memberInfo && !!this.memberInfo.levelId;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .integration-set-rate {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
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
                margin-bottom: 10px;
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

    }

</style>
