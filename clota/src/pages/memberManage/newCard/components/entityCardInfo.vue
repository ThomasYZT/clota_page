<!--
内容：实体卡信息
作者：djc
日期：
-->

<template>
    <div class="entity-card-info">

        <Form ref="formValidate"
              :model="entityCardParam"
              :rules="ruleValidate"
              label-position="top">
            <h3>{{$t(title)}}</h3><!--实体卡信息-->
            <template>
                <i-row>
                    <i-col span="12">
                        <Form-item :label="$t('thirdCardNum')" prop="tpNo"><!--卡面号-->
                            <Input v-model.trim="entityCardParam.tpNo"
                                   :disabled="true"
                                   style="width: 280px"
                                   :placeholder="$t('readCard')"/>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <Form-item :label="$t('thirdCardFaceNum')" prop="tpCardNo" style="float: right"><!--物理卡号-->
                            <Input v-model.trim="entityCardParam.tpCardNo"
                                   :disabled="true"
                                   style="width: 280px"
                                   :placeholder="$t('readCard')"/>
                        </Form-item>
                    </i-col>
                </i-row>
            </template>
            <Button style="width: 100%;"
                    type="dashed"
                    :loading="reading"
                    :disabled="reading || !cardReadEnabled"
                    @click="fetchCardInfo">
                    <span v-if="!reading">{{$t('readCard')}}</span><!--请读卡-->
                    <span v-else-if="reading">{{$t('readingCardInfo') + '...'}}</span><!--正在读取实体卡信息...-->
                    <span class="blue" v-else-if="!reading && (entityCardParam.tpNo && !entityCardParam.tpCardNo)">
                    <span class="red">{{$t('recognizeFailed')}}</span>{{$t('clickReadAgain')}}</span><!--识别失败！点击重新读取-->
            </Button>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        props : {
            title : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                // 读卡中: reading
                reading : false,
                // 实体卡信息表单
                entityCardParam : {
                    //第三方卡号
                    tpNo : "",
                    //第三方卡面号
                    tpCardNo : "",
                },
                // 表单校验规则
                ruleValidate : {}
            };
        },
        computed : {
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled'
            })
        },
        methods : {
            /**
             * 查询当前实体卡是否可以使用
             * @param{String} physicalNum 物理卡号
             */
            getAllEntityCard (physicalNum) {
                this.reading = true;
                return ajax.post('findByPhysicalNum',{
                    physicalNum : physicalNum,
                    entityCardType : 'common'
                }).then(res => {
                    if (res.success && res.data ) {
                        if (Object.keys(res.data).length > 0) {
                            this.entityCardParam.tpNo = res.data.physicalNum;
                            this.entityCardParam.tpCardNo = res.data.faceNum;
                            this.$emit('set-card-data',{
                                physicalNum : res.data.physicalNum,
                                faceNum : res.data.faceNum,
                            });
                        } else {
                            this.entityCardParam.tpNo = '';
                            this.entityCardParam.tpCardNo = '';
                            this.$Message.warning(this.$t('noMatchCard')); // 对不起，找不到该卡的信息，请尝试更换其他的卡
                            this.$emit('set-card-data',{
                                physicalNum : '',
                                faceNum : '',
                            });
                        }
                    } else if (res.code === 'M026') {
                        this.$Message.warning(this.$t('entityCardUsedErr'));
                        this.entityCardParam.tpNo = '';
                        this.entityCardParam.tpCardNo = '';
                        this.$emit('set-card-data',{
                            physicalNum : '',
                            faceNum : '',
                        });
                    } else {
                        this.entityCardParam.tpNo = '';
                        this.entityCardParam.tpCardNo = '';
                        this.$emit('set-card-data',{
                            physicalNum : '',
                            faceNum : '',
                        });
                    }
                }).finally(() => {
                    this.reading = false;
                });
            },
            /**
             * 读取实体卡信息
             */
            fetchCardInfo () {
                this.entityCardParam.tpNo = '';
                this.entityCardParam.tpCardNo = '';
                this.$store.dispatch('getCardReadData').then(res => {
                    this.getAllEntityCard(res);
                }).catch(err => {
                    if (err === 'dcCardError') {
                        this.$Message.warning(this.$t('pleasePlaceEntityCard'));
                    }
                });
            },
            readEntityCard (cardId) {
                let matchedCard = this.allEntityCards.find((item, i) => {
                    return cardId === item.physicalNum;
                });
                if (matchedCard) {
                    this.entityCardParam.tpNo = cardId;
                    this.entityCardParam.tpCardNo = matchedCard.faceNum;
                } else {
                    this.$Message.warning(this.$t('noMatchCard')); // 对不起，找不到该卡的信息，请尝试更换其他的卡
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .entity-card-info {
        width: 850px;
        margin: 20px auto;

        h3 {
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }
    }
</style>
