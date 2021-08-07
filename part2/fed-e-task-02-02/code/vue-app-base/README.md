# vue-app-base
## 开发运行`npm run serve`
## 生产环境运行 `npm run build`
## `npm run lint`
## 实现思路
### 1.先通过配置实现本地开发 `webpack.dev.js`文件中
#### 1.1 `entry` 入口
```JavaScript
module.exports = {
  entry: 'src/main.js'
}
```
#### 1.2 `output` 输出
```JavaScript
module.exports = {
  output: { //默认在dist文件下
    filename: 'js/bundle.js'
  }
}
```
#### 1.3 `mode` 模式
```JavaScript
module.exports = {
  mode: 'development'
}
```
#### 1.4 `devtool`控制source map如何生成
```JavaScript
module.exports = {
  devtool: 'eval-cheap-module-source-map'
}
```
#### 1.5 `module:rules`配置
- vue文件处理 vue-loader
- js文件处理 babel-loader
- less文件处理 less-loader、css-loader、style-loader
- css文件处理css-loader、style-loader
- 静态资源url处理 url-loader
```JavaScript
{
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader'
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
}
```
#### 1.6 `plugins`插件配置
```JavaScript
{
   plugins: [ // 插件
    new HtmlWebpackPlugin({ // 创建入口文件
      title: 'vue',
      template: './public/index.html', //需要使用的模版文件
    }),
    new webpack.DefinePlugin({ //定义常量
      BASE_URL: '""',
    }),
    new VueLoaderPlugin() //
  ],
}
```
### 2.先打包运行 `npm run serve`, 访问dist/index.html
### 3.添加devServe配置，方便开发。（使用虚拟打包）
```JavaScript
  {
    devServer: {
      hotOnly: true,
      contentBase: 'public'
    },
  }
```
### 4. 抽离通用的配置，在`dev.js`和`prod.js`文件中分别配置开发模式和正式生成需要的不同的配置。使用`webpack-merge`和通用的配置结合
