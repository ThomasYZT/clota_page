<!--新开会员卡二级菜单-->

<template>
    <div style="background: #fff;">
        <Input v-model="physicalNum" style="width: 200px" @on-enter="changeNum"/>
        <router-view>
        </router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //物理卡号
                physicalNum : ''
            };
        },
        methods : {
            changeNum () {
                this.$store.commit('updatecardTest',this.physicalNum);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
