<!--
内容：个人信息
日期：
-->

<template>
    <div class="person-info">
        <div class="info-title">{{$t('personalInfo')}}</div>
        <div class="person-info-label">
            <div class="person-img">
                <img src="../../../../assets/images/icon-no-data.png" class="person-img" alt="">
            </div>
            <i-row style="float: left;width: calc(100% - 100px)">
                <i-col class="split-class">
                    <span class="name-label" style="margin-right: 10px;">{{memberInfo.custName | contentFilter}}</span>
                    <span class="other-label">{{$t(memberInfo.gender) | contentFilter}}</span>
                    <span class="other-label">23</span>
                </i-col>
            </i-row>
            <i-row style="float: left;width: calc(100% - 100px)">
                <i-col class="split-class">
                    <span class="key-label">{{$t('colonSetting',{ key : $t('mobilePhone') })}}</span>
                    <span class="value-label">{{memberInfo.phoneNum | contentFilter}}</span>
                </i-col>
            </i-row>
        </div>
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
        },
        data () {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .person-info{

        .person-info-label{
            @include block_outline($height : 80px);

            .person-img{
                @include block_outline(70px,70px);
                float: left;
                margin-right: 10px;
            }
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

            .name-label{
                color: $color_333;
                font-size: $font_size_16px;
                line-height: 20px;
            }

            .other-label{
                color: $color_666;
                margin-right: 10px;
                font-size: $font_size_14px;
            }
        }
    }
</style>
