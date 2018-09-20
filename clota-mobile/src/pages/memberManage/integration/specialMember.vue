<template>
    <!--会员管理--会员积分--特殊会员权益管理-->
    <div class="member-special">

        <div class="content-item">
            <div class="title-wrap">{{$t('specialMember')}}</div>
            <div class="btn-wrap">
                <Button type="primary" @click="showAddTypeModal">+ {{$t('addSpecialMemType')}}</Button>
                <Button type="ghost" @click="linkToMember">{{$t('linkSpecialMemType')}}</Button>
            </div>
            <div class="table-wrap short-table">
                <table-com
                    :column-data="specialEmployeeHead"
                    :table-data="specialMemberData"
                    :border="true"
                    :table-com-min-height="250"
                    :auto-height="true"
                    :total-count="specialMemberDataCount"
                    @query-data="memberStaffTypeList"
                    @selection-change="requeryEmployeeTypes">
                    <el-table-column
                        slot="column0"
                        slot-scope="row"
                        type="selection"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                    </el-table-column>
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                             <ul class="operate-list">
                                <li @click="modifyEmployeeType(scope.row)">{{$t('modify')}}</li>
                                <li class="red-label" @click="delEmployeeType(scope.row)">{{$t('del')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <div class="content-item">
            <div class="title-wrap">{{$t('setRightByType')}}</div>
            <div class="table-wrap">
                   <table-com
                    :column-data="employeeTrustHead"
                    :table-data="specialMemberBylyData"
                    :border="true"
                    :total-count="specialMemberDataCount"
                    :auto-height="true"
                    :table-com-min-height="250"
                    @query-data="getStaffLevelInfo">
                       <el-table-column
                           slot="column2"
                           slot-scope="row"
                           :label="row.title"
                           :width="row.width"
                           :min-width="row.minWidth">
                           <template slot-scope="scope">
                               {{(scope.row.scoreRate !== '' && scope.row.scoreRate !== null ? (scope.row.scoreRate + ':' + 1) : '') | contentFilter}}
                           </template>
                       </el-table-column>
                    <el-table-column
                        slot="column5"
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <ul class="operate-list">
                                <li
                                    v-if="!isNotEmpty(scope.row.discountRate) || !isNotEmpty(scope.row.scoreRate)"
                                    @click="setInteger(scope.row)">{{$t('setIntegralDiscountRate')}}</li>
                                <li v-else @click="setInteger(scope.row)">{{$t('ModifyIntegralDiscountRate')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <!--新增特殊会员类别-->
        <add-special-type-modal
            ref="addSpecialType"
            :employee-type-info='specialCurrentData'
            @fresh-data="freshData">
        </add-special-type-modal>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            ref="modifyRate"
            :title="$t('specialMemSetting')"
            :integra-data="currentData"
            :confirm-operate="setStoreDiscount">
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('specialMemType')" style="margin-bottom: 10px!important;">
                    <span class="special-title">
                        {{currentData.levelDesc}}-{{currentData.staffDesc}}
                    </span>
                </Form-item>
            </div>
        </modify-rate-modal>

        <!--删除模态框-->
        <del-modal v-model="visible"
                   @confirm-del="deleteCardFunc"
                   :special-member-name="memberInfo.staffDesc">
        </del-modal>

    </div>
</template>

<script>

    import addSpecialTypeModal from './components/addSpecialTypeModal.vue';
    import modifyRateModal from './components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {specialEmployeeHead,employeeTrustHead} from './specialMemberConfig';
    import ajax from '@/api/index.js';
    import delModal from './components/delModal';

    export default {
        components: {
            addSpecialTypeModal,
            modifyRateModal,
            tableCom,
            delModal
        },
        data () {
            return {
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
                //当前操作的按分类设置权益信息
                currentData : {},
                //当前操作的特殊会员分类信息
                specialCurrentData : {},
                //删除模态框是否显示
                visible : false,
                //当前将要删除的特殊会员分类信息
                memberInfo : {}
            }
        },
        methods: {

            /**
             * 新增特殊会员类别
             */
            showAddTypeModal () {
                this.specialCurrentData = {};
                this.$refs.addSpecialType.show();
            },

            /**
             * 跳转到关联会员信息
             */
            linkToMember () {
                this.$router.push({
                    name : 'linkSpeMember'
                });
            },

            /**
             * 查询所有特殊会员类别
             */
            memberStaffTypeList () {
                ajax.post('memberStaffTypeList',{
                    pageNo : 1,
                    pageSize : 9999,
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
             * 设置特殊会员积分率和折扣率
             * @param rowData 特殊会员信息
             */
            setInteger (rowData) {
                this.currentData = rowData;
                this.$refs.modifyRate.show();
            },
             /**
             * 查询所有特殊会员类别与普通会员的对照表
             */
            getStaffLevelInfo () {
                ajax.post('getStaffLevelInfo',{
                    pageNo : 1,
                    pageSize : 9999,
                }).then(res => {
                    if(res.success){
                        this.specialMemberBylyData = [];
                        if(res.data){
                            res.data.forEach(item => {
                                if(item.staff){
                                    item.staff.forEach(list => {
                                        this.specialMemberBylyData.push ({
                                            ...list,
                                            levelDesc : item.level.levelDesc,
                                            orgId : item.orgId,
                                            levelId : item.level.id
                                        });
                                    });
                                }
                            });
                        }
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
                ajax.post('setMemberDiscountOfMember',{
                    id : this.currentData.memberDiscountId,
                    levelId : this.currentData.levelId,
                    staffTypeId : this.currentData.id,
                    discountRate : formData.discountRate,
                    scoreRate : formData.scoreRate,
                    remark : formData.remark
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('settingSuccess'));  // 设置成功
                        this.getStaffLevelInfo();
                    }else{
                        this.$Message.error(this.$t('settingFail'));    // 设置失败
                    }
                }).finally(() => {
                    callback();
                });
            },
            /**
             * 刷新员工分类数据和按分类设置权益数据
             */
            freshData () {
                this.getStaffLevelInfo();
                this.memberStaffTypeList();
            },
            /**
             * 判断val是否为空
             * @param val
             */
            isNotEmpty(val) {
                return val !== null && val !== '' && val !== undefined;
            },
            /**
             * 删除特殊会员分类
             * @param data 特殊会员信息
             */
            delEmployeeType (data) {
                this.memberInfo = data;
                this.visible = true;

            },
            /**
             * 确定删除特殊会员分类
             */
            deleteCardFunc () {
                ajax.post('deleteMemberStaffType',{
                    id : this.memberInfo.id
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: this.$t('del')}));      // 删除成功
                        this.memberStaffTypeList();
                        this.getStaffLevelInfo();
                    }else{
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('del')}) );    // 删除失败
                    }
                });
            },
            /**
                修改特殊会员分类
                @param data
             */
            modifyEmployeeType (data) {
                this.specialCurrentData = data;
                this.$refs.addSpecialType.show();
            },
            /**
             * 重新按照特殊会员分类查询权益设置
             * @param data
             */
            requeryEmployeeTypes (data) {
                this.getStaffLevelInfo();
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

                /deep/ .ivu-btn-ghost{
                    margin-left: 15px;
                }
            }

            .short-table{
                width: 520px;
            }
        }

        .special-title{
            font-size: $font_size_14px;
            color: $color_666;
        }

        .operate-list{
            @include table_operate();
        }

    }
</style>
