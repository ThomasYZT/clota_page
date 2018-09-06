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
            <component :is="tabComponent" :setting="settingData">
                <template slot="footer" slot-scope="scoped">
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="save(scoped.rowData)">{{$t('save')}}</Button>
                    <Button type="ghost"
                            class="ivu-btn-90px"
                            @click="cancel">{{$t('cancel')}}</Button>
                </template>
            </component>
        </div>
    </div>
</template>

<script>

    import smsSetting from './smsSetting';
    import notice from './noticeSetting';
    import alarm from './alarmSetting';
    import ajax from '@/api/index';

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
                tabComponent : 'smsSetting',
                //设置数据
                settingData: {},
            }
        },
        created() {
            //查询系统设置
            this.getSetting();
        },
        methods: {
            /**
             * 查询系统设置
             */
            getSetting() {
                ajax.post('getSetting', {}).then(res => {
                    if(res.status === 200){
                        this.settingData = res.data || {};
                    } else {
                        this.settingData = {};
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 左侧菜单改变
             * @param name 菜单名称
             */
            menuSelect(name) {
                this.tabComponent = name;
            },
            /**
             * 保存设置
             */
            save ( data ) {
                var params = {
                    id: data.id,
                    msgMaintainSendMode: data.msgMaintainSendMode,
                    msgServiceSendMode: data.msgServiceSendMode,
                    smsMaxCount: data.smsMaxCount,
                    smsSupplierName: data.smsSupplierName,
                    warningLogSizeVal: data.warningLogSizeVal,
                    warningUseRatioVal: data.warningUseRatioVal,
                };
                console.log(params);
                this.updateSetting(params);
            },
            /**
             * 取消还原设置
             */
            cancel () {
                this.getSetting();
            },
            /**
             * 修改系统设置
             * @param params
             */
            updateSetting ( params ) {
                ajax.post('updateSetting', params).then(res => {
                    if(res.status === 200){
                        this.$Message.success( this.$t('edit') + this.$t('success') );
                        this.getSetting();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .custome-setting{
        padding: 0 30px 0 30px;
        position: relative;
        @include block_outline();

        .custom-content{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
