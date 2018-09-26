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
                        <cell-box class="sub-item">中文</cell-box>
                        <cell-box class="sub-item">英文</cell-box>
                    </template>
                </group>
            </div>
            <transition name="fade">
                <router-view :key="hashKey">
                </router-view>
            </transition>
        </drawer>
        <div class="lang-change" @click="changeLang">
            <span class="iconfont icon-switch"></span>
        </div>
        <!--切换语言弹窗-->
        <div v-transfer-dom>
            <confirm v-model="confirmShow"
                     title="选择语言"
                     @on-confirm="onConfirm"
                     @on-show="onShow">
                <div class="lang-chose">
                    <check-icon
                        :value="langType === 'zh-CN'"
                        @update:value="preChangeLang('zh-CN')">中文</check-icon>
                    <check-icon
                        :value="langType === 'en'"
                        @update:value="preChangeLang('en')">En</check-icon>
                </div>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name : 'app',
        components: {
        },
        data() {
            return {
                //抽屉弹窗是否显示
                drawerVisibility : false,
                showMode: 'push',
                showModeValue: 'push',
                showPlacement: 'left',
                showPlacementValue: 'left',
                showContent001 : true,
                //选择语言提示框是否显示
                confirmShow : false,
                //当前选择的语言类型
                langType : ''
            }
        },
        methods: {
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
             * @param lang 选择的语言
             */
            preChangeLang (lang) {
                this.langType = lang;
            },
            /**
             * 确认切换语言
             */
            onConfirm () {
                this.$store.commit('setLang',this.langType);
            }
        },
        computed: {
            ...mapGetters({
                hashKey : 'hashKey',
                lang : 'lang',
            }),
            viewTransition () {
                return 'vux-pop-in'
            }
        },
        created () {
            // this.$store.commit('updateManageOrgs',JSON.parse(localStorage.getItem('manageOrgs')));
        },
        watch : {
            '$route': {
                handler (newVal,oldVal) {
                    if(newVal && newVal.meta && newVal.meta.title){
                        document.title = newVal.meta.title;
                    }else{
                        document.title = 'clota';
                    }
                    this.$store.commit('updateKeyBoardStatus',false);
                },
                immediate : true
            }
        }
    }
</script>

<style lang="scss">
    body,html{
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
    }
    #app{

        .lang-change{
            position: fixed;
            bottom : 50px;
            right: 0;
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

