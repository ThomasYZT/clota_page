<!--会员卡信息-->

<template>
    <div class="member-card-info">
        <div class="form-item-wrap" v-if="memberDetail.cardTypeId === '3'">
            <label>{{$t("企业名称")}}：</label>
            <span v-w-title="memberDetail.companyName">
                    {{memberDetail.companyName | contentFilter}}
            </span>
        </div>
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
                <span class="value-status" v-if="memberDetail.cardStatus === 'loss'">{{$t('bracketSetting',{ content : $t('已挂失') })}}</span>
                <span class="value-status" v-if="memberDetail.cardStatus === 'return'">{{$t('bracketSetting',{ content : $t('已退卡') })}}</span>
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
                <span class="blue-label" @click="changeHouseMoney">{{$t('modify')}}</span>
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
            <span v-w-title="$t(getEnumFieldShow('vipStatusEnum', memberDetail.memberType))">
                    {{$t(getEnumFieldShow('vipStatusEnum', memberDetail.memberType))}}
            </span>
        </div>
        <div class="form-item-wrap" v-if="memberDetail.cardTypeId !== '1'">
            <label>{{$t("levelSetting")}}：</label>
            <span v-w-title="memberDetail.levelDesc">
                    {{memberDetail.levelDesc | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("购买日期")}}：</label>
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
        <div class="form-item-wrap">
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
        <!--会员3期暂时去掉-->
        <!--<div class="form-item-wrap"><label>{{$t("growth")}}：</label><span v-w-title="growthAccount.accountBalance">-->
        <!--{{growthAccount.accountBalance !== null ? growthAccount.accountBalance : '' | contentFilter}}</span></div>-->
        <!--设置支付密码模态框-->
        <set-password-modal v-model="setPasswordModalShow"
                            @set-pay-password="getPayPassword">
        </set-password-modal>
        <!--修改购房金额模态框-->
        <change-house-money-modal :value="true">
        </change-house-money-modal>
    </div>
</template>

<script>
    import { vipStatusEnum } from '@/assets/js/constVariable';
    import setPasswordModal from '../../newCard/components/setPasswordModal';
    import ajax from '@/api/index.js';
    import changeHouseMoneyModal from './changeHouseMoneyModal';

    export default {
        components : {
            setPasswordModal,
            changeHouseMoneyModal
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
                setPasswordModalShow : false
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
                ajax.post('').then(res => {
                    if (res.success) {
                        this.$Message.success('修改支付密码成功');
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error('修改支付密码失败');
                    }
                });
            },
            /**
             * 修改购房金额
             */
            changeHouseMoney () {

            }
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
