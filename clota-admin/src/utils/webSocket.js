/**
 * Created by Admin on 2018/6/19.
 */

import config from '../../config/index.js';

const webSocket = {

    // 重新连接的次数
    curTryNum : 0,
    // 重新连接最大的次数
    maxTryNum : 20,
    timeout : 40000, //计时器设定为30s
    timeoutObj : null,
    serverTimeoutObj : null,
    websocket : null,
    showMessage : null,

    // 初始化
    init (option) {
        this.showMessage = option.showMessage;
        this.onWebsocket();
    },

    // 手动断开websocket 连接(并将当前重连次数赋值为最大连接数+1，避免断开后自动连接)
    destroy () {
        this.websocket.close();
        this.curTryNum = this.maxTryNum + 1;
    },

    // 开启
    onWebsocket () {
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            let baseUrl = process.env.NODE_ENV === 'development' ? config.HOST : window.location.origin;
            baseUrl = baseUrl.replace('http', 'ws');
            let token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : '';
            this.websocket = new WebSocket(baseUrl + "/v3/websocket?token=" + token);
        } else {
            alert('Not support websocket');
        }

        //连接发生错误的回调方法
        this.websocket.onclose = (event) => {
            console.debug('socket已关闭', event);
        };

        //连接发生错误的回调方法
        this.websocket.onerror = (event) => {
            console.debug('socket连接失败', event);
        };

        //连接成功建立的回调方法
        this.websocket.onopen = (event) => {
            //连接成功时将当前已重连次数归零
            this.curTryNum = 0;
            this.heartCheckStart();
        };

        //接收到消息的回调方法
        this.websocket.onmessage = (event) => {
            // 无论收到什么信息，说明当前连接正常，将心跳检测的计时器重置
            this.heartCheckReset();
            let content = JSON.parse(event.data);
            // 忽略保持长连接的心跳通知和社保成功通知
            if (content.success) {
                if (content.data != 'noShow') {
                    this.showMessage(JSON.parse(content.data));
                }
            }
        };

        //连接关闭的回调方法
        this.websocket.onclose = () => {
            if (this.curTryNum <= this.maxTryNum) {

                // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
                setTimeout(() => {
                    this.onWebsocket();
                    this.curTryNum += 1;
                }, 10000);

            } else {
                console.log("Disconnected from WebSocket server. It won't reconnect anymore unless reconnect manually");
            }
        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = () => {
            this.destroy();
        };
    },

    /**
     * 心跳检测
     * 若30秒内没有接收到任何来自服务器的信息，则向服务器发起一个ping包
     * @type {{timeout: number, timeoutObj: null, serverTimeoutObj: null, reset: reset, start: start}}
     */
    heartCheckReset : function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        this.heartCheckStart();
    },

    heartCheckStart : function () {
        this.timeoutObj = setTimeout(() => {
            //向服务器发送心跳消息
            this.websocket.send('');
        }, this.timeout);
    }

};

export default webSocket;
