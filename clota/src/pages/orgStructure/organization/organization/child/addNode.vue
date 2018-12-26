<!--添加节点-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-node"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class" v-w-title="$t('createNodeMsg',{node : nodeDetail.orgName})">
            <span class="title">{{$t('createNodeMsg',{node : nodeDetail.orgName})}}</span>
        </div>
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="100">
            <FormItem :label="$t('nodeName')" prop="nodeName">
                <Input v-model="formData.nodeName" style="width: 280px"/>
            </FormItem>
            <FormItem :label="$t('nodeType')"
                      prop="nodeType" >
                <Select v-model="formData.nodeType"
                        style="width: 280px">
                    <Option :value="item.value"
                            v-for="item in nodeListCanChose"
                            :key="item.value">
                        {{$t(item.label)}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('是否启用')"
                      prop="status"
                      v-if="formData.nodeType === 'department'">
                <RadioGroup v-model="formData.status" style="width: 280px">
                    <Radio label="open">立即启用</Radio>
                    <Radio label="close">暂不启用</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import {nodeList} from '@/assets/js/constVariable.js';


    export default {
        props: {
            //绑定的模态框是否显示的变量
            value: {
                type: Boolean,
                default: false
            },
            //节点详情
            'node-detail': {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                formData: {
                    //节点名称
                    nodeName: '',
                    //节点类型
                    nodeType: '',
                    //是否启用
                    status : 'open'
                },
                //节点类型
                nodeList: nodeList,
                //校验规则
                ruleValidate: {
                    nodeName: [
                        {
                            required: true,
                            message: this.$t('inputField', {field: this.$t('nodeName')}),
                            trigger: 'blur'
                        },
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('nodeName'),length : 100}),trigger: 'blur'}
                    ],
                    nodeType: [
                        {
                            required: true,
                            message: this.$t('selectField', {msg: this.$t('nodeType')}),
                            trigger: 'blur'
                        }
                    ],
                    status : [
                        {
                            required: true,
                            message: this.$t('selectField', {msg: this.$t('isStarted')}),
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if (type === false) {
                    this.resetFormData();
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$emit('input', false);
            },
            /**
             * 确认新增
             */
            confirm() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.formData.nodeType === 'company') {
                            this.$emit('add-com-modal-show', JSON.parse(JSON.stringify(this.formData)));
                        } else if (this.formData.nodeType === 'scene') {
                            this.$emit('add-scene-modal-show', JSON.parse(JSON.stringify(this.formData)));
                        } else if (this.formData.nodeType === 'cashier') {
                            this.$emit('add-cashier-modal-show', JSON.parse(JSON.stringify(this.formData)));
                        }else if(this.formData.nodeType === 'department'){
                            //新增了部门
                            this.$emit('add-department',JSON.parse(JSON.stringify(this.formData)));
                        }
                        this.$emit('input', false);
                    }
                });
            },
            /**
             * 初始化表单数据
             */
            resetFormData() {
                for (let item in this.formData) {
                    this.formData[item] = '';
                }
            },
        },
        computed: {
            //可以选择的节点类型
            //公司或集团可以建立公司、景区、部门的子节点
            //景区可以建立景区、部门的子节点
            //部门不可创建子节点
            nodeListCanChose() {
                if(this.nodeDetail){
                    if(this.nodeDetail.nodeType === 'company'){
                        return this.nodeList.filter(item => item.label !== 'cashier');
                    }else if(this.nodeDetail.nodeType === 'scenic' ){
                        return this.nodeList.filter(item => item.label !== 'company');
                    }else{
                        return [];
                    }
                }else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-node {
        & /deep/ .ivu-modal {
            width: 560px !important;
            height: 350px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;
            @include overflow_tip();

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 17px 30px;
            font-size: $font_size_16px;
        }

        & /deep/ .ivu-modal-close {
            top: 13px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 230px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        /*/deep/ .ivu-form-item {*/
            /*justify-content: center;*/
        /*}*/

        /deep/ .ivu-form{
            @include center_center();
        }

    }
</style>
