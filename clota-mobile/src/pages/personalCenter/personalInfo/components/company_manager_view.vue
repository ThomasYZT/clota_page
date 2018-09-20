<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('登录名')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('线下核销编码')}}：</span>{{accountInfo.checkinCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('传真')}}：</span>{{accountInfo.tex}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('详细地址')}}：</span>{{accountInfo.address}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('受理客服')}}：</span>{{accountInfo.serviceUser}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('公司ID')}}：</span>{{accountInfo.id ? accountInfo.id : '无'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('全民分销邀请码')}}：</span>{{accountInfo.saleCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('电子邮箱')}}：</span>{{accountInfo.email}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('短信供应商')}}：</span>{{accountInfo.smsProvider}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('财务上级')}}：</span>{{accountInfo.parentFinanc}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('公司编码')}}：</span>{{accountInfo.nodeCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('电话')}}：</span>{{accountInfo.telephone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('所在地')}}：</span>{{accountInfo.district}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('短信余量（条）')}}：</span>{{accountInfo.smsAmount}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('管理上级')}}：</span>{{accountInfo.parentManage}}
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
