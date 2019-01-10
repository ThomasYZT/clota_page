<!--会员卡信息-->

<template>
    <div class="member-card-info">
        <template v-if="cardInfo.type === 'enterprise'">
            <div class="form-item-wrap">
                <label>{{$t("company_name")}}：</label>
                <span v-w-title="cardInfo.companyName">
                    {{cardInfo.companyName | contentFilter}}
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("company_address")}}：</label>
                <span v-w-title="cardInfo.homeAddr">
                    {{cardInfo.homeAddr | contentFilter}}
            </span>
            </div>
        </template>
        <div class="form-item-wrap">
            <label>{{$t("memberNum")}}：</label>
            <span v-w-title="cardInfo.cardCode">
                {{cardInfo.cardCode | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("entityCardFaceNum")}}：</label>
            <span v-w-title="cardInfo.tpNo">
                    {{cardInfo.tpNo  | contentFilter}}
                <span class="value-status" v-if="cardInfo.cardStatus === 'loss'">{{$t('bracketSetting',{ content : $t('ReportedLoss') })}}</span>
                <span class="value-status" v-if="cardInfo.cardStatus === 'return'">{{$t('bracketSetting',{ content : $t('ReturnedCard') })}}</span>
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("memberCardType")}}：</label>
            <span v-w-title="cardInfo.typeName">
                    {{cardInfo.typeName  | contentFilter}}
            </span>
        </div>
        <template v-if="cardInfo.cardTypeId === '1'">
            <div class="form-item-wrap" >
                <label>{{$t("homeBuyMoney")}}：</label>
                <span v-w-title="cardInfo.houseMoney">
                    {{cardInfo.houseMoney | moneyFilter | contentFilter}}
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("homeInfo")}}：</label>
                <span v-w-title="cardInfo.realEstateInformation">
                    {{cardInfo.realEstateInformation | contentFilter}}
            </span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("buyHomeTime")}}：</label>
                <span v-w-title="cardInfo.purchaseDate">
                    {{cardInfo.purchaseDate | contentFilter}}
            </span>
            </div>
        </template>
        <div class="form-item-wrap">
            <label>{{$t("memberType")}}：</label>
            <span>
                    {{$t(getEnumFieldShow('vipStatusEnum', cardInfo.memberStatus))}}
            </span>
        </div>
        <div class="form-item-wrap" v-if="cardInfo.cardTypeId !== '1'">
            <label>{{$t("levelSetting")}}：</label>
            <span v-w-title="cardInfo.levelDesc">
                    {{cardInfo.levelDesc | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("buyDate")}}：</label>
            <span v-w-title="cardInfo.createdTime">{{cardInfo.createdTime  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="cardInfo.cardTypeId !== '1'">
            <label>{{$t("effectiveStartDate")}}：</label>
            <span v-w-title="cardInfo.effDate">{{cardInfo.effDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="cardInfo.cardTypeId !== '1'">
            <label>{{$t("effectiveEndDate")}}：</label>
            <span v-w-title="cardInfo.expDate">{{cardInfo.expDate  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="cardIsSaling">
            <label>{{$t("payPass")}}：</label>
            <span>
                {{tradePassword | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("signChannel")}}：</label>
            <span v-w-title="cardInfo.channelName">
                    {{cardInfo.channelName  | contentFilter}}
            </span>
        </div>
        <div class="form-item-wrap">
            <label>{{$t("remark")}}：</label>
            <span v-w-title="cardInfo.remark">{{cardInfo.remark  | contentFilter}}</span>
        </div>
        <div class="form-item-wrap" v-if="cardInfo.type === 'personal'"  >
            <label>{{$t("address")}}：</label>
            <span v-w-title="cardInfo.homeAddr">{{cardInfo.homeAddr  | contentFilter}}</span>
        </div>
    </div>
</template>

<script>
    import { vipStatusEnum } from '@/assets/js/constVariable';
    import { mapGetters } from 'vuex';
	export default {
		props : {
			//会员卡信息
			'card-info' : {
				type : Object,
				default () {
					return {};
                }
            }
        },
		data () {
			return {
                vipStatusEnum : vipStatusEnum,
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
        },
        computed : {
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //交易密码显示格式
            tradePassword () {
                if (this.cardInfo && this.cardInfo.passwd) {
                    return '●●●●●●';
                } else {
                    return '';
                }
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
