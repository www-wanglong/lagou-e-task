const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 通用的webpack打包
module.exports = {
  entry: './src/main.js', // 入口文件
  output: { // 输出文件
    filename: 'js/bundle.js',
  },
  module: { // 放置loader加载器
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options: {
          esModule: false // 以cjs 的形式去加载
        }
      }
    ]
  },
  resolve: {

  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      title: 'vue',
      template: './public/index.html',
    }),
    new VueLoaderPlugin()
  ],
  externals: {

  }
}