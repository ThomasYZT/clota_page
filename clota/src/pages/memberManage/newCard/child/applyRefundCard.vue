<!--申请退卡-->

<template>
    <div class="apply-refund-card">
        <bread-crumb-head
            :locale-router="$t('退卡')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <!--个人信息-->
            <person-info :member-info="memberInfo">
            </person-info>
            <div class="block-title">{{$t('会员卡信息')}}</div>
            <ButtonGroup>
                <Button v-for="(item,index) in memberDetail"
                        :key="index">
                    {{item.levelDesc}}
                </Button>
            </ButtonGroup>
            <!--储值账户信息-->
            <store-account-info></store-account-info>
            <!--积分账户信息-->
            <integral-account-info></integral-account-info>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import personInfo from '../components/personInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import storeAccountInfo from '../components/storeAccountInfo.vue';
    import integralAccountInfo from '../components/integralAccountInfo.vue';
    import ajax from '@/api/index.js';

	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            breadCrumbHead,
            personInfo,
            storeAccountInfo,
            integralAccountInfo,
        },
		data () {
			return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'refundedCard'
                        }
                    }
                ],
                //会员信息
                memberInfo : {},
                //会员卡详情
                memberDetail : {}
            };
		},
		methods : {
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.memberInfo) {
                    this.memberInfo = params.memberInfo;
                    this.listCardsByMemberId();
                } else {
                    this.$router.push({
                        name : 'refundedCard'
                    });
                }
            },
            /**
             * 查询会员卡信息
             */
            listCardsByMemberId () {
                ajax.post('listCardsByMemberId',{
                    memberId : this.memberInfo.id
                }).then(res => {
                    if (res.success) {
                        this.memberDetail = res.data ? res.data : {};
                    } else {
                        this.memberDetail = {};
                    }
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .apply-refund-card{
        @include block_outline();
        background: $color_fff;

        .content{
            padding: 0 15px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
            overflow: auto;
        }
    }
</style>
