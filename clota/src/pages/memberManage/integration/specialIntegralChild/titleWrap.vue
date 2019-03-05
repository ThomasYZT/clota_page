<!--新建规则-->

<template>
    <div class="create-rule">
        <Button type="primary"
                icon="android-add"
                @click="addRule">
            {{$t('新建规则')}}
        </Button>
    </div>
</template>

<script>
	export default {
		data () {
			return {};
		},
		methods : {
            /**
             * 新建规则
             */
            addRule () {

            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .create-rule{
        @include block_outline($height : 50px);
        padding: 9px 20px;
        border-bottom: 1px solid #eeeeee;
    }
</style>
