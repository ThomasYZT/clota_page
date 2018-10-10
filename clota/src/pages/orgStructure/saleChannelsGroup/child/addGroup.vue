<!--新增分组-->

<template>
    <Poptip placement="bottom-start"
            v-model="addGroupPopVisible"
            width="312"
            transfer
            style="float: left"
            popper-class="add-group"
            @on-popper-hide="popperHide">
        <Button type="primary"
                icon="ios-plus-empty"
                class="ivu-btn-108px"
                @click="addGroup"><!--新增分组-->
            {{$t('addGroup')}}
        </Button>
        <div slot="content">
            <div class="add-group">
                <div class="name">{{$t('addGroupName')}}</div>
                <Form ref="formData" :model="formData" :rules="ruleValidate">
                    <FormItem prop="orgName">
                        <Input v-model.trim="formData.orgName" autofocus/>
                    </FormItem>
                </Form>
                <div class="btn-area">
                    <Button type="primary" @click="addOrgName">{{$t('confirm')}}</Button>
                    <Button type="ghost" @click="addGroupPopVisible = false">{{$t('cancel')}}</Button>
                </div>
            </div>
        </div>
    </Poptip>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        data() {
            return {
                //新增分组是否显示
                addGroupPopVisible : false,
                //表单校验规则
                ruleValidate : {
                    orgName : [
                        {required : true,message : this.$t('inputField',{field : this.$t('groupName')}),trigger : 'blur'},
                        {max : 50,message : this.$t('errorMaxLength',{field : this.$t('groupName'),length : 50}),trigger : 'blur'},
                    ]
                },
                //分组信息
                formData : {
                    //新增的分组姓名
                    orgName : '',
                },
            }
        },
        methods: {
            /**
             * 新增分组
             */
            addOrgName () {
                this.$refs.formData.validate(valid => {
                    if(valid){
                        ajax.post('addOrUpdateOrgGroup',{
                            groupType : 'sale',
                            groupName : this.formData.orgName
                        }).then(res => {
                            if(res.success){
                                this.$Message.success(this.$t('successTip',{msg: this.$t('addSaleChannelGroup')}));
                                this.$emit('fresh-data');
                            }else{
                                this.$Message.error(res.code === '0004' ? this.$t('checkNameError',{field : this.formData.orgName}) : this.$t('failureTip',{msg: this.$t('add')}));
                            }
                        }).finally(() => {
                            this.addGroupPopVisible = false;
                        });
                    }
                });
            },
            /**
             * 新增分组
             */
            addGroup(event) {
                this.addGroupPopVisible = true;
            },
            /**
             * 弹窗隐藏时，去掉表单验证信息
             */
            popperHide () {
                this.$refs.formData.resetFields();
            }
        },
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-group{
        width: 280px;
        height: 138px;
    }
    .add-group .name{
        padding: 10px 0 10px 0;
        font-size: 12px;
        color: #666666;
    }

    .add-group .btn-area{
        margin-top: 30px;
        text-align: right;
    }

    .add-group .ivu-btn-ghost{
        margin-left:5px;
    }

    .ivu-poptip{
        margin-right: 10px;
    }
</style>
