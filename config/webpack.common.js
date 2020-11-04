const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const HappyPackPool = HappyPack.ThreadPool({size: 1});
const webpack = require('webpack');


module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  resolve: {
    extensions: ['.js', '.json','.jsx', '.ts', '.tsx'], //导入模块可省略的后缀名，按数组顺序先后为查找顺序
    alias: { // 文件替代路基配置,&static在全局使用可引用static这个文件夹
      '&static': path.resolve(__dirname, '../src/static'),
      '&images': path.resolve(__dirname, '../src/static/images'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        } 
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "happypack/loader?id=babel",
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      threadPool: HappyPackPool,
      // cache: true,
      loaders: ['babel-loader'],
      //允许 HappyPack 输出日志
      // verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      title: 'test',
      hash: true, // css、js加入hash防止缓存
      inject: true, // js插入页面底部
    }),
    new CleanWebpackPlugin(),
    new AddAssetHtmlWebpackPlugin({
      // 将编译后的文件挂在到页面上
      filepath: path.resolve(__dirname, './dll/vendors.dll.js')
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 显示块的范围，3个可选值all, async, and initial，默认async（异步代码）
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
}