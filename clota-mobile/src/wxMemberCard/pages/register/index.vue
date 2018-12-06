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

        <x-dialog v-model="isCardModal"
                  @on-show="addCard"
                  :hide-on-blur="true">
            <div class="get-crad-wrap">
                <p>添加会员卡</p>
                <p>是否将会员卡加入微信卡包</p>
                <div class="bottom-btn">
                    <div class="no" @click="noGetCard">不</div>
                    <div class="yes">放入卡包</div>
                </div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import { validator } from 'klwk-ui';
    import MD5 from 'crypto-js/md5';
    import ajax from '../../api/index.js';
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
                // 是否展示弹框
                isCardModal: true
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
                    levelId : this.marketLevelId,
                    password : MD5(this.formData.password).toString(),
                }).then(res => {
                    if (res.success) {
                        this.$router.push({
                            name : 'marketingRegisterSuc',
                            params : {
                                fromRegister : true
                            }
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
             * 添加至卡包
             */
            addCard () {
                let cardExt = {
                    code: '',
                    openid: '<{$smarty.session.openid}>',
                    timestamp: '',
                    signature: ''
                }
                this.$wechat.addCard({
                    cardList: [
                        {
                            cardId: '343',
                            cardExt: cardExt
                        }
                    ],
                    success: function (res) {
                        alert('已添加卡券：' + JSON.stringify(res.cardList));
                    },
                    cancel: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            },
            /**
             * 不领取会员卡
             */
            noGetCard () {
                this.isCardModal = false;
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketLevelId : 'marketLevelId',
                marketTypeId : 'marketTypeId',
            })
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

    .get-crad-wrap {
        width:100%;
        display: inline-block;
        background: #ffffff;
        border-radius: 4px;
        padding-top: 20px;
        p {
            font-size: 14px;
            color: #333333;
            text-align: center;
            &:first-child {
                padding-bottom: 6px;
            }
        }
        .bottom-btn {
            display: flex;
            margin-top:30px;
            position: relative;
            bottom: -1px;
            > div {
                flex:1;
                font-size: 14px;
                color: #ffffff;
                padding: 10px 0;
                &.no {
                    background: #AAAAAA;
                }
                &.yes {
                    background: #FABA00;
                }
            }
        }
    }
</style>
