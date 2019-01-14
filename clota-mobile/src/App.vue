<!---->

<template>
    <div id="app" >
        <drawer
            width="200px;"
            :show.sync="drawerVisibility"
            :show-mode="showModeValue"
            :placement="showPlacementValue"
            :drawer-style="{'background-color':'#35495e', width: '200px'}">

            <!--左侧弹窗，暂时先放着不用-->
            <div slot="drawer">
                <group>
                    <cell
                        title="语言"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent001 ? 'up' : 'down'"
                        @click.native="showContent001 = !showContent001">
                    </cell>
                    <template v-if="showContent001">
                        <cell-box class="sub-item">{{$t('chinese')}}</cell-box>
                        <cell-box class="sub-item">{{$t('english')}}</cell-box>
                    </template>
                </group>
            </div>
            <template>
                <!--<headNav v-if="showTopBanner"></headNav>-->
                <transition name="fade">
                    <router-view :key="hashKey" >

                    </router-view>
                </transition>
            </template>
            <!--<template v-if="pageShow">-->
                <!--&lt;!&ndash;<headNav v-if="showTopBanner"></headNav>&ndash;&gt;-->
                <!--<transition name="fade">-->
                    <!--<router-view :key="hashKey" >-->
                    <!--</router-view>-->
                <!--</transition>-->
            <!--</template>-->
            <!--<template v-else>-->
                <!--<div class="invlid-url">-->
                    <!--<img src="./assets/images/icon-invalid-url.png" alt="">-->
                <!--</div>-->
            <!--</template>-->
        </drawer>
        <drag>
            <div class="lang-change" @click="changeLang">
                <span class="iconfont icon-switch"></span>
            </div>
        </drag>
        <!--切换语言弹窗-->
        <div v-transfer-dom>
            <confirm v-model="confirmShow"
                     :title="$t('selectLang')"
                     :confirm-text="$t('complete')"
                     :cancel-text="$t('cancel')"
                     @on-confirm="onConfirm"
                     @on-show="onShow">
                <div class="lang-chose">
                    <check-icon
                        :value="langType === 'zh-CN'"
                        @update:value="preChangeLang('zh-CN')">{{$t('chinese')}}</check-icon>
                    <check-icon
                        :value="langType === 'en'"
                        @update:value="preChangeLang('en')">{{$t('english')}}</check-icon>
                </div>
            </confirm>
        </div>
        <div v-transfer-dom>
            <loading
                :show="isLoading"
                :text="$t('loading')">
            </loading>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import drag from '@/components/drag/index.vue';
    import ajax from '@/member/api/index.js';

    export default {
        name : 'app',
        components : {
            drag,
        },
        data () {
            return {
                //抽屉弹窗是否显示
                drawerVisibility : false,
                showMode : 'push',
                showModeValue : 'push',
                showPlacement : 'left',
                showPlacementValue : 'left',
                showContent001 : true,
                //选择语言提示框是否显示
                confirmShow : false,
                //当前选择的语言类型
                langType : '',
                //页面是否显示
                pageShow : true,
                //是否显示顶部返回首页的图标
                //showTopBanner: true
            };
        },
        methods : {
            /**
             * 修改语言
             */
            changeLang () {
                this.confirmShow = true;
            },
            /**
             * 选择语言的提示框显示
             */
            onShow () {
                this.langType = this.lang;
            },
            /**
             * 选择语言
             * @param{String} lang 选择的语言
             */
            preChangeLang (lang) {
                this.langType = lang;
                this.$router.replace({
                    name : this.$route.name
                });
            },
            /**
             * 确认切换语言
             */
            onConfirm () {
                this.$store.commit('setLang',this.langType);
                if (this.$route && this.$route.meta && this.$route.meta.title) {
                    document.title = this.$t(this.$route.meta.title);
                } else {
                    document.title = '';
                }
            },
            /**
             * 获取微信配置
             */
            getWxConfig () {
                if (this.isWeixin) {
                    this.pageShow = true;
                    ajax.post('getWxConfig',{
                        url : window.location.origin,
                        companyCode : this.companyCode,
                        source : this.sourceInfo,
                    }).then(res => {
                        if (res.success) {
                            this.$wechat.config({
                                //debug : true,
                                appId : res.data.appId,
                                timestamp : res.data.timestamp,
                                nonceStr : res.data.nonceStr,
                                signature : res.data.signature,
                                jsApiList : [
                                    'chooseImage',
                                    'getLocalImgData',
                                    'uploadImage',
                                    'addCard',
                                    'closeWindow',
                                    'getLocation'
                                ]
                            });
                            this.$wechat.error(() => {
                                this.$store.commit('updateWeixinConfig',false);
                            });
                        }
                    });
                } else {
                    this.pageShow = false;
                }
            }
        },
        computed : {
            ...mapGetters({
                hashKey : 'hashKey',
                lang : 'lang',
                isLoading : 'isLoading',
                showNetworkError : 'showNetworkError',
                errCode : 'errCode',
                isWeixin : 'isWeixin',
                companyCode : 'companyCode',
                sourceInfo : 'sourceInfo',
            }),
        },
        created () {
             this.getWxConfig();
        },
        watch : {
            '$route' : {
                handler (newVal) {
                    if (newVal && newVal.meta && newVal.meta.title) {
                        document.title = this.$t(newVal.meta.title);
                    } else {
                        document.title = '';
                    }
                    this.$store.commit('updateKeyBoardStatus',false);
                },
                immediate : true
            },
            //提示网路错误信息
            showNetworkError (newVal) {
                if (newVal) {
                    this.$vux.toast.show({
                        text : this.$t(newVal),
                        type : 'text',
                    });
                }
            },
            //监听错误信息，如果值发生变化，重新提示错误信息
            errCode (newVal) {
                if (newVal) {
                    this.$vux.toast.show({
                        text : this.$t(newVal),
                        type : 'text',
                    });
                }
            }
        }
    };
</script>

<style lang="scss">
    body,html{
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
    }
    #app{

        .drag-label{
            width: 40px;
            height: 40px;
            bottom : 50px;
            right: 0;
        }

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

        .lang-change{
            width: 40px;
            height: 40px;
            background: #BBC5D5;
            z-index: 9999;
            border-radius: 25px;
            text-align: center;
            line-height: 40px;

            .icon-switch{
                color: #fff;
            }
        }

        .weui-cell{
            font-size: 14px;
        }

        .weui-cells{
            margin-top: 0;
        }

        .sub-item{
            font-size: 12px;
            padding-left: 30px;

            &.weui-cell:before{
                left : 30px;
            }

            &:nth-of-type(2):before{
                left : 0;
            }
        }
    }

    .lang-chose{
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .vux-check-icon:nth-of-type(1){
            margin-right: 30px;
        }
    }
    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 46px;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }
    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>

