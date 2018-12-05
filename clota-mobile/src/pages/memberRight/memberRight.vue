<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right" v-show="isShow">
      <div class="member-right-content">
          <div class="head-tab">
              <p :class="{small: isEn}">{{$t('memberRightInfo')}}</p>
          </div>

          <h3 class="category">{{$t('memberRight')}}</h3>

          <!-- 会员权益 -->
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
                      <span class="spot"></span><span>每月 {{item.rule.num}} 张 {{item.rule.scenicName}} {{item.rule.discount}} 元门票</span>
                  </li>
              </ul>
                <!--生日购票优惠-->
              <ul class="right-list" v-if="rightInfo.birthday.length > 0">
                  <li v-for="(item, index) in rightInfo.birthday" :key="index" v-if="item.isEnable">
                      <span class="spot"></span><span>生日当天限购 {{item.rule.num | contentFilter}} 张 {{cardInfo.orgName}} {{item.rule.discount | contentFilter}} 折门票</span>
                  </li>
              </ul>
          </template>
          <template v-else>
              <div class="no-data-area">
                  <no-data>
                  </no-data>
              </div>
          </template>

          <!-- 会员积分权益折扣说明 -->
          <h3 class="category">{{$t('memberVos')}}</h3>
          <template v-if="commonMemberVos && commonMemberVos.length > 0">
              <illustration-board v-for="(item, index) in commonMemberVos"
                                  :key="item.id"
                                  :info="item"
                                  class="ill-item1">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>

          <h3 class="category">{{$t('storeVos')}}</h3>
          <template v-if="commonStoreVos && commonStoreVos.length > 0">
              <illustration-board v-for="(item, index) in commonStoreVos"
                                  :key="item.index"
                                  :info="item"
                                  class="ill-item2">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>

          <h3 class="category">{{$t('productMap')}}</h3>
          <template v-if="commonProductArr && commonProductArr.length > 0">
              <illustration-board v-for="(item, index) in commonProductArr"
                                  :key="item.id"
                                  :info="item"
                                  class="ill-item3">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>

          <div class="head-tab activity-tab">
              <p :class="{small: isEn}">{{$t('activityMemberRightInfo')}}</p>
          </div>

          <!-- 特定活动会员积分权益折扣说明 -->
          <h3 class="category">{{$t('memberVos')}}</h3>
          <template v-if="activityMemberVos && activityMemberVos.length > 0">
              <illustration-board v-for="(item, index) in activityMemberVos"
                                  :key="item.id"
                                  :info="item"
                                  class="ill-item1">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>

          <h3 class="category">{{$t('storeVos')}}</h3>
          <template v-if="activityStoreVos && activityStoreVos.length > 0">
              <illustration-board v-for="(item, index) in activityStoreVos"
                                  :key="item.index"
                                  :info="item"
                                  class="ill-item2">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>

          <h3 class="category">{{$t('productMap')}}</h3>
          <template v-if="activityProductArr && activityProductArr.length > 0">
              <illustration-board v-for="(item, index) in activityProductArr"
                                  :key="item.id"
                                  :info="item"
                                  class="ill-item3">
              </illustration-board>
          </template>
          <div class="no-data-area" v-else>
              <no-data>
              </no-data>
          </div>
      </div>
  </div>
</template>

<script>
    import illustrationBoard from './components/illustrationBoard';
    import ajax from '../../api/index';
    import { mapGetters } from 'vuex';
    import noData from '@/components/noData/index.vue';
    export default {
        components : {
            illustrationBoard,
            noData
        },
        data () {
            return {
                //按会员级别分类数据
                commonMemberVos : [],
                //按产品类别分类数据
                commonProductArr : [],
                //按店铺分类数据
                commonStoreVos : [],
                //特定活动会员权益 按会员级别分类数据
                activityMemberVos : [],
                //特定活动会员权益 按产品类别分类数据
                activityProductArr : [],
                //特定活动会员权益 按店铺分类数据
                activityStoreVos : [],
                query : null,
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
                activityInfo : {},

            };
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo',
                'lang'
            ]),
            isEn () {
                return this.lang === 'en';
            }
        },
        methods : {
            /**
             * 获取页面数据
             */
            getData () {
                ajax.post('listMemberCardRate', {
                    cardId : this.cardInfo.id,
                }).then((res) => {
                    //console.log(res.data)
                    if (res.success) {
                        this.commonInfo = res.data && res.data.common ? res.data.common : {};
                        this.activityInfo = res.data && res.data.activity ? res.data.activity : {};

                        this.commonMemberVos = this.commonInfo.memberVos ? this.commonInfo.memberVos : []
                        let commonProductMap = this.commonInfo.productMap ? this.commonInfo.productMap : [];
                        this.commonStoreVos = this.commonInfo.storeVos ? this.commonInfo.storeVos : [];

                        this.activityMemberVos = this.activityInfo.memberVos ? this.activityInfo.memberVos : []
                        let activityProductMap = this.activityInfo.productMap ? this.activityInfo.productMap : [];
                        this.activityStoreVos = this.activityInfo.storeVos ? this.activityInfo.storeVos : [];

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

                        this.packageData(this.commonMemberVos, commonProductMap, this.commonStoreVos, this.commonProductArr);
                        this.packageData(this.activityMemberVos, activityProductMap, this.activityStoreVos, this.activityProductArr);
                        //显示页面
                        this.isShow = true;
                    } else {
                        this.commonMemberVos = [];
                        this.commonProductArr = [];
                        this.commonStoreVos = [];
                        this.activityMemberVos = [];
                        this.activityProductArr = [];
                        this.activityStoreVos = [];
                        this.$vux.toast.text(res.message);
                        //显示页面
                        this.isShow = true;
                    }
                });
            },
            /**
             * 组装数据
             */
            packageData (memberVos,productMap,storeVos, commonProductArr) {
                memberVos.forEach((item) => {
                    item.name = this.query.name;
                    item.scoreRate = item.scoreRate;
                    item.discountRate = item.discountRate;
                });

                storeVos.forEach((item) => {
                    item.name = item.orgName;
                    item.scoreRate = item.deptScoreRate;
                    item.discountRate = item.deptDiscountRate;
                });

                for (let item in productMap) {
                    productMap[item].forEach((item) => {
                        item.name = item.typeName;
                        item.scoreRate = item.prodScoreRate;
                        item.discountRate = item.prodDiscountRate;
                        commonProductArr = commonProductArr.concat(item);
                    });
                }
            }
        },
        created () {
            this.query = this.$route.query;
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
                background: url("../../assets/images/memberRightBg.svg") no-repeat center;
                background-size: 100% 100%;
            }

        }
    }
</style>
