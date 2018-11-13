<!--
内容：持卡人的信息
作者：djc
日期：
-->

<template>
    <div class="card-holder-info">
        <div class="card-info-title">{{$t('cardOwnerInfo')}}</div>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key: $t('name')})}}</span>
            <span class="value-label">{{memberInfo.custName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key: $t('mobilePhone')})}}</span>
            <span class="value-label">{{memberInfo.phoneNum | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('gender') })}}</span>
            <span class="value-label">{{$t(memberInfo.gender) | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('birthday') })}}</span>
            <span class="value-label">{{memberInfo.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('credentialsType') })}}</span>
            <span class="value-label">{{memberInfo.certificationTypeName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('identificationNum') })}}</span>
            <span class="value-label">{{memberInfo.idCardNumber | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('address') })}}</span>
            <span class="value-label" v-w-title="memberInfo.homeAddr">{{memberInfo.homeAddr | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('payPass') })}}</span>
            <span class="value-label">{{tradePassword | contentFilter}}</span>
        </i-col>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        props : {
            //会员信息
            'member-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        computed : {
            //交易密码显示格式
            tradePassword () {
                if (this.memberInfo && this.memberInfo.tradePassword) {
                    return '●●●●●●';
                } else {
                    return '';
                }
            }
        },
        data () {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .card-holder-info{
        width: 850px;
        margin: 0 auto;

        .card-info-title{
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
            padding: 47px 0 16px 0;
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
