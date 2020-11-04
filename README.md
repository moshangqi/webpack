# webpack
自己构建的打包工具

实现配置：

  样式文件支持css，less

  code spliting，实现同步异步代码拆分 
  
  DLLPLUGIN，对第三方模块进行单独打包实现一次打包多次利用性能优化
  
  HMR（Hot Module Replacement）,开启热加载功能，方便开发模式下调试
  
  eslint,使用eslint规范代码
  
  webpack-dev-server：开发模式下在本地启动一个服务
  
script命令：
  
  npm run start       开启devserver服务
  
  npm run build       实现生产模式下的代码打包
  
  npm run dev-build   查看开发模式下的代码打包
  
  npm run build:dll   对第三方模块进行打包，实现一次打包多次使用，优化性能
