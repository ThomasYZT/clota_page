<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :mask-closable="false">
        <div class="header" slot="header">
            <span>{{$t('notice')}}</span>
        </div>

        <div class="remove-group">
            <span class="red-bale">
                <Icon type="help-circled"></Icon>
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
</style>
