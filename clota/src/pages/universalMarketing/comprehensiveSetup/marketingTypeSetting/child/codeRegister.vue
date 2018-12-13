<!--
    二维码注册管理
    作者：杨泽涛
-->
<template>
    <div class="code-register" v-if="addable !== 'no-data'">
        <codeBox v-if="Object.keys(marketingTypeItem).length > 1 && addable"
                 :codeInfo="codeInfo"
                 @updateSuccess="updateSuccess"></codeBox>

        <div v-else class="code-box">
            <div class="null-box">
                <span>{{$t('pleaseAddMarketingLevelFirst')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import codeBox from '../components/codeBox';
    import ajax from '@/api/index';
    export default {
        props : {
            marketingTypeItem : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            codeBox
        },
        data () {
            return {
                codeInfo : {},
                //是否可注册二维码
                addable : 'no-data',
            };
        },
        methods : {
            /**
             * 更新成功
             */
            updateSuccess () {
                this.$emit('updateSuccess', this.marketingTypeItem);
            },
            //获取营销等级列表数据
            getListLevel () {
                ajax.post('marketing-listLevel', {
                    typeId : this.marketingTypeItem.id,
                    pageNo : 1,
                    pageSize : 99,
                }).then(res => {
                    if (res.success && res.data) {
                        res.data.data.length > 0 ? this.addable = true : this.addable = false;
                    } else {
                        this.addable = false;
                    }
                });
            }
        },
        watch : {
            marketingTypeItem : {
                handler (newVal) {
                    this.addable = 'no-data';
                    this.getListLevel();
                    this.codeInfo = {
                        registerUrl : newVal.registerUrl,
                        id : newVal.id,
                        typeName : newVal.typeName,
                        status : newVal.registerUrl ? 'show' : 'null',
                    };
                }
            },
            immediate : true,
            deep : true
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .code-register {
        padding : 35px 33px;

        .code-box {
            position: relative;
            width: 300px;
            height: 350px;
            border-radius: 8px;

            .null-box {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: $color_gray;
                font-size: 16px;
                line-height: 350px;
                text-align: center;
                border: 1px dashed #D9D9D9;
            }
        }
    }

</style>
