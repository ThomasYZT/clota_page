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
                            @click="save(scoped.rowData,scoped.validateFunc)">{{$t('save')}}</Button>
                    <Button type="ghost"
                            class="ivu-btn-90px"
                            @click="cancel(scoped.resetValidFunc)">{{$t('cancel')}}</Button>
                </template>
            </component>
        </div>
    </div>
</template>

<script>

    // import smsSetting from './smsSetting';
    import notice from './noticeSetting';
    import alarm from './alarmSetting';
    import ajax from '@/api/index';

    export default {
        components : {
            // smsSetting,
            alarm,
            notice
        },
        data () {
            return {
                //tap列表
                tapList : [
                    {
                        name : 'notice',
                        label : this.$t('notice')
                    },
                    {
                        name : 'alarm',
                        label : this.$t('alarm')
                    },
                ],
                //当前的tab对应的组件
                tabComponent : 'notice',
                //设置数据
                settingData : {},
            };
        },
        created () {
            //查询系统设置
            this.getSetting();
        },
        methods : {
            /**
             * 查询系统设置
             */
            getSetting () {
                ajax.post('getSetting', {}).then(res => {
                    if (res.status === 200) {
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
            menuSelect (name) {
                this.tabComponent = name;
            },
            /**
             * 保存设置
             * @param data 表单数据
             * @param validateFunc 校验表单方法
             */
            save ( data,validateFunc ) {
                let params = {
                    id : data.id,
                    msgMaintainSendMode : data.msgMaintainSendMode,
                    msgServiceSendMode : data.msgServiceSendMode,
                    smsMaxCount : data.smsMaxCount,
                    smsSupplierName : data.smsSupplierName,
                    warningLogSizeVal : data.warningLogSizeVal,
                    warningUseRatioVal : data.warningUseRatioVal,
                };
                if (validateFunc) {
                    validateFunc().then(() => {
                        this.updateSetting(params);
                    });
                } else {
                    this.updateSetting(params);
                }
            },
            /**
             * 取消还原设置
             * @param{Function} resetValidFunc 重置表单校验规则
             */
            cancel (resetValidFunc) {
                if (resetValidFunc) {
                    resetValidFunc();
                }
                this.getSetting();
            },
            /**
             * 修改系统设置
             * @param params
             */
            updateSetting ( params ) {
                ajax.post('updateSetting', params).then(res => {
                    if (res.status === 200) {
                        this.$Message.success( this.$t('edit') + this.$t('success') );
                        this.getSetting();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
        }
    };
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
