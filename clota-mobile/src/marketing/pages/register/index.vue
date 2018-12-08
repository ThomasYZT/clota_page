<!--全民营销注册-->

<template>
    <div class="register">

        <!--注册基本信息-->
        <base-info v-show="stage === '1'"
                   @get-formData="getFormData">
        </base-info>
        <!--注册其它信息-->
        <other-info v-show="stage === '2'"
                    @register="register"
                    @to-before-step="stage = '1'">
        </other-info>
    </div>
</template>

<script>
    import { validator } from 'klwk-ui';
    import MD5 from 'crypto-js/md5';
    import ajax from '@/marketing/api/index';
    import baseInfo from './components/baseinfo';
    import otherInfo from './components/otherInfo';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            baseInfo,
            otherInfo
        },
        data () {
            return {
                //表单数据
                formData : {
                    //手机号
                    phoneNum : '',
                    //验证吗
                    code : '',
                    //登录密码
                    password : '',
                    //姓名
                    name : '',
                    //证件号
                    idNum : ''
                },
                //当前注册的阶段
                stage : '1',
                //公司code
                companyCode : ''
            };
        },
        methods : {
            /**
             * 获取填写的表单信息
             * @param{Object} formData 表单信息
             */
            getFormData (formData) {
                this.formData.phoneNum = formData.phoneNum;
                this.formData.code = formData.code;
                this.formData.password = formData.password;
                this.stage = '2';
            },
            /**
             * 注册
             * @param{Object} formData
             */
            register (formData) {
                this.formData.name = formData.name;
                this.formData.idNum = formData.idNum;
                this.toRegister();
            },
            /**
             * 开始注册
             */
            toRegister () {
                ajax.post('market_userRegister',{
                    name : this.formData.name,
                    mobile : this.formData.phoneNum,
                    idno : this.formData.idNum,
                    typeId : this.marketTypeId,
                    orgId : this.marketOrgId,
                    password : MD5(this.formData.password).toString(),
                }).then(res => {
                    if (res.success) {
                        this.$router.push({
                            name : 'marketingRegisterSuc',
                            params : {
                                fromRegister : true
                            }
                        });
                    } else if (res.code && res.code !== '300') {
                        this.$vux.toast.show({
                            text : this.$t('errorMsg.' + res.code),
                            type : 'cancel'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('marketingRegister') }),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 获取注册时的参数
             * @param{String} marketTypeId 会员卡类型id
             * @param{String} saleCode 营销编码
             */
            getRegisterParams (marketTypeId,saleCode) {
                ajax.post('market_registerPage',{
                    saleCode : saleCode,
                    marketTypeId : marketTypeId,
                }).then(res => {
                    if (res.success) {
                        this.$store.commit('marketUpdateOrgId',res.data ? res.data.orgId : '');
                        this.$store.commit('marketUpdateLevelId',marketTypeId);
                        this.$store.commit('marketUpdateTypeId',res.data ? res.data.marketTypeId : '');
                        this.$store.commit('marketUpdateTypeName',res.data ? res.data.marketTypeName : '');
                        this.$store.commit('marketUpdateCompanyName',res.data ? res.data.orgName : '');
                        this.$store.commit('marketUpdateCompanyName',res.data ? res.data.orgName : '');
                        this.$store.commit('marketUpdateCompanyCode',res.data ? res.data.orgCode : '');
                    } else {
                        this.$store.commit('marketUpdateOrgId','');
                        this.$store.commit('marketUpdateLevelId',marketTypeId);
                        this.$store.commit('marketUpdateTypeId','');
                        this.$store.commit('marketUpdateTypeName','');
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('marketUpdateCompanyCode','');
                    }
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParms (params) {
                if (params && Object.keys(params).length > 0) {
                    this.getRegisterParams(params.Ucid,params.Ycode);
                    this.companyCode = params.companyCode;
                }
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                marketTypeName : 'marketTypeName',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParms(to.query);
            });
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .register{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;
    }
</style>
