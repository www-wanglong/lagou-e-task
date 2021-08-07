// 开发实现的配置
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

//合并文件
module.exports = merge(common, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map",
  devServer: {
    hotOnly: true,
    contentBase: 'public'
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '""',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})