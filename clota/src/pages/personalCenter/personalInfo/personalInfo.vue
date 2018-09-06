<!--
内容：个人信息
作者：djc
日期：
-->

<template>
    <div class="personal-info">
        <h3>{{'广州长隆旅游集团'}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('登录名')}}：</span>{{'zhang'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('线下核销编码')}}：</span>{{'239879'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('传真')}}：</span>{{'0722-823642832'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('详细地址')}}：</span>{{'云南省曲靖市马龙县因下路464号'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('受理客服')}}：</span>{{'客服1'}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('公司ID')}}：</span>{{'483274'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('全民分销邀请码')}}：</span>{{'JK239879'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('电子邮箱')}}：</span>{{'268326828@163.com'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('短信供应商')}}：</span>{{'容联'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('财务上级')}}：</span>{{'无'}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('公司编码')}}：</span>{{'zhang'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('电话')}}：</span>{{'0755-823642832'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('所在地')}}：</span>{{'云南省 曲靖市 马龙县'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('短信余量（条）')}}：</span>{{'1830'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('管理上级')}}：</span>{{'无'}}
                    </li>
                </ul>
            </Col>
        </Row>
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
    @import "~@/assets/scss/base";

    .personal-info {

        > h3 {
            font-family: PingFangSC-Medium;
            margin: 18px 0;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
        }

        ul li {
            margin-bottom: 8px;
            color: $color_666;

            .field-name {
                color: $color_333;
            }
        }
    }
</style>
