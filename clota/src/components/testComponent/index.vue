<!--测试时使用的组件-->

<template>
    <div class="test-component">
        <drag-com>
            <div class="console-wrap" @click="showPanel">调试</div>
        </drag-com>
        <div class="console-panel" :class="{ 'panel-up' : panelModalShow ,'panel-down' : !panelModalShow }">
            <div class="close" @click="close">关闭</div>
            <ul class="tab-list">
                <li class="tab-li"
                    :class="{ 'active' : item.component = activeMenu }"
                    v-for="(item,index) in menuList"
                    :key="index">
                    {{item.name}}
                </li>
            </ul>
            <div class="componen-area">
                <component :is="activeMenu"></component>
            </div>
        </div>
    </div>
</template>

<script>
    import dragCom from './drag';
    import cardRead from './cardRead';
    export default {
        components : {
            dragCom,
            cardRead
        },
        data () {
            return {
                //调试面板是否显示
                panelModalShow : false,
                //当前激活的组件
                activeMenu : 'cardRead'
            };
        },
        methods : {
            /**
             * 显示调试面板
             */
            showPanel () {
                this.panelModalShow = true;
            },
            /**
             * 关闭调试面板
             */
            close () {
                this.panelModalShow = false;
            }
        },
        computed : {
            //菜单列表
            menuList () {
                return [
                    {
                        name : '读卡器',
                        component : 'cardRead'
                    }
                ];
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .console-wrap{
        display: block;
        position: fixed;
        color: #fff;
        background-color: #04be02;
        line-height: 1;
        font-size: 14px;
        padding: 5px 10px;
        z-index: 10000;
        border-radius: 3px;
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        cursor: pointer;
        right: 0;
        bottom: 0;
        user-select: none;
    }
    .console-panel{
        position: fixed;
        z-index: 999999;
        left: 0;
        right: 0;
        bottom : -300px;
        height: 300px;
        background: #ffffff;
        box-shadow: 0 0 2px rgba(0,0,0,.4);

        .close{
            position: absolute;
            right: 10px;
            top : 10px;
            cursor: pointer;
        }

        .tab-list{
            overflow: auto;

            .tab-li{
                float: left;
                height: 30px;
                border-right: 1px solid #C5C5C5;
                border-bottom: 1px solid #C5C5C5;
                padding: 0 10px;
                line-height: 30px;
                cursor: pointer;
                color: #999999;

                &.active{
                    color: #04be02;
                }
            }
        }

        .componen-area{
            width: 100%;
            height: calc(100% - 30px);
        }
    }

    .panel-up{
        transform: translate(0,-300px);
        transition: all 0.3s;
    }
    .panel-down{
        transform: translate(0,300px);
        transition: all 0.3s;
    }
</style>
