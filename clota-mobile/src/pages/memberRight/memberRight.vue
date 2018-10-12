<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right" v-show="isShow">
      <div class="top-tab">
          <p :class="{small: isEn}">{{$t('memberRightInfo')}}</p>
      </div>

      <div class="member-right-content">
          <h3 class="category">{{$t('memberVos')}}</h3>
          <template v-if="memberVos && memberVos.length > 0">
              <illustration-board v-for="(item, index) in memberVos"
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
          <template v-if="storeVos && storeVos.length > 0">
              <illustration-board v-for="(item, index) in storeVos"
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
          <template v-if="productArr && productArr.length > 0">
              <illustration-board v-for="(item, index) in productArr"
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
    import illustrationBoard from './components/illustrationBoard'
    import ajax from '../../api/index'
    import {mapGetters} from 'vuex';
    import noData from '@/components/noData/index.vue';
    export default {
        components: {
            illustrationBoard,
            noData
        },
        data() {
            return {
                //按会员级别分类数据
                memberVos: [],
                //按产品类别分类数据
                productArr: [],
                //按店铺分类数据
                storeVos: [],
                query: null,
                //是否显示页面
                isShow: false,
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ]),
            isEn() {
                return this.$store.state.lang === 'en';
            }
        },
        methods: {
            /**
             * 获取页面数据
             */
            getData() {
                ajax.post('listMemberCardRate', {
                    cardId: this.userInfo.cardId
                }).then((res) => {
                    //console.log(res.data)
                    if(res.success) {
                        this.memberVos = res.data ? (res.data.memberVos ? res.data.memberVos : []) : [];
                        var productMap = res.data ? (res.data.productMap ? res.data.productMap : []) : [];
                        this.storeVos = res.data ? (res.data.storeVos ? res.data.storeVos : []) : [];

                        this.packageData(this.memberVos, productMap, this.storeVos)
                        //显示页面
                        this.isShow = true;
                    }else {
                        this.memberVos = [];
                        this.productArr = [];
                        this.storeVos = [];
                        this.$vux.toast.text(res.message);
                        //显示页面
                        this.isShow = true;
                    }
                })
            },
            /**
             * 组装数据
             */
            packageData(memberVos,productMap,storeVos) {
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

                for(let item in productMap) {
                    productMap[item].forEach((item) => {
                        item.name = item.orgName;
                        item.scoreRate = item.prodScoreRate;
                        item.discountRate = item.prodDiscountRate;
                        this.productArr = this.productArr.concat(item);
                    })
                }
            }
        },
        created() {
            this.query = this.$route.query;
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

    .member-right {
        height: 100%;
        overflow: auto;
        .top-tab {
            position: fixed;
            top: 0;
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
            }

            .small {
                font-size: 10px;
            }
        }

        .member-right-content {
            height: calc(100% - 43px);
            margin-top: 43px;
            text-align: center;
            -webkit-overflow-scrolling: touch;
            overflow: auto;
            background: $color_fff;

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
