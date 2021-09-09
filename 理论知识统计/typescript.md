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
