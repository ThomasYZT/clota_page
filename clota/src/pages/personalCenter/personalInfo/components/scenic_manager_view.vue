<template>
    <div  class="personal-info">
        <h3>{{accountInfo.orgName}}</h3>
        <Row :gutter="16">
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('company') + 'ID'}}：</span>{{accountInfo.id ? accountInfo.id : '无'}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('adminAccount')}}：</span>{{accountInfo.loginName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('telephone')}}：</span>{{accountInfo.telephone}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('location')}}：</span>
                        {{accountInfo.provinceName}}  {{accountInfo.cityName}} {{accountInfo.districtName}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('superior')}}：</span>{{accountInfo.parentManage}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>

                    <li>
                        <span class="field-name">{{$t('companyCode')}}：</span>{{accountInfo.nodeCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('Offlineverificationcode')}}：</span>{{accountInfo.checkinCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('email')}}：</span>{{accountInfo.email}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('detailAddr')}}：</span>{{accountInfo.address}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('fianceSuperior')}}：</span>{{accountInfo.parentFinanc}}
                    </li>
                </ul>
            </Col>
            <Col span="8">
                <ul>
                    <li>
                        <span class="field-name">{{$t('Universaldistributioninvitationcode')}}：</span>{{accountInfo.saleCode}}
                    </li>
                    <li>
                        <span class="field-name">{{$t('fax')}}：</span>{{accountInfo.tex}}
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
