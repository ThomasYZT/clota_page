<!--新增服务器-->

<template>
  <Modal
    title="Title"
    :mask-closable="false"
    :value="value"
    @input="changeValue"
    @on-visible-change="visibleChange"
    class="add-less"
    class-name="vertical-center-modal">
    <div slot="header" class="target-class">
      <span class="title">新增服务器</span>
    </div>
    <div class="target-body">
      <Form ref="formValidate"
            :model="formData"
            :rules="ruleValidate"
            :label-width="0">
        <FormItem label="服务器名称" prop="serverName">
          <Input v-model="formData.serverName"  style="width: 280px"/>
        </FormItem>
        <FormItem label="IP地址" prop="IPname">
          <Input v-model="formData.IPname" style="width: 280px"/>
        </FormItem>
        <FormItem label="应用服务">
          <Select v-model="formData.usingService" style="width:280px">
            <Option v-for="item in usingServiceList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="系统">
          <Select v-model="formData.system" style="width:280px">
            <Option v-for="item in systemList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="系统类型">
          <Select v-model="formData.systemType" style="width:280px">
            <Option v-for="item in systemTypeList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="监控频率" >
          <Select v-model="formData.listenRate" style="width:280px">
            <Option v-for="item in listenRateEnum"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="系统描述">
          <Input v-model="formData.systemDesc" type="textarea" style="width: 280px"/>
        </FormItem>
        <FormItem label="修改密码">
          <Input v-model="formData.password" style="width: 280px"/>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="ghost" @click="cancel">取消</Button>
      <Button type="primary" @click="save">保存</Button>
    </div>
  </Modal>
</template>

<script>
  import {validator} from 'klwk-ui';
  export default {
    props : {
      //绑定的模态框是否显示的变量
      value : {
        type : Boolean,
        default : false
      },
    },
    data() {
      //校验联系电话
      const validatePhone = (rule,value,callback ) => {
        if(value){
          if(validator.isMobile(value) || validator.isTelephone(value)){
            callback();
          }else{
            callback(this.$t('validateError.phoneError2'));
          }
        }else{
          callback(this.$t('validateError.phoneError1'));
        }
      };
      return {
        //表单数据
        formData : {
          //服务器名称
          serverName : '',
          //ip地址
          IPname : '',
          //应用服务
          usingService : '',
          //系统
          system : '',
          //系统类型
          superior : '',
          //监控频率
          listenRate : '',
          //系统描述
          systemDesc : '',
          //密码
          password  : ''
        },
        //表单校验规则
        ruleValidate : {
          serverName : [
            {required : true,message : this.$t('validateError.serverNameError'),trigger : 'blur'},
          ],
          IPname : [
            {required : true,message : this.$t('validateError.IPnameError'),trigger : 'blur'},
          ],
        },
        //系统列表
        systemList : [
          {
            value: 'New York',
            label: 'New York'
          },
        ],
        //系统类型列表
        systemTypeList : [
          {
            value: 'New York',
            label: 'New York'
          },
        ],
        //监控频率
        listenRateEnum : [
          {
            value: 'New York',
            label: 'New York'
          },
        ],
        //应用服务列表
        usingServiceList : [
          {
            value: 'New York',
            label: 'New York'
          },
        ]
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
          this.$nextTick(() => {
            this.resetFormData();
            this.$refs.formValidate.resetFields();
          });
        }
      },
      /**
       * 保存新增租户数据
       */
      save () {
        this.$refs.formValidate.validate(valid => {
          console.log(valid)
        });
      },
      /**
       * 取消新增服务器
       */
      cancel () {
        this.$emit('input',false);
      },
      /**
       * 重置表单数据
       */
      resetFormData () {
        this.formData =  {
            //服务器名称
            serverName : '',
            //ip地址
            IPname : '',
            //应用服务
            usingService : '',
            //系统
            system : '',
            //系统类型
            superior : '',
            //监控频率
            listenRate : '',
            //系统描述
            systemDesc : '',
            //密码
            password  : ''
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  .add-less{

    & /deep/ .ivu-modal{
      width: 560px!important;
      height: 554px;
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
      padding: 12px 30px;
    }

    & /deep/ .ivu-modal-close{
      top: 7px;
    }

    & /deep/ .ivu-modal-body {
      padding: 0;
    }


    .target-body{
      width: 100%;
      height: 430px;
      padding: 30px;
      overflow: auto;

      /deep/ .ivu-form{

        textarea.ivu-input{
          height: 100px;
        }

        .ivu-form-item{
          margin-bottom: 10px;
          padding-right: 100px;
          position: relative;

          .ivu-form-item-error-tip{
            width: 120px;
            position: absolute;
            top: 7px;
            right: -125px;
            left : auto;
            line-height: 1;
            padding-top: 6px;
            color: #ed3f14;
          }
        }

        .ivu-form-item-label{
          font-size: $font_size_12px;
        }
      }
    }
    & /deep/ .ivu-modal-footer{
      text-align: center;
    }
  }
</style>
