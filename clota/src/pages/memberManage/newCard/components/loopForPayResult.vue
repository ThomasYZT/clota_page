<!--轮询查询支付结果-->

<template>
    <Modal
        :title="$t('notice')"
        :mask-closable="false"
        :value="value"
        :width="560"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="loop-search-pay-result"
        class-name="vertical-center-modal">
        <div class="target-body">
            <!--等待查询交易状态-->
            <template v-if="stage === 'search'">
                <div class="trading-title">交易正在进行中…</div>
                <div class="scan-img">
                    <img src="../../../../assets/images/icon-wait-pay.svg" alt="">
                </div>
            </template>
            <!--等待扫码-->
            <template v-else-if="stage === 'scan'">
                <div class="wait-scan">等待扫码中…</div>
                <div class="scan-img">
                    <img src="../../../../assets/images/icon-scan.svg" alt="">
                </div>
                <div class="input-area">
                    <Form ref="formValidate"
                          :model="formData"
                          :rules="ruleValidate">
                        <FormItem prop="code">
                            <Input type="text"
                                   id="payCodeInput"
                                   v-model.trim="formData.code"
                                   autofocus
                                   style="width: 280px"
                                   placeholder="扫码前，请获取焦点"
                                   @on-focus="setValidateStatus"
                                   @keyup.native.stop.enter="startPay"/>
                        </FormItem>
                    </Form>
                </div>
            </template>
            <!--支付结果未知-->
            <template v-else-if="stage === 'unknown'">
                <div class="open-card-suc-img">
                    <img src="../../../../assets/images/icon-open-card-fail.svg" alt="">
                </div>
                <div class="open-card-suc-label">
                    交易结果未知！
                </div>
                <div class="to-for-detail">
                    可前往<span class="trade-record" @click="toTradeRecrod"> 在线交易记录 </span>继续查询支付结果
                </div>
            </template>
            <!--支付成功-->
            <template v-else-if="stage === 'fail'">
                <div class="open-card-suc-img">
                    <img src="../../../../assets/images/icon-open-card-fail.svg" alt="">
                </div>
                <div class="open-card-suc-label">
                    交易失败!
                </div>
            </template>
            <!--支付成功-->
            <template v-else-if="stage === 'success'">
                <div class="open-card-suc-img">
                    <img src="../../../../assets/images/icon-open-card-success.svg" alt="">
                </div>
                <div class="open-card-suc-label">
                    交易成功!
                </div>
            </template>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //内部交易id
            'transaction-id' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                //轮询查询时间
                loopSearchTime : 120000,
                //定时器
                timer : null,
                //是否在查询支付结果中
                searchIng : false,
                //表单数据
                formData : {
                    code : ''
                },
                ruleValidate : {
                    code : [
                        {
                            required : true,
                            message : '请重新获取输入焦点',
                            trigger : 'blur'
                        }
                    ]
                },
                //开卡阶段
                stage : 'scan'
            };
        },
        methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                // if (data === false) {
                //     this.$refs.formValidate.resetFields();
                // }
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
                if (type === false) {
                    clearInterval(this.timer);
                    this.formData.code = '';
                    this.stage = 'scan';
                } else {
                    this.$nextTick(() => {
                        let ele = this.$el.querySelector('#payCodeInput .ivu-input');
                        if (ele) {
                            ele.focus();
                        }
                    });
                }
            },
            /**
             * 查询支付结果
             */
            queryConsumeUpdateBiz () {
                this.searchIng = true;
                ajax.post('queryConsumeUpdateBiz',{
                    transactionId : this.transactionId
                }).then(res => {
                    if (res.success && res.data === 'success') {
                        this.$emit('search-success');
                        this.stage = 'success';
                        clearInterval(this.timer);
                    } else if (res.data === 'fail') {
                        clearInterval(this.timer);
                        this.stage = 'fail';
                    }
                }).finally(() => {
                    this.searchIng = false;
                    this.loopSearchTime -= 3000;
                });
            },
            /**
             * 发起支付申请
             */
            startPay () {
                this.$emit('start-pay',this.formData.code);
            },
            /**
             * 重置输入报错信息
             */
            setValidateStatus () {
                this.$refs.formValidate.resetFields();
            },
            /**
             * 轮询查询支付结果
             */
            startSearchPayResult () {
                this.stage = 'search';
                this.timer = setInterval(() => {
                    if (this.loopSearchTime <= 0) {
                        clearInterval(this.timer);
                        this.stage = 'unknown';
                    } else {
                        if (!this.searchIng) {
                            this.queryConsumeUpdateBiz();
                        }
                    }
                },3000);
            },
            /**
             * 前往在线交易记录
             */
            toTradeRecrod () {
                this.$router.push({
                    name : 'tradeRecord'
                });
            },
            /**
             * 设置支付阶段
             * @param stage 阶段
             */
            setStage (stage) {
                this.stage = stage;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .loop-search-pay-result{
        /deep/ .ivu-modal-footer{
            display: none;
        }

        .target-body{
            @include block_outline($height : 322px);

            .wait-scan,
            .trading-title{
                font-size: $font_size_18px;
                color: $color_333;
                text-align: center;
            }

            .wait-scan{
                padding-top: 50px;
            }

            .trading-title{
                padding-top: 82px;
            }

            .scan-img{
                @include block_outline($height : 154px);
                text-align: center;
                padding-top: 25px;
            }

            .input-area{
                text-align: center;
            }

            .ivu-form{
                @include block_outline($width : 280px);
                margin: 0 auto;
            }

            .open-card-suc-img{
                padding-top: 90px;

                img{
                    @include block_outline(63px,63px,false);
                    margin: 0 auto;
                }
            }

            .open-card-suc-label{
                padding-top: 27px;
                font-size: $font_size_28px;
                color: $color_333;
                text-align: center;
            }

            .to-for-detail{
                font-size: $font_size_18px;
                color: $color_999;
                text-align: center;
                padding-top: 10px;

                .trade-record{
                    cursor: pointer;

                    &:hover{
                        color: $color_blue;
                    }
                }
            }
        }
    }
</style>
