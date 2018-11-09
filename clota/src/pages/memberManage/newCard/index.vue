<!--
内容：新开个人会员卡、业主卡、企业会员卡
作者：djc
日期：
-->

<template>
    <div class="new-personal-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'newCard'">
        </header-tabs>
        <div class="container">
            <div class="content-wrap">
                <!--选择会员卡类型、级别-->
                <select-card
                    @on-change-card="handleCardChanged">
                </select-card>

                <!--<component :is="currentCardType"-->
                           <!--:selected-card="selectedCard">-->
                <!--</component>-->
                <personal-card v-show="currentCardType === 'personalCard' || currentCardType === 'companyCard'"
                               :card-type="currentCardType"
                               :key="currentCardType"
                               :selected-card="selectedCard">
                </personal-card>
                <owner-card v-show="currentCardType === 'ownerCard'"
                            :selected-card="selectedCard">
                </owner-card>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTabs from './components/newCardTabs.vue';
    import selectCard from './components/selectCardType.vue';
    import personalCard from './child/personalCard.vue';
    import ownerCard from './child/ownerCard.vue';

    export default {
        components : {
            headerTabs,
            selectCard,
            personalCard,
            ownerCard,
        },
        data () {
            return {
                // 当前卡类型对应的组件
                currentCardType : '',
                selectedCard : {}
            };
        },
        methods : {
            /**
             * 所选择会员卡的类型、级别发生改变后的处理
             * @param cardData  String  会员卡的类型、级别
             */
            handleCardChanged (cardData) {
                // 判断动态组件当前是哪个
                switch (cardData.memberCard.cardTypeId) {
                    case '1':
                        this.currentCardType = 'ownerCard';
                        this.selectedCard = cardData;
                        break;
                    case '2':
                        this.currentCardType = 'personalCard';
                        this.selectedCard = cardData;
                        break;
                    case '3':
                        this.currentCardType = 'companyCard';
                        this.selectedCard = cardData;
                        break;
                    default :
                        this.currentCardType = '';
                        this.selectedCard = {};
                        break;
                }
            }
        }
    };
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

    .container {
        height: calc(100% - 70px);
        overflow: auto;

        .content-wrap {
            width: 850px;
            margin: 20px auto;
        }
    }
</style>
