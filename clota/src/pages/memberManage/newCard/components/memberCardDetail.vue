<!--会员卡信息-->

<template>
    <div class="member-card-detail-info">
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('memberNum') })}}</span>
            <span class="value-label">{{cardInfo.cardCode | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('entityCardFaceNum') })}}</span>
            <span class="value-label">
                {{cardInfo.tpNo | contentFilter}}
                <span class="value-status" v-if="cardInfo.cardStatus === 'loss'">{{$t('bracketSetting',{ content : $t('已挂失') })}}</span>
                <span class="value-status" v-if="cardInfo.cardStatus === 'return'">{{$t('bracketSetting',{ content : $t('已退卡') })}}</span>
            </span>

        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('memberTypes') })}}</span>
            <span class="value-label">{{cardInfo.typeName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('memberCardType') })}}</span>
            <span class="value-label">{{cardInfo.levelDesc | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('signChannel') })}}</span>
            <span class="value-label">{{cardInfo.remark | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('payPass') })}}</span>
            <span class="value-label">{{tradePassword | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('buyTime') })}}</span>
            <span class="value-label">{{cardInfo.createdTime | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('effectiveStartDate') })}}</span>
            <span class="value-label">{{cardInfo.effDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('effectiveEndDate') })}}</span>
            <span class="value-label">{{cardInfo.expDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('remark') })}}</span>
            <span class="value-label">{{cardInfo.remark | contentFilter}}</span>
        </i-col>
    </div>
</template>

<script>
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
			return {};
		},
		methods : {},
        computed : {
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
    .member-card-detail-info{
        padding-top: 10px;

        .value-status{
            color: $color_gray;
        }

        .split-class{
            width: 33%;
            height: 34px;
            padding: 6px 0;
            font-size: $font_size_14px;
            display: inline-flex;

            .key-label{
                color: $color_333;
            }

            .value-label{
                flex: 1;
                color: $color_666;
                @include overflow_tip();
            }
        }
    }
</style>
