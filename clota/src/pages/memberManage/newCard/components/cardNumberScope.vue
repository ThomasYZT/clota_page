<!--快速开卡，开卡范围输入-->

<template>
    <Modal
        :title="$t('openCardSpeedly')"
        :mask-closable="false"
        :value="value"
        :width="lang === 'zh-CN' ? 520 : 580"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="card-number-scope"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData" :rules="ruleValidate"
              :label-width="lang === 'zh-CN' ? 120 : 163">
            <FormItem :label="$t('colonSetting', { key : $t('cardNoRange') })">
                <i-row>
                    <i-col style="display: inline-block;width: 165px;">
                        <FormItem prop="smallNum">
                            <Input v-model="formData.smallNum"/>
                        </FormItem>
                    </i-col>
                    -
                    <i-col style="display: inline-block;width: 165px;">
                        <FormItem prop="bigNum">
                            <Input v-model="formData.bigNum" />
                        </FormItem>
                    </i-col>
                </i-row>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('confirm')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import common from '@/assets/js/common.js';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';
    import { mapGetters } from 'vuex';

	export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            }
        },
		data () {
            //校验开卡范围最小值值
            const validateSmallNum = (rule,value,callback) => {
                if (common.isNotEmpty(value)) {
                    common.validatePositiveInteger(value,'',0,20).then(() => {
                        if (common.isNotEmpty(this.formData.bigNum)) {
                            if (validator.isNumber(this.formData.bigNum)) {
                                if (this.formData.bigNum < this.formData.smallNum) {
                                    callback(this.$t('errorGreaterThan',{ small : this.$t('startingValue'),big : this.$t('endValue') }));
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t('cardNoStartValue'),length : 20 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t('cardNoStartValue') }));
                        }
                    });
                } else {
                    callback(this.$t('inputField',{ field : this.$t('cardNoStartValue') }));
                }
            };
            //校验开卡范围最大值值
            const validateBigNum = (rule,value,callback) => {
                if (common.isNotEmpty(value)) {
                    common.validatePositiveInteger(value,'',0,20).then(() => {
                        if (common.isNotEmpty(this.formData.smallNum)) {
                            if (validator.isNumber(this.formData.smallNum)) {
                                if (this.formData.bigNum < this.formData.smallNum) {
                                    callback(this.$t('sizeErrorS',{ filed1 : this.$t('endValue'),filed2 : this.$t('startingValue') }));
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t('cardNoEndValue'),length : 20 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t('cardNoEndValue') }));
                        }
                    });
                } else {
                    callback(this.$t('inputField',{ field : this.$t('cardNoEndValue') }));
                }
            };
			return {
			    //表单数据
                formData : {
                    //范围最小值
                    smallNum : '',
                    //范围最大值
                    bigNum : '',
                },
                //表单校验规则
                ruleValidate : {
                    smallNum : [
                        {
                            validator : validateSmallNum,
                            trigger : 'blur'
                        }
                    ],
                    bigNum : [
                        {
                            validator : validateBigNum,
                            trigger : 'blur'
                        }
                    ]
                }
            };
		},
		methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
            },
            /**
             * 取消操作，隐藏模态框
             */
            cancel () {
                this.$emit('input', false);
                setTimeout(() => {
                    this.$refs.formValidate.resetFields();
                },100);
            },
            /**
             * 确认信息
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.queryEntityCardByRange();
                    }
                });
            },
            /**
             * 查询卡范围内的卡信息
             */
            queryEntityCardByRange () {
                ajax.post('queryEntityCardByRange',{
                    startNum : this.formData.smallNum,
                    endNum : this.formData.bigNum,
                }).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            let carInfo = this.setArrayToJsonData(res.data ? res.data : []);
                            this.$emit('get-num-scope',carInfo);
                            this.cancel();
                        } else {
                            this.$Message.warning(this.$t('notQueryEntityCardInfo'));
                            this.cancel();
                        }
                    }
                });
            },
            /**
             * 将数组变为对象
             * @param arr
             */
            setArrayToJsonData (arr) {
                let obj = {};
                for (let i = 0,j = arr.length; i < j; i++) {
                    obj[arr[i]['physicalNum']] = arr[i];
                }
                return obj;
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .card-number-scope{

        /deep/ .ivu-form{
            width: 100%;
        }

        /deep/ .ivu-modal-body{
            padding: 16px;
            font-size: 12px;
            line-height: 1.5;
            min-height: 163px;
            display: flex;
            align-items: center;
        }
    }
</style>
