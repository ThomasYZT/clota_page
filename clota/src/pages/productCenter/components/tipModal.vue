<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           class-name="vertical-center-modal"
           width="400"
           :mask-closable="false">
        <div class="header" slot="header">
            <span>{{$t('notice')}}</span>
        </div>

        <div :class="$style['remove-group']">
            <span :class="$style['red-bale']">
                <Icon :class="$style.icon" type="help-circled"></Icon>
                <span style="color:#EB6751;">{{$t('haveSomeUnsavedData')}}？</span>
            </span>
        </div>

        <div class="footer" slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('giveUp')}}</Button>
            <Button class="ivu-btn-90px" @click="hide()">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        data () {
            return {
                visible : false
            };
        },
        methods : {
            confirm () {
                this.$emit('giveUp');
                this.visible = false;
            },
            hide () {
                this.$emit('noGiveUp');
                this.visible = false;
            },
            show () {
                this.visible = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .header {
        span {
            font-size: $font_size_16px;
            color: #354052;
        }
    }

    /deep/ .ivu-modal-body {
        position: relative;
        min-height: 168px;
    }
</style>
<style module lang="scss">
    .remove-group{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        font-size: 15px;
        color: #EB6751;
    }

    .red-bale {
        color: #ED3F14;
    }
</style>
