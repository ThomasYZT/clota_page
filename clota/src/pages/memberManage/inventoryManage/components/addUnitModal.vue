<!--
    新增单位模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="isShow"
           class-name="vertical-center-modal"
           :mask-closable="false"
           :title="$t('addMeasurementUnit')"
           @on-cancel="hide()">
        <Form ref="formList"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="120">
            <i-row>
                <i-col span="18" offset="3">
                    <Form-item :label="$t('colonSetting', { key : $t('unitName') })" prop="unitNames">
                        <Input v-model.trim="formData.unitNames" :placeholder="$t('inputField', { field : $t('unitName') })" style="width: 200px"></Input>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="save()">{{$t('save')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="hide()">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '../../../../api/index';
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                isShow : false,
                //表单数据
                formData : {
                    //单位名称
                    unitNames : ''
                },
                ruleValidate : {
                    unitNames : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('unitName') }), trigger : 'blur' },
                    ]
                }
            };
        },
        methods : {
            //显示/隐藏模态框
            toggle () {
                this.isShow = !this.isShow;
            },
            //保存计量单位
            save () {
                this.$refs.formList.validate(valid => {
                    if (valid) {
                        this.addUnit();
                    }
                });
            },
            /**
             *  增加单位
             */
            addUnit () {
                ajax.post('addUnit', this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addUnit') }));
                        this.toggle();
                        this.$emit('addSuccess', this.formData.unitNames);
                    } else {
                        if (res.code === 'M016') {
                            //单位已存在
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('addUnit') }));
                        }
                        this.$emit('addError');
                    }
                });
            },
            /**
             * 取消隐藏模态框还原选项
             */
            hide () {
                this.formData = {
                    unitNames : ''
                };
                this.$refs.formList.resetFields();
                this.isShow = false;
                this.$emit('restore');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
