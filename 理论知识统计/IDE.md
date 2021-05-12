### mac 安装nvm
起初安装nvm失败，百度一下基本都是网络不好等原因，其实有一个很大的原因是因为，电脑里面node没有删除。
#### 卸载node
依次输入下面命令卸载
```
$ sudo npm uninstall npm -g
$ sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
$ sudo rm -rf /usr/local/include/node /Users/$USER/.npm
$ sudo rm /usr/local/bin/node

```
#### 安装nvm
```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ nvm -version
```

#### nvm常见命令
```
nvm --help                          显示所有信息
nvm --version                       显示当前安装的nvm版本
nvm install [-s] <version>          安装指定的版本，如果不存在.nvmrc,就从指定的资源下载安装
nvm install [-s] <version>  -latest-npm 安装指定的版本，平且下载最新的npm
nvm uninstall <version>             卸载指定的版本
nvm use [--silent] <version>        使用已经安装的版本  切换版本
nvm current                         查看当前使用的node版本
nvm ls                              查看已经安装的版本
nvm ls  <version>                   查看指定版本
nvm ls-remote                       显示远程所有可以安装的nodejs版本
nvm ls-remote --lts                 查看长期支持的版本
nvm install-latest-npm              安装罪行的npm
nvm reinstall-packages <version>    重新安装指定的版本
nvm cache dir                       显示nvm的cache
nvm cache clear                     清空nvm的cache
```
#### 使用范例
```
// 1. 安装 14.16.1 版本
$ nvm install 14.16.1
 
// 2. 查看版本
$ nvm ls
 
// 3. 切换版本
$ nvm use v14.16.1
```
### vscode 
安装某开发环境，如vue，可以使用插件中搜索vue extension pack，如node，node extension pack。就能安装所有的环境了。

### 真机调试
- Chrome+Android/Safari+ios（原始）
    - Chrome+Android
        1. 在地址栏中输入：chrome://inspect/#device
        2. 安卓手机设置：进入开发者模式，打开开发者选项，打开保持唤醒与usb调试
        3. 使用同一个网络，手机访问，
        4. 在电脑中，点击inspect，注意打不开，查看手机和电脑chrome版本号，开起谷歌虚拟专有网络
    - Safari+ios
        1. 电脑的Safari的偏好设置中高级，把在菜单栏中显示开发勾选上
        2. 手机的设置中找到Safari，在高级中把web检查器打开
        3. 根据ifconfig查询到en0:192开头的ip，两端根据ip访问，
        4. 电脑的开发选项中，会找到自己的手机，点选后就会出现真机调试的窗口。

- Fiddler/Charles（劫持类型工具，劫持数据请求，前面是window后面是mac）
- Weinre,Spy-Debugger,vConsole（npm包，安装到项目，启动代理，手机上设置ip端口号，通过局域网访问服务，达到数据劫持和调试作用）

