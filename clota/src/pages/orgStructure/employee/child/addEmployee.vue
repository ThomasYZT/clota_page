<template>
    <!--新增/修改员工信息-->
    <div class="add-employee">
        <div class="breadcrumb-box">

            <bread-crumb-head
                :before-router-list="beforeRouterList"
                :locale-router="localeRouter">
            </bread-crumb-head>
        </div>
        <div class="add-employee-content">

            <!--基本信息-->
            <basic-form ref="basicForm" :employee-info="employeeData"></basic-form>

            <div class="content-footer"
                 v-if="canSaveEmployee">
                <i-button type="primary"
                          :loading="loading"
                          @click="confirmModify">
                    {{type=='add' ? $t('confirmAdd') : $t('confirm')}}
                </i-button>
                <router-link :to="{name: 'generalEmployeeManager'}">
                    <i-button type="ghost">{{$t('cancel')}}</i-button>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import basicForm from './basicInfo.vue';
    import MD5 from 'crypto-js/md5';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            basicForm,
            breadCrumbHead
        },
        mixins: [lifeCycleMixins],
        data() {
            return {
                // 面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'employee',   // 员工
                        router: {
                            name: 'generalEmployeeManager'
                        }
                    }
                ],
                //新增/修改
                type: 'add',
                loading: false,
                // 员工信息数据
                employeeData: {},
            }
        },
        computed: {
            localeRouter () {
                return (this.type === 'add' ? this.$t('add') : this.$t('edit')) + this.$t('employee');      // 新增 ： 修改
            },
            ...mapGetters({
                permissionInfo : 'permissionInfo'
            }),
            //是否有编辑员工的权限
            canModifyEmployee () {
                return this.permissionInfo && 'modifyEmployee' in this.permissionInfo;
            },
            //是否有新增员工的权限
            canAddEmployee () {
                return this.permissionInfo && 'addEmployee' in this.permissionInfo;
            },
            //是否能保存员工信息
            canSaveEmployee () {
                return this.canModifyEmployee || this.canAddEmployee;
            }
        },
        created() {
            this.init();
        },
        methods: {

            init() {
                if (this.$route.query && this.$route.query.type) {
                    this.type = this.$route.query.type;
                }
            },

            //确认修改按钮回调，需校验表单
            confirmModify(){
                if(this.type === 'add' && this.canAddEmployee){
                    this.$refs.basicForm.formValidateFunc();
                }else if(this.type === "modify" && this.canModifyEmployee){
                    this.$refs.basicForm.formValidateFunc();
                }
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params){
                if(this.$route.query.type === 'modify'){
                    if(params && Object.keys(params).length > 0){
//                        this.employeeData = Object.assign({}, this.employeeData, params.employeeItem);
                        this.employeeData = params.employeeItem;
                    }
                }
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-employee {
        @include block_outline();
        overflow: auto;

        /deep/ .bread-crumb-head {
            border-radius: 4px 4px 0 0;
        }
        .add-employee-content{
            height: calc(100% - 50px);
            background-color: $color_fff;
            overflow: auto;

            .content-footer{
                text-align: center;
            }

        }

    }
    .content-footer {
        padding-bottom: 30px;
        /deep/ .ivu-btn {
            width: 108px;
            &.ivu-btn-primary {
                margin-right: 20px;
            }
        }
    }
</style>

