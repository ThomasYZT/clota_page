<!--
    海报选择器
    作者：杨泽涛
-->
<template>
    <div class="poster-selecion">
        <div class="poster-wrapper" v-if="posterList.length > 0">
            <div class="poster"
                 @click="choosePoster(item, index)"
                 v-for="(item, index) in posterList"
                 :key="item.id">
                <img :src="item.posterUrl">
                <div v-if="nowIndex === index" class="choose-mask">
                    <img class="chosed-icon" src="../../../../../assets/images/icon-open-card-success.svg" alt="">
                </div>
            </div>
        </div>
        <div v-else>
            <div class="no-poster">
                <span class="no-poster-tip">无海报</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
            //海报列表
            posterList : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //当前选择的海报
                nowItem : {},
                //当前选择的海报索引
                nowIndex : '',
            };
        },
        methods : {
            /**
             * 选择海报
             * @param item
             */
            choosePoster (item, index) {
                if (this.nowIndex === index) {
                    this.nowItem = {};
                    this.nowIndex = '';
                } else {
                    this.nowItem = item;
                    this.nowIndex = index;
                }
                this.$emit('posterChosed', this.nowItem);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .poster-selecion {
        .poster-wrapper {
            width: 100%;
            .poster {
                margin: 0 5px 0 0;
                display: inline-block;
                position: relative;
                width: 180px;
                height: 220px;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }

                .choose-mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(233,233,233,.7);

                    .chosed-icon {
                        position: absolute;
                        right: 20px;
                        bottom: 20px;
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }

        .no-poster {
            position: relative;
            width: 180px;
            height: 220px;
            border-radius: 5px;
            background-color: #f3f3f3;

            .no-poster-tip {
                @include center_center();
                color: #354052;
            }
        }
    }
</style>
