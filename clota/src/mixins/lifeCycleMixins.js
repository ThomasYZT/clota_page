/**
 * 生命周期函数
 */
export default {
    beforeRouteEnter(to,from,next) {
        if(to.params && Object.keys(to.params).length > 0){
            sessionStorage.setItem(to.name,JSON.stringify(to.params));
        }
        next();
    },
}
