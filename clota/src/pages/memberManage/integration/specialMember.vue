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
                    :table-data="specialMemberData"
                    :border="true"
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
                                    @click="cotactMemberInfo(scope.row)">
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
                    :table-data="specialMemberBylyData"
                    :border="true"
                    :total-count="specialMemberDataCount"
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
                <!-- <el-table
                    :data="tableData"
                    :border="false"
                    style="width: 100%">
                    <el-table-column
                        prop="level"
                        label="会员级别">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span class="span-blue"  @click="showModifyModal(scope)">修改积分、折扣率</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table> -->
            </div>
        </div>

        <!--新增特殊会员类别-->
        <add-special-type-modal ref="addSpecialType"></add-special-type-modal>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal ref="modifyRate" title="修改积分折扣率"></modify-rate-modal>

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
                        level: '普通会员',
                        type: '普通员工',
                    },
                    {
                        level: '黄金会员',
                        type: '经理级',
                    },
                    {
                        level: '铂金会员',
                        type: '项目老总',
                    },
                    {
                        level: '钻石会员',
                        type: '董事长',
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
            }
        },
        methods: {

            showAddTypeModal () {
                this.$refs.addSpecialType.show();
            },

            linkTo ( data ) {
                console.log(data);
                this.$router.push({ name: 'linkSpeMember', query: { info: data.row }});
            },

            showModifyModal ( data ) {
                console.log(data);
                this.$refs.modifyRate.show();
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
