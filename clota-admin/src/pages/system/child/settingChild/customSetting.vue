<!--通用设置-->

<template>
    <div class="custome-setting">
        <Menu mode="horizontal"
              :active-name="tabComponent"
              @on-select="menuSelect">
            <MenuItem :name="item.name"
                      v-for="(item,i) in tapList"
                      :key="i">
                {{item.label}}
            </MenuItem>
        </Menu>
        <div class="custom-content">
            <component :is="tabComponent"></component>
        </div>
    </div>
</template>

<script>
    import smsSetting from './smsSetting';
    import notice from './noticeSetting';
    import alarm from './alarmSetting';
    export default {
        components : {
            smsSetting,
            notice,
            alarm
        },
        data() {
            return {
                //tap列表
                tapList: [
                    {
                        name: 'smsSetting',
                        label: this.$t('smsSetting')
                    },
                    {
                        name: 'notice',
                        label: this.$t('notice')
                    },
                    {
                        name: 'alarm',
                        label: this.$t('alarm')
                    },
                ],
                //当前的tab对应的组件
                tabComponent : 'smsSetting'
            }
        },
        methods: {
            /**
             * 左侧菜单改变
             * @param name 菜单名称
             */
            menuSelect(name) {
                this.tabComponent = name;
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .custome-setting{
        position: relative;
        @include block_outline();

        .custom-content{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
