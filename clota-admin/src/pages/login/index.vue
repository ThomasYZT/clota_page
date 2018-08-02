<!--登录组件-->

<template>
  <div class="login">
    <div class="company-logo">
      <img src="../../assets/images/icon-login.svg" alt="" class="logo">
    </div>
    <div class="input-form">
      <div class="com-title">银科环企Clota运营平台</div>
      <Form ref="formValidate"
            :model="formData"
            :rules="rules"
            :label-width="0">
        <FormItem  prop="account">
          <Input v-model="formData.account"
                 style="width: 368px;height: 40px;"
                 :placeholder="$t('account')"/>
        </FormItem>
        <FormItem  prop="password">
          <Input v-model="formData.password"
                 style="width: 368px"
                 :placeholder="$t('password')"/>
        </FormItem>
        <FormItem  prop="password" class="password">
          <Input v-model="formData.verifyCode"
                 style="width: 368px"
                 :placeholder="$t('verifyCode')"/>
        </FormItem>
        <FormItem  prop="password" class="auto-login">
          <Checkbox label="Eat">自动登录</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" class="login-btn" >登录</Button>
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
              rules : [],
              //表单数据
              formData : {
                //账户
                account : '',
                //密码
                password : '',
                //验证码
                verifyCode : ''
              }
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .login{
    @include block_outline();

    .company-logo{
      @include block_outline($height : 53px);
      margin-top: 40px;

      .logo{
        margin-left: 80px;
        @include block_outline(129px,53px,false);
      }
    }

    .input-form{
      @include block_outline(368px);
      font-size: $font_size_24px;
      color: $color_333;
      margin: 154px auto 0 auto;

      .com-title{
        text-align: center;
      }

      .password{
        margin-bottom: 20px!important;
      }

      .auto-login{
        margin-bottom: 50px!important;
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
