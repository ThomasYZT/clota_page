<!--产品剩余错误提示框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="700"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="reserve-modal"
        class-name="vertical-center-modal">
    </Modal>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>
