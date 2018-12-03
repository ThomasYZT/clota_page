<!--日期选择模态框-->

<template>
    <popup :value="value"
           :hide-on-blur="false"
           @input="changeModalStatus"
           v-transfer-dom>
        <div :class="$style.dateBody">
            <div :class="$style.title">
                <div :class="$style.cancelBtn" @click="changeModalStatus(false)">{{$t('cancel')}}</div>
                <div :class="$style.operateTxt">{{$t('选择游玩日期')}}</div>
                <div :class="$style.confirmBtn" @click="confirmChooseDay">{{$t('confirm')}}</div>
            </div>
            <ul :class="$style.weekTitle">
                <li :class="[$style.weekDay,$style.redLabel]">日</li>
                <li :class="$style.weekDay">一</li>
                <li :class="$style.weekDay">二</li>
                <li :class="$style.weekDay">三</li>
                <li :class="$style.weekDay">四</li>
                <li :class="$style.weekDay">五</li>
                <li :class="[$style.weekDay,$style.redLabel]">六</li>
            </ul>
            <div :class="$style.content">
                <swiper v-model="dateIndex"
                        height="277px"
                        :loop="true"
                        v-if="value"
                        :threshold="70"
                        :aspect-ratio="10"
                        :show-dots="false"
                        @on-index-change="dateIndexChange">
                    <swiper-item v-for="(item,index) in dateInfo" :key="index">
                        <div :class="$style.item">
                            <div :class="$style.dateTitle">
                                {{item.date | timeFormat('yyyy年MM月') | contentFilter}}
                            </div>
                            <ul :class="$style.dateListInfo">
                                <li :class="$style.dateRow"
                                    v-for="(date,dateIndex) in item.dayInfo"
                                    :key="dateIndex">
                                    <ul :class="$style.dateColWrap">
                                        <li :class="[
                                        $style.dateCol,
                                        !day.label ? $style.dateDisable : '',
                                        day.completeVal === activeDate ? $style.dateActive : ''
                                        ]"
                                            v-for="(day,dayIndex) in date"
                                            :key="dayIndex" @click="choseDay(day)">
                                            {{day.val}}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </popup>
</template>

<script>
    import { getDate } from './getDate';

    export default {
        props : {
            'value' : {
                type : Boolean,
                default : false
            }
        },
        data () {
            return {
                //当前日期所在索引
                dateIndex : 2,
                dateSuffer : 1,
                //当前选择的日期
                activeDate : new Date().format('yyyy-MM-dd')
            };
        },
        methods : {
            /**
             * 修改模态框状态
             * @param{Boolean} status 改变后的模态框状态
             */
            changeModalStatus (status) {
                this.$emit('input',status);
            },
            /**
             * 日期swiper改变
             * @param{Number} index 当前激活的日期序列
             */
            dateIndexChange (index) {
                if (index === 0 && this.dateIndex === 4) {
                    this.dateSuffer--;
                } else if (index === 4 && this.dateIndex === 0) {
                    this.dateSuffer++;
                } else if (this.dateIndex > index) {
                    this.dateSuffer++;
                } else {
                    this.dateSuffer--;
                }
            },
            /**
             * 选择日期
             * @param{String} day 选择的日期
             */
            choseDay (day) {
                if (!day.label) return;
                this.activeDate = day.completeVal;
            },
            /**
             * 确认选择日期
             */
            confirmChooseDay () {
                this.$emit('choose-day',this.activeDate);
                this.changeModalStatus(false);
            }
        },
        computed : {
            //日期信息
            dateInfo () {
                let result = [];
                for (let i = 0,j = this.dateIndexSort.length; i < j; i++) {
                    let date = new Date().addMonths(i - 2 - this.dateSuffer);
                    result[this.dateIndexSort[i]] = {
                        date : date.valueOf(),
                        dayInfo : getDate(date.format('yyyy-MM-dd')),
                        test : date.format('yyyy-MM-dd')
                    };
                }
                return result;
            },
            //日期序列排序
            dateIndexSort () {
                switch (this.dateIndex) {
                    case 2 : return [0,1,2,3,4];
                    case 1 : return [4,0,1,2,3];
                    case 0 : return [3,4,0,1,2];
                    case 4 : return [2,3,4,0,1];
                    case 3 : return [1,2,3,4,0];
                    default : return [0,1,2,3,4];
                }
            }
        }
    };
</script>
<style module>
    .dateBody{
        width: 100%;
        height: 400px;
        background: #ffffff;
    }

    .title{
        width: 100%;
        height: 44px;
        background: #F5F6F8;
        display: flex;
        flex-direction: row;
        line-height: 44px;
        padding: 0 14px;
        font-size: 15px;
    }

    .operateTxt{
        flex: 1;
        text-align: center;
        color: #333333;
    }

    .cancelBtn{
        color: #333333;
    }

    .confirmBtn{
        color: #046FDB;
    }

    .weekTitle{
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: 0.5px solid #E8E8E8;
    }

    .weekDay{
        font-size: 13px;
        color: #4A4A4A;
    }

    .content{
        width: 100%;
        height: 316px;
    }

    .redLabel{
        color: #F15B40;
    }

    .vuxSlider{
        height: 100%;
    }

    .item{
        height: 316px;
    }
    .dateTitle{
        width: 100%;
        height: 46px;
        line-height: 46px;
        font-size: 14px;
        color: #333333;
        text-align: center;
    }

    .dateListInfo{
        width: 100%;
        height: 240px;
    }
    .vuxSlider{
        height: 100% !important;
    }
    .dateRow{
        height: 40px;
    }
    .dateColWrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .dateCol{
        width: 40px;
        height: 40px;
        border-radius: 3px;
        line-height: 40px;
        text-align: center;
        color: #4A4A4A;
    }

    .dateActive{
        background: #046FDB;
        color: #fff;
    }

    .dateDisable{
        color: #D5D9E4;
    }
</style>
