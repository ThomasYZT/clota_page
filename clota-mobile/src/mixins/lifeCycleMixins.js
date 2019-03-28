/**
 * 生命周期函数
 */
export default {
    beforeRouteEnter (to,from,next) {
        if (to.params && Object.keys(to.params).length > 0) {
            sessionStorage.setItem(to.name,JSON.stringify(to.params));
        }
        next(vm => {
            if (to.params && Object.keys(to.params).length > 0) {
                vm.getParams(to.params,to,from);
            } else if (sessionStorage.getItem(to.name)) {
                let saveParams = sessionStorage.getItem(to.name);
                vm.getParams(JSON.parse(saveParams),to,from);
            } else {
                vm.getParams({},to,from);
            }
        });
    },
    methods : {
        /**
         * 更新当前路由下保存的信息
         * @param{Object} params
         */
        updateStorgeInfo (params) {
            sessionStorage.setItem(this.$route.name,JSON.stringify(params));
        }
    }
};
