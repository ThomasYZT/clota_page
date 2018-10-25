<!--
内容：退卡
作者：djc
日期：
-->

<template>
    <div class="refunded-card">
        <div class="block-title">{{$t('个人信息')}}</div>
        <div class="info-content">
            <i-row>
                <i-col span="9">
                    <div class="form-item-wrap">
                        <label>{{$t("name")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("手机号")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("证件类型")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("生日")}}：</label><span>{{}}</span>
                    </div>
                </i-col>
                <i-col span="9">
                    <div class="form-item-wrap">
                        <label>{{$t("gender")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("年龄")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("证件号码")}}：</label><span>{{}}</span>
                    </div>
                    <div class="form-item-wrap">
                        <label>{{$t("家庭住址")}}：</label><span>{{}}</span>
                    </div>
                </i-col>
                <i-col span="6">
                    <img src="" alt="">
                </i-col>
            </i-row>
        </div>
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

</style>
