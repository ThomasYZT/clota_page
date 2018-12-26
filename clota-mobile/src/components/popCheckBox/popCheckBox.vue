<!--弹框多选-->

<template>
    <popup v-transfer-dom
           :value="value"
           @input="changeStatus">
        <!--上拉多选标题栏-->
        <popup-header :left-text="leftText"
                      :right-text="rightText"
                      :title="headTitle"
                      @on-click-left="cancelOperate"
                      @on-click-right="confirmOperate">
        </popup-header>
        <!--操作列表-->
        <checklist label-position="left"
                   :options="operateList"
                   v-model="operateChoosed" >
        </checklist>
    </popup>
</template>

<script>
    export default {
        props : {
            'value' : {
                type : Boolean,
                default : true
            },
            //标题左侧文字
            'left-text' : {
                type : String,
                default : 'cancel'
            },
            //标题栏右侧文字
            'right-text' : {
                type : String,
                default : 'getCardBtn'
            },
            //标题文字
            'head-title' : {
                type : String,
                default : ''
            },
            //操作项列表
            'operate-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //默认选中的操作项
            'choosed-list-default' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
		data () {
			return {
                //选择的操作项
                operateChoosed : []
            };
		},
		methods : {
            /**
             * 修改模态框状态
             * @param{Boolean} status 弹框状态
             */
            changeStatus (status) {
                this.$emit('input',status);
            },
            /**
             * 取消操作
             */
            cancelOperate () {
                this.changeStatus(false);
            },
            /**
             * 确认选择
             */
            confirmOperate () {
                this.changeStatus(false);
                this.$emit('get-choosed-lists',this.operateChoosed);
            }
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>
