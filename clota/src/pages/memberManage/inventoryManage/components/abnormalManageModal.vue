<!--
    异常管理模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="isShow"
           class-name="vertical-center-modal"
           :title="$t('CommodityAbnormalManagement')">
        <Form ref="formList"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="180">
            <i-row>
                <i-col span="18" offset="1">
                    <Form-item :label="$t('takeAwayNum')+':'" prop="stockNum">
                        <Input v-model.trim="formData.stockNum" :placeholder="$t('inputField', { field : $t('editNum') })" style="width: 200px"></Input>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="18" offset="1">
                    <Form-item :label="$t('editReason')" prop="remark">
                        <Input v-model.trim="formData.remark" :placeholder="$t('inputField', { field : $t('editReason') })" style="width: 200px"></Input>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="save">{{$t('save')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '../../../../api/index';
    import common from '@/assets/js/common.js';
    export default {
        components : {},
        data () {
            //校验是否为正整数
            const validateNum = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'fieldTypeError') {
                        callback(this.$t(err,{ field : '' }));
                    } else if (err === 'integetError') {
                        callback(this.$t(err, { field : '' }));
                    } else {
                        callback();
                    }
                });
            };

            return {
                //是否显示模态框
                isShow : false,
                //表单数据
                formData : {
                    //商品id
                    id : '',
                    //减去的异常数量
                    stockNum : '',
                    //原因
                    remark : ''
                },
                ruleValidate : {
                    stockNum : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('amount') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur' }
                    ],
                    remark : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('reason') }), trigger : 'blur' },
                    ]

                }
            };
        },
        methods : {
            /**
             * 显示/隐藏模态框
             * @param {object} data
             */
            toggle (data) {
                if (data) {
                    this.formData.id = data.id;
                } else {
                    this.formData.id = {
                        id : '',
                        stockNum : '',
                        remark : ''
                    };
                }
                this.$refs.formList.resetFields();
                this.isShow = !this.isShow;
            },
            /**
             * 保存商品异常管理
             */
            save () {
                this.$refs.formList.validate( valid => {
                    if (valid) {
                       this.abnormalEdit();
                    }
                });
            },
            /**
             * 异常库存编辑
             */
            abnormalEdit () {
                ajax.post('abnormalGoodsManage', this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                        this.toggle();
                        this.$emit('editSuccess');
                    } else {
                        if (res.code && (res.code === 'M017' || res.code === 'M018' || res.code === 'M019')) {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                        }
                        this.toggle();
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
