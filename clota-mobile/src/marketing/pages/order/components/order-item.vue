<!--订单模板-->

<template>
    <div class="order-item"></div>
</template>

<script>
	export default {
		data () {
			return {}
		},
		methods: {}
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-item{
        @include block_outline($height : 128px);
        background: $color_fff;
        margin-top : 8px;
        padding: 14px 14px 0;
    }
</style>
