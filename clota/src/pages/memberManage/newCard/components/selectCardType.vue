<!--
内容：选择会员卡类型
作者：djc
日期：
-->

<template>
    <div class="select-card-type">
        <!--<h3>{{$t('选择会员卡类型')}}</h3>&lt;!&ndash;选择会员卡类型&ndash;&gt;-->
        <Form ref="formValidate"
              :model="memberCard"
              :rules="ruleValidate"
              :inline="true"
              label-position="top">
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('请选择会员卡类型')" prop="cardTypeId"><!--请选择会员卡类型-->
                    <Select v-model="memberCard.cardTypeId"
                            style="width: 100%" ><!--@on-change="changeCardType"-->
                        <Option v-for="item in cardTypes" :key="item.id"
                                :value="item.id"
                                :placeholder="$t('selectField', {field: ''})">
                            {{$t(item.typeName)}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item :label="$t('请选择会员卡级别')" prop="levelId"><!--请选择会员卡级别-->
                    <Select v-model="memberCard.levelId" style="width: 100%">
                        <Option v-for="item in cardLevelList" :key="item.id"
                                :value="item.id"
                                :placeholder="$t('selectField', {field: ''})">
                            {{$t(item.levelDesc)}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('会员卡售价')">
                    <span>{{currentSelectedCard.salePrice | contentFilter}} {{$t('yuan')}}</span>
                </Form-item>
                <Form-item :label="$t('卡内金额')">
                    <span>{{currentSelectedCard.amountInCard | contentFilter}} {{$t('yuan')}}</span>
                </Form-item>
            </div>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';

    export default {
        components: {},
        props: {},
        data() {
            return {
                // 表单字段
                memberCard: {
                    cardTypeId: '',
                    levelId: '',
                },
                // 会员卡类型
                cardTypes: [
//                    {id: '2', typeName: '个人会员卡'},
                ],
                // 会员卡级别
                cardLevelList: [
//                    {id: '7549317274', levelDesc: '水源年卡', salePrice: 5, amountInCard: 100},
                ],
                // 当前选中级别的会员卡
                currentSelectedCard: {},

                // 表单校验规则
                ruleValidate: {
                    cardTypeId: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('会员卡类别')}), trigger: 'change'},     // 会员卡类别不能为空
                    ],
                    levelId: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('会员卡类型')}), trigger: 'change'},     // 会员卡类型不能为空
                    ],
                }
            }
        },
        computed: {},
        created() {
            this.getcardTypeList();
        },
        mounted() {
        },
        watch: {
            'memberCard.cardTypeId': function (val, oldVal) {
                this.changeCardType(val);
            },
            'memberCard.levelId': function (val, oldVal) {
                this.currentSelectedCard = this.cardLevelList.find(item => {
                    return val == item.id;
                }) || {};

                this.changeCardSelection();
            },
        },
        methods: {
            /**
             * 获取会员卡类型
             */
            getcardTypeList() {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success) {
                        this.cardTypes = res.data || [];
                        this.memberCard.cardTypeId = this.cardTypes[0] ? this.cardTypes[0].id : '';
                    }
                });
            },
            /**
             * 查询会员卡类别下的会员级别
             */
            getLevelsByCardType(typeId) {
                ajax.post('queryLevelsByCardType', {
                    cardTypeId: typeId
                }).then(res => {
                    if (res.success) {
                        this.cardLevelList = res.data || [];
                        this.memberCard.levelId = this.cardLevelList[0] ? this.cardLevelList[0].id : '';
                    } else {
                        this.cardLevelList = [];
                    }
                });
            },

            changeCardType(cardTypeId) {
                this.getLevelsByCardType(cardTypeId);
            },
            /**
             * 当会员卡类型或级别改变时的处理
             */
            changeCardSelection() {
                this.$emit('on-change-card', this.memberCard);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .ivu-form-item-wrap {
        display: flex;
        justify-content: space-between;
    }

    .ivu-form-item {
        width: 280px;
        text-align: left;
        margin-right: 0;
    }
</style>
