<!---->

<template>
    <Modal
        :title="$t('新建规则')"
        :mask-closable="false"
        :value="value"
        :width="580"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="create-rule"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="80">
            <FormItem :label="$t('规则名称')" prop="name">
                <Input v-model="formData.name" :placeholder="$t('inputPlaceholder')"/>
            </FormItem>
            <FormItem :label="$t('开始时间')" prop="startTime">
                <DatePicker type="date"
                            :placeholder="$t('selectField',{ msg : '' })"
                            v-model="formData.startTime">
                </DatePicker>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost"
                    v-if="showCancel"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
        },
        data () {
            return {
                //表单数据
                formData : {
                    //规则名称
                    name : '',
                    //开始时间
                    startTime : ''
                },
                //校验规则
                ruleValidate : {

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
             * @param{Boolean} type 当前显示的状态
             */
            visibleChange (type) {
            },
            /**
             * 保存规则
             */
            save () {

            },
            /**
             * 取消保存
             */
            cancel () {
                this.changeValue(false);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
