<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('联系人')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('电子邮箱')}}：</span>{{accountInfo.checkinCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('详细地址')}}：</span>{{accountInfo.tex}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('备注')}}：</span>{{accountInfo.address}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('登录名')}}：</span>{{accountInfo.id ? accountInfo.id : '无'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('所属渠道类型')}}：</span>{{accountInfo.saleCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('社会信用代码')}}：</span>{{accountInfo.email}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('联系方式')}}：</span>{{accountInfo.nodeCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('所在地')}}：</span>{{accountInfo.telephone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('营业执照附件')}}：</span>{{accountInfo.address}}
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
