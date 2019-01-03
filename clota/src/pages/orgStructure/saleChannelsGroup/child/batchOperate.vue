<!---->

<template>
    <Poptip placement="bottom-start"
            v-model="bathChangeGroupShow"
            width="312"
            transfer
            popper-class="select-group"
            @on-popper-hide="popperHide">
        <el-dropdown trigger="click"
                     placement="bottom-start"
                     size="medium"
                     @command="handleCommand" @click.native.stop="">
            <Button type="ghost" style="float: left">{{$t('batchOperate')}}</Button><!--批量操作-->

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in batchOperate"
                                  :disabled="saleGroupSelected.length < 1"
                                  :key="index"
                                  :command="item">{{$t(item.label)}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div slot="content">
            <!--将所选销售渠道移至分组-->
            <div class="name">{{$t('saleChannelToGroup')}}</div>
            <Form ref="formData" :model="formData" :rules="ruleValidate">
                <FormItem prop="selectOrgId">
                    <Select v-model="formData.selectOrgId" style="width:240px" transfer>
                        <Option :value="item.id"
                                v-for="item in orgGroupList"
                                :label="item.groupName"
                                :key="item.id"
                                class="name-select"
                                v-w-title="item.groupName">
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div class="btn-area">
                <Button type="primary" @click="batchChangeOrg">{{$t('confirm')}}</Button><!--确定-->
                <Button type="ghost" @click="bathChangeGroupShow = false">{{$t('cancel')}}</Button><!--取消-->
            </div>
        </div>
    </Poptip>
</template>

<script>
    import { saleOperateBatch } from '@/assets/js/constVariable.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //销售渠道分组
            'orgGroupList' : {
              type : Array,
              default () {
                  return [];
              }
            },
            //选择的渠道
            'saleGroupSelected' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {

                //分组信息
                formData : {
                    //移动分组时选择的分组
                    selectOrgId : ''
                },
                //批量移动分组显示
                bathChangeGroupShow : false,
                //表单校验规则
                ruleValidate : {
                    selectOrgId : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('saleGroup') }),trigger : 'change' },
                    ]
                },
            };
        },
        methods : {
            /**
             * 批量操作
             * @param command
             */
            handleCommand (command) {
                this.bathChangeGroupShow = false;
                if (command.value === 'outGroup') {
                    this.$emit('handle-out-group');
                } else if (command.value === 'toOtherGroup') {
                    this.bathChangeGroupShow = true;
                }
            },
            /**
             * 批量移动分组
             */
            batchChangeOrg () {
                this.$refs.formData.validate(valid =>{
                    if (valid) {
                        this.$emit('handle-remove-group',this.formData.selectOrgId);
                        this.bathChangeGroupShow = false;
                    }
                });
            },
            /**
             * 弹窗隐藏时，去掉表单验证信息
             */
            popperHide () {
                this.$refs.formData.resetFields();
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以移动分组
            canMoveSaleGroup () {
                return this.permissionInfo && this.permissionInfo['moveSaleGroup'] === 'allow';
            },
            //是否可以移出分组
            canRemoveSaleGroup () {
                return this.permissionInfo && this.permissionInfo['removeSaleGroup'] === 'allow';
            },
            //批量操作类型
            batchOperate () {
                let result = [];
                if (this.canMoveSaleGroup) {
                    result = result.concat(saleOperateBatch.slice(0,1));
                }
                if (this.canRemoveSaleGroup) {
                    result = result.concat(saleOperateBatch.slice(1));
                }
                return result;
            },
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

    .name-select{
        @include overflow_tip();
    }
    .select-group .btn-area{
        text-align: right;
        margin-top: 20px;
    }
</style>
