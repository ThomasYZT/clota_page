<template>
    <!--新增/修改员工信息-->
    <div class="add-employee">
        <div class="breadcrumb-box">
            <!--<Breadcrumb separator=">">
                <BreadcrumbItem to="/orgManage/rolePermission">员工</BreadcrumbItem>
                <BreadcrumbItem>{{ type === 'add' ? '新增员工' : '修改员工信息'}}</BreadcrumbItem>
            </Breadcrumb>-->

            <bread-crumb-head
                :before-router-list="beforeRouterList"
                :locale-router="localeRouter">
            </bread-crumb-head>
        </div>
        <div class="add-employee-content">

            <!--基本信息-->
            <basic-form ref="basicForm" :employee-info="employeeData"></basic-form>

            <div class="content-footer">
                <i-button type="primary" :loading="loading" @click="confirmModify">确定新增</i-button>
                <router-link :to="{name: 'employee'}">
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

    export default {
        components: {
            basicForm,
            breadCrumbHead
        },
        mixins: [lifeCycleMixins],
        data() {
            return {
                // 表单数据
                formData: [{
                    date: '2016-05-03',
                }],

                // 面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'employee',   // 员工
                        router: 'employee',
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
                return this.type === 'add' ? this.$t('add') : this.$t('edit');      // 新增 ： 修改
            },
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
                this.$refs.basicForm.formValidateFunc();
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params){
                if(this.$route.query.type === 'modify'){
                    if(params && Object.keys(params).length > 0){
                        this.employeeData = Object.assign({}, this.employeeData, params.employeeItem);
                    }
                }
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../../commonFile/common';

    .add-employee {

        .add-employee-content{

            .content-footer{
                text-align: center;
            }

        }

    }
</style>

