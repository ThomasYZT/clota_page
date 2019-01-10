<!--会员卡信息-->

<template>
    <div class="member-card-info">
        <template v-if="memberDetail.type === 'enterprise'">
            <div class="form-item-wrap">
                <label>{{$t("company_name")}}：</label>
                <span v-w-title="memberDetail.companyName">
                    {{memberDetail.companyName | contentFilter}}
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("company_address")}}：</label>
                <span v-w-title="memberDetail.homeAddr">
                    {{memberDetail.homeAddr | contentFilter}}
            </span>
            </div>
        </template>
        <div class="form-item-wrap">
            <label>{{$t("memberNum")}}：</label>
            <span v-w-title="memberDetail.cardCode">
                {{memberDetail.cardCode | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("entityCardFaceNum")}}：</label>
            <span v-w-title="memberDetail.tpNo">
                    {{memberDetail.tpNo  | contentFilter}}
                <span class="value-status" v-if="memberDetail.cardStatus === 'loss'">{{$t('bracketSetting',{ content : $t('ReportedLoss') })}}</span>
                <span class="value-status" v-if="memberDetail.cardStatus === 'return'">{{$t('bracketSetting',{ content : $t('ReturnedCard') })}}</span>
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("memberCardType")}}：</label>
            <span v-w-title="memberDetail.typeName">
                    {{memberDetail.typeName  | contentFilter}}
            </span>
        </div>
        <template v-if="memberDetail.cardTypeId === '1'">
            <div class="form-item-wrap" >
                <label>{{$t("homeBuyMoney")}}：</label>
                <span v-w-title="memberDetail.houseMoney">
                    {{memberDetail.houseMoney | moneyFilter | contentFilter}}
                <span class="blue-label"
                      v-if="memberDetail.isMotherCard === 'true'"
                      @click="changeHouseMoney">{{$t('modify')}}</span>
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("homeInfo")}}：</label>
                <span v-w-title="memberDetail.realEstateInformation">
                    {{memberDetail.realEstateInformation | contentFilter}}
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("buyHomeTime")}}：</label>
                <span v-w-title="memberDetail.purchaseDate">
                    {{memberDetail.purchaseDate | contentFilter}}
            </span>
            </div>
        </template>
        <!--会员3期暂时去掉-->
        <!--<div class="form-item-wrap"><label>{{$t("cardIssuer")}}：</label><span v-w-title="memberDetail.orgName">-->
        <!--{{memberDetail.orgName || '-'}}</span></div>-->
        <div class="form-item-wrap">
            <label>{{$t("memberType")}}：</label>
            <span>
                    {{$t(getEnumFieldShow('vipStatusEnum', memberDetail.memberStatus))}}
            </span>
        </div>
        <div class="form-item-wrap" v-if="memberDetail.cardTypeId !== '1'">
            <label>{{$t("levelSetting")}}：</label>
            <span v-w-title="memberDetail.levelDesc">
                    {{memberDetail.levelDesc | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("buyDate")}}：</label>
            <span v-w-title="memberDetail.createdTime">{{memberDetail.createdTime  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="memberDetail.cardTypeId !== '1'">
            <label>{{$t("effectiveStartDate")}}：</label>
            <span v-w-title="memberDetail.effDate">{{memberDetail.effDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="memberDetail.cardTypeId !== '1'">
            <label>{{$t("effectiveEndDate")}}：</label>
            <span v-w-title="memberDetail.expDate">{{memberDetail.expDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="cardIsSaling">
            <label>{{$t("payPass")}}：</label>
            <span>
                {{memberDetail.passwd ? '●●●●●●' :  '' | contentFilter}}
                <span class="blue-label" @click="setPasswordModalShow = true">{{$t(memberDetail.passwd ? 'modify' : 'setTradePass')}}</span>
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("signChannel")}}：</label>
            <span v-w-title="memberDetail.channelName">
                    {{memberDetail.channelName  | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("remark")}}：</label>
            <span v-w-title="memberDetail.remark">{{memberDetail.remark  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="memberDetail.type === 'personal'">
            <label>{{$t("address")}}：</label>
            <span v-w-title="memberDetail.homeAddr">{{memberDetail.homeAddr  | contentFilter}}</span>
        </div>
        <!--会员3期暂时去掉-->
        <!--<div class="form-item-wrap"><label>{{$t("growth")}}：</label><span v-w-title="growthAccount.accountBalance">-->
        <!--{{growthAccount.accountBalance !== null ? growthAccount.accountBalance : '' | contentFilter}}</span></div>-->
        <!--设置支付密码模态框-->
        <set-password-modal v-model="setPasswordModalShow"
                            @set-pay-password="getPayPassword">
        </set-password-modal>
        <!--修改购房金额模态框-->
        <change-house-money-modal v-model="changeHouseMoneyModalShow"
                                  :card-info="memberDetail"
                                  @fresh-data="$emit('fresh-card-info')">
        </change-house-money-modal>
        <!--修改购房金额密码确认框-->
        <edit-modal ref="editModal">
            <Form ref="formData" :model="formData" :rules="ruleValidate">
                <!--请输入登录密码-->
                <FormItem prop="password" :label="$t('inputField', { field : $t('loginPassword') })">
                    <Input v-model.trim="formData.password" type="password" style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>
    </div>
</template>

<script>
    import { vipStatusEnum } from '@/assets/js/constVariable';
    import setPasswordModal from '../../newCard/components/setPasswordModal';
    import ajax from '@/api/index.js';
    import changeHouseMoneyModal from './changeHouseMoneyModal';
    import editModal from '@/components/editModal/index.vue';
    import MD5 from 'crypto-js/md5';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            setPasswordModal,
            changeHouseMoneyModal,
            editModal
        },
        props : {
            //会员卡详情
            memberDetail : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                vipStatusEnum : vipStatusEnum,
                //设置密码模态框是否显示
                setPasswordModalShow : false,
                // 修改购房总金额是否显示
                changeHouseMoneyModalShow : false,
                formData : {
                    password : ''
                },
                ruleValidate : {
                    password : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('password') }),
                            trigger : 'blur'
                        }
                    ]
                }
            };
        },
        methods : {
            /**
             * 获取枚举数据展示字段
             * @param{String} name  枚举字段名
             * @param{String} val  值
             */
            getEnumFieldShow (name, val) {
                let obj = this[name].find((item) => val === item.name);
                return obj ? obj.desc : '-';
            },
            /**
             * 重新设置支付密码
             * @param{String} password 更改后的密码
             */
            getPayPassword (password) {
                ajax.post('updateTradePassword',{
                    tradePassword : password,
                    id : this.memberDetail.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success('successTip', { tip : this.$t('modifyPayPassword') });
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error('failureTip', { tip : this.$t('modifyPayPassword') });
                    }
                });
            },
            /**
             * 修改购房金额
             */
            changeHouseMoney () {
                this.$refs.editModal.show({
                    title : this.$t('inputField', { field : this.$t('loginPassword') }),
                    confirmCallback : () => {
                        this.$refs.formData.validate(valid => {
                            if (valid) {
                                this.checkPassword();
                                this.$refs.formData.resetFields();
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.$refs.formData.resetFields();
                    }
                });
            },
            /**
             * 校验登录密码是否正确
             */
            checkPassword () {
                ajax.post('secondLogin',{
                    password : MD5(this.formData.password).toString(),
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.changeHouseMoneyModalShow = true;
                        } else {
                            this.$Message.error(this.$t('sthErr', { field : this.$t('loginPassword') }));
                        }
                    }
                }).finally(() => {
                    this.$refs.editModal.hide();
                });
            }
        },
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-card-info {
        width: 100%;
        margin-top: 15px;
        @include clearfix();

        .form-item-wrap {
            width: 30%;
            float: left;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            font-size: $font_size_14px;
            color: $color-666;
            display: flex;

            .blue-label{
                color: $color_blue;
                cursor: pointer;
            }

            .value-status{
                color: $color_gray;
            }

            > label {
                color: $color-333;
            }
            > span {
                flex: 1;
                display: inline-block;
                vertical-align: middle;
                @include overflow_tip();
            }
        }
    }
</style>
