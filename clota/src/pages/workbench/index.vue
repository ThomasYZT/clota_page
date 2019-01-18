<!--工作台路由-->

<template>
    <div class="workbench">
        <template v-if="manageOrgs.nodeType === 'scenic' || manageOrgs.nodeType === 'company'">
            <scenicService></scenicService>
        </template>

        <template v-else>
            <cooperPartner></cooperPartner>
        </template>
    </div>
</template>

<script>
    import cooperPartner from './cooperPartner/cooperPartner';
    import scenicService from './scenicService/scenicService';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            cooperPartner,
            scenicService
        },
        data () {
            return {};
        },
        computed : {
            ...mapGetters([
                'manageOrgs'
            ])
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .workbench {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        border-radius: 4px;
    }
</style>
