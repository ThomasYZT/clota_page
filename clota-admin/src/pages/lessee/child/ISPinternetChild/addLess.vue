<!--新增租户-->

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
      <span class="title">新增租户</span>
    </div>
    <div class="target-body">
      <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="0">
        <FormItem label="租户公司名称" prop="companyName">
          <Input v-model="formData.companyName"  style="width: 280px"/>
        </FormItem>
        <FormItem label="联系人" prop="person">
          <Input v-model="formData.person" style="width: 280px"/>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formData.phone" style="width: 280px"/>
        </FormItem>
        <FormItem label="所属集团">
          <Select v-model="formData.group" style="width:280px">
            <Option v-for="item in groupList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="管理上级">
          <Select v-model="formData.superior" style="width:280px">
            <Option v-for="item in superiorList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="财务上级" >
          <Select v-model="formData.fianceSuperior" style="width:280px">
            <Option v-for="item in superiorList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="管理账号" prop="controlAccount">
          <Input v-model="formData.controlAccount" style="width: 280px"/>
        </FormItem>
        <FormItem label="电子邮箱" prop="mail">
          <Input v-model="formData.mail" style="width: 280px"/>
        </FormItem>
        <FormItem label="短信供应商" prop="smsProvider">
          <Select v-model="formData.smsProvider" style="width:280px">
            <Option v-for="item in smsProviderList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="地点">
          <city-plugin @select="formData.place = $event">
          </city-plugin>
        </FormItem>
        <FormItem label="详细地址">
          <Input v-model="formData.address" type="textarea" style="width: 280px"/>
        </FormItem>
        <FormItem label="受理客服">
          <Select v-model="formData.service" style="width:280px" placement="top">
            <Option v-for="item in serviceList"
                    :value="item.value"
                    :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="save">保存</Button>
    </div>
  </Modal>
</template>

<script>
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    export default {
        components : {
          cityPlugin
        },
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
            //校验管理账号
            const validateControlAccount = (rule,value,callback) => {
              callback();
            };
            //校验电子邮箱
            const validateMail = (rule,value,callback) => {
              if(value){
                if(validator.isEmail(value)){
                  callback();
                }else{
                  callback(this.$t('validateError.emailError2'));
                }
              }else{
                callback(this.$t('validateError.emailError1'));
              }
            };
            return {
              //表单数据
              formData : {
                //*租户公司名称
                companyName : '',
                //联系人
                person : '',
                //联系电话
                phone : '',
                //所属集团
                group : '',
                //管理上级
                superior : '',
                //财务上级
                fianceSuperior : '',
                //管理账号
                controlAccount : '',
                //电子邮箱
                mail : '',
                //短信供应商
                smsProvider : '',
                //详细地址
                address : '',
                //客服专员
                service : '',
                //地点
                place : '',
              },
              //表单校验规则
              ruleValidate : {
                companyName : [
                  {required : true,message : this.$t('validateError.lesseeCompanyErr'),trigger : 'blur'},
                ],
                person : [
                  {required : true,message : this.$t('validateError.personError'),trigger : 'blur'},
                ],
                phone : [
                  {required : true,validator : validatePhone,trigger : 'blur'},
                ],
                controlAccount : [
                  {required : true,validator : validateControlAccount,trigger : 'blur'},
                ],
                mail : [
                  {required : true,validator : validateMail,trigger : 'blur'},
                ]
              },
              //集团列表
              groupList : [
                {
                  value: 'New York',
                  label: 'New York'
                },
              ],
              //管理人员列表
              superiorList : [
                {
                  value: 'New York',
                  label: 'New York'
                },
              ],
              //短信供应商列表
              smsProviderList : [
                {
                  value: 'New York',
                  label: 'New York'
                },
              ],
              //受理客服
              serviceList : [
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

          },
          /**
           * 保存新增租户数据
           */
          save () {
            this.$refs.formValidate.validate(valid => {
              console.log(valid)
            });
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
      height: 505px;
      padding: 30px;
      overflow: auto;

      /deep/ .ivu-form{


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
