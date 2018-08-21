/**
 * Created by Sasha on 2018/6/1.
 */

const dev = process.env.NODE_ENV === 'development';

export default {
    // HOST : dev ? 'http://218.77.108.157:7780' : ''
    // HOST : dev ? 'http://172.25.50.147:8080' : ''
    // HOST : dev ? 'http://172.25.50.146:8089' : ''
    // HOST : dev ? 'https://www.easy-mock.com/mock/5a1f7a9bca645757c051ef75/KPI' : ''
    HOST: dev ? 'http://172.25.50.74:8080' : '' //丰成龙
    // HOST : dev ? 'http://172.25.50.52:9080' : '' //李瑜
}
