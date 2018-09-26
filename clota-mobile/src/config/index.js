/**
 * Created by Sasha on 2018/6/1.
 */

const dev = process.env.NODE_ENV === 'development';
let  ipLists = {};
//开发环境
if(dev){
    ipLists = {
        // HOST : 'http://172.25.50.11:9080/', //李俞
        HOST : 'http://172.25.50.189:8888/', //开发环境
        // HOST : 'http://172.25.50.195:8888/', //测试环境
        //HOST : 'http://172.25.50.15:8080/', //任宇/
        // HOST : 'http://192.168.1.85:8080/', //金明
        // HOST : 'http://172.25.50.2:8080/', //喻斌/
        // HOST : 'http://172.25.50.52:9080', //添哥
    };
}else{
//生产环境
    ipLists = {
        HOST : HTTP_ENV
    }
}
export default ipLists
