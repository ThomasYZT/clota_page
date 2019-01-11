<!--
    资金明细
    作者：杨泽涛
-->
<template>
  <div class="check-flow">

      <div class="content">
          <div class="account-list-chose" @click="showAccount">
              <p class="account-name">
                  {{chosedAccount[0] ? chosedAccount[0] : ''}}
                  <span v-if="accountList.length > 1" class="iconfont icon-arrow-right"></span>
              </p>
          </div>
          <div class="scroll-wrapper" v-if="infoList.length !== 0">
              <scroll ref="scroll"
                      :data="infoList"
                      :scrollbar="scrollbar"
                      :pullDownRefresh="pullDownRefreshObj"
                      :pullUpLoad="pullUpLoadObj"
                      @pullingDown="onPullingDown"
                      @pullingUp="onPullingUp">
                  <check-item :info="item"
                              v-for="(item, index) in infoList"
                              :key="index"></check-item>
              </scroll>
          </div>
          <div class="no-data" v-else>
              <img src="../../../assets/images/icon-no-data.svg" alt="">
          </div>
      </div>

      <popup-picker
          :cancel-text="$t('cancel')"
          :confirm-text="$t('complete')"
          :show.sync="visible"
          :show-cell="false"
          :show-name="true"
          :data="[accountList]"
          v-model="chosedAccount"
          @on-change="accountChange">
      </popup-picker>
  </div>
</template>

<script>
    import checkItem from './components/check-item';
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    import Scroll from '@/components/scroll/scroll';
    export default {
        components : {
            checkItem,
            Scroll
        },
        data () {
            return {
                infoList : [],
                memberAccounts : [],
                accounts : '',
                //是否显示滚动条
                scrollbar : false,
                //下拉刷新配置
                pullDownRefreshObj : {
                    //临界值
                    threshold : 90,
                    //刷新完成bubble停留的位置
                    stop : 40,
                    //设置加载和加载中显示的文字
                    txt : 'freshComplete'
                },
                //上拉加载配置
                pullUpLoadObj : {
                    //临界值
                    threshold : 20,
                    //设置加载和加载中显示的文字
                    txt : { more : 'loading', noMore : 'noMoreData' }
                },
                //分页设置
                pageSetting : {
                    pageNo : 1,
                    pageSize : 10
                },
                //页面参数
                query : null,
                //是否显示pop
                visible : false,
                //选择的账户信息
                chosedAccount : [],
                //会员所有账户
                accountList : [{}],
                //当前账户id
                curAccountsId : ''
            };
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo',
                'memberConfigInfo',
            ]),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
        },
        methods : {
            //获取页面数据
            async getData () {
                //获取用户所有的账户类型
                await ajax.post('queryMemberAccountDefine', {
                    accountType : 'charging',
                    pageNo : 1,
                    pageSize : 200,
                    cardId : this.cardInfo.id
                }).then((res) => {
                    if (res.success && res.data) {
                        //业主卡返回全部账户类型
                        if (this.cardInfo.cardTypeId === "1") {
                            this.accountList = res.data.data.filter(item => {
                                if (this.isMutipleAccount) {
                                    if (this.cardIsSaling) {//多账户、售卖型
                                        return true;
                                    } else {//多账户非售卖型
                                        return item.accountDefineId !== '4';
                                    }
                                } else {
                                    if (this.cardIsSaling) {//单账户、售卖型
                                        return true;
                                    } else {//单账户非售卖型
                                        return item.accountDefineId !== '4';
                                    }
                                }
                            }).map(item => {
                                    return {
                                        ...item,
                                        name : item.accountName,
                                        value : item.accountName,
                                    };
                            });
                        } else {
                        //非业主卡返回部分账户类型
                            this.accountList = res.data.data.filter((item, index, arr) => {
                                let status = item.id !== '5' && item.id !== '6' && item.id !== '7' && item.id !== '8'
                                if (status) {
                                    arr[index].name = item.accountName;
                                    arr[index].value = item.accountName;
                                }
                                return status;
                            });
                        }

                        this.chosedAccount[0] = this.accountList[0].name;
                        this.curAccountsId = this.accountList[0].id;
                    } else {
                        this.accountList = [];
                    }
                });
                //获取用户账户资金明细
                await this.getCheckFlow();
            },
            /**
             *  获取资金明细
             */
            getCheckFlow () {
                ajax.post('queryOrgAccountChange', {
                    accountTypeIds : this.curAccountsId,
                    operType : '',
                    cardId : this.cardInfo.id,
                    ...this.pageSetting
                }).then((res) => {
                    if (res.success) {
                        if (res.data) {
                            if ( res.data.data.length >= this.pageSetting.pageNo * (this.pageSetting.pageSize - 10) && res.data.data.length <= this.pageSetting.pageNo * this.pageSetting.pageSize) {
                                this.infoList = res.data ? res.data.data : [];
                            } else {
                                this.infoList = res.data ? res.data.data : [];
                                this.refresh();
                                this.pageSetting.pageSize -= 10;
                            }
                        } else {
                            this.infoList = [];
                        }
                    } else {
                        this.infoList = [];
                        this.$vux.toast.text(this.$t('getDataFailure'));
                    }
                });
            },
            /**
             * 下拉刷新操作
             */
            onPullingDown () {
                this.pageSetting = {
                    pageNo : 1,
                    pageSize : 10
                };
                this.getCheckFlow();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp () {
                this.pageSetting.pageSize += 10;
                this.getCheckFlow();
            },
            //强制刷新scroll
            refresh () {
                this.$refs.scroll.forceUpdate();
            },
            /**
             * 显示所有账户信息
             */
            showAccount () {
                if (this.accountList.length > 1) {
                    this.visible = true;
                }
            },
            /**
             * 账户列表修改
             */
            accountChange (value) {
                this.chosedAccount = [String(value)];
                this.accountList.forEach((item) => {
                   if (item.name === this.chosedAccount[0]) {
                       this.curAccountsId = item.id;
                   }
                });
                this.getCheckFlow();
            },
        },
        created () {
            this.getData();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .check-flow {
        height: 100%;
        .content {
            height: 100%;
            .account-list-chose{
                @include block_outline($height : 50px);
                text-align: center;

                p {
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    font-weight: bold;

                    .icon-arrow-right{
                        display: inline-block;
                        transform: rotate(90deg);
                        font-size: $font_size_15px;
                    }
                }
            }
            .scroll-wrapper {
                position: relative;
                height: calc(100% - 50px);

                /deep/ .scroll-content {
                    div {
                        background-color: $color_fff;
                    }
                }
            }
            .no-data {
                width: 100%;
                height: 96px;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto auto;
                text-align: center;
                img {
                    width: 150px;
                    height: 150px;
                }
            }
        }

        /deep/ .vux-cell-box {
            &:before {
                border: none;
            }
        }


    }

</style>
