/**
 * 生命周期函数
 */
export default {
    // beforeRouteEnter(to,from,next) {
    //     next();
    // },
    beforeRouteEnter (to,from,next) {
        if (to.params && Object.keys(to.params).length > 0) {
            sessionStorage.setItem(to.name,JSON.stringify(to.params));
        }
        next(vm => {
            if (to.params && Object.keys(to.params).length > 0) {
                vm.getParams(to.params);
            } else if (sessionStorage.getItem(to.name)) {
                let saveParams = sessionStorage.getItem(to.name);
                vm.getParams(JSON.parse(saveParams));
            } else {
                vm.getParams({});
            }
        });
    }
};
