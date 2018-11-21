<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <!-- 个人 合作伙伴视图 -->
        <Row :gutter="16" v-if="accountInfo.partnerType === 'person'">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('name')}}：</span>{{accountInfo.orgName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('loginName')}}：</span>{{accountInfo.loginName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('phone')}}：</span>{{accountInfo.telephone | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('location')}}：</span>
                        {{districtInfo | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('remark')}}：</span>{{accountInfo.description | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('gender')}}：</span>{{$t(accountInfo.sex)}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('identityNo')}}：</span>{{accountInfo.certificateNumber | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('email')}}：</span>{{accountInfo.email | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('detailAddr')}}：</span>{{accountInfo.address | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('identity')+$t('attach')}}：</span>
                        <img v-for="item in JSON.parse(accountInfo.attach)" :key=item :src="item" alt="">
                    </li>
                    <li>
                        <span class="field-name">{{$t('channalType')}}：</span>{{$t('distributionUnit')}}
                    </li>
                </ul>
            </Col>
        </Row>
        <!-- company合作伙伴视图 -->
        <Row v-else>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('person')}}：</span>{{accountInfo.linkName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('email')}}：</span>{{accountInfo.email}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('detailAddr')}}：</span>{{accountInfo.address}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('remark')}}：</span>{{accountInfo.description}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('loginName')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('channalType')}}：</span>{{$t('order.tour')}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('SocialCreditCode')}}：</span>{{accountInfo.certificateNumber}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('phone')}}：</span>{{accountInfo.telephone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('location')}}：</span>
                        {{accountInfo.provinceName}}  {{accountInfo.cityName}} {{accountInfo.districtName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('Appendixofbusinesslicense')}}：</span>
                        <img v-for="item in JSON.parse(accountInfo.attach)" :src="item" alt="">
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
      methods: {},
      computed : {
          //地区信息
          districtInfo () {
              if (this.accountInfo && Object.keys(this.accountInfo).length > 0) {
                  return this.accountInfo.provinceName + this.accountInfo.cityName + this.accountInfo.districtName;
              }
              return '';
          }
      }
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

          img {
              height: 100px;
              margin: 0 5px;
          }
      }
  }
</style>
