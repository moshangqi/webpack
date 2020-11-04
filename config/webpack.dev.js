const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  //eval直接加载js文件末尾，cheap-source-map--不显示源码 ，source-map--显示源码 ，modulez只显示行不显示列
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    port: 8000,
    open: true,
    hot: true,
    // historyApiFallback: true
    // hotOnly: true
    // porxy: {
    //   'api': 'http://192.168.80.2'
    // }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader','postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(devConfig, commonConfig);