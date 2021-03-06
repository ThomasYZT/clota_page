/**
 * 原生DOM封装函数
 */
var utils = {
    /**
     * 兼容匹配选择器
     * @param element {Object} 元素
     * @param selector {String} 选择器字符串
     * @return {*}
     */
    matchesSelector : function (element, selector) {
        if (element) {
            if (element.matches) {
                return element.matches(selector);
            } else if (element.matchesSelector) {
                return element.matchesSelector(selector);
            } else if (element.webkitMatchesSelector) {
                return element.webkitMatchesSelector(selector);
            } else if (element.msMatchesSelector) {
                return element.msMatchesSelector(selector);
            } else if (element.mozMatchesSelector) {
                return element.mozMatchesSelector(selector);
            } else if (element.oMatchesSelector) {
                return element.oMatchesSelector(selector);
            } else if (element.querySelectorAll) {
                let matches = (element.document || element.ownerDocument).querySelectorAll(selector);
                let i = 0;

                while (matches[i] && matches[i] !== element) i++;

                return matches[i] ? true : false;
            }

            throw new Error('您的浏览器版本太旧了');
        }
    },
    /**
     * 原生Ele获取真实offsetTop
     * @param ele {Object} 原生元素
     */
    getOffsetTop : function (ele, selector) {
        if (!ele) {
            return 0;
        }
        if (utils.matchesSelector(ele, selector)) {
            return 0;
        }
        return (ele.offsetTop + utils.getOffsetTop(ele.offsetParent, selector));
    },
    /**
     * 原生Ele获取真实offsetLeft
     * @param ele {Object} 原生元素
     */
    getOffsetLeft : function (ele, selector) {
        if (!ele) {
            return 0;
        }
        if (utils.matchesSelector(ele, selector)) {
            return 0;
        }
        return (ele.offsetLeft + utils.getOffsetLeft(ele.offsetParent, selector));
    },

    /**
     * 原生Ele获取真实offsetTop和offsetLeft，需要通过call调用传入DOM元素
     * @param ele {Object} 原生元素
     */
    getOffset : function (ele, selector) {
        let _self = this;
        if (ele) {
            return {
                top : _self.getOffsetTop(ele, selector),
                left : _self.getOffsetLeft(ele, selector)
            };
        } else {
            return null;
        }
    },

    /**
     * 获取真实的dom样式
     * @param {Object} el 元素
     */
    getStyle : function (el) {
        return (window.getComputedStyle
            ? window.getComputedStyle(el, null)
            : el.currentStyle);
    },

    /**
     * 获取指定选择器父元素，如果自己符合选择器标准则返回本身
     * @param {Object} el 元素
     * @param {Object} selector 选择器
     */
    closest : function (el, selector) {
        if (utils.matchesSelector(el, 'body')) {
            // 如果最终和指定选择器不符则返回null
            if (selector !== undefined && selector !== 'body') {
                return null;
            } else {
                return el;
            }
        }
        let pass = utils.matchesSelector(el, selector);
        if (pass) {
            return el;
        } else {
            return utils.closest(el.parentElement, selector);
        }
    },

    /**
     * 获取最近一个定位父元素
     * @param {Object} el dom元素
     */
    getHasPosParentEl : function (el) {
        if (utils.matchesSelector(el, 'body')) {
            return el;
        }
        let style = utils.getStyle(el.parentElement);
        if (style.position && style.position !== 'static') {
            return el.parentElement;
        } else {
            return utils.getHasPosParentEl(el.parentElement);
        }
    },
    /**
     * 获取最近一个滚动父元素
     * @param {Object} el dom元素
     */
    getHasScrollParentEl : function (el) {
        if (utils.matchesSelector(el, 'body')) {
            return el;
        }
        let style = utils.getStyle(el.parentElement);
        if (
            (style.overflow && 'auto,scroll'.includes(style.overflow))
            || (style['overflow-x'] && 'auto,scroll'.includes(style['overflow-x']))
            || (style['overflow-y'] && 'auto,scroll'.includes(style['overflow-y']))
        ) {
            return el.parentElement;
        } else {
            return utils.getHasScrollParentEl(el.parentElement);
        }
    },

    /**
     * 获取所有的滚动父元素数组
     * @param {Object} el dom元素
     */
    getAllHasScrollParentEls : function (el) {
        const self = this;
        let arr = [];

        // 递归向上查找
        function upQuery (tmp) {
            const pEl = self.getHasScrollParentEl(tmp);
            if (self.matchesSelector(pEl, 'body')) {
                return;
            }
            if (pEl) {
                arr.push(pEl);
                upQuery(pEl);
            }
        }

        // 执行
        upQuery(el);
        return arr;
    }
};

export default utils;


/**
 * 滚动条柔和滚动
 * @param el 元素
 * @param from 起始位置
 * @param to 重点位置
 * @param direction 方向（垂直还是还是水平滚动） horizontal/vertical
 * @param duration 动画持续时间
 * @param endCallback 回调函数
 */
export const scrollIntoView = function (el, from = 0, to, direction = 'horizontal', duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll (start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            if (direction === 'horizontal') {
                el.scrollLeft = d;
            } else if (direction === 'vertical') {
                el.scrollTop = d;
            }
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
};
