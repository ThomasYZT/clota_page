<!--
内容：持卡人的信息
作者：djc
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('个人信息')}}</div>
        <i-row>
            <i-col span="9">
                <div class="form-item-wrap">
                    <label>{{$t("name")}}：</label><span>{{'李菲菲'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("mobilePhone")}}：</label><span>{{18800000000}}</span>
                </div>
                <div class="form-item-wrap">
                    <!--证件类型-->
                    <label>{{$t("credentialsType")}}：</label><span>{{'身份证'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("birthday")}}：</label><span>{{'1990-01-01'}}</span>
                </div>
            </i-col>
            <i-col span="9">
                <div class="form-item-wrap">
                    <label>{{$t("gender")}}：</label><span>{{'女'}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("年龄")}}：</label><span>{{29}}</span>
                </div>
                <div class="form-item-wrap">
                    <label>{{$t("证件号码")}}：</label><span>{{1102011199001012010}}</span>
                </div>
                <div class="form-item-wrap">
                    <!--家庭住址-->
                    <label>{{$t("homeAddress")}}：</label><span>{{'北京市长安街81号'}}</span>
                </div>
            </i-col>
            <i-col span="6" style="float: right;">
                <img src="" style="width: 100px;height: 120px;border: 1px solid #E9E9E9;" />
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
