
/**
 * Created by Sasha on 2018/6/1.
 * 调用接口地址配置
 */

const dev = process.env.NODE_ENV === 'development';
let ipLists = {};
//开发环境
if (dev) {
    ipLists = {
        HOST : dev ? 'http://39.105.79.80:9000' : '' //北京运营后台开发环境
        // HOST : dev ? 'http://172.25.50.195:8080' : '' //195开发环境
    };
} else {
//生产环境
    ipLists = {
        HOST : HTTP_ENV
    };
}
export default ipLists;
