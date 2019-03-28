<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('name')}}：</span>{{accountInfo.nickName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('loginName')}}：</span>{{accountInfo.loginName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('nativePlace')}}：</span>{{accountInfo.provinceName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('remark')}}：</span>{{accountInfo.descript | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('AuthorityInfo')}}：</span>{{accountInfo.descript | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('gender')}}：</span>{{$t(accountInfo.sex)}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('mobilePhone')}}：</span>{{accountInfo.phone | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('nativeAddress')}}：</span>{{accountInfo.address | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('departName')}}：</span>{{accountInfo.deptName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('birthday')}}：</span>{{accountInfo.birthday | contentFilter}}
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
      props : {
          accountInfo : {
              type : Object,
              default () {
                  return {};
              }
          }
      },
      data () {
          return {};
      },
      methods : {}
  };
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
