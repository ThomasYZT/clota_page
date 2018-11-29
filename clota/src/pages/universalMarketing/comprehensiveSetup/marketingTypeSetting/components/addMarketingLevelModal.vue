<!--
    新增营销等级模态框
    作者：杨泽涛
-->
<template>
    <Modal class="add-marketing-level"
           v-model="visible"
           :title="$t('addNewMarketingLevel')"
           class-name="vertical-center-modal add-marketing-level"
           width="600"
           :mask-closable="false">

        <div class="form-wrapper">
            <Form ref="form"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="180">
                <i-row>
                    <i-col span="18" offset="3">
                        <!-- 营销等级名称 -->
                        <FormItem :label="$t('colonSetting', { key : $t('marketingLevelName') })"  prop="marketingLevelName">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.marketingLevelName"
                                   :placeholder="$t('inputField', { field : $t('marketingLevelName') })"/>
                        </FormItem>
                        <!-- 等级 -->
                        <FormItem :label="$t('colonSetting', { key : $t('level') })"  prop="level">
                            <Select v-model="formData.level"
                                    :placeholder="$t('selectField', { msg : $t('level') })"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in levelList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <!-- 升级金额 -->
                        <FormItem :label="$t('colonSetting', { key : $t('levelUpMoney') })"  prop="levelUpMoney">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.levelUpMoney"
                                   :placeholder="$t('inputField', { field : $t('levelUpMoney') })"/>
                        </FormItem>

                    </i-col>
                </i-row>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="save" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //营销等级名称
                    marketingLevelName : '',
                    //升级金额
                    levelUpMoney : '',
                    //等级
                    level : '',
                },
                //等级下拉列表
                levelList : [],
                //表单验证规则
                ruleValidate : {
                    marketingLevelName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('marketingLevelName') }), trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength',{ field : this.$t('marketingLevelName'),length : 20 }), trigger : 'blur' },
                    ],
                    level : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('level') }), trigger : 'blur' },
                    ],
                    levelUpMoney : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('levelUpMoney') }), trigger : 'blur' },
                    ]
                },
            };
        },
        methods : {
            /**
             * 显示、隐藏模态框
             */
            toggle () {
               this.formData = {
                    marketingLevelName : '',
                    levelUpMoney : '',
                    level : '',
                };
               this.levelList = [
                    {
                        label : '111',
                        value : '111'
                    },
                    {
                        label : '222',
                        value : '222'
                    },
                    {
                        label : '333',
                        value : '333'
                    },
                    {
                        label : '444',
                        value : '444'
                    }
                ];
                this.$refs.form.resetFields();
               this.visible = !this.visible;
            },
            /**
             * 保存
             */
            save () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
