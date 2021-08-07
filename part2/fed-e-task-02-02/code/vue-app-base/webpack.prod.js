// 部署实现的配置
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

//合并文件
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '"public/"',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(['public'])
  ],
})