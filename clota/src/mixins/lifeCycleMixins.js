

export default {
    beforeRouteEnter(to,from,next) {
        console.log(to);
        next();
    }
}
