<!--申请退卡-->

<template>
    <div class="apply-refund-card">
        <bread-crumb-head
            :locale-router="$t('关联实体卡')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">

        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
	export default {
        components : {
            breadCrumbHead,
        },
		data () {
			return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'replenishCard'
                        }
                    }
                ],
            };
		},
		methods : {}
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
