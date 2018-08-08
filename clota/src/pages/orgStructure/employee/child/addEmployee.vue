<template>
    <!--新增/修改员工信息-->
    <div class="add-employee">
        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/orgManage/rolePermission">员工</BreadcrumbItem>
                <BreadcrumbItem>{{ type === 'add' ? '新增员工' : '修改员工信息'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="add-employee-content">

            <!--基本信息-->
            <basic-form ref="basicForm"></basic-form>

            <div class="content-footer">
                <i-button type="primary" :loading="loading" @click="confirmModify">确定新增</i-button>
                <router-link :to="{name: 'staffList'}">
                    <i-button type="ghost">取消</i-button>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>

    import basicForm from './basicInfo.vue'

    export default {
        components: {
            basicForm,
        },
        data () {
            return {
                loading: false,
            }
        },
        data() {
            return {
                // 表单数据
                formData: [{
                    date: '2016-05-03',
                }],
                //新增/修改
                type: 'add',
                loading: false
            }
        },
        computed: {},
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

