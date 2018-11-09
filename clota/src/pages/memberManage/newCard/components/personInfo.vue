<!--
内容：个人信息
日期：
-->

<template>
    <div class="person-info">
        <div class="block-title">{{$t('个人信息')}}</div>
        <i-col class="split-class">
            <img src="../../../../assets/images/icon-no-data.png" class="person-img" alt="">
        </i-col>
        <i-col class="split-class">
            <span class="key-label">姓名：</span>
            <span class="value-label">{{memberInfo.custName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">手机号：</span>
            <span class="value-label">{{memberInfo.custName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">性别：</span>
            <span class="value-label">{{$t(memberInfo.gender) | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">生日：</span>
            <span class="value-label">{{memberInfo.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">证件类型：</span>
            <span class="value-label">{{memberInfo.certificationTypeName | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">证件编号：</span>
            <span class="value-label">{{memberInfo.idCardNumber | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">地址：</span>
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

        .person-img{
            @include block_outline(70px,70px);
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
