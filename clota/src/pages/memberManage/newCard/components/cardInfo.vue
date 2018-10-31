<!--
内容：会员卡信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('会员卡信息')}}</div>
        <i-row>
            <i-col span="9">
                <div class="form-item-wrap">
                    <label>{{$t("会员编号")}}：</label><span>{{'0000000108'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("会员卡类型")}}：</label><span>{{'水园年卡'}}</span>
                </div>
                <div class="form-item-wrap">
                    <!--购买日期-->
                    <label>{{$t("购买日期")}}：</label><span>{{'2018-10-10'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("支付密码")}}：</label><span>{{'******'}}</span>
                </div>
            </i-col>
            <i-col span="9">
                <div class="form-item-wrap">
                    <label>{{$t("实体卡卡面号")}}：</label><span>{{'33435454'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("注册渠道")}}：</label><span>{{'景区'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("有效开始日期")}}：</label><span>{{'2018-10-10'}}</span>
                </div>
                <div class="form-item-wrap">
                    <!--指纹信息-->
                    <label>{{$t("指纹信息")}}：</label><span>{{'北京市长安街81号'}}</span>
                </div>
            </i-col>
            <i-col span="6">
                <div class="form-item-wrap">
                    <label>{{$t("会员类别")}}：</label><span>{{'正式会员'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("注册渠道")}}：</label><span>{{'热高乐园会员'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("有效开始日期")}}：</label><span>{{'2019-10-10'}}</span>
                </div>
            </i-col>
        </i-row>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

</style>
