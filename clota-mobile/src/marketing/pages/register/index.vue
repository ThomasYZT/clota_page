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
    import ajax from '@/api/index.js';
    import baseInfo from './components/baseinfo';
    import otherInfo from './components/otherInfo';

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
                stage : '2'
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
            },
            /**
             * 开始注册
             */
            toRegister () {
                ajax.post('',{

                }).then(res => {
                    if (res.success) {
                        this.$vux.toast.show({
                            text : this.$t('operateSuc',{ msg : this.$t('marketingRegister') })
                        });
                    }
                });
            }
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
