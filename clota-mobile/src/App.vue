<!---->

<template>
    <div id="app" :class="{'change-lang' : langChing}">
        <drawer
            width="200px;"
            :show.sync="drawerVisibility"
            :show-mode="showModeValue"
            :placement="showPlacementValue"
            :drawer-style="{'background-color':'#35495e', width: '200px'}">

            <!-- drawer content -->
            <div slot="drawer">
                <group>
                    <cell
                        title="语言"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent001 ? 'up' : 'down'"
                        @click.native="showContent001 = !showContent001"></cell>

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
        <div class="lang-change" @click="changeLang"></div>
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
                langChing : false,
                drawerVisibility : false,
                showMode: 'push',
                showModeValue: 'push',
                showPlacement: 'left',
                showPlacementValue: 'left',
                showContent001 : true
            }
        },
        methods: {
            /**
             * 修改语言
             */
            changeLang () {
                // this.langChing = true;
                this.drawerVisibility = !this.drawerVisibility;
                setTimeout(() =>{
                    this.$store.commit('setLang',this.lang === 'en' ? 'zh-CN' : 'en');
                },500);
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

        &.change-lang{
            transform: rotateY(360deg);
            transition: all 2s;
        }

        .lang-change{
            position: fixed;
            top : 50%;
            left: 0;
            width: 50px;
            height: 50px;
            background: red;
            z-index: 9999;
            border-radius: 25px;
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

