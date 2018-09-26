<!--
    资金明细
    作者：杨泽涛
-->
<template>
  <div class="check-flow">
      <div class="top-tab">
          <p>2018年6月</p>
      </div>

      <div class="content">
          <check-item :info="item"
                      v-for="(item, index) in infoList"
                      :key="index"></check-item>
      </div>
  </div>
</template>

<script>
    import checkItem from './components/check-item'
    import ajax from '../../api/index'
    import {mapGetters} from 'vuex'
    export default {
        components: {
            checkItem
        },
        data() {
            return {
                infoList: [
                    {
                        ticketName: '北京欢乐谷门票',
                        time: '2018.06.02 08:00:00',
                        check: -4000
                    },
                    {
                        ticketName: '北京欢乐谷门票',
                        time: '2018.06.02 08:00:00',
                        check: -3000
                    },
                    {
                        ticketName: '储值100元',
                        time: '2018.06.02 08:00:00',
                        check: 4000
                    }
                ],
                memberAccounts: [],
                accounts: ''
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
                    pageSize: 20
                }).then((res) => {
                    if(res.success) {
                        this.memberAccounts = res.data.data;
                        this.memberAccounts.forEach((item) => {
                            this.accounts = this.accounts + ',' + item.id
                        });
                        this.accounts = this.accounts.substring(1);
                    }
                })
                await ajax.post('queryOrgAccountChange', {
                    accountTypeIds: this.accounts,
                    operType: '',
                    cardId: this.userInfo.cardId,
                    pageNo: 1,
                    pageSize: 20
                }).then((res) => {
                    if(res.success) {
                        console.log(res.data)
                        this.infoList = res.data.data;
                        this.num = res.data.data.reduce((preValue, curValue) => {
                            return preValue + parseInt(curValue.amount)
                        }, 0);
                    }else {
                        this.$vux.toast.text(res.message)
                    }
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .check-flow {
        .top-tab {
            width: 100%;
            height: 30px;
            color: #8395A7;
            background-color: #F4F6F9;

            p {
                line-height: 30px;
                font-size: 13px;
                margin-left: 19px;
            }
        }
    }

</style>
