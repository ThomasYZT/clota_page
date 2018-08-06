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
    <div slot="header" class="target-class">
      <span class="title">{{$t('createNodeMsg',{node : nodeDetail.title})}}</span>
    </div>
    <Form ref="formValidate"
          :model="formData"
          :rules="ruleValidate"
          :label-width="0">
      <FormItem :label="$t('nodeName')" prop="nodeName">
        <Input v-model="formData.nodeName"/>
      </FormItem>
      <FormItem :label="$t('nodeType')" prop="nodeType">
        <Select v-model="formData.nodeType" >
          <Option :value="item.value"
                  v-for="item in nodeListCanChose"
                  :key="item.value">
            {{$t(item.label)}}
          </Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
      <Button class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
    </div>
  </Modal>
</template>

<script>
  import {nodeList} from '@/assets/js/constVariable.js';
  export default {
    props : {
      //绑定的模态框是否显示的变量
      value : {
        type : Boolean,
        default : false
      },
      //节点详情
      'node-detail' : {
        type : Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        formData : {
          //节点名称
          nodeName : '',
          //节点类型
          nodeType : ''
        },
        //节点类型
        nodeList : nodeList,
        //校验规则
        ruleValidate : {
          nodeName : [
            {required : true,message: this.$t('validateError.pleaseInput',{msg : this.$t('nodeName')}),trigger  : 'blur'}
          ],
          nodeType : [
            {required : true,message: this.$t('validateError.pleaseSelect',{msg : this.$t('nodeName')}),trigger  : 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 模态框状态改变
       */
      changeValue (data) {
        this.$emit('input',data);
      },
      /**
       * 模态框显示或隐藏
       * @param type
       */
      visibleChange (type) {
          if(type === false){
            this.resetFormData();
            this.$refs.formValidate.resetFields();
          }
      },
      /**
       * 取消新增
       */
      cancel () {
        this.$emit('input',false);
      },
      /**
       * 确认新增
       */
      confirm () {
        this.$refs.formValidate.validate(valid => {
          if(valid) {
            if(this.formData.nodeType === 'company'){
              this.$emit('add-com-modal-show',JSON.parse(JSON.stringify(this.formData)));
            }else if(this.formData.nodeType === 'scene'){
              this.$emit('add-scene-modal-show',JSON.parse(JSON.stringify(this.formData)));
            }else if(this.formData.nodeType === 'cashier'){
              this.$emit('add-cashier-modal-show',JSON.parse(JSON.stringify(this.formData)));
            }
            this.$emit('input',false);
          }
        });
      },
      /**
       * 初始化表单数据
       */
      resetFormData () {
        for(let item in this.formData){
          this.formData[item] = '';
        }
      },
    },
    computed : {
      //可以选择的节点类型
      nodeListCanChose () {
        return this.nodeList
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  .add-node{
    & /deep/ .ivu-modal{
      width: 600px!important;
      height: 350px;
    }

    .target-class{
      height: 23px;
      line-height: 23px;

      .title{
        font-size: 14px;
        color: #354052;
        letter-spacing: 1px;
        text-align: left;
      }
    }

    & /deep/ .ivu-modal-header{
      padding: 17px 30px;
      font-size: $font_size_16px;
    }

    & /deep/ .ivu-modal-close{
      top: 13px;
    }

    & /deep/ .ivu-modal-body {
      padding: 0;
      position: relative;
      @include block_outline($height : 230px);
    }

    /deep/ .ivu-modal-footer{
      text-align: center;
    }

    /deep/ .ivu-form-item{
      justify-content: center;
    }

    /deep/ .ivu-form{
      @include center_center();
    }

  }
</style>
