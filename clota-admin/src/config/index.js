/**
 * Created by Sasha on 2018/6/1.
 */

const dev = process.env.NODE_ENV === 'development';

export default {
    // HOST : dev ? 'http://218.77.108.157:7780' : ''
    // HOST : dev ? 'http://172.25.50.147:8080' : ''
    // HOST : dev ? 'http://172.25.50.146:8089' : ''
    // HOST : dev ? 'https://www.easy-mock.com/mock/5a1f7a9bca645757c051ef75/KPI' : ''
    // HOST: dev ? '' : ''
    // HOST : dev ? 'http://172.25.50.146:8089' : '' //谢添
    HOST : dev ? 'http://39.105.79.80:9000' : '' //北京运营后台开发环境
};
