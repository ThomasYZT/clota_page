<!--
    改签模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('applyForUpgrade')"
           class-name="vertical-center-modal"
           @on-visible-change="visibleChange"
           width="420">

        <Form :label-width="150"
              ref="formRef"
              :model="formData"
              :rules="ruleValidate"
              label-position="right">

            <!-- 申请改签数量 -->
            <FormItem :label="$t('applyForUpgradeNum')">
                {{num}}
            </FormItem>
            <FormItem label="申请改签至" prop="afterAlterDate">
                <DatePicker v-model="formData.afterAlterDate"
                            format="yyyy-MM-dd"
                            type="date"
                            :options="dateOptions"
                            :clearable="false"
                            :editable="false"
                            transfer>
                </DatePicker>
            </FormItem>
        </Form>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="save">{{$t('confirm')}}</Button>
            <Button class="btn-88px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index'
    export default {
        components: {},
        data() {
            return {
                //是否显示模态框
                visible: false,
                //已选择的行数据
                chosedData: [],
                //申请改签数量
                num: 0,
                baseInfo: {},
                orderTicketIds: '',
                //可以改签的日期
                canAlterDate : [],
                //表单校验规则
                ruleValidate : {
                    afterAlterDate : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('改签日期')}),trigger : 'change',type : 'date'}
                    ]
                },
                //表单数据
                formData : {
                    //改签日期
                    afterAlterDate: '',
                }
            }
        },
        methods: {
            toggle(data) {
                if(!this.visible && data) {
                    this.chosedData = data.chosedData;
                    this.baseInfo = data.baseInfo;
                    this.num = this.chosedData.length;
                    this.orderTicketIds = data.chosedData.map(item => item.id).join(',');
                    this.getProductPolicyPlayDate();
                }else {
                    this.chosedData = [];
                    this.num = 0;
                    this.baseInfo = {};
                }

                this.visible = !this.visible;
            },
            /**
             * 确认改签
             */
            save() {
                this.$refs.formRef.validate(valid => {
                    if(valid) {
                        ajax.post('saveOrderProductRefundAlter', {
                            reqType: 'alter',
                            orderId: this.baseInfo.orderId,
                            visitorProductId: this.baseInfo.visitorProductId,
                            productId: this.baseInfo.productId,
                            reqOrderTicketIds: this.orderTicketIds,
                            afterAlterDate: this.formData.afterAlterDate.format('yyyy-MM-dd')
                        }).then(res => {
                            if(res.success) {
                                this.$Message.success('发起改签申请成功');
                                this.toggle();
                                this.$emit('fresh-data');
                            }else {
                                this.$Message.error('发起改签申请失败');
                                this.toggle();
                            }
                        })
                    }
                });
            },
            /**
             * 获取产品可预定日期
             */
            getProductPolicyPlayDate () {
                ajax.post('getProductPolicyPlayDate',{
                    visitorProductId : this.baseInfo.visitorProductId,
                }).then(res => {
                    if(res.success){
                        this.canAlterDate = res.data ? res.data : [];
                    }else{
                        this.canAlterDate = [];
                    }
                });
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === false){
                    this.$refs.formRef.resetFields();
                }else{
                }
            },
        },
        computed : {
            //日期插件配置参数
            dateOptions () {
                return {
                    disabledDate : (date) =>  {
                        if(date){
                            return !this.canAlterDate.includes(date.format('yyyy-MM-dd 00:00:00'));
                        }
                        return true;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
