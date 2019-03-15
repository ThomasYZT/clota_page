<!--数字输入框-->

<template>
    <transition name="vux-actionsheet-mask">
        <template >
            <ul class="num-keyboard" v-transfer-dom v-click-outside="hide" v-show="showKeyBoard">
                <li class="row"
                    v-for="(item,row) in keyBoardData"
                    :key="row">
                    <ul class="col-list">
                        <template v-for="(list,listIndex) in item">
                            <li class="col gray"
                                :key="listIndex"
                                v-if="list.static"
                                @click="specialClick(list)">
                                {{list.label}}
                            </li>
                            <li class="col"
                                :key="listIndex"
                                v-else
                                @click="clickBord(list)">
                                {{list.label}}
                            </li>
                        </template>
                    </ul>
                </li>
            </ul>
        </template>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //键盘类型
            type : {
                type : String,
                default : 'number'
            }
        },
        data () {
            return {
                //键盘是否显示
                visible : false
            };
        },
        methods : {
            /**
             * 点击键盘
             * @param data 键盘数据
             */
            clickBord (data) {
                this.$emit('add-word',data.value);
            },
            /**
             * 删除或取消
             * @param data
             */
            specialClick (data) {
                if (data.value === 'del') {
                    this.$emit('del-word');
                } else if (data.value === 'cancel') {
                    this.$emit('cancel');
                }
            },
            /**
             * 隐藏键盘
             */
            hide () {
                this.visible = false;
            },
            /**
             * 显示键盘
             */
            show () {
                this.visible = true;
            }
        },
        computed : {
            //键盘数据
            keyBoardData () {
                if (this.type === 'number') {

                    return [
                        [
                            {
                                label : 1,
                                value : 1
                            },
                            {
                                label : 2,
                                value : 2
                            },
                            {
                                label : 3,
                                value : 3
                            }
                        ],
                        [
                            {
                                label : 4,
                                value : 4
                            },
                            {
                                label : 5,
                                value : 5
                            },
                            {
                                label : 6 ,
                                value : 6
                            }
                        ],
                        [
                            {
                                label : 7,
                                value : 7
                            },
                            {
                                label : 8,
                                value : 8
                            },
                            {
                                label : 9,
                                value : 9
                            }
                        ],
                        [
                            {
                                label : this.$t('cancel'),
                                value : 'cancel',
                                static : true
                            },
                            {
                                label : 0,
                                value : 0
                            },
                            {
                                label : this.$t('delete'),
                                value : 'del',
                                static : true
                            }
                        ]
                    ];
                } else if (this.type === 'money') {
                    return [
                        [
                            {
                                label : 1,
                                value : 1
                            },
                            {
                                label : 2,
                                value : 2
                            },
                            {
                                label : 3,
                                value : 3
                            }
                        ],
                        [
                            {
                                label : 4,
                                value : 4
                            },
                            {
                                label : 5,
                                value : 5
                            },
                            {
                                label : 6 ,
                                value : 6
                            }
                        ],
                        [
                            {
                                label : 7,
                                value : 7
                            },
                            {
                                label : 8,
                                value : 8
                            },
                            {
                                label : 9,
                                value : 9
                            }
                        ],
                        [
                            {
                                label : '.',
                                value : '.',
                                static : true
                            },
                            {
                                label : 0,
                                value : 0
                            },
                            {
                                label : this.$t('delete'),
                                value : 'del',
                                static : true
                            }
                        ]
                    ];
                }
            },
            ...mapGetters({
                showKeyBoard : 'showKeyBoard'
            })
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .num-keyboard{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: $color_fff;
        border-top: 0.5px solid #C3C3C3;

        .row{
            @include block_outline($height : 51px);
            border-bottom: 0.5px solid #C3C3C3;

            .col-list{
                @include block_outline();
                overflow: auto;
                display: flex;
                flex-direction: row;

                .col{
                    flex: 1;
                    border-right: 0.5px solid #C3C3C3;
                    font-size: $font_size_28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: $color_000;

                    &:nth-last-of-type(1){
                        border-right: 0;
                    }

                    &.gray{
                        font-size: $font_size_16px;
                        background: #D5D8DB;
                    }
                }
            }
        }
    }
</style>
