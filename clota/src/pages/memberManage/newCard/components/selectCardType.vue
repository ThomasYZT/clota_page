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
            <i-row>
                <i-col span="12">
                    <!--会员卡类型-->
                    <Form-item :label="$t('请选择会员卡类型')" prop="cardTypeId">
                        <Select v-model="memberCard.cardTypeId"
                                style="width: 100%"
                                @on-change="cardTypeChange">
                            <Option v-for="item in cardTypes"
                                    :key="item.id"
                                    :value="item.id"
                                    :placeholder="$t('selectField', {field: ''})">
                                {{item.typeName}}
                            </Option>
                        </Select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <!--会员卡级别-->
                    <Form-item :label="$t('请选择会员卡级别')"
                               prop="levelId"
                               style="float: right">
                        <Select v-model="memberCard.levelId"
                                style="width: 100%"
                                @on-change="getLevelsByCardType">
                            <Option v-for="item in cardLevelList"
                                    :key="item.id"
                                    :value="item.id"
                                    :placeholder="$t('selectField', {field: ''})">
                                {{item.levelDesc}}
                            </Option>
                        </Select>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <Form-item :label="$t('会员卡售价')">
                        <span>{{cardLevelInfo.salePrice | moneyFilter | contentFilter}} {{$t('yuan')}}</span>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item :label="$t('卡内金额')"
                               style="float: right">
                        <span>{{cardLevelInfo.amountInCard | moneyFilter | contentFilter}} {{$t('yuan')}}</span>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';

    export default {
        data () {
            return {
                // 表单字段
                memberCard : {
                    // 会员卡类别id
                    cardTypeId : '',
                    //会员卡级别id
                    levelId : '',
                },
                // 会员卡类别列表
                cardTypes : [],
                // 会员卡级别列表
                cardLevelList : [],
                // 表单校验规则
                ruleValidate : {
                    cardTypeId : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('会员卡类别') }),
                            trigger : 'change'
                        },
                    ],
                    levelId : [
                        // 会员卡类型不能为空
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('会员卡类型') }),
                            trigger : 'change'
                        },
                    ],
                }
            };
        },
        created () {
            this.getcardTypeList();
        },
        methods : {
            /**
             * 获取会员卡类别列表
             */
            getcardTypeList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success) {
                        this.cardTypes = res.data || [];
                        this.getLevelsByCardType();
                    } else {
                        this.cardTypes = [];
                    }
                });
            },
            /**
             * 查询会员卡类别下的会员级别
             */
            getLevelsByCardType () {
                ajax.post('queryLevelsByCardType', {
                    cardTypeId : this.memberCard.cardTypeId
                }).then(res => {
                    if (res.success) {
                        this.cardLevelList = res.data || [];
                    } else {
                        this.cardLevelList = [];
                    }
                });
            },
            /**
             * 当会员卡类别修改时，重新设置持卡人需要填写的信息
             */
            changeCardSelection () {
                this.$emit('on-change-card', this.memberCard);
            },
            /**
             * 会员卡类别改变
             */
            cardTypeChange () {
                this.memberCard.levelId = '';
                 this.getLevelsByCardType();
                 this.changeCardSelection();
            }
        },
        computed : {
            //当前选择的会员卡级别信息
            cardLevelInfo () {
                for (let i = 0,j = this.cardLevelList.length; i < j; i++) {
                    if (this.cardLevelList[i]['id'] === this.memberCard.levelId) {
                        return this.cardLevelList[i];
                    }
                }
                return {};
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .select-card-type{

        .ivu-form-item {
            width: 280px;
            text-align: left;
            margin-right: 0;
        }
    }

</style>
