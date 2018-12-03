<!--头部日期选择框-->

<template>
    <div class="date-filter">
        <div class="date-wrap">
            <div class="date-list"
                 v-for="(item,index) in dateList"
                 :key="index"
                 :class="{ active : item.date === activeDate.format('MM-dd') }"
                 @click="chooseActiveDate(item.fullDate)">
                <div class="label">{{$t(item.label)}}</div>
                <div class="date">{{item.date}}</div>
            </div>
        </div>
        <div class="all-date" @click="showAllDate">
            <div>全部</div>
            <div>日期</div>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //当前激活的日期
            'active-date' : {
                type : Date,
                default () {
                    return new Date();
                }
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 显示全部日期模态框
             */
            showAllDate () {
                this.$emit('show-date-modal');
            },
            /**
             * 改变激活的日期
             * @param{Date} date 改变后的激活日期
             */
            chooseActiveDate (date) {
                this.$emit('change-active-date',date);
            },
            /**
             * 获取日期对应的label值
             * @param{Date} date 查询的日期
             * @return{String} 日期对应的显示标签值
             */
            getDateListInfo (date) {
                let dateFormat = date.format('yyyy-MM-dd');
                if (dateFormat === new Date().format('yyyy-MM-dd')) {
                    return 'today';
                } else if (dateFormat === new Date().addDays(1).format('yyyy-MM-dd')) {
                    return 'tomorrow';
                } else if (dateFormat === new Date().addDays(2).format('yyyy-MM-dd')) {
                    return 'after tomorrow';
                } else if (date.getDay() === 0) {
                    return 'sunday';
                } else if (date.getDay() === 1) {
                    return 'monday';
                } else if (date.getDay() === 2) {
                    return 'tuesday';
                } else if (date.getDay() === 3) {
                    return 'wednesday';
                } else if (date.getDay() === 4) {
                    return 'thursday';
                } else if (date.getDay() === 5) {
                    return 'friday';
                } else if (date.getDay() === 6) {
                    return 'saturday';
                }
            }
        },
        computed : {
            //顶部日期列表
            dateList () {
                let result = [];
                for (let i = 0,j = 5; i < j; i++) {
                    let date = new Date().addDays(i);
                    result.push({
                        date : date.format('MM-dd'),
                        fullDate : date,
                        label : this.getDateListInfo(date)
                    });
                }
                return result;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .date-filter{
        @include block_outline($height : 53px);
        background: $color_fff;
        padding: 7px 0;

        .all-date{
            float: left;
            @include block_outline(54px);
            border-left: 0.5px solid rgba(0,0,0,0.10);
            font-size: $font_size_12px;
            color: $color_333;
            text-align: center;
            /*padding-top: 10px;*/
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .date-wrap{
            float: left;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: calc(100% - 54px);

            .date-list{
                @include block_outline(40px,40px);
                border-radius: 4px;
                font-size: $font_size_12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #333333;

                &.active{
                    background: #046FDB;
                    color: $color_fff;
                }

                .label{

                }
            }
        }
    }
</style>
