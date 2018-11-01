<!--
内容：新开个人会员卡
作者：djc
日期：
-->

<template>
    <div class="new-personal-card">
        <!--<router-view>
        </router-view>-->
        <!--头部tab组件-->
        <header-tabs :router-name="'newCard'"></header-tabs>
        <!--选择会员卡类型、级别-->
        <select-card @on-change-card="handleCardChanged"></select-card>

        <component :is="currentCardType"></component>
    </div>
</template>

<script>
    import headerTabs from './components/newCardTabs.vue';
    import selectCard from './components/selectCardType.vue';
    import personalCard from './child/personalCard.vue';
    import ownerCard from './child/ownerCard.vue';

    export default {
        components: {
            headerTabs,
            selectCard,
            personalCard,
            ownerCard,
        },
        data() {
            return {
                currentCardType: 'personalCard',
            }
        },
        methods: {
            handleCardChanged(cardData) {
                this.currentCardType = cardData.type;
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .new-personal-card{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }
</style>
