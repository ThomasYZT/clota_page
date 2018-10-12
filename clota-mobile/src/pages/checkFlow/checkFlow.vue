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
              <img src="../../assets/images/icon-no-data.svg" alt="">
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
    import checkItem from './components/check-item'
    import ajax from '../../api/index'
    import {mapGetters} from 'vuex'
    import Scroll from '../../components/scroll/scroll'
    export default {
        components: {
            checkItem,
            Scroll
        },
        data() {
            return {
                infoList: [],
                memberAccounts: [],
                accounts: '',
                //是否显示滚动条
                scrollbar: false,
                //下拉刷新配置
                pullDownRefreshObj: {
                    //临界值
                    threshold: 90,
                    //刷新完成bubble停留的位置
                    stop: 40,
                    //设置加载和加载中显示的文字
                    txt: this.$t('freshComplete')
                },
                //上拉加载配置
                pullUpLoadObj: {
                    //临界值
                    threshold: 20,
                    //设置加载和加载中显示的文字
                    txt: {more: 'loading', noMore: 'noMoreData'}
                },
                //分页设置
                pageSetting: {
                    pageNo: 1,
                    pageSize: 10
                },
                //页面参数
                query: null,
                //是否显示pop
                visible: false,
                //选择的账户信息
                chosedAccount : [],
                //会员所有账户
                accountList: [{}],
                //当前账户id
                curAccountsId: ''
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            //获取页面数据
            async getData() {
                //获取用户所有的账户类型
                await ajax.post('queryMemberAccountDefine', {
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 200
                }).then((res) => {
                    if(res.success){
                        this.accountList =  res.data ? res.data.data.map((item) => {
                            return {
                                ...item,
                                name : item.accountName,
                                value : item.accountName
                            }
                        }) : [];
                        this.chosedAccount[0] = this.accountList[0].name
                        this.curAccountsId = this.accountList[0].id
                    }else{
                        this.accountList = [];
                    }
                })
                //获取用户账户资金明细
                await this.getCheckFlow();
            },
            /**
             *  获取资金明细
             */
            getCheckFlow() {
                ajax.post('queryOrgAccountChange', {
                    accountTypeIds: this.curAccountsId,
                    operType: '',
                    cardId: this.userInfo.cardId,
                    ...this.pageSetting
                }).then((res) => {
                    if(res.success) {
                        if(this.pageSetting.pageNo === 1) {
                            this.infoList = res.data ? res.data.data : [];
                        }else {
                            if(res.data.data.length !== 0) {
                                this.infoList = this.infoList.concat(res.data.data);
                            }else {
                                //如果下一页数据量为0，则页数回退
                                this.pageSetting.pageNo -= 1;
                                this.refresh();
                            }
                        }
                    }else {
                        this.$vux.toast.text(res.message)
                    }
                })
            },
            /**
             * 下拉刷新操作
             */
            onPullingDown() {
                this.pageSetting.pageNo = 1;
                this.getCheckFlow();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp() {
                this.pageSetting.pageNo += 1;
                this.getCheckFlow();
            },
            //强制刷新scroll
            refresh() {
                this.$refs.scroll.forceUpdate();
            },
            /**
             * 显示所有账户信息
             */
            showAccount () {
                this.visible = true;
            },
            /**
             * 账户列表修改
             */
            accountChange (value) {
                this.chosedAccount = [String(value)];
                this.accountList.forEach((item) => {
                   if(item.name === this.chosedAccount[0]) {
                       this.curAccountsId = item.id
                   }
                })
                this.getCheckFlow();
            },
        },
        created() {
            this.getData()
        }
    }
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
                    line-height: 50px;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            .scroll-wrapper {
                position: relative;
                height: calc(100% - 50px);
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
