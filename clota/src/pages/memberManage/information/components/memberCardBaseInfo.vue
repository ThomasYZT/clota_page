<!--会员卡信息-->

<template>
    <div class="member-card-info">
        <!--会员3期暂时去掉-->
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
            <label>{{$t("memberTypes")}}：</label>
            <span v-w-title="memberDetail.typeName">
                    {{memberDetail.typeName  | contentFilter}}
            </span>
        </div>
        <!--会员3期暂时去掉-->
        <!--<div class="form-item-wrap"><label>{{$t("cardIssuer")}}：</label><span v-w-title="memberDetail.orgName">-->
        <!--{{memberDetail.orgName || '-'}}</span></div>-->
        <!--<div class="form-item-wrap">-->
            <!--<label>{{$t("memberType")}}：</label>-->
            <!--<span v-w-title="$t(getEnumFieldShow('vipStatusEnum', memberDetail.memberType))">-->
                    <!--{{$t(getEnumFieldShow('vipStatusEnum', memberDetail.memberType))}}-->
            <!--</span>-->
        <!--</div>-->
        <div class="form-item-wrap">
            <label>{{$t("levelSetting")}}：</label>
            <span v-w-title="memberDetail.levelDesc">
                    {{memberDetail.levelDesc | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("购买日期")}}：</label>
            <span v-w-title="memberDetail.createTime">{{memberDetail.createTime  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("effectiveStartDate")}}：</label>
            <span v-w-title="memberDetail.effDate">{{memberDetail.effDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("effectiveEndDate")}}：</label>
            <span v-w-title="memberDetail.expDate">{{memberDetail.expDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("payPass")}}：</label>
            <span>{{memberDetail.passwd ? '●●●●●●' :  '' | contentFilter}}</span>
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
        <!--<div class="form-item-wrap"><label>{{$t("growth")}}：</label><span v-w-title="growthAccount.accountBalance">-->
        <!--{{growthAccount.accountBalance !== null ? growthAccount.accountBalance : '' | contentFilter}}</span></div>-->
    </div>
</template>

<script>
    import { vipStatusEnum } from '@/assets/js/constVariable';

    export default {
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
                //h
                vipStatusEnum : vipStatusEnum
            };
        },
        methods : {
            /**
             * 获取枚举数据展示字段
             * @param{String} name  枚举字段名
             * @param{String} val  值
             */
            // getEnumFieldShow (name, val) {
            //     let obj = this[name].find((item) => val === item.name);
            //     return obj ? obj.desc : '-';
            // },
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
