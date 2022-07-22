## TypeScript
TypeScript是JavaScript超集,不仅包含了es5标准,也包含了es6/7/8未来的标准  
最大特点:强烈的类型定义  
注意:TypeScript不能直接在js环境中运行

#### Typing 强类型
- 规范我们代码
- 代码编译阶段就能及时发现错误
- 在原生js的基础上加了一层类型定义

### TypeScript类型
1. string:字符串
2. number:整数/浮点数/正负数
3. boolean:真假
4. array:数组:可以定义任何类型
   ```ts
   let list1:number[] = [1,2,3,4];
   let list2:Array<number> = [1,2,3,4];//泛型
   let list3 = [1,2,3,4];

   let list4 = [1,'str'];
   let list5:any[] = [1,'str',true]
   ```
5. tupple(tiu破):元组 固定长度固定类型的数组
   ```ts
   let person1:[number,string] = [1,"dayuan"];
   //注意:声明元组的时候一定要指定类型
   //有个坑:元组使用push会突破元组的界限
   //在编译和编辑的时候都不会报错,例如person1.push(3)
   ```
6. union(优你特N):联合类型
   ```ts
   let union: string | number ;
   let union2: number | string | boolean | string[];
   let union3: 1 | 2 | 3 ;//确定值的联合

   ```
7. Literal:预定义/字面量类型
   ```ts
   let literal : 1 | "2" | true | [1,2,3,4];//联合类型与字面量类型
   let resultType : "as-number" | "as-string"
   ```
8. enum:枚举类型
   ```ts
      enum Color{
         red = 1,
         green = 3,
         blue = 'blue'
      }
      enum.blue => 'blue'
      enum[1] => red
      //元组转es5
      (function (Color) {
         Color[Color["red"] = 1] = "red";
         Color[Color["green"] = 3] = "green";
         Color["blue"] = "blue";
      })(Color || (Color = {}));
   ```

9.  any:任何类型(当你不确定会是什么类型,或懒得定义复杂结构的时候使用)
    ```ts
    let notSure: any = 4;
    let list: any[] = [1,true,"free"]
    ```
10. unknow:未知类型
   ```ts
   let randomValue:unknow = 666;
   ```
11. void:表示没有任何类型.(当一个函数没有返回值的时候,就是void类型)
    ```ts
    let unusable: void = undefined;
    //声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
    ```
12. undefined:变量只声明没有赋值;null为空(任何类型的子类型)
13. never:永远不存在的值(一个函数永远执行不完)
   ```ts
      // 返回never的函数必须存在无法达到的终点
      function error(message: string): never {
         throw new Error(message);
      }

      // 推断的返回值类型为never
      function fail() {
         return error("Something failed");
      }

      // 返回never的函数必须存在无法达到的终点
      function infiniteLoop(): never {
         while (true) {
         }
      }
   ```
14. Nullable:可空类型
15. object:除了基本类型,其他都是object
16. Type Assertions(类型断言):通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
   ```ts
   //类型断言有两种形式。 其一是“尖括号”语法：
   let someValue: any = "this is a string";
   let strLength: number = (<string>someValue).length;
   //另一个为as语法：
   let someValue: any = "this is a string";
   let strLength: number = (someValue as string).length;
   ```

### Interface接口


### 高级技巧

#### keyof与in

##### keyof: 取interface的键后保存为联合类型
``` ts
interface userInfo {
  name: string
  age: number
}
type keyofValue = keyof userInfo
// keyofValue = "name" | "age"
```
举个例子
``` ts
function getValue(o:object, key: string){
  return o[key]
}
const obj1 = { name: '张三', age: 18 }
const values = getValue(obj1, 'name')
```
这样写丧失了ts的优势：
1. 无法确定返回值类型
2. 无法对key进行约束
  
```
function getValue<T extends Object,K extends keyof T>(o: T,key: K): T[K] {
  return o[key]
}
const obj1 = { name: '张三'， age: 18}
const values = getValue(obj1, 'name')
// 如果第二个参数不是obj1中的参数就会报错
```
##### in: 用于取联合类型的值，主要用于数组和对象的构建
<font Color=red>切记不要用于interface, 否则会报错</font>

``` ts
type name = 'firstname' | 'lastname'
type TName = {
  [key in name]: string
}
// TName = { firstname: string, lastname: string }
```

##### 练习：如何实现内置方法 Pick ？
``` ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
type TodoPreview = MyPick<Todo, 'title' | 'completed'>
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```
答案如下：
``` ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
```