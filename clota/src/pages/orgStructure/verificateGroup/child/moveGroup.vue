<!--移动分组-->

<template>
    <Poptip placement="right"
            width="312"
            :value="value"
            transfer
            popper-class="select-group"
            @on-popper-hide="popperHide">
        <!--移至其它分组-->
        <span @click="$emit('input',true)">{{$t('toOtherGroup')}}</span>
        <div slot="content">
            <!--将所选核销设备移至分组-->
            <div class="name">{{$t('verificationToGroup')}}</div>
            <Form ref="formData" :model="formData" :rules="ruleValidate">
                <FormItem prop="selectOrgId">
                    <Select v-model="formData.selectOrgId" style="width:240px" transfer>
                        <Option :value="item.id"
                                v-for="item in orgGroupList"
                                :label="item.groupName"
                                :key="item.id">
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div class="btn-area">
                <Button type="primary" @click="changeOrg">{{$t('confirm')}}</Button><!--确定-->
                <Button type="ghost" @click="$emit('input',false)">{{$t('cancel')}}</Button><!--取消-->
            </div>
        </div>
    </Poptip>
</template>

<script>
    export default {
        props : {
            //行数据
           rowData : {
               type : Object,
               default () {
                   return {};
               }
           },
            //核销设备分组
            'orgGroupList' : {
                type : Array,
                default () {
                    return [];
                }
            },
            value : {
               type : Boolean,
                default : false
            }
        },
        data () {
            return {
                //表单校验规则
                ruleValidate : {
                    selectOrgId : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('saleGroup') }),trigger : 'change' },
                    ]
                },
                //分组信息
                formData : {
                    //移动分组时选择的分组
                    selectOrgId : ''
                },
            };
        },
        methods : {
            /**
             * 修改分组
             */
            changeOrg () {
                this.$refs.formData.validate(valid => {
                    if (valid) {
                        this.$emit('move-channel-group',[{
                            checkGroupId : this.formData.selectOrgId,
                            id : this.rowData.id,
                        }]);
                        this.$emit('input',false);
                    }
                });
            },
            /**
             * 模态框隐藏触发事件
             */
            popperHide () {
                this.$refs.formData.resetFields();
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .select-group{
        height: 153px;
    }
    .select-group .ivu-poptip-content,
    .select-group .ivu-poptip-inner{
        height: 100%;
    }
    .select-group .ivu-poptip-body{
        padding-top: 0;
        padding-bottom: 0;
    }

    .select-group .name{
        height: 46px;
        padding: 20px 0 10px 0;
        font-size: 12px;
        color: #666666;
    }
    .select-group .btn-area{
        text-align: right;
        margin-top: 20px;
    }
</style>
