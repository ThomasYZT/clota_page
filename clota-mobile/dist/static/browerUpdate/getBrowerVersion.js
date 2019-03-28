/**
 * Created by Sasha on 2017/11/27.
 */

var theUA = window.navigator.userAgent.toLowerCase();
//当前支持IE10及以上，初始值默认ie版本11
var ieVersion = 11;
// 判断当前页面是否为浏览器升级页面
var loginPage = '/performance/index.html';
var errorPage = '/performance/static/browerUpdate/errorPage.html';
var isErrorPage = location.href.indexOf(errorPage) !== -1;

if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
    ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
    // 当前浏览器版本小于等于10 且 当前页面非浏览器升级提示页面时跳转至浏览器升级页面
    if (ieVersion <= 10 && !isErrorPage) {
        location.href = errorPage;
    }
}

// 当前浏览器版本大于10 且 当前页面为浏览器升级提示页面时自动跳转快乐沃克登录页
if (ieVersion > 10 && isErrorPage) {
    location.href = loginPage;
}
