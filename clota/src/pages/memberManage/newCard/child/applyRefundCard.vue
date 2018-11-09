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
            <Tabs value="a">
                <TabPane label="标签一" name="name1">标签一的内容</TabPane>
                <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                <TabPane label="标签三" name="name3">标签三的内容</TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import personInfo from '../components/personInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            breadCrumbHead,
            personInfo
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
                memberInfo : {}
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
                } else {
                    this.$router.push({
                        name : 'refundedCard'
                    });
                }
            },
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
        }
    }
</style>
