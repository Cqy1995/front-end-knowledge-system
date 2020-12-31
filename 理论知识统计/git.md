
## git 基本操作

#### 文件名（泛指文件路径+文件名）例如'/home/index.html'

#### commit 指 git log 时 commit 后的 id,取前七位即可

#### 标签名即为名称例如'v1.0

#### 分支名也为名称除了 master 以外

git status 查看当前状态  
git fetch/git pull 拉取代码  
git add . 所有代码添加到暂存区  
git commit -m '信息' 暂存区提交  
git push origin master 提交到远程  
git rm '文件名' 删除  
git mv '文件名' 重命名/移动文件  
git log --pretty=oneline '文件名' 查看文件前后变化（用得到的 id，git show 得到的 id ，也能看见具体的变化）  
git log --oneline 查看简写的提交记录  
git log --oneline --graph 查看版本路线  
git log -p '文件名' 具体修改的内容  
git diff 查看文件不同（针对改动少）  
git checkout -- '文件名' 当前文件还原到上一次提交的状态（已追踪时无效，在暂存区属于已追踪）  
git reset HEAD '文件名' 撤销文件的追踪  
git reset --hard HEAD^ 回到上一版本（两个^^就是回退到前两个版本）  
git reset --hard 'commitid' 回到指定版本  
git checkout 'commitid' -- '文件名' 将指定文件回退到指定版本  
git tag '标签名' 创建标签  
git tag 查看标签  
git tag '标签名' 'commitid' 为之前的项目创建标签  
git tag -d '标签名' 删除标签  
git push origin '标签名' 标签名推送到远程仓库  
git branch '分支名' 创建分支  
git branch 查看分支  
git checkout '分支名' 切换分支  
git branch -d '分支名' 删除分支（不能删除当前所在分支）  
git push origin --delete '分支名' 删除远程分支  
git checkout -b test 创建并切换分支  
git branch -D '分支名' 强制删除分支  
git merge '分支名' 合并分支（合并分支，需要切换到要合并分支上，例如 dev 分支合并到 master 分支,要切换到 master 分支，在执行此合并命令）

###### 合并冲突时：

- git merge --abort 保留当前分支的代码，忽略其他分支的代码。
- 手动解决冲突：  
  去掉前后及中间等号，保留想要的代码 => git status 查看一下是不是同时修改了一个文件=> git add . => git commit => 进入可编辑界面 => i 进入可编辑状态输入解决状态的备注 => :wq 保存退出 => git commit 如果没有冲突后 => git commit -m '解决冲突后的代码' => git push origin master 推送到远程分支
- git merge --abort 保留当前分支的代码，忽略其他分支的代码。
- git merge --abort 保留当前分支的代码，忽略其他分支的代码。

