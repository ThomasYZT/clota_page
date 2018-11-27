<!---->

<template>
    <div class="test">
        <router-view>

        </router-view>
    </div>
</template>

<script>
    // import Vue from 'vue';
    // import Vuex from 'vuex';
	export default {
		data () {
			return {};
		},
		methods : {},
        created () {
            // Vue.use(Vuex);
            // const store = new Vuex.Store({
            //     state : {
            //         count : 0
            //     },
            //     mutations : {
            //         increment (state) {
            //             state.count++;
            //         }
            //     }
            // });
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>
