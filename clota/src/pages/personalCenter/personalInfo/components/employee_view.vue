<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('name')}}：</span>{{accountInfo.nickName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('loginName')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('nativePlace')}}：</span>{{accountInfo.provinceName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('remark')}}：</span>{{accountInfo.descript}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('AuthorityInfo')}}：</span>{{accountInfo.descript}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('gender')}}：</span>{{accountInfo.sex == "male" ? '男' : '女'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('mobilePhone')}}：</span>{{accountInfo.phone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('nativeAddress')}}：</span>{{accountInfo.address}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('departName')}}：</span>{{accountInfo.deptName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('birthday')}}：</span>{{accountInfo.birthday}}
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
