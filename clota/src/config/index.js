/**
 * Created by Sasha on 2018/6/1.
 */

const dev = process.env.NODE_ENV === 'development';

export default {
    HOST: dev ? 'http://172.25.50.189:8888/' : '' //开发环境
    // HOST : dev ? 'http://172.25.50.52:9080' : '' //李瑜
}
