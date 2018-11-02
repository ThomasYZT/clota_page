// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        "ecmaVersion": 6,
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        'eslint:recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // "indent": [1, "tab"], //缩进设置
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        "object-curly-spacing": [1, "always"], //非空对象首位必须加上空格
        "no-cond-assign": 2, //条件语句的条件中不允许出现赋值运算符
        "no-console": 2, //不允许出现console语句
        "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
        "no-dupe-keys": 2, //对象中不允许出现重复的键
        "no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
        "no-empty": 2, //不允许出现空的代码块
        "no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
        "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
        "no-extra-boolean-cast": 2, //不允许出现不必要的布尔值转换
        "no-extra-semi": 2, //不允许出现不必要的分号
        "no-func-assign": 2, //不允许重新分配函数声明
        "no-inner-declarations": ["error", "functions"], //不允许在嵌套代码块里声明函数
        "no-invalid-regexp": 2, //不允许在RegExp构造函数里出现无效的正则表达式
        "no-irregular-whitespace": 2, //不允许出现不规则的空格
        "no-negated-in-lhs": 2, //不允许在in表达式语句中对最左边的运算数使用取反操作
        "no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
        "no-regex-spaces": 2, //正则表达式中不允许出现多个连续空格
        "no-unreachable": 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
        "use-isnan": 2, //要求检查NaN的时候使用isNaN()
        "valid-jsdoc": [1, {
            "requireReturn": false,
            "requireParamDescription": false,
            "requireReturnDescription": true
        }], //强制JSDoc注释
        "valid-typeof": ["error", {
            "requireStringLiterals": true
        }], //在使用typeof表达式比较的时候强制使用有效的字符串
        "block-scoped-var": 2, //将变量声明放在合适的代码块里
        "default-case": 2, //在switch语句中需要有default语句
        "eqeqeq": [1, "smart"], //比较的时候使用严格等于
        "no-alert": 1, //不允许使用alert，confirm，prompt语句
        "no-caller": 2, //不允许使用arguments.callee和arguments.caller属性
        "no-eq-null": 2, //不允许对null用==或者!=
        "no-eval": 1, //不允许使用eval()
        "no-extend-native": 2, //不允许扩展原生对象
        "no-extra-bind": 2, //不允许不必要的函数绑定
        "no-fallthrough": 1, //不允许switch按顺序全部执行所有case
        "no-floating-decimal": 2, //不允许浮点数缺失数字
        "no-implied-eval": 2, //不允许使用隐式eval()
        "no-iterator": 2, //不允许使用__iterator__属性
        "no-lone-blocks": 2, //不允许不必要的嵌套代码块
        "no-loop-func": 2, //不允许在循环语句中进行函数声明
        "no-multi-spaces": 2, //不允许出现多余的空格
        "no-multi-str": 2, //不允许用\来让字符串换行
        "no-global-assign": 2, //不允许重新分配原生对象
        "no-new": 2, //不允许new一个实例后不赋值或者不比较
        "no-new-func": 2, //不允许使用new Function
        "no-new-wrappers": 2, //不允许使用new String，Number和Boolean对象
        "no-octal": 1, //不允许使用八进制字面值
        "no-octal-escape": 1, //不允许使用八进制转义序列
        "no-param-reassign": 0, //不允许重新分配函数参数"no-proto": 2, //不允许使用__proto__属性
        "no-redeclare": 2, //不允许变量重复声明
        "no-return-assign": 2, //不允许在return语句中使用分配语句
        "no-script-url": 2, //不允许使用javascript:void(0)
        "no-self-compare": 2, //不允许自己和自己比较
        "no-sequences": 2, //不允许使用逗号表达式
        "no-throw-literal": 2, //不允许抛出字面量错误 throw "error"
        "no-unused-expressions": 2, //不允许无用的表达式
        "no-void": 2, //不允许void操作符
        "no-warning-comments": [1, {"terms": ["todo", "fixme", "any other term"]}], //不允许警告备注
        "no-with": 2, //不允许使用with语句
        "radix": 1, //使用parseInt时强制使用基数来指定是十进制还是其他进制
        "vars-on-top": 1, //var必须放在作用域顶部
        "wrap-iife": [2, "any"], //立即执行表达式的括号风格
        "yoda": [2, "never", {"exceptRange": true}], //不允许在if条件中使用yoda条件
        "strict": [2, "function"], //使用严格模式
        "no-catch-shadow": 2, //不允许try catch语句接受的err变量与外部变量重名"no-delete-var": 2, //不允许使用delete操作符
        "no-label-var": 2, //不允许标签和变量同名
        "no-shadow": 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        "no-shadow-restricted-names": 2, //js关键字和保留字不能作为函数名或者变量名
        "no-undef": 2, //不允许未声明的变量
        "no-undef-init": 2, //不允许初始化变量时给变量赋值undefined
        "no-undefined": 2, //不允许把undefined当做标识符使用
        "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不允许有声明后未使用的变量或者参数
        "no-use-before-define": [2, "nofunc"], //不允许在未定义之前就使用变量"indent": 2, //强制一致的缩进风格
        "brace-style": [2, "1tbs", { "allowSingleLine": false}], //大括号风格
        "camelcase": [2, {"properties": "never"}], //强制驼峰命名规则
        "comma-style": [2, "last"], //逗号风格
        "consistent-this": [0, "self"], //当获取当前环境的this是用一样的风格
        "key-spacing": [2, {"beforeColon": true, "afterColon": true}], //对象字面量中冒号的前后空格
        "max-nested-callbacks": [2,{ "max": 3 }], //回调嵌套深度
        "new-cap": [2, {"newIsCap": true, "capIsNew": false}], //构造函数名字首字母要大写
        "new-parens": 2, //new时构造函数必须有小括号
        "no-lonely-if": 0, //不允许else语句内只有if语句
        "no-multiple-empty-lines": [2, {"max": 2}], //空行最多不能超过两行
        "no-nested-ternary": 2, //不允许使用嵌套的三目运算符
        "no-new-object": 2, //禁止使用new Object()
        "no-trailing-spaces": 1, //一行最后不允许有空格
        "no-extra-parens": 1, //不允许出现多余的括号
        "semi": [1, "always"], //强制语句分号结尾
        "semi-spacing": [2, {"before": false, "after": true}], //分后前后空格
        "space-before-blocks": [2, "always"], //块前的空格
        "space-before-function-paren": [2, {"anonymous": "always", "named": "always"}], //函数定义时括号前的空格
        "space-infix-ops": [2, {"int32Hint": true}], //操作符周围的空格
        "keyword-spacing": 2, //关键字前后的空格
        "space-unary-ops": [2, { "words": true, "nonwords": false}], //一元运算符前后使用一致的空格
        "wrap-regex": 2, //正则表达式字面量用括号括起来
        "no-var": 2, //使用let和const代替var
        "generator-star-spacing": [2, "both"], //生成器函数前后空格
        "max-depth": [2,{"max": 4}], //嵌套块深度
        "max-len": [1,{"code": 125,"comments": 100, "ignoreUrls": true}], //一行最大长度，单位为字符
    }
}
