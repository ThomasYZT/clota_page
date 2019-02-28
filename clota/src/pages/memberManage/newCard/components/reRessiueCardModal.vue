<!--重新补卡确认模态框-->

<template>
    <!--确认会员信息模态框-->
    <confirm-member-info :value="value"
                         @input="$emit('input',$event)"
                         @confirm-data="confirmDataInfo">
        <Form :label-width="110">
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                    {{memberInfo.levelDesc | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('reissueCardFee') })">
                    {{replaceCardFee | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('name') })">
                    {{memberInfo.custName | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('gender') })">
                    {{$t(memberInfo.gender) | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('credentialsType') })">
                    {{memberInfo.certificationTypeName | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('identificationNum') })">
                    {{memberInfo.idCardNumber | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('birthday') })">
                    {{memberInfo.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('mobilePhone') })">
                    {{memberInfo.phoneNum | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('remark') })">
                    {{memberInfo.remark | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('address') })">
                    {{memberInfo.homeAddr | contentFilter}}
                </FormItem>
            </i-col>
        </Form>
    </confirm-member-info>
</template>
<script>
    import confirmMemberInfo from './confirmDetailModal';
    import ajax from '@/api/index.js';

    export default {
        props : {
            //会员信息
            'member-info' : {
              type : Object,
              default () {
                  return {};
              }
            },
            //是否显示模态框
            value : {
                type : Boolean,
                default : false
            }
        },
        components : {
            confirmMemberInfo
        },
        data () {
            return {
                //补卡费
                replaceCardFee : ''
            };
        },
        methods : {
            /**
             * 确认重新开卡
             */
            confirmDataInfo () {

            },
            /**
             * 查询补卡费
             */
            queryCardReplaceFee () {
                ajax.post('queryCardReplaceFee').then(res => {
                    if (res.success) {
                        this.replaceCardFee = res.data;
                    } else {
                        this.replaceCardFee = '';
                    }
                });
            },
        },
        created () {
            this.queryCardReplaceFee();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
