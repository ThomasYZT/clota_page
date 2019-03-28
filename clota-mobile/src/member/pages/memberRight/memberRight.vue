<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right" v-show="isShow">
      <div class="member-right-content">
          <div class="head-tab">
              <p :class="{small: isEn}">{{hasPointMenu ? $t('memberRightInfo') : $t('rightExplain')}}</p>
          </div>

          <!-- 会员权益 -->
          <h3 class="category">{{$t('memberRight')}}</h3>
          <template v-if="!isMemberRightNoData">
              <!--优惠通知-->
              <ul class="right-list" v-if="rightInfo.desc.length > 0">
                  <li v-for="(item, index) in rightInfo.desc" :key="index" v-if="item.isEnable">
                      <span class="spot"></span><span>{{item.content}}</span>
                  </li>
              </ul>
                <!--每月优惠门票-->
              <ul class="right-list" v-if="rightInfo.ticket.length > 0">
                  <li v-for="(item, index) in rightInfo.ticket" :key="index" v-if="item.isEnable">
                      <span class="spot"></span><span>{{$t('perMonth')}} {{item.rule.num}} {{$t('leaf')}} {{item.rule.scenicName}} {{item.rule.discount}} {{$t('yuan')}} {{$t('playTicket')}}</span>
                  </li>
              </ul>
                <!--生日购票优惠-->
              <ul class="right-list" v-if="rightInfo.birthday.length > 0">
                  <li v-for="(item, index) in rightInfo.birthday" :key="index" v-if="item.isEnable">
                      <span class="spot"></span><span>{{$t('birthdayPurchaseLimit')}} {{item.rule.num | contentFilter}} {{$t('leaf')}} {{cardInfo.orgName}} {{item.rule.discount | contentFilter}} {{$t('discountTicket')}}</span>
                  </li>
              </ul>
          </template>
          <template v-else>
              <div class="no-data-area">
                  <no-data>
                  </no-data>
              </div>
          </template>

          <template v-if="hasPointMenu">
              <!-- 会员积分权益折扣说明 -->
              <h3 class="category">{{$t('memberVos')}}</h3>
              <template v-if="commonInfo.memberVos && commonInfo.memberVos.length > 0">
                  <illustration-board v-for="item in commonInfo.memberVos"
                                      :key="item.id"
                                      :info="item"
                                      class="ill-item1">
                      <template slot="scoreRate">{{item.scoreRate | contentFilter}}</template>
                      <template slot="discountRate">{{item.discountRate | contentFilter}}</template>
                  </illustration-board>
              </template>
              <div class="no-data-area" v-else>
                  <no-data>
                  </no-data>
              </div>

              <h3 class="category">{{$t('storeVos')}}</h3>
              <template v-if="commonInfo.storeVos && commonInfo.storeVos.length > 0">
                  <illustration-board v-for="item in commonInfo.storeVos"
                                      :key="item.index"
                                      :info="item"
                                      class="ill-item2">
                      <template slot="name">{{item.orgName | contentFilter}}</template>
                      <template slot="scoreRate">{{item.deptScoreRate | contentFilter}}</template>
                      <template slot="discountRate">{{item.deptDiscountRate | contentFilter}}</template>
                  </illustration-board>
              </template>
              <div class="no-data-area" v-else>
                  <no-data>
                  </no-data>
              </div>

              <h3 class="category">{{$t('productMap')}}</h3>
              <template v-if="commonInfo.productMap && Object.keys(commonInfo.productMap).length > 0">
                  <template v-for="product in commonInfo.productMap">
                      <illustration-board v-for="item in product"
                                          :key="item.id"
                                          :info="item"
                                          class="ill-item3">
                          <template slot="name">{{item.orgName | contentFilter}} - {{item.typeName | contentFilter}}</template>
                          <template slot="scoreRate">{{item.prodScoreRate | contentFilter}}</template>
                          <template slot="discountRate">{{item.prodDiscountRate | contentFilter}}</template>
                      </illustration-board>
                  </template>
              </template>
              <div class="no-data-area" v-else>
                  <no-data>
                  </no-data>
              </div>

              <div class="head-tab activity-tab">
                  <p :class="{small: isEn}">{{$t('activityMemberRightInfo')}}</p>
              </div>

              <!-- 特定活动会员积分权益折扣说明 -->
              <div v-for="(info,index) in activityInfo" :key="info.id" class="special-wrap">

                  <ul class="special-discount-desc" :key="'ul' + index">
                      <li class="desc-li">
                          <span class="key">{{$t('colonSetting',{ key : $t('startAndEndDate') })}}</span><span class="value">{{info.startDate | contentFilter}} - {{info.endDate | contentFilter}}</span>
                      </li>
                      <li class="desc-li">
                          <span class="key">{{$t('colonSetting',{ key : $t('validateDate') })}}</span><span class="value">{{info.effDateTxt | contentFilter}}</span>
                      </li>
                      <li class="desc-li">
                          <span class="key">{{$t('colonSetting',{ key : $t('validateTimeEveryDay') })}}</span><span class="value">{{info.startTime | contentFilter}} - {{info.endTime | contentFilter}}</span>
                      </li>
                  </ul>

                  <h3 class="category">{{$t('memberVos')}}</h3>
                  <template v-if="info.discountRateVo.memberVos && info.discountRateVo.memberVos.length > 0">
                      <illustration-board v-for="item in info.discountRateVo.memberVos"
                                          :key="item.id"
                                          :info="item"
                                          class="ill-item1">
                          <template slot="scoreRate">{{item.scoreRate}}</template>
                          <template slot="discountRate">{{item.discountRate}}</template>
                      </illustration-board>
                  </template>
                  <div class="no-data-area" v-else :key="'noData1' + index">
                      <no-data>
                      </no-data>
                  </div>
                  <h3 class="category" :key="'k1' + index">{{$t('storeVos')}}</h3>
                  <template v-if="info.discountRateVo.storeVos && info.discountRateVo.storeVos.length > 0">
                      <illustration-board v-for="item in info.discountRateVo.storeVos"
                                          :key="item.index"
                                          :info="item"
                                          class="ill-item2">
                          <template slot="name">{{item.orgName | contentFilter}}</template>
                          <template slot="scoreRate">{{item.deptScoreRate | contentFilter}}</template>
                          <template slot="discountRate">{{item.deptDiscountRate | contentFilter}}</template>
                      </illustration-board>
                  </template>
                  <div class="no-data-area" v-else :key="'noData2' + index">
                      <no-data>
                      </no-data>
                  </div>
                  <h3 class="category" :key="'k2' + index">{{$t('productMap')}}</h3>
                  <template v-if="info.discountRateVo.productMap && Object.keys(info.discountRateVo.productMap).length > 0">
                      <template v-for="product in info.discountRateVo.productMap">
                          <illustration-board v-for="item in product"
                                              :key="item.id"
                                              :info="item"
                                              class="ill-item3">
                              <template slot="name">{{item.orgName | contentFilter}} - {{item.typeName | contentFilter}}</template>
                              <template slot="scoreRate">{{item.prodScoreRate | contentFilter}}</template>
                              <template slot="discountRate">{{item.prodDiscountRate | contentFilter}}</template>
                          </illustration-board>
                      </template>
                  </template>
                  <div class="no-data-area" v-else :key="'noData3' + index">
                      <no-data>
                      </no-data>
                  </div>
              </div>
          </template>
      </div>
  </div>
</template>

<script>
    import illustrationBoard from './components/illustrationBoard';
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    import noData from '@/components/noData/index.vue';
    export default {
        components : {
            illustrationBoard,
            noData
        },
        data () {
            return {
                //是否显示页面
                isShow : false,
                //会员等级信息
                levelModel : {},
                //默认权益信息
                rightDefaultInfo : [
                    //生日打折门票
                    {
                        type : 'birthday',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : ''
                        },
                        isEnable : false,
                        content : ''
                    },
                    //每月优惠门票
                    {
                        type : 'ticket',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : ''
                        },
                        isEnable : false,
                        content : ''
                    },
                    //通知信息
                    {
                        type : 'desc',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : ''
                        },
                        isEnable : false,
                        content : ''
                    }
                ],
                //权益信息
                rightInfo : {
                    birthday : [],
                    ticket : [],
                    desc : []
                },
                //会员权益信息
                memberRight : [],
                //会员权益是否数据为空
                isMemberRightNoData : true,
                //普通积分信息
                commonInfo : {},
                //特定活动积分信息
                activityInfo : [],

            };
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo',
                'lang',
                'memberConfigInfo',
            ]),
            isEn () {
                return this.lang === 'en';
            },
            //是否有积分服务
            hasPointMenu () {
                return this.memberConfigInfo && this.memberConfigInfo.memberPoint === 'true';
            },
        },
        methods : {
            /**
             * 获取页面数据
             */
            getData () {
                ajax.post('listMemberCardRuleRate', {
                    cardId : this.cardInfo.id,
                }).then((res) => {
                    if (res.success && res.data) {
                        this.commonInfo = res.data.common;
                        this.activityInfo = res.data.activity.map(item => {
                            let effDateTxt = '';
                            if (item.effDate) {
                                //每日生效时间计算
                                effDateTxt = this.effDateTranslate(item.effDate);
                            }
                            return {
                                ...item,
                                startDate : item.startDate.substring(0,10),
                                endDate : item.endDate.substring(0,10),
                                effDateTxt
                            };
                        });
                        //普通会员权益 -- 会员权益信息数据组装
                        this.packageMemberInfo();
                        //显示页面
                        this.isShow = true;
                    } else {
                        this.$vux.toast.text(res.message);
                        //显示页面
                        this.isShow = true;
                    }
                });
            },
            /**
             * 会员权益数据组装
             */
            packageMemberInfo () {
                //会员权益信息整理
                this.rightInfo = {
                    birthday : [],
                    ticket : [],
                    desc : []
                };
                this.memberRight = [];
                this.levelModel = {};
                this.levelModel = this.commonInfo.levelModel ? this.commonInfo.levelModel : {};
                this.memberRight = this.levelModel.rights ? JSON.parse(this.levelModel.rights) : [];

                let rightInfoLocale = [];
                if (this.memberRight && this.memberRight.length > 0) {
                    rightInfoLocale = this.memberRight;
                } else {
                    rightInfoLocale = this.rightDefaultInfo;
                }
                for (let i = 0,j = rightInfoLocale.length; i < j; i++ ) {
                    if (rightInfoLocale[i]['type'] === 'birthday') {
                        this.rightInfo.birthday.push(rightInfoLocale[i]);
                    } else if (rightInfoLocale[i]['type'] === 'ticket') {
                        this.rightInfo.ticket.push(rightInfoLocale[i]);
                    } else if (rightInfoLocale[i]['type'] === 'desc') {
                        this.rightInfo.desc.push(rightInfoLocale[i]);
                    }
                }

                let isNoData = true;
                for (let i = 0, len = rightInfoLocale.length; i < len; i++) {
                    if (rightInfoLocale[i].isEnable) {
                        isNoData = false;
                        break;
                    }
                }
                this.isMemberRightNoData = isNoData;
            },
            /**
             * 每日生效时间转换
             * @param{String} effDate 生效时间数字符号
             */
            effDateTranslate (effDate) {
                return effDate.split(',').map(day => {
                    if (day === '0') {
                        return this.$t('sunday');
                    } else if (day === '1') {
                        return this.$t('monday');
                    } else if (day === '2') {
                        return this.$t('tuesday');
                    } else if (day === '3') {
                        return this.$t('wednesday');
                    } else if (day === '4') {
                        return this.$t('thursday');
                    } else if (day === '5') {
                        return this.$t('friday');
                    } else if (day === '6') {
                        return this.$t('saturday');
                    }
                }).join('、');
            }
        },
        created () {
            this.getData();
        }
    };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

    .member-right {
        height: 100%;
        overflow: auto;
        .head-tab {
            width: 100%;
            height: 43px;
            background-color: #F4F6F9;
            z-index: 888;

            p {
                margin-left: 14px;
                height: 100%;
                line-height: 43px;
                color: #8395A7;
                font-size: 14px;
                white-space:nowrap;
                text-align: left;
            }

            .small {
                font-size: 10px;
            }
        }

        .activity-tab {
            margin-top: 20px;
        }

        .member-right-content {
            height: 100%;
            text-align: center;
            -webkit-overflow-scrolling: touch;
            overflow: auto;
            background: $color_fff;

            .right-list {
                word-break: break-all;
                li {
                    margin: 10px 25px;
                    text-align: left;
                    font-size: 13px;
                    color: #666;

                    .spot {
                        vertical-align: middle;
                        margin-right: 9px;
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        border-radius: 2.5px;
                        background-color: #E2C18E;
                    }
                }
            }

            .category {
                display: inline-block;
                margin: 0 auto;
                padding: 14px 70px 14px 70px;
                width: auto;
                text-align: center;
                font-size: 15px;
                color: #C29F6B;
                white-space: nowrap;
                background: url("../../../assets/images/memberRightBg.svg") no-repeat center;
                background-size: 100% 100%;
            }

        }

        .special-discount-desc{
            padding: 14px 25px;
            text-align: left;

            .desc-li{
                line-height: 20px;
                margin-top: 9px;
                font-size: 12px;

                .key {
                    color: #8E9091;
                    padding-right: 10px;
                }
            }
        }

        .special-wrap:not(:nth-last-of-type(1)){
            border-bottom: 1px dashed #e1e1e1 ;
        }
    }
</style>
