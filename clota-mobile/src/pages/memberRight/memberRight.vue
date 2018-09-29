<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right" v-show="isShow">
      <div class="top-tab">
          <p>{{$t('memberRightInfo')}}</p>
      </div>

      <div class="member-right-content">
          <h3 class="category">{{$t('memberVos')}}</h3>
          <illustration-board v-for="(item, index) in memberVos"
                              :key="item.id"
                              :info="item"
                              class="ill-item1">
          </illustration-board>

          <h3 class="category">{{$t('storeVos')}}</h3>
          <illustration-board v-for="(item, index) in storeVos"
                              :key="item.index"
                              :info="item"
                              class="ill-item2">
          </illustration-board>

          <h3 class="category">{{$t('productMap')}}</h3>
          <illustration-board v-for="(item, index) in productArr"
                              :key="item.id"
                              :info="item"
                              class="ill-item3">
          </illustration-board>
      </div>
  </div>
</template>

<script>
    import illustrationBoard from './components/illustrationBoard'
    import ajax from '../../api/index'
    import {mapGetters} from 'vuex'
    export default {
        components: {
            illustrationBoard
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
            ])
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

            p {
                margin-left: 14px;
                height: 100%;
                line-height: 43px;
                color: #8395A7;
                font-size: 14px;
            }
        }

        .member-right-content {
            height: 100%;
            margin-top: 43px;

            .category {
                margin: 0 auto;
                padding: 14px 0 14px 0;
                width: 45%;
                text-align: center;
                font-size: 15px;
                color: #C29F6B;
                background: url("../../assets/images/memberRightBg.svg");
                background-size: 100% 100%;
            }

        }
    }
</style>
