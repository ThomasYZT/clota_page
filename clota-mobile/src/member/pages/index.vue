<!---->

<template>
    <div class="member-wrap">
        <router-view>

        </router-view>
    </div>
</template>

<script>
	export default {
		data () {
			return {};
		},
		methods : {},
        created () {
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .member-wrap{
        @include block_outline();
        overflow: auto;
    }
</style>
