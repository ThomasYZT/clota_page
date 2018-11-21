<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('company') + 'ID'}}：</span>{{accountInfo.id | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('adminAccount')}}：</span>{{accountInfo.loginName | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('telephone')}}：</span>{{accountInfo.telephone | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('location')}}：</span>
                        {{districtInfo | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('superior')}}：</span>{{accountInfo.parentManage | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>

                    <li>
                        <span class="field-name">{{$t('companyCode')}}：</span>{{accountInfo.nodeCode | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('Offlineverificationcode')}}：</span>{{accountInfo.checkinCode | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('email')}}：</span>{{accountInfo.email | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('detailAddr')}}：</span>{{accountInfo.address | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('fianceSuperior')}}：</span>{{accountInfo.parentFinanc | contentFilter}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('Universaldistributioninvitationcode')}}：</span>{{accountInfo.saleCode | contentFilter}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('fax')}}：</span>{{accountInfo.tex | contentFilter}}
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
      }
  }
</style>
