# WebPack 
webpack是开源的JavaScript模块打包工具,解决模块之间的依赖.

## 模块打包
把各个模块按照特定的规则和顺序组织在一起，最终合为一个js的过程。

## 模块化优缺点对比
1. 缺点
  - 手动维护加载顺序,存在隐式依赖关系.
  - 一个标签为一个请求,拖慢网页渲染速度
  - 全局作用域污染
2. 优点(为什么要使用模块打包？)
  - 导入与导出语句,清晰的看见模块间的依赖关系
  - 加载合并后的资源,减少网络开销
  - 作用域独立,避免全局作用域污染

## webpack 的优点
- 支持多种模块的标准。包括AMD,CommonJS,ES6模块  
- 有效的减少资源体积，提升首页渲染速度  
- 处理各种文件如样式模版图片等  
- 可以使用插件机制,社区非常强大

## commonJS 与 ES6 Module 区别
1. commonJS运行在代码运行阶段，ES6 Module运行在代码编译阶段。
2. commonJS获取的是一份导出值的拷贝，ES6 Module获取的是值动态的映射，这个映射是只读的。  
3. ES6优点在与死代码的检测与排除，模块变量的类型检查，编辑器的优化。

## 打包原理
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。  
2. 开始预编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。  
3. 确定入口：根据配置中的 entry 找出所有的入口文件。  
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。  
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。  
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的Chunk,再把每个Chunk转换成一个单独的文件加入到输出列表,这步是修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。
⚠️在以上过程中,Webpack会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,插件可以调用Webpack提供的API，改变Webpack的运行结果。

简化版打包原理
1. 配置中获取打包入口。
2. 匹配loader规则，并对入口模块进行转译。
3. 对转译后的模块进行依赖查找
4. 对新找到的模块重复进行2/3，直到没有找到依赖模块。

#### 资源处理流程  
从入口文件开始检索，将具有依赖关系的模块生成一个依赖树，最终生成一个chunk（代码块），chunk与bundle（包）是对应的。
 

## module,chunk,buildle
1. src每个js文件看作一个module,webpack中一切皆模块
2. chunk代码块:一组依赖关系的模块封装成一个chunk，用于代码合并与分割
  - 在入口文件entry表示每个chunk,在HtmlWebpackPlugin中代码定义chunk的引用,splitChunks中生成chunk(分成多个代码块,如公共的第三方的等)
  - 比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。
  - 在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。
  - 在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin   
3. bundle是最后生成的包文件，一个chunk对应打一个包  


## loader 
loader就像webpack翻译官，webpack本身只能处理JavaScript，为了能处理其他资源，必须把资源转译为webpack能够理解的资源。  
配置loader实际上是定义模块的规则，每一个loader都是一个函数,webpack4之前,函数的输入与输出都必须是字符串,在webpack4以后,loader同是支持抽象语法树AST的传递,通过这种方法减少重复的代码解析.
如果是最后一个loader,结果将直接给webpack进行处理,否则讲作为下一个loader的输入进行传递.
需要注意几点。  
1. 对哪些模块生效（test，include，exclude）。  
2. 使用哪些loader。
3. 可以链式调用 style标签 = style-loader(css-loader(sass-loader(SCSS)))

loader可以是链式的，每一个拥有自己的配置。  
loader本身是一个函数，第一loader的输入是源文件，之后所有的输入都是上一个的输出，最后一个直接输出给webpack。 


##  pulgin
插件系统,webpack的支柱功能,目的在于解决loader无法实现的其他事情  
- webpack插件是一个具有apply方法的js对象,apply方法会被webpack compiler调用,并且在整个编译生命周期都可以访问.
- 向 plugins 属性传入一个 new 实例


## webpack4与webpack5之间的区别
1. 升级前：package.json的dev-server命令改了："dev":"webpack serve --config build/ webpack.dev.js"
  - 升级后："dev":"webpack-dev-server --config build/ webpack.dev.js"
2. 升级后：const { merge } = require('webpack-merge')
  - 升级前：const { smart } = require('webpack-merge')
3. 升级后：const { CleanWebpackPlugin }= require('clean-webpack-plugin');
  - 升级前：const CleanWebpackPlugin = require('clean-webpack-plugin');
4. module.rules中/ loader:['xxx-loader'] 换成  use:['xxx-loader']
5. output中，如果filename： 'bundle.[contentHash:8].js' 中 h要小写，不能大写

## webpack基本配置
1. 拆分配置(公共模块，pro，dev)与merge
2. devsever开启代理proxy
3. 处理es6，babel
4. 处理样式：less-loader,css-loader,style-loader
5. 处理图片file-loader
   
### 高级配置
1. 多入口：entry多个，output中filename根据[name]输出，new htmlwebpackplugin配置多个。
2. 抽离css文件：css处理进行拆分,MiniCssExtractPlugin抽离css,在optimization中minimizer使用TerserJSPlugin/OptimizeCSSAssetsPlugin进行css压缩
3. 抽离公共代码和第三方模块SplitChunksPlugin
4. 懒加载:import('./danamic-data.js').then(res=>{console.log(res)})
5. 处理vue文件:vue-loader



## webpack常见性能优化
1. 优化打包构建速度-开发体验与效率
  - 优化babel-loader
    ```js
    {
      test:/\.js$/,
      use:['babel-loader?cacheDirectory'],//开启缓存
      include:path.resolve(__dirname,'src'),//明确范围
      exclude:path.resolve(__durbane,'node_modules')//排除范围,两者选一个就好.如果都选exclude优先级高
    }
    ```
  - IgnorePlugin:避免引入无用模块(直接不引入,例如moment.js只引入中文语音包) 
    new webpack.IgnorePlugin(/\.\/locale/,/moment/)
  - noParse:避免重复打包(引入但不打包)
    ```js
      module.exports = {
        module:{
          noParse:[/vue\.min.js$/]
        }
      }
    ```
  - happyPack:开启多进程打包(较大项目中使用)
    ```js 
      const HappyPack = require('happypack');
      module.exports = {
        module:{
          rules:[
            {
              test:/\.js$/,
              exclude:/node_modules/,
              loader:'happypack/loader?id=js'
            },
            {
              test:/\.ts$/,
              exclude:/node_modules/,
              loader:'happypack/loader?id=ts'
            }
          ]
        },
        plugins:[
          new HappyPack({
            id:'js',
            loaders:[{
              loader:'babel-loader',
              options:{}
            }]
          }),
          new HappyPack({
            id:'ts',
            loader:[{
              loader:'ts-loader',
              options:{}
            }]
          })
        ]
      } 
    ```
  - ParallelUglifyPligin(派哦来fP拉个in):多进程压缩js
    ```js
      const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
      module.exports = {
        plugin:[
          new ParallelUglifyPlugin({
            uglifyJS:{
              output:{
                beautify:false,//最紧凑的输出
                comments:false,//删除所有注释
              },
              compress:{
                drop_console:true,//删除所有console语句
                collapse_vars:true,//内嵌定义了但只用到一次的变量
              }
            }
          })
        ]
      }
    ```
  - 自动刷新与热更新(不能用于生产环境)
    - 自动刷新watch:true,网页全部刷新,速度比较慢,而且状态会丢失
    - 热更新:原理就是开启webpack-dev-server(WDS),客户端从server拉取更新后的资源,拉取的不是整个文件,而是chunk diff,WDS与浏览器维护一个websocket,资源变化推送更新事件
      ```js
        const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
        module.exports = {
          plugins:[
            new HotModuleReplacementPlugin();
          ],
          devserver:{
            hot:true
          }
        }
        //上面配置会为每个页面绑定一个module.hot对象
        //所以热更新需要自己手动定义,例如在index.js中
        if(module.hot){
          module.hot.accept();
        }
      ```
  - DllPlugin:动态链接库插件(不需要每次打包都把vue/react等打包进来)(不用于生产环境)
    - webpack已内置DllPlugin支持
    - DllPlugin 打包出dll文件
    - DllReferencePlugin-使用dll文件

2. 优化产出代码-提高产品性能(体积更小,合理分包不重复加载,速度更快内存使用更小)
  - 小图片使用base64格式产出,在url-loader中设置limit(小于这个值用base64产出),outputPath(打包的目录)
  - bundle加hash
    ```js
      output:{
        filename:'[name].[contentHash:8].js',
        path:dispath
      }
    ```
  - 懒加载,通过import
  - 提取公共代码SplitChunksPlugin
  - 使用CDN加速
    - 在output中配置publicPath:'http://cdn.abc.com'//修改所有静态文件url的前缀
    - 把打包后的结果上传到cdn服务器上面
  - 使用production
    - 开启压缩代码(如果压缩慢可以使用多进程压缩ParallelUglifyPligin
    - vue/react会自动删除调试代码
    - 启动Tree-Shaking(树-摇晃):把没有用到的函数去掉(必须用es6module才生效)
  - Scope Hosting



babel-polyfill按需引入
```js
  {
    "presets":[
      [
        "@babel/preset-env",
        {
          "useBuiltIns":"usage",
          "corejs":3
        }
      ]
    ]
  }
```