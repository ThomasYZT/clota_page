<!--
    领取奖品模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="isShow"
           class-name="vertical-center-modal"
           :title="$t('GetTheGoods')">
        <Form ref="formInline"
              v-if="Object.keys(exchangeInfo).length <= 0"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="100">
            <i-row>
                <i-col span="18" offset="3">
                    <Form-item :label="$t('ticketCode')" prop="exchangeSecurities">
                        <Input v-model="formData.exchangeSecurities" style="width:200px" :placeholder="$t('inputField', { field : $t('ticketCode') })"></Input>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>

        <div v-else>

        </div>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="submit">{{$t('submit')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                isShow : false,
                //表单数据
                formData : {
                    //兑换券号
                    exchangeSecurities : ''
                },
                //表单验证规则
                ruleValidate : {
                    exchangeSecurities : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('ticketCode') }), trigger : 'blur' },
                    ]
                },
                //商品兑换信息
                exchangeInfo : {}
            };
        },
        methods : {
            /**
             * 隐藏模态框
             */
            hide () {
                this.formData = {
                    exchangeSecurities : ''
                };
                this.toggle();
            },
            /**
             * 模态框显示/隐藏状态转换
             * @param {object} data
             */
            toggle (data) {
                if (data) {
                    this.detail = data;
                    this.formData.goodsStatus = this.detail.goodsStatus;
                }
                this.isShow = !this.isShow;
            },
            /**
             * 提交券码
             */
            submit () {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.queryGoodsChangeInfo();
                    }
                });
            },
            /**
             * 查询兑换信息
             */
            queryGoodsChangeInfo () {
                ajax.post('queryGoodsChangeInfo', this.formData).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.exchangeInfo = res.data;
                        } else {
                            this.$Message.error(this.$t('failToGet', { feild : this.$t('commodityExchangeInformation') }));
                        }
                        this.exchangeInfo = res.data ? res.data : {};
                    } else {
                        this.$Message.error(this.$t('failToGet', { feild : this.$t('commodityExchangeInformation') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
