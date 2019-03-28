<!--新增优惠券-->

<template>
    <Modal
        :title="modalTitle"
        v-model="modalShow"
        :mask-closable="false"
        :width="500"
        @on-visible-change="visibleChange"
        class="add-coupon"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="170">
            <FormItem :label="$t('请选择要推送的优惠券')" prop="name">
                <Select v-model="formData.name"
                        style="width: 240px;"
                        transfer
                        :placeholder="$t('selectField',{ msg : '' })">
                    <Option v-for="(item,index) in couponList"
                            :key="index"
                            :value="item.value">
                        {{item.name}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('规则失效时间')" prop="invalidateDate">
                <DatePicker type="date"
                            transfer
                            :options="dateOptions"
                            style="width: 240px;"
                            :editable="false"
                            :placeholder="$t('selectField',{ msg : '' })"
                            v-model="formData.invalidateDate">
                </DatePicker>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">
                {{$t('submit')}}
            </Button>
            <Button class="ivu-btn-90px"
                    @click="cancel">
                {{$t('cancel')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
	export default {
		data () {
			return {
                //是否显示模态框
                modalShow : false,
                //表单数据
                formData : {
                    name : '',
                    //失效时间
                    invalidateDate : '',
                    //当前操作状态
                    type : ''
                },
                //校验规则
                ruleValidate : {
                    name : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('coupon') }),
                            trigger : 'change'
                        }
                    ],
                    invalidateDate : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('规则失效时间') }),
                            trigger : 'change',
                            type : 'date'
                        }
                    ]
                },
                //优惠券列表
                couponList : [
                    {
                        name : '1',
                        value : '1'
                    }
                ],
                //规则失效日期参数
                dateOptions : {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            };
		},
		methods : {
            /**
             * 模态框显示或隐藏
             * @param{Boolean} type 模态框状态
             */
            visibleChange (type) {
                if (!type) {
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 确认新增
             */
            confirm () {
                this.$refs.formValidate.validate(valid => {
                    if (valid ) {
                        this.modalShow = false;
                        this.$emit('set-coupon',{
                            name : this.formData.name,
                            type : this.formData.type,
                            invalidateDate : this.formData.invalidateDate
                        });
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.modalShow = false;
            },
            /**
             * 显示模态框
             * @param{Object} params 优惠券参数
             */
            show (params) {
                this.formData.name = params.name;
                this.formData.type = params.type;
                this.formData.invalidateDate = params.invalidateDate;
                this.modalShow = true;
            }
        },
        computed : {
		    //模态框标题
		    modalTitle () {
		        if (this.formData.type === 'add') {
		            return this.$t('新增优惠权益');
                } else if (this.formData.type === 'modify') {
		            return this.$t('编辑优惠券权益');
                } else {
		            return '';
                }
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-coupon{

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 50px;
            padding-bottom: 40px;
            padding-right: 45px;
        }
    }
</style>
