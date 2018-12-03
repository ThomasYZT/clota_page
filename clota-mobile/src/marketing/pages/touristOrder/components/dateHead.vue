<!--头部日期选择框-->

<template>
    <div class="date-filter">
        <div class="date-wrap">
            <div class="date-list">
                <div class="label">{{$t('今天')}}</div>
                <div class="date">10-11</div>
            </div>
            <div class="date-list">
                <div class="label">{{$t('明天')}}</div>
                <div class="date">10-11</div>
            </div>
            <div class="date-list">
                <div class="label">{{$t('后天')}}</div>
                <div class="date">10-11</div>
            </div>
            <div class="date-list">
                <div class="label">{{$t('周六')}}</div>
                <div class="date">10-11</div>
            </div>
            <div class="date-list">
                <div class="label">{{$t('周日')}}</div>
                <div class="date">10-11</div>
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
		data () {
			return {};
		},
		methods : {
            /**
             * 显示全部日期模态框
             */
            showAllDate () {
                this.$emit('show-date-modal');
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
                background: #046FDB;
                border-radius: 4px;
                color: $color_fff;
                font-size: $font_size_12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .label{

                }
            }
        }
    }
</style>
