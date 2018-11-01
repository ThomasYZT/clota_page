<!--
内容：实体卡信息
作者：djc
日期：
-->

<template>
    <div class="entity-card-info">
        <!--tpCard - 测试-->
        <!--<object id="rd" data="../static/comRD800.dll" WIDTH="0" HEIGHT="0"
                classid="clsid:638B238E-EB84-4933-B3C8-854B86140668"></object>-->
        <iframe src="../../../../../static/tpCard.html" frameborder="0" id="iframe" hidden></iframe>

        <Form ref="formValidate"
              :model="entityCardParam"
              :rules="ruleValidate"
              label-position="top">
            <h3>{{$t(title)}}</h3><!--实体卡信息-->
            <template v-if="entityCardParam.tpNo && entityCardParam.tpCardNo">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCardNum')" prop="tpNo"><!--卡面号-->
                        <Input v-model.trim="entityCardParam.tpNo"
                               :disabled="true"
                               :placeholder="$t('readCard')"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCardFaceNum')" prop="tpCardNo"><!--物理卡号-->
                        <Input v-model.trim="entityCardParam.tpCardNo"
                               :disabled="true"
                               :placeholder="$t('readCard')"/>
                    </Form-item>
                </div>
            </template>
            <Button v-else style="width: 100%;"
                    type="dashed"
                    :disabled="reading"
                    @click="fetchCardInfo()">
                <span v-if="!entityCardParam.tpNo && !entityCardParam.tpCardNo">{{$t('readCard')}}</span><!--请读卡-->
                <span v-if="reading">{{$t('readingCardInfo') + '...'}}</span><!--正在读取实体卡信息...-->
                <span class="blue" v-if="!reading && (entityCardParam.tpNo && !entityCardParam.tpCardNo)">
                        <span class="red">{{$t('recognizeFailed')}}</span>{{$t('clickReadAgain')}}
                    </span><!--识别失败！点击重新读取-->

            </Button>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';

    export default {
        components: {},
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                // 读卡中: reading
                reading: false,
                // 实体卡信息表单
                entityCardParam: {
                    "tpNo": "",//第三方卡号
                    "tpCardNo": "",//第三方卡面号
                },
                // 所有实体卡信息
                allEntityCards: [],

                // 表单校验规则
                ruleValidate: {}
            }
        },
        computed: {},
        created() {
        },
        mounted() {
            console.log(rd);
        },
        watch: {},
        methods: {
            /**
             * 查询所有导入的实体卡信息
             */
            getAllEntityCard() {
                this.reading = true;
                return ajax.post('queryEntityCard',{
                    cardStatus : '',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success && res.data && res.data.memberEntityCardVoList) {
                        this.allEntityCards = res.data.memberEntityCardVoList.data || [];
                    } else {
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('获取实体卡基础数据')}));
                    }
                    return res.data;
                }).finally(() => {
                    this.reading = false;
                });
            },
            /**
             * 读取实体卡信息
             */
            fetchCardInfo() {
                this.entityCardParam.tpNo = '';
                this.entityCardParam.tpCardNo = '';

                let eleIframe = document.getElementById('iframe');
                eleIframe.contentDocument.getElementById('m1Card').onclick();
//                console.log(eleIframe.contentDocument.getElementById('sdkD3').value);

                this.entityCardParam.tpNo = eleIframe.contentDocument.getElementById('sdkD3').value;
                this.getAllEntityCard().then(() => {
                    this.readEntityCard(this.entityCardParam.tpNo);
                });
            },
            readEntityCard(cardId) {
                let matchedCard = this.allEntityCards.find((item, i) => {
                    return cardId === item.id;
                });
                if (matchedCard) {
                    this.entityCardParam.tpCardNo = matchedCard.faceNum;
                } else {
                    this.$Message.warning(this.$t('noMatchCard'));  // 对不起，找不到该卡的信息，请尝试更换其他的卡
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
