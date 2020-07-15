webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

## babel-loader
告诉webpack我想要对我的js代码进行兼容性编译

具体配置文件可以新建新建.babelrc, 通过配置一些参数配合webpack进行打包压缩

这里放出推荐配置

```
{
  "sourceMaps": true,
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    "transform-class-properties",
    "transform-object-rest-spread",
    ["module-resolver", {
      "root": ["./src"]
    }]
  ]
}
```
##### presets
###### babel-preset-env

之前配置话需要很多例如babel-preset-es2015, babel-preset-es2016 或者 stage-0
但是现在只需要babel-preset-env就可以解决

###### babel-preset-react

用于解析jsx

##### plugin
###### syntax-dynamic-import
允许解析import()

###### transform-class-properties

用于解决es6的class的defaultProps={} 不支持的问题

###### transform-object-rest-spread
允许 Babel transform rest 属性用于对象的解构和对象的自变量.




## file-loader
将webpack将所需的对象作为文件发送，并返回其公共URL.


```
npm install --save-dev file-loader
```

[传送门](https://www.webpackjs.com/loaders/file-loader/)

在这里放出推荐配置当为生产环境时使用file-loader

```
{
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: IS_PROD ? {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/images/',
        },
      } : {
        loader: 'url-loader'
      }
```

## url-loader
url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
但是可以配置的没有file-loader丰富。


```
npm install --save-dev url-loader
```
[传送门](https://www.webpackjs.com/loaders/url-loader/)

```
{
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: IS_PROD ? {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/images/',
        },
      } : {
        loader: 'url-loader'
      }
```
## css-loader
加载.css

css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。

引用资源的合适 loader 是 file-loader和 url-loader，你应该在配置中指定


```
npm install --save-dev css-loader
```



```
import css from 'file.css';
```

```
{
    loader: 'css-loader',
    options: { minimize: true },
}
```
## style-loader

通过 style 标签 注入到dom中

建议将 style-loader 与 css-loader 结合使用
```
npm install style-loader --save-dev
```
```
{
    loader: 'style-loader',
    options: { singleton: true },
}
```

开发时使用 style-loader 而不是 css-loader 来加载 CSS，这是为了结合 webpack-dev-server 的热更新（hot reload）功能，在本地开发时将所有的 CSS 都直接内嵌至 HTML 中以加快热更新的速度。

## postcss-loader


```
npm i -D postcss-loader
```
加载 node_moduels 中的 CSS 之前还要使用 postcss-loader 再统一处理一遍，以确保所有进入生产环境的 CSS 都经过了相应的浏览器兼容性处理。


```
{
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
            sourceMap: true,
          },
}
```
## sass-loader
加载sass和scss的file编写到css中
```
npm install sass-loader --save
```
```
{
    loader: 'sass-loader',
    options: {
        includePaths: [
            SOURCE_DIR,
        ],
    },
}
```