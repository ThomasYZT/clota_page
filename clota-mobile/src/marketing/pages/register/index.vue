<!--全民营销注册-->

<template>
    <div class="register">

        <!--注册基本信息-->
        <base-info v-show="stage === '1'"
                   :need-validate-scene="showChooseSceneAndType"
                   :scene-list="sceneList"
                   :type-list="typesList"
                   @get-formData="getFormData"
                   @fresh-type="queryMarketTypes">
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
                //是否显示选择景区和所属类别的框
                showChooseSceneLabel : false,
                //景区列表
                sceneList : [],
                //所属类别列表
                typesList : []
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
                        this.$store.commit('updateCompanyCode',res.data ? res.data.orgCode : '');
                    } else {
                        this.$store.commit('marketUpdateOrgId','');
                        this.$store.commit('marketUpdateLevelId',marketTypeId);
                        this.$store.commit('marketUpdateTypeId','');
                        this.$store.commit('marketUpdateTypeName','');
                        this.$store.commit('marketUpdateCompanyName','');
                        this.$store.commit('updateCompanyCode','');
                        this.$vux.toast.show({
                            text : this.$t(res.message),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParms (params) {
                let marketUcid = localStorage.getItem('marketUcid');
                let marketYcode = localStorage.getItem('marketYcode');
                this.showChooseSceneLabel = false;
                if (params && params.Ucid && params.Ycode) {
                    localStorage.setItem('marketUcid',params.Ucid);
                    localStorage.setItem('marketYcode',params.Ycode);
                    this.getRegisterParams(params.Ucid,params.Ycode);
                } else if (params.companyCode) {
                    this.$store.commit('updateCompanyCode',params.companyCode);
                    this.showChooseSceneLabel = true;
                    this.getAllScenicInCompany();
                } else if (marketUcid && marketYcode) {
                    this.getRegisterParams(marketUcid,marketYcode);
                    this.$store.commit('updateCompanyCode',params.companyCode);
                } else if (this.companyCode) {
                    this.showChooseSceneLabel = true;
                    this.getAllScenicInCompany();
                }
            },
            /**
             * 获取公司下的所有景区信息
             */
            getAllScenicInCompany () {
                ajax.post('market_getAllScenicInCompany',{
                    companyCode : this.companyCode
                }).then(res => {
                    if (res.success && res.data) {
                        this.sceneList = res.data.map(item => {
                            return {
                                value : item.orgName,
                                key : item.id
                            };
                        });
                    } else {
                        this.sceneList = [];
                    }
                });
            },
            /**
             * 获取景区下的所属类别信息
             * @param{String} orgId 景区id
             */
            queryMarketTypes (orgId) {
                ajax.post('market_queryMarketTypes',{
                    orgId
                }).then(res => {
                    if (res.success && res.data) {
                        this.typesList = res.data.map(item => {
                            return {
                                value : item.typeName,
                                key : item.id
                            };
                        });
                    } else {
                        this.typesList = [];
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketTypeId : 'marketTypeId',
                marketTypeName : 'marketTypeName',
                companyCode : 'companyCode',
            }),
            //是否显示选择景区和所属类别
            showChooseSceneAndType () {
                return this.showChooseSceneLabel === true && !!this.companyCode;
            }
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
