# 数据结构与算法 + 前端

## 理论
重点关注:数据结构与算法的特点,应用场景,js实现,时间与空间复杂度?
- 数据结构:计算机是存储组织数据.(想象于锅碗瓢盆)
- 算法就是一系列解决问题的方法.(想象于食谱)

### 数据结构与算法的关系
- 程序 = 数据结构 + 算法
- 数据结构为算法提供服务，算法围绕数据结构进行操作
### 数据结构

- 栈,队列,链表(想象于羊肉串)有序的数据结构
  - 栈:**后进先出**的数据结构(js中没有栈,但Array能实现栈的功能,入栈出栈)
    - 十进制转二进制(依次除以2,余数倒序输出 = 二进制)
    - 判断字符串括号是否有效(左括号入栈,右括号出栈,最后栈空为合法的)
    - 函数调用堆栈
  - 队列：**先进先出**的数据结构（js中没有栈,但Array能实现队列的功能）
    - js异步中任务队列
    - 计算最近请求次数
  - 链表:元素+指针(next)形成的有序数据结构(js中没有链表,但可以通过object模拟链表)
    - 原型链基于链表(沿着prototype指针)
    - 使用链表指针可获取json节点值
- 集合,字典(想象于一个碗里装满大米饭)
  - 集合:一种无序且唯一的数据结构(es6中有集合Set)
    - 最常用操作去重
    - 判断某个元素是否在集合中
    - 求交集
  - 字典:以键值对的形式存储(Map)
- 树,堆,图(它们都有连接关系)
  - 树:分层数据结构模型.(js没有树数据结构,可以使用array与object模拟)
    - js相关:DOM树,级联选择器,树形控件 
    - 常用操作:深度广度优先遍历/先中后遍历
      - 深度优先遍历:尽可能深的搜索树的分支,(可一颗树找到头,然后在找其他树)例如:看书:从头看到尾.标题=>章节=>小节=>章节=>小节
        - 访问根节点
        - 对根节点的children挨个进行深度优先遍历(递归)
      - 广度优先遍历:先访问根节点最近的节点.例如看书先看标题=>所有的章节=>所有的小节
        - 新建一个队列,根节点入队
        - 把队头出队,并访问
        - 把队头的children挨个入队
        - 重复第二,三步,直到队列为空
  - 二叉树: 每个节点最多只能有两个节点
    - 先序遍历(根左右):根节点=>左子树进行先序遍历(递归)=>右子树进行先序遍历(递归)
    - 中序遍历(左根右):左子树进行中序遍历(递归)=>根节点=>右子树进行中序遍历(递归)
    - 后序遍历(左右根):左子树进行后序遍历(递归)=>右子树进行后序遍历(递归)=>根节点
  - 图:图是网络结构的抽象模型,是一组由边连接的节点
    - 图可以表示任何二元关系,比如道路航班
    - js没有图,但可以通过array和object模拟出来
      - 邻接矩阵(交叉位置为1)
      - 邻接表
        - ```js
          {
            A:['B'],
            B:['C','D'],
            C:['E'],
            D:['A'],
            E:['D']
          }         
          ``` 
      - 链表
    - 常用操作:深度优先遍历和广度优先遍历
      - 深度优先遍历
        - 访问根节点
        - 对根节点的**没访问过的相邻节点**挨个进行深度遍历(没访问过是避免进入死循环)
      - 广度优先遍历
        - 新建一个队列,把根节点入队
        - 把队头出队并访问
        - 把队头的**没访问过的相邻节点**入队
        - 重复2,3步,直到队列为空
    - 堆
      - 堆是一种特殊的**完全二叉树**
      - 所有节点都大于等于最大堆
      - 所有节点都小于等于最小堆
        - js中通常使用数组表示堆(下标代表节点树的位置)
          - ```
              [1,3,6,5,9,8]
              [0,1,2,3,4,5]
            ``` 
          - 左侧子节点的位置是2*index+1
          - 右侧子节点的位置是2*index+2
          - 父节点位置是(index-1)/2
        - 堆能高效.快速的找出最大值与最小值(时间复杂度是O(1))
        - 找出第K个最大(小)元素
      - 插入方法
        - 将值插入对的底部,即数组的尾部
        - 然后上移:将这个值和它的父节点进行交换,直到父节点小于等于这个插入的值
        - 大小为k的堆中插入元素的时间复杂度O(logk)
      - 删除堆顶
        - 用数组尾部元素替换堆顶(直接删除会破坏堆结构)
        - 进行下移,将新堆顶和它的子节点进行交换,直到子节点大于等于这个新堆顶
        - 大小为k的堆中删除堆顶的时间复杂度O(logk)
      - 获取堆顶:返回数组的头部
      - 获取堆的大小:返回数组的长度

### 算法
- 链表:遍历链表.删除链表节点
- 树,图:深度与广度优先遍历
- 数组:冒泡/选择/插入/归并/快速排序,顺序/二分搜索
 
### 排序与搜索 
- 排序(js数组sort)
  - 冒泡排序:比较所有相邻元素,如果第一个比第二个大,就交换它们,执行n-1轮 
    - 时间复杂度O(n2)
    ```js
      Array.prototype.bubbleSort = function(){
        for(let i=0;i< this.length - 1;i+=1){
          for(let j=0;j<this.length -1 - i;j+=1){
            //减i是因为后面已经冒泡过了,对剩余区间进行冒泡排序,回想冒泡的动画
            if(this[j] >this.[j+1]){
              const temp = this[j];
              this[j] = this[j+1];
              this[j+1] = temp;
            }
          }
        }
      }
      const arr = [5,3,4,2,1];
      arr.bubbleSort();
    ``` 
  - 选择排序:找到最小值,选中放在第一位,找到第二小的放在第二位,执行n-1次
    - 时间复杂度O(n2)
    ```js
      Array.prototype.selectionSort = function(){
        for(let i=0;i<this.length;i+=1){
          let minIndex = i;
          for(let j= i;j < this.length;j+=1){
            if(this[j] < this[minIndex]){
              minIndex = j
            }
          }
          if(minIndex !== j){
            const temp = this[j];
            this[i] = this[minIndex];
            this[minIndex] = temp;
          }
        }
      }
      const arr = [5,3,4,2,1];
      arr.selectionSort();
    ```  
  - 插入排序(小型数组性能好):从第二个数开始往前比,比它大的就往后排,没有比他大就插入到后面,以此类推进行到最后一个数.
    - 时间复杂度O(n2)
    ```js
      Array.prototype.insertionSort = function(){
        for(let i =1;i<this.length;i+=1){
          const temp = this[i];
          let j = i;
          while(j>0){
            if(this[j-1] > temp){
              this[j] = this[j -1];
            }else{
              break
            }
            j -= 1
          }
          this[j] = temp
        }
      }+
    ``` 
  - 归并排序(火狐sort):递归分成一个个子数组,然后进行合并
    - 时间复杂度O(n*logN)
    ```js
      Array.prototype.mergeSort = function(){     
        const rec = (arr)=>{
          if(arr.length === 1)return arr;
          const mid = Math.floor(arr.length / 2);
          const left = arr.slice(0,mid)
          const right = arr.slice(mid,arr.length);
         const orderLeft  = rec(left);
         const orderRight = rec(right);
         const res = [];
         while(orderLeft.length || orderRight.length ){
           if(orderLeft.length && orderRight.length){
              res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() :orderRight.shift())
           }else if(orderLeft.length){
              res.push(orderLeft.shift())
           }else if(orderRight.length){
              res.push(orderRight.shift())
           }
         }
         return res;
        }
        const resarr = rec(this);
        reaarr.forEach((n,i)=>{
          this[i] = n
        })
      }
    ```
  - 快速排序:找一个基准,所有比基准放在前面,比基准大的放在后面,递归对基准前后子数组进行分区
  - 时间复杂度:递归的时间复杂度O(logN)+分区循环(O(n)) = O(n*logn)
  ```js
    const rec = (arr)=>{
      if(arr.length === 1){return arr}
      const left = [];
      const right = [];
      const mid = arr[0];
      for(let i = 1;i<arr.length;i+=1>){
        if(arr[i] < mid){
          left.push(arr[i])
        }else{
          right.push(arr[i])
        }
      }
      return [...rec(left),mid,...rec(right)]
    }
    const res = rec(this);
    res.forEach((n,i)=>{
      this[i] = n;
    })
  ``` 
- 搜索(js数组indexOf)
  - 顺序搜索:遍历数组,找到跟目标值相等的元素,返回目标,没找到返回-1
    - 时间复杂度O(n)
      ```js
        Array.prototype.sequentialSeach = function(){
          for(let i =0;i<this.length;i+=1){
            if(this[i] === item){
              return i;
            }
          }
          return -1;
        }
        const rse = [1,2,4,5,6].sequentialSeach(3)
      ``` 
  - 二分搜索:从数组中间元素开始,如果正好是目标值,则搜索结束,如果目标值大于或小于中间元素,则在那一半数组中在中间元素查找
    - 时间复杂度O(logn)
    ```js 
      //前提是有序数组
      Array.prototype.binarySearch = function (){
        let low = 0;
        let high = this.length -1;
        while(low <= high){
          const mid = Math.floor((low + high) / 2);
          const elment = this[mid];
          if(element < mid){
            low = mid + 1
          }else if(elment > mid){
            high = mid -1
          }else{
            return mid
          }
        }
        return -1
      }
    ```` 



### 算法设计思想
- 分而治之
  - 思想:把问题分成多个和原问题**相似的小问题**,递归解决小问题,再将结果合并以解决原来的问题
  - 应用场景:
    - 归并排序:
      - 分:把数组从中间一分为二
      - 解:递归把两个子数组进行递归排序
      - 合:合并有序子数组
    - 快速排序:
      - 分:选择基准把数组分成两个子数组
      - 解:递归的对两个子数组进行快速排序
      - 合:把两个子数组进行合并
    - 二分搜索
    - 翻转二叉树
    - 比较对称二叉树
- 动态规划
  - 思想:把问题分成**相互重叠的子问题**,通过定义子问题,反复执行,来解决原来的问题.
  - 应用场景:
    - 斐波那契数列
      - 定义子问题:F(n) = F(n-1) + F(n-2)
      - 反复执行:从2执行到n,执行上述公式 
- 贪心算法
  - 思路:期盼通过每个阶段的**局部最优**,从而达到全局的最优,但结果**并不一定最优** 
- 回溯算法
  - 思路:一种**渐进式**寻找并构建问题解决方式的策略
    - 会先从一个可能的动作开始解决问题,如果不行,就回溯并选择另一个动作,直到问题解决
    - 例如(要找一个地方,有很多岔路,走一条没找到,在回到岔路,找其他的路)
 - 应用场景
   - 全排列:所有的排列组合
     - 用递归模拟出所有情况
     - 遇到包含重复元素的情况,就要回溯
     - 收集所有到达递归终点的情况,并返回

 
## 刷题
- leetcode多刷一些，300道题以上
- 刷题顺序:按照类型刷题,相对集中训练
- 重点关注:通用套路,自己多总结一些通用套路,时间空间复杂度和优化
- 了解各个数据结构各个特点
- 用js实现，可以用另一种语言在刷一遍
- 一定要算出来时间复杂度

## 实战
- 前端与数据结构/算法的结合点
  - 数据结构：所有数据结构都很重要，和前端最相关的链表和树
  - 算法：链表/树/图的遍历，数组的排序与搜索
  - 设计思想：分而治之与动态规划笔记重要
- 在工作中与数据结构/算法打交道(阅读源码react,lodash,v8引擎源码) 