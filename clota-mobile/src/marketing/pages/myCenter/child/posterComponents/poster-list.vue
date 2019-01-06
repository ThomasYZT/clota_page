<!--海报列表-->

<template>
    <div class="poster-list">
        <div class="detail" v-for="(item,index) in data" :key="index">
            <div class="poster-pic" @click="showPreImage(index)">
                <img class="poster-img" :src="item.posterUrl" alt="">
            </div>
            <div class="poster-desc">
                <div class="poster-name">{{item.posterName}}</div>
                <div class="poster-size">{{item.size}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //海报数据
            'data' : {
              type : Array,
              default () {
                  return [];
              }
            },
            //当前所处序列
            'data-index' : {
                type : Number,
                default : 0
            }
        },
        data () {
            return {
                options : {
                    getThumbBoundsFn : (index) => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        thumbnail = this.$el.querySelectorAll('.poster-pic')[index];
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                },
            };
        },
        methods : {
            /**
             * 显示海报图片
             * @param{Number} index 海报图片序号
             */
            showPreImage (index) {
                this.$emit('show-preview-index',index + this.dataIndex * 2 );
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .poster-list{
        @include block_outline(100%,auto);
        padding: 14px 14px 0 14px;
        overflow: auto;

        .detail{
            @include block_outline(unquote('calc(50% - 6px)'));
            background: $color_fff;
            float: left;
            border: 1px solid #FAFAFA;
            border-radius: 4px;

            &:nth-of-type(2){
                float: right;
            }

            .poster-pic{
                @include block_outline($height : 180px);

                .poster-img{
                    @include block_outline();
                }
            }

            .poster-desc{
                @include block_outline($height : 55px);
                padding: 11px 9px;
                display: flex;
                flex-direction: row;
                align-items: center;

                .poster-name{
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient: vertical;
                }

                .poster-size{
                    font-size: $font_size_11px;
                    color: #C5C5C5;
                }
            }
        }

    }
</style>
