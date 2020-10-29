# 前端知识点体系梳理
前端知识体系，从头到尾分为各个模块，打通奇经八脉。

## javascript

### 函数的调用
作为独立函数调用，在非严格模式下this指向windows，严格模式下指向underfind
作为对象的方法调用，this指向该对象
作为构造函数调用，看是独立函数调用还是属于方法调用
apply,call,bind可以改变this指向
箭头函数
### 闭包
变量：用于存储数据的容器；
标识符：代码中用来标识变量、函数、或属性的字符序列。
执行上下文：评估和执行 JavaScript 代码的环境的抽象概念。（全局，函数，eval函数）
词法作用域：JavaScript 从标识符到变量的映射机制，在词法分析阶段生成的作用域，词法分析阶段，就可以理解为写代码阶段。
闭包：由于浏览器的垃圾回收机制，在JavaScript中，函数是第一公民，所以函数可以被当作一个普通的变量传递，所以函数在运行时可能会看起来已经脱离了原来的词法作用域。但是由于函数的作用域早就在词法分析时就确定了，所以函数无论在哪里执行，都会记住被定义时的作用域。这种现象就叫作闭包。<br/>
闭包就是函数能够记住并访问它的词法作用域，即使当这个函数在它的词法作用域之外执行时。</br>
#### 综上所述,😊闭包是词法作用域和函数是JavaScript的第一公民相互所用自然而然产生的现象。


## git基本操作
#### 文件名（泛指文件路径+文件名）例如'/home/index.html'
#### commit指git log时commit后的id,取前七位即可
#### 标签名即为名称例如'v1.0
#### 分支名也为名称除了master以外
git status 查看当前状态
git fetch/git pull     拉取代码<br/>
git add .              所有代码添加到暂存区<br/>
git commit -m '信息'   暂存区提交<br/>
git push  origin master    提交到远程</br>
git rm '文件名'         删除<br/>
git mv '文件名'         重命名/移动文件<br/>
git log --pretty=oneline '文件名'     查看文件前后变化（用得到的id，git show 得到的id ，也能看见具体的变化）<br/>
git log --oneline  查看简写的提交记录<br/>
git log --oneline --graph 查看版本路线<br/>
git log -p '文件名'                   具体修改的内容<br/>
git diff   查看文件不同（针对改动少）<br/>
git checkout -- '文件名'   当前文件还原到上一次提交的状态（已追踪时无效，在暂存区属于已追踪）<br/>
git reset HEAD '文件名'    撤销文件的追踪<br/>
git reset --hard HEAD^     回到上一版本（两个^^就是回退到前两个版本）<br/>
git reset --hard 'commitid'      回到指定版本<br/>
git checkout 'commitid' -- '文件名' 将指定文件回退到指定版本<br/>
git tag '标签名' 创建标签<br/>
git tag  查看标签<br/>
git tag '标签名' 'commitid'  为之前的项目创建标签<br/>
git tag -d '标签名' 删除标签<br/>
git push origin '标签名' 标签名推送到远程仓库<br/>
git branch '分支名' 创建分支<br/>
git branch  查看分支<br/>
git checkout '分支名' 切换分支<br/>
git branch -d '分支名' 删除分支（不能删除当前所在分支）<br/>
git push origin --delete '分支名' 删除远程分支
git checkout -b test 创建并切换分支<br/>
git branch -D '分支名' 强制删除分支<br/>
git merge '分支名' 合并分支（合并分支，需要切换到要合并分支上，例如dev分支合并到master分支,要切换到master分支，在执行此合并命令）
###### 合并冲突时：
* git merge --abort 保留当前分支的代码，忽略其他分支的代码。
* 手动解决冲突：
去掉前后及中间等号，保留想要的代码 => git status查看一下是不是同时修改了一个文件=> git add . => git commit => 进入可编辑界面 => i 进入可编辑状态输入解决状态的备注 => :wq 保存退出 => git commit 如果没有冲突后 => git commit -m '解决冲突后的代码' => git push origin master 推送到远程分支<br/>
