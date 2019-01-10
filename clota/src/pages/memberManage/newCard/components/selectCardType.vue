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
              inline>
            <i-row>
                <i-col span="12">
                    <!--会员卡类型-->
                    <Form-item :label="$t('pleaseSelectMemType')" >
                        <Select v-model="memberCard.cardTypeId"
                                style="width: 280px"
                                @on-change="cardTypeChange">
                            <Option v-for="item in cardTypesDeal"
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
                    <Form-item :label="$t('pleaseSelectMemLevel')"
                               style="float: right">
                        <Select v-model="memberCard.levelId"
                                style="width: 280px"
                                @on-change="cardLevelChange">
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
            <i-row v-if="cardTypeInfo.cardForm === 'sale'">
                <i-col span="24">
                    <Form-item :label="$t('colonSetting',{ key : $t('memberCardSales') })" class="auto-item-content">
                        <span>{{cardLevelInfo.salePrice | moneyFilter | contentFilter}} {{$t('yuan')}}</span>
                    </Form-item>
                    <Form-item :label="$t('colonSetting',{ key : $t('moneyInCard') })" class="auto-item-content">
                        <span>{{cardLevelInfo.amountInCard | moneyFilter | contentFilter}} {{$t('yuan')}}</span>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        props : {
            //是否需要业主卡
            'need-company-card' : {
                type : Boolean,
                default : true,
            }
        },
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
                        this.cardTypes = res.data ? res.data.filter(item => {
                            if (this.needCompanyCard) {
                                return true;
                            } else {
                                return item['id'] !== '1';
                            }
                        }) : [];
                        //如果只有一种类型的会员卡，则自动选择会员卡和会员级别
                        if (this.cardTypes.length === 1) {
                            this.memberCard.cardTypeId = this.cardTypes[0]['id'];
                            this.getLevelsByCardType();
                        }
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
                        if (this.cardLevelList.length > 0) {
                            this.memberCard.levelId = this.cardLevelList[0]['id'];
                            this.changeCardSelection();
                        }
                    } else {
                        this.cardLevelList = [];
                    }
                });
            },
            /**
             * 当会员卡类别修改时，重新设置持卡人需要填写的信息
             */
            changeCardSelection () {
                this.$nextTick(() => {
                    if ( this.memberCard.levelId ) {
                        this.$emit('on-change-card', {
                            memberCard : this.memberCard,
                            levelName : this.cardLevelInfo.levelDesc,
                            salePrice : this.cardLevelInfo.salePrice,
                            type : this.cardTypeInfo.type,
                            cardForm : this.cardTypeInfo.cardForm
                        });
                    } else {
                        this.$emit('on-change-card', {
                            memberCard : {
                                cardTypeId : null
                            },
                        });
                    }
                });
            },
            /**
             * 会员卡类别改变
             */
            cardTypeChange () {
                this.memberCard.levelId = '';
                 this.getLevelsByCardType();
            },
            /**
             * 会员卡级别改变
             */
            cardLevelChange () {
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
            },
            //当前选择的会员卡类别信息
            cardTypeInfo () {
                for (let i = 0,j = this.cardTypes.length; i < j; i++) {
                    if (this.cardTypes[i]['id'] === this.memberCard.cardTypeId) {
                        return this.cardTypes[i];
                    }
                }
                return {};
            },
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否是售卖型会员卡
            cardIsSale () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //会员卡类别数据
            cardTypesDeal () {
                if (this.cardIsSale && this.cardIsGrowth) {
                    if (this.$route.name === 'newBatchCard') {
                        return this.cardTypes.filter(item => item.cardForm === 'sale');
                    } else {
                        return this.cardTypes;
                    }
                } else if (this.cardIsSale) {
                    return this.cardTypes.filter(item => item.cardForm === 'sale');
                } else if (this.cardIsGrowth) {
                    return this.cardTypes.filter(item => item.cardForm === 'growth');
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .select-card-type{

        /*.ivu-form-item {*/
            /*width: 280px;*/
            /*text-align: left;*/
            /*margin-right: 0;*/
        /*}*/

        .auto-item-content{
            /deep/ .ivu-form-item-content{
                display: inline-block;
            }
        }
        /deep/ .ivu-form-item-label{
            padding-left: 0;
            padding-right: 5px;
        }
    }

</style>
