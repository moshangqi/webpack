module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "linebreak-style": ["error", "unix"],
        // "indent": ["error", 2], //缩进时2给字符
        // "quotes": ["error", "single", {"avoidEscape": true}], //双引号
        "no-extra-parens": ["error", "all", { "returnAssign": false }], // 禁止使用不必要的括号
        "no-template-curly-in-string": "error", //禁止常规字符中出现es6占位符情况
        "no-multi-spaces": "error", //单一空格
        "no-multi-str": "error",
        "no-script-url": "error", //在链接地址中使用 javascript: 
        "no-self-compare": "error", //禁止自身比较
        "no-useless-concat": "error", //禁止没有必要的字符拼接
        "arrow-spacing": "error",
        "no-duplicate-imports": "error", //禁止重复导入
        "no-useless-computed-key": "error", //禁止在对象中使用不必要的计算属性
        "no-var": "error",
        // "no-undef": "off",
        "consistent-return": "error",
        "no-alert": "error",
        "no-empty-function": "error", //禁止出现空函数
        "no-extend-native": "error",
        "no-undef-init": "error",
        "no-use-before-define": "error",
        "prefer-template": "error"
    }
};
