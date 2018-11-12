<!--会员卡信息-->

<template>
    <div class="member-card-detail-info">
        <i-col class="split-class">
            <span class="key-label">会员编号：</span>
            <span class="value-label">{{cardInfo.cardCode | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">实体卡卡面号：</span>
            <span class="value-label">{{cardInfo.tpNo | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">会员类别：</span>
            <span class="value-label">{{cardInfo.typeName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">会员卡类型：</span>
            <span class="value-label">{{cardInfo.levelDesc | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">注册渠道：</span>
            <span class="value-label">{{cardInfo.remark | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">支付密码：</span>
            <span class="value-label">{{tradePassword | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">购买日期：</span>
            <span class="value-label">{{cardInfo.createdTime | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">有效开始日期：</span>
            <span class="value-label">{{cardInfo.effDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">有效结束日期：</span>
            <span class="value-label">{{cardInfo.expDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">备注：</span>
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
