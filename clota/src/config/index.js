/**
 * Created by Sasha on 2018/6/1.
 */

const dev = process.env.NODE_ENV === 'development';

export default {
    // HOST: dev ? 'http://172.25.50.146:8088/' : '', //添哥
    HOST: dev ? 'http://172.25.50.189:8888/' : 'http://172.25.50.189:8888/', //开发环境
    // HOST: dev ? 'http://172.25.50.26:8080/' : '', //任宇
    // HOST: dev ? 'http://192.168.1.85:8080/' : '', ///金明
    // HOST: dev ? 'http://172.25.50.25:8080/' : '', //俞兵
    // HOST : dev ? 'http://172.25.50.52:9080' : '' //李瑜
}
