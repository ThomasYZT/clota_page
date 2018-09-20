<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('姓名')}}：</span>{{accountInfo.nickName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('登录名')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('籍贯')}}：</span>{{accountInfo.provinceName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('备注')}}：</span>{{accountInfo.descript}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('性别')}}：</span>{{accountInfo.sex == "female" ? '男' : '女'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('手机号')}}：</span>{{accountInfo.phone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('籍贯地址')}}：</span>{{accountInfo.address}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('部门名称')}}：</span>{{accountInfo.deptName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('生日')}}：</span>{{accountInfo.birthday}}
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
      props: {
          accountInfo: {
              type: Object,
              default: {}
          }
      },
      data() {
          return {}
      },
      methods: {}
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

  .personal-info {

      > h3 {
          font-family: PingFangSC-Medium;
          margin: 18px 0;
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
      }

      ul li {
          margin-bottom: 8px;
          color: $color_666;

          .field-name {
              color: $color_333;
          }
      }
  }
</style>
