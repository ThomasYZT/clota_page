<!---->

<template>
    <div class="member-wrap">
        <router-view>

        </router-view>
        <!--tab菜单栏-->
        <tabbar v-if="isTabbarShow && cardInfo.cardTypeId !== '1'"
                v-model="actived" >
            <tabbar-item v-for="(item, index) in tabbarList"
                         :key="index" @on-item-click="tabbarChange(item.routeName)">
                <i slot="icon" :class="item.icon"></i>
                <span slot="label">{{$t(item.label)}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
	export default {
		data () {
			return {
                //是否显示底部导航栏
                isTabbarShow : false,
                //tab选中状态
                actived : 0,
                //底部导航栏
                tabbarList : [
                    {
                        label : 'myMember',
                        routeName : 'home',
                        icon : 'iconfont icon-mymember'
                    },
                    {
                        label : 'integralMall',
                        routeName : 'integralMall',
                        icon : 'iconfont icon-integral-mall'
                    }
                ],
            };
		},
		methods : {
            /**
             * 跳转路由
             * @param{String} routeName 路由名称
             */
            tabbarChange (routeName) {
                this.$router.push({
                    name : routeName
                });
            }
        },
        created () {
        },
        watch : {
            '$route' : {
                handler (newVal) {
                    if (newVal.name === 'home') {
                        this.actived = 0;
                    } else if (newVal.name === 'integralMall' || newVal.name === 'exchangeRecord') {
                        this.actived = 1;
                    } else {
                        this.actived = null;
                    }
                    this.isTabbarShow = newVal.name === 'home' ||
                        newVal.name === 'integralMall' ||
                        newVal.name === 'exchangeRecord';
                },
                immediate : true
            },
        },
        computed : {
            ...mapGetters({
                cardInfo : 'cardInfo',
            }),
        },
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .member-wrap{
        @include block_outline();
        overflow: auto;
    }
</style>
