<!--
内容：个人信息
作者：djc
日期：
-->

<template>
    <div>
        <!-- 公司管理员视图 -->
        <template v-if="employeeType == 'company_manager'">
            <company-manager-temp :accountInfo="accountInfo"></company-manager-temp>
        </template>

        <!-- 景区管理员视图 -->
        <template v-else-if="employeeType == 'scenic_manager'">
            <scenic-manager-temp :accountInfo="accountInfo"></scenic-manager-temp>
        </template>

        <!-- 员工视图 -->
        <template v-else-if="employeeType == 'employee'">
            <employee-temp :accountInfo="accountInfo"></employee-temp>
        </template>

        <!-- 合作伙伴视图-->
        <template v-else-if="employeeType == 'partner'">
            <partner-temp :accountInfo="accountInfo"></partner-temp>
        </template>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index'
    import companyManagerTemp from './components/company_manager_view'
    import employeeTemp from './components/employee_view'
    import partnerTemp from './components/partner_view'
    import scenicManagerTemp from './components/scenic_manager_view'

    export default {
        components: {
            companyManagerTemp,
            employeeTemp,
            partnerTemp,
            scenicManagerTemp
        },
        props: {},
        data() {
            return {
                //用户信息
                accountInfo: {},
                //用户类型
                employeeType: '',
            }
        },
        computed: {},
        created() {
            this.getAccountInfo();
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 获取个人信息数据
             */
            getAccountInfo() {
                ajax.post('getProfile').then((res) => {
                    if (res.success) {
                        this.accountInfo = res.data ? res.data : {};
                        this.employeeType = res.data ? res.data.employeeType : '';
                    } else {
                        this.accountInfo = {};
                        this.employeeType = '';
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
