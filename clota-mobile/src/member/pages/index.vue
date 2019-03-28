<!---->

<template>
    <div class="member-wrap">
        <router-view>

        </router-view>
        <!--<template v-if="isWeixin">-->
            <!--<transition name="fade">-->
                <!--<router-view>-->
                <!--</router-view>-->
            <!--</transition>-->
        <!--</template>-->
        <!--<template v-else>-->
            <!--<div class="invlid-url">-->
                <!--<img src="../../assets/images/icon-invalid-url.png" alt="">-->
            <!--</div>-->
        <!--</template>-->
        <!--tab菜单栏-->
        <tabbar v-if="isTabbarShow && cardInfo.cardTypeId !== '1' && hasPointMenu"
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
                memberConfigInfo : 'memberConfigInfo',
                isWeixin : 'isWeixin',
            }),
            //是否有积分服务
            hasPointMenu () {
                return this.memberConfigInfo && this.memberConfigInfo.memberPoint === 'true';
            }
        },
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .member-wrap{
        @include block_outline();
        overflow: auto;

        .invlid-url{
            position: fixed;
            width: 100%;
            height: 100%;

            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
</style>
