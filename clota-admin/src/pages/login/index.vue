<!--登录组件-->

<template>
  <div class="login">
    <div class="company-logo">
      <img src="../../assets/images/icon-logo.svg" alt="" class="logo">
    </div>
    <div class="input-form">
      <div class="com-title">{{$t('companyName')}}</div>
      <Form ref="formValidate"
            :model="formData"
            :rules="rules"
            :label-width="0">
        <FormItem  prop="account" class="input-with-icon">
          <span class="iconfont icon-person"></span>
          <Input v-model="formData.account"
                 style="width: 368px;height: 40px;"
                 :placeholder="$t('account')"/>
        </FormItem>
        <FormItem  prop="password" class="input-with-icon">
          <span class="iconfont icon-person"></span>
          <Input v-model="formData.password"
                 style="width: 368px"
                 :placeholder="$t('password')"/>
        </FormItem>
        <FormItem  prop="verifyCode" class="password input-with-icon verify-code">
          <span class="iconfont icon-person "></span>
          <Input v-model="formData.verifyCode"
                 style="width: 368px"
                 :placeholder="$t('verifyCode')"/>
          <img class="verify-img" src="../../assets/images/test.jpg" alt="">
        </FormItem>
        <FormItem  class="auto-login">
          <Checkbox label="Eat">{{$t('autoLogin')}}</Checkbox>
        </FormItem>
        <div class="err-message">
          <span v-if="showErrMessage">{{$t('loginError.accountError')}}</span>
        </div>
        <FormItem>
          <Button type="primary"
                  class="login-btn"
                  @click="login">{{$t('login')}}</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              //表单校验规则
              rules : {
                account : [
                  {required : true,message : this.$t('accountInputError'),trigger : 'blur'}
                ],
                password : [
                  {required : true,message : this.$t('passwordInputError'),trigger : 'blur'}
                ],
                verifyCode : [
                  {required : true,message : this.$t('verifyCodedInputError'),trigger : 'blur'}
                ]
              },
              //表单数据
              formData : {
                //账户
                account : '',
                //密码
                password : '',
                //验证码
                verifyCode : ''
              },
              //是否显示错误信息
              showErrMessage : false
            }
        },
        methods: {
          /**
           * 登录
           */
          login () {
            this.$refs.formValidate.validate(valid => {
              console.log(valid)
            });
          }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .login{
    @include block_outline();

    .company-logo{
      @include block_outline($height : 93px);
      padding-top: 40px;

      .logo{
        margin-left: 80px;
        @include block_outline(129px,53px,false);
      }
    }

    .input-form{
      @include block_outline(368px,auto);
      margin: 154px auto 0 auto;

      .input-with-icon{
        position: relative;

        &.verify-code /deep/ .ivu-input{
          padding-right: 100px;
        }

        .iconfont{
          z-index: 10;
          @include absolute_pos(absolute,$top : 4px,$left : 15px);
          font-size: $font_size_14px;
          color: $color_e6;
        }

        .verify-img{
          @include absolute_pos(absolute,$top : 5px,$right : 11px);
          @include block_outline(73px,30px);
        }
      }


      .com-title{
        font-size: $font_size_24px;
        color: $color_333;
        text-align: center;
      }

      .password{
        margin-bottom: 20px!important;
      }

      .auto-login{
        margin-bottom: 20px!important;
      }

      .login-btn{
        @include block_outline(368px,40px);
        background-image: linear-gradient(90deg, #012F84 0%, #0294D7 100%);
        box-shadow: 0 4px 8px 0 rgba(40,84,166,0.20);
        border-radius: 4px;
        font-size: $font_size_16px;
        color: $color_fff;
        letter-spacing: 6px;
        line-height: 28px;
      }

      .err-message{
        @include block_outline($height : 18px);
        line-height: 18px;
        color: $color_err;
        font-size: $font_size_12px;
        text-align: center;
        margin-bottom: 12px;
      }

      /deep/ .ivu-input{
        height: 40px;
        padding-left: 40px;
        font-size: $font_size_16px;
      }

      /deep/ .ivu-form{
        margin-top: 35px;
      }

      /deep/ .ivu-checkbox-wrapper{
        font-size: $font_size_14px;
        color: $color_000_065;

        .ivu-checkbox{
          margin-right: 8px;
        }
      }
    }
  }
</style>
