class FileListPlugin {
    constructor({ filename }) {
      this.filename = filename
    }
  
    apply(compiler) {
      // 在发射文件这个时候截取
      compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
        // 当前打包的资源会放在 assets 属性上
        const { assets } = compilation
        let content = `## 文件名    大小 \r\n`
        for (const [filename, stat] of Object.entries(assets)) {
          content += `- ${filename}    ${stat.size()}\r\n`
        }
        // 为 assets 添加一个 filename 的字段，在 webpack 接下来的处理中为输出相应的文件做准备
        assets[this.filename] = {
          source() { return content },
          size() { return content.length }
        }
      })
    }
  }
  module.exports = FileListPlugin
  //每个plugin都是一个class类
  class myplugin{
      constructor({filename}){
        this.filename = filename
      }
      //在原型上面定义apply方法，在安装plugin时触发，回调时compiler
      apply(compiler){
        //compiler可指定事件钩子，在不同的时机，处理额外的逻辑，在webpack内部做一些额外的操作
        //功能完成后可以调用回调

      }
  }