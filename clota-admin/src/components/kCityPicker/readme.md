## 文档
```js
    属性：
        // 类型 {string} 只选到省、市、区，分别传'p' 'c' 'a'，默认：'a'
        type
        // 是否将弹层放置在 body 内 {boolean} 默认：true
        transfer
        // 是否禁用组件 {boolean} 默认：false
        disabled
        // 占位文本，默认：'请选择'
        placeholder
    方法：
        /**
        * 选择选项
        * @param {object} 选项 {province:'', city:'', area: '', value}
        */
        setSelect({province:'', city:'', area: '', value})
        /**
        * 选择值
        * @param {string} 内容
        */
        setValue(value)
    事件：
        select // 选择选项
```