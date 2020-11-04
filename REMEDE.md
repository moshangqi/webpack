## lodaer ##
    图片处理
        file-loader,url-loader（二者很像，urlloader比fileloader多一个功能，当图片很小的时候，可以将图片转化为base64，减少部署后的请求，当图片大的时候file-loader处理方式同，直接返回路径，limit参数可配置大小）
    样式文件：
        style-loader: 将解析之后的css挂载到页面上去（mini-css-extract-plugin 将样式文件挂在到一个打包到css文件中去，在挂在到页面）
        css-loader: 解析css之中的import关系
        如果要引入less等需要现通过less-loader进行转化
        postcss-loader兼容css3，加入-webkit-等浏览器厂商前缀，可在postcss.config.js配置兼容浏览器版本
    babel:
        ES6转ES5：babel-loader @babel/core,但是仅仅这样只能实现一些简单的转化，一个Es6的方法依旧无法转化， @babel/polyfill可以实现方法的转化，但是会把未用到的全部转化进去，导致包体积过大，可以通过配置需要兼容的浏览器和"useBuiltIns": "usage",配合使用实现一起转化
        @babel/polyfill的注入会按照全局变量的方式进行注入，污染全局环境
        @babel/plugin-transform-runtime用于库代码，这样不会污染到全局变量，以闭包行删注入
        
        
## plugin ##
    mini-css-extract-plugin: 用于
    devtool:
    eval 生成的sourceMap加入js文件后面
    cheap-source-map--不显示源码 
    source-map--显示源码 
    module只显示行不显示列

    shimming垫片:修改webpack的行为
     webpack.ProvidePlugin: new webpack.ProvidePlugin({ //垫片，当在模块中使用_时，会自动导入lodash包
       '_': 'lodash'
    })



## tree shaking ##
    当引入一些未用到的文件的时候webpack还是会把未使用过的文件打包到打包文件中，可以通过开启tree shaking来进行优化,在开发者模式下tree-shaking会把未用到的文件标记，但是并不会把文件删除（删除可能会影响调试的sourceMap的对应的行数）
    /*! exports provided: add, mini */
    /*! exports used: add */
    在production模式下three shaking会启动把未使用的删除


## HMR ##
    模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
    <!-- webpack的devserver开启热加载实质上还是重新加载main.6aa584f5b307bb52e7cd.hot-update.js 6aa584f5b307bb52e7cd.hot-update.json -->
    React-hot-loader ,devserver开启hot，加载webpack的hotModuleReplacePlugin插件，然后在通过hot包裹，就实现了热加载
    但是当state改变时页面不会刷新，但是控制台打印出了信息？？？？？？？
    react-hot-module官网上推出React Refresh Webpack Plugin，未来将取代react-hot-module，但是现在在webpack中的插件不是很稳定

## code spliting ##
    代码分割概念：对于一些第三方模块库，我们可以单独打包出一个文件，而不是和业务代码放置在一个文件里，好处是加入业务代码有1MB，第三方模块库有1MB，如果不拆分用户要一次性下载2MB的文件（和同时下载2个1Mb差别也不是太大，但还是要快）。但是当业务代码发生改变之后，如果是拆分之后的代码，用户将不用下载第三方模块库（直接使用浏览器缓存中的模块库），但如果拆分用户将重新下载2MB的内容
    webpack，code spliting二者没有明确的关系，只是webpack集成了code spliting
    webpack对于代码分割有2种方式：
        同步代码：在webpack中optimization中进行配置能实现代码拆分
        异步代码（import）： 动态引入的代码无需做任何配置会自动进行拆分  ——————>  懒加载概念

    Prefetching/Preloading modules
        对于一些主页用不到的代码可以采用异步引入的方式来进行加载，例如mooc的登录框，但是这样会登录的点击交互事假变慢，就可以通过Prefetching来进行处理，/* webpackPrefetch: true */，这样处理后当主页加载完成后，带宽释放，就会对异步代码进行预请求，来解决交互性能问题
 
## pwa ##
    访问一个网站第一次访问成功，但是第二次访问服务器挂掉，利用本地缓存把之前服务器的内容展示出来
    goole开发workbox-webopack-plugin的可以实现这门技术

## eslint ##
    规范代码

## DLLPLUGIN ##
    对于第三方模块库，我们时不会更改代码的，但每次打包都会对这些代码进行重新打包，这样对于打包效率就会降低，我们可以利用DllPlugin来对第三方模块代码进行打包，然后将其挂在到页面全局中去，当第二次打包时，分析DLLplugin的映射文件，如果存在直接利用其打包后的文件，不再对这些公有模块进行打包，实现一次打包多次利用的效果，加快了打包效率

## 性能优化 ##
    1、webpack，node，yarn版本尽量高
    2、loader包含模块尽可能的少
    3、用尽量少的plugin，并且官方提供
    4、开启tree shaking
    5、开启多线程打包 happypack
    6、DLLplugin
    7、控制包文件
    8、合理使用source-map
    9、内存编译，webpack-dev-server
    10、开发环境去除无用插件
