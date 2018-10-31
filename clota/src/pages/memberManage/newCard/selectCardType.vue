<!--
内容：选择会员卡类型
作者：djc
日期：
-->

<template>
    <div class="select-card-type">
        <h3>{{$t('选择会员卡类型')}}</h3><!--选择会员卡类型-->
        <Form ref="formValidate"
              :model="memberCard"
              :rules="ruleValidate"
              label-position="top">
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('会员卡类别')" prop="classify"><!--会员卡类别-->
                    <Select v-model="memberCard.classify" style="width: 100%">
                        <Option v-for="item in cardClassify" :key="item.value"
                                :value="item.value"
                                :placeholder="$t('selectField', {field: ''})">
                            {{$t(item.label)}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('会员卡类型')" prop="type"><!--会员卡类型-->

                    <Select v-model="memberCard.type" style="width: 100%">
                        <Option v-for="item in cardTypeList" :key="item.id"
                                :value="item.id"
                                :placeholder="$t('selectField', {field: ''})">
                            {{$t(item.name)}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('会员卡售价')">
                    <span>{{5}} {{$t('yuan')}}</span>
                </Form-item>
            </div>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {},
        data() {
            return {
                // 表单字段
                memberCard: {
                    classify: '',
                    type: '',
                },
                //
                cardClassify: [
                    {value: 'person', label: '个人会员卡'},
                    {value: 'enterprise', label: '企业会员卡'},
                ],
                //
                cardTypeList: [
                    {id: '7549317274', name: '水源年卡', price: 5},
                    {id: '7549317273', name: '丛林年卡', price: 6},
                    {id: '7549317272', name: '海底年卡', price: 8},
                    {id: '7549317271', name: '四园年卡', price: 8},
                    {id: '7549317270', name: '五园年卡', price: 10},
                ],

                // 表单校验规则
                ruleValidate: {
                    classify: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('会员卡类别')}), trigger: 'change'},     // 会员卡类别不能为空
                    ],
                    type: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('会员卡类型')}), trigger: 'change'},     // 会员卡类型不能为空
                    ],
                }
            }
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
    .select-card-type {
        width: 850px;
        margin: 0 auto;

        > h3 {
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }
    }

    .ivu-form-item-wrap {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-right: 60px;
        &:nth-child(3) {
            margin-right: 0;
        }
    }

    .ivu-form-item {
        width: 240px;
        text-align: left;
    }
</style>
