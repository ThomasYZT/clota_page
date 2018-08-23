<template>
    <!--会员管理--会员积分--特殊会员权益管理-->
    <div class="member-special">

        <div class="content-item">
            <div class="title-wrap">特殊会员权益管理</div>
            <div class="btn-wrap">
                <Button type="primary" @click="showAddTypeModal">+ 新增特殊会员类别</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    :column-data="specialEmployeeHead"
                    :table-data="tableData"
                    :border="true"
                    :table-com-min-height="250"
                    :total-count="specialMemberDataCount"
                    @query-data="memberStaffTypeList">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"
                                    @click="linkToMember(scope.row)">
                                    关联会员信息
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <div class="content-item">
            <div class="title-wrap">按分类设置权益</div>
            <div class="table-wrap">
                   <table-com
                    :column-data="employeeTrustHead"
                    :table-data="tableData"
                    :border="true"
                    :total-count="specialMemberDataCount"
                    :table-com-min-height="250"
                    @query-data="specialMemberDiscountOfMemberList">
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"
                                    @click="cotactMemberInfo(scope.row)">
                                    设置积分、折扣率
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <!--新增特殊会员类别-->
        <add-special-type-modal ref="addSpecialType"></add-special-type-modal>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            ref="modifyRate"
            title="修改积分折扣率"
            :confirm-operate="setStoreDiscount">
        </modify-rate-modal>

    </div>
</template>

<script>

    import addSpecialTypeModal from './components/addSpecialTypeModal.vue';
    import modifyRateModal from './components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {specialEmployeeHead,employeeTrustHead} from './specialMemberConfig';
    import ajax from '@/api/index.js';

    export default {
        components: {
            addSpecialTypeModal,
            modifyRateModal,
            tableCom
        },
        data () {
            return {
                // 表格数据
                tableData: [
                    {
                        "companyId": null,
                        "createUser": null,
                        "createdTime": null,
                        "discountRate": null,
                        "id": null,
                        "isDeleted": null,
                        "levelId": 4,
                        "levelName": "普通会员",
                        "parentOrgId": null,
                        "scoreRate": null,
                        "staffTypeId": 1,
                        "staffTypeName": "普通员工",
                        "status": null,
                        "updateUser": null,
                        "updatedTime": null
                    },
                ],
                //特殊会员分类表头
                specialEmployeeHead : specialEmployeeHead,
                //普通会员与特殊会员分类表头
                employeeTrustHead : employeeTrustHead,
                //特殊会员表格数据
                specialMemberData : [],
                //特殊会员总条数
                specialMemberDataCount : 0,
                //特殊会员与普通会员对照表
                specialMemberBylyData : [],
                //特殊会员与普通会员对照表总条数
                specialMemberBylyDataCount : 0,
                //当前操作数据
                currentData : {}
            }
        },
        methods: {

            /**
             * 新增特殊会员类别
             */
            showAddTypeModal () {
                this.$refs.addSpecialType.show();
            },

            /**
             * 跳转到关联会员信息
             */
            linkToMember (rowData) {
                this.$router.push({
                    name : 'linkSpeMember',
                    params : {
                        memberInfo : rowData
                    }
                });
            },

            /**
             * 查询所有特殊会员类别
             * @param pageNo
             * @param pageSize
             */
            memberStaffTypeList ({pageNo,pageSize} = {pageNo : this.pageNo,pageSize : this.pageSize}) {
                this.pageNo = pageNo;
                this.pageSize = pageSize;
                ajax.post('memberStaffTypeList',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if(res.success){
                        this.specialMemberData = res.data.data ? res.data.data : [];
                        this.specialMemberDataCount = res.data.totalRow;
                    }else{
                        this.specialMemberData =  [];
                        this.specialMemberDataCount = 0;
                    }
                }).catch(err => {
                    this.specialMemberData =  [];
                    this.specialMemberDataCount = 0;
                });
            },
            /**
             * 关联会员信息
             * @param rowData 特殊会员信息
             */
            cotactMemberInfo (rowData) {
                this.currentData = rowData;
                this.$refs.modifyRate.show();
            },
             /**
             * 查询所有特殊会员类别与普通会员的对照表
             * @param pageNo
             * @param pageSize
             */
            specialMemberDiscountOfMemberList ({pageNo,pageSize} = {pageNo : this.pageNo,pageSize : this.pageSize}) {
                this.pageNo = pageNo;
                this.pageSize = pageSize;
                ajax.post('specialMemberDiscountOfMemberList',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if(res.success){
                        this.specialMemberBylyData = res.data.data ? res.data.data : [];
                        this.specialMemberBylyDataCount = res.data.totalRow;
                    }else{
                        this.specialMemberBylyData =  [];
                        this.specialMemberBylyDataCount = 0;
                    }
                }).catch(err => {
                    this.specialMemberBylyData =  [];
                    this.specialMemberBylyDataCount = 0;
                });
            },
            /**
             * 设置特殊会员折扣率
             * @param formData 表单数据
             * @param callback 新增完成回调
             */
            setStoreDiscount (formData,callback) {
                ajax.post('setSpecialMemberDiscountOfMember',{
                    levelId : this.currentData.levelId,
                    staffTypeId : this.currentData.staffTypeId,
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
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-special{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding: 20px 30px 0 30px;

        .content-item{
            margin-bottom: 30px;

            &:nth-last-of-type(1){
                margin-bottom: 0!important;
            }

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .btn-wrap{
                margin-bottom: 10px;
            }
        }

    }
</style>
