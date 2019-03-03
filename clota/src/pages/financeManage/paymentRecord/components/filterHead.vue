<!--筛选表头-->

<template>
    <div class="filter-head">
        <DatePicker v-model="timeRange"
                    :editable="false"
                    :placeholder="$t('selectField',{msg : ''})"
                    type="daterange"
                    style="width: 240px"
                    @on-change="emitChange">
        </DatePicker>
        <div class="keyword-filter">
            <Input v-model="orderId"
                   :placeholder="$t('inputField',{field : $t('orderId')})"
                   style="width: 240px;margin-right: 5px;"
                   @on-enter="emitChange"/>
            <Button type="primary" @click="emitChange">{{$t('empQuery')}}</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //时间范围值
                timeRange : [],
                //订单id
                orderId : ''
            };
        },
        methods : {
            /**
             * 将改变的参数传递给上级组件
             */
            emitChange () {
                this.$emit('params-change',{
                    timeRange : this.timeRange,
                    orderId : this.orderId,
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        width: 100%;
        height: 60px;
        padding: 15px 30px;

        .keyword-filter{
            float: right;
        }
    }
</style>
