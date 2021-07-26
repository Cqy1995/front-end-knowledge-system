# WebPack 模块打包工具  解决模块之间的依赖

## 模块打包
把各个模块按照特定的规则和顺序组织在一起，最终合为一个js的过程。

## 为什么要使用模块打包？

## webpack 的优点
支持多种模块的标准。包括AMD,CommonJS,ES6模块  
有效的减少资源体积，提升首页渲染速度  
处理各种文件如样式模版图片等  
可以使用插件  

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
2. chunk是一组依赖关系的模块生成的代码块，用于代码合并与分割
  - 在入口文件entry表示每个chunk,在HtmlWebpackPlugin中代码定义chunk的引用,splitChunks中生成chunk(分成多个代码块,如公共的第三方的等)
  - 比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。
  - 在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。
  - 在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin   
3. bundle是最后生成的包文件，一个chunk对应打一个包  


## loader 
loader就像webpack翻译官，webpack本身只能处理JavaScript，为了能处理其他资源，必须把资源转译为webpack能够理解的资源。  
配置loader实际上是定义模块的规则，需要注意两点。  
1. 对哪些模块生效（test，include，exclude）。  
2. 使用哪些loader。 

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
    ```
      module.exports = {
        module:{
          noParse:[/vue\.min.js$/]
        }
      }
    ```
  - happyPack
  - ParallelUglifyPligin
  - 热更新
  - DllPlugin
2. 优化产出代码-提高产品性能



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