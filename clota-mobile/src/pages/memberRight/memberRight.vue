<!--
    会员权益
    作者：杨泽涛
-->
<template>
  <div class="member-right">
      <div class="top-tab">
          <p>{{$t('memberRightInfo')}}</p>
      </div>

      <div class="member-right-content">
          <h3 class="category">{{$t('memberVos')}}</h3>
          <illustration-board v-for="(item, index) in memberVos"
                              :key="item.id"
                              :info="item">
          </illustration-board>

          <h3 class="category">{{$t('productMap')}}</h3>
          <illustration-board v-for="(item, index) in productMap"
                              :key="item.id"
                              :info="item">
          </illustration-board>

          <h3 class="category">{{$t('storeVos')}}</h3>
          <illustration-board v-for="(item, index) in storeVos"
                              :key="item.id"
                              :info="item">
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
                memberVos: [
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    },
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    }
                ],
                productMap: [
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    },
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    }
                ],
                storeVos: [
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    },
                    {
                        name: '白银会员',
                        IntegralRate: '1:2',
                        unit: '人名币:积分',
                        depositRate: '1:2',
                    }
                ],
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
                    if(res.success) {
                        console.log(res);
                    }else {
                        this.$vux.toast.text(res.message)
                    }
                })
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';

    .member-right {

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
            overflow: auto;
            height: 100%;
            margin-top: 43px;

            .category {
                margin: 0 auto;
                padding: 14px 0 14px 0;
                width: 50%;
                text-align: center;
                font-size: 15px;
                color: #C29F6B;
                background: url("../../assets/images/memberRightBg.svg");
                background-size: 100% 100%;
            }
        }
    }
</style>
