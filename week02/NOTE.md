### JS基于形式语言（乔姆斯基谱系）
[link](https://en.wikipedia.org/wiki/Chomsky_hierarchy)
- 0型 无限制文法
- 1型 上下文相关
- 2型 上下文无关文法 （js %99 无关）
- 3型 正则文法

### 产生式(BNF)
[link](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)
> John Backus, a programming language designer at IBM, proposed a metalanguage of "metalinguistic formulas"[5][6][7] to describe the syntax of the new programming language IAL, known today as ALGOL 58 (1959). His notation was first used in the ALGOL 60 report.

> BNF is a notation for Chomsky's context-free grammars. Apparently, Backus was familiar with Chomsky's work.[8]

> As proposed by Backus, the formula defined "classes" whose names are enclosed in angle brackets. For example, <ab>. Each of these names denotes a class of basic symbols.[5]


```
<> 表示语法结构可以被expand
| or
```
我们先来看例子
如何定义一个十进制数字 <nat> 910

```
<digit> -> 0|1|2|3|4|5|6|7|8|9          定义一个digit
<nat> -> <digit> | <digit><nat>

```

首先nat可以为digit组合

```
<nat> => <digit><nat>
      => 9<nat>
      => 9<digit><nat>
      => 91<nat>
      =>91<digit>
      =>910
```

如果0在开头我们就会遇到问题
因为012不行
接下来我们开始改造<nat>

```

<nat> -> <digit> | <nonzero><digits>
<digits> -> <digit> | <digit><digits>
<digit> -> 0 | <nonzero>         定义一个digit
<nonzero> -> 1|2|3|4|5|6|7|8|9
```
这样我们就不会在开头遇到0了

### 图灵完备性

[link](https://en.wikipedia.org/wiki/Turing_completeness)
>  a universal Turing machine can, in principle, perform any calculation that any other programmable computer can

### 类型系统
JS 7个类型

JS属于弱类型

String+Number 会被转换为String

### 命令式编程

```
Atom

Expression

Statement

Structure

Program
```


```
let a // atom
let a = 1 // Expression
while(true){
    let a = 1
} // statement

class Ddw{
      constructor(x, y){
        this.x = x;
        this.y = y;
      }
      bart(){
        console.log(this.x+this.y)
      }
    }
    let gongxi = new Ddw(2,3)
    gongxi.bart() // Structure

// Module Program 

```
### Unicode
[link](https://home.unicode.org/)

[所有的unicode](https://www.unicode.org/charts/)
> Unicode（中文：万国码、国际码、统一码、单一码）是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。

> 'Unicode' is intended to suggest a unique, unified, universal encoding"

### ASCII
[link](https://en.wikipedia.org/wiki/ASCII)

> The American Standard Code for Information Interchange (ASCII) was developed under the auspices of a committee of the American Standards Association (ASA), called the X3 committee, by its X3.2 (later X3L2) subcommittee, and later by that subcommittee's X3.2.4 working group (now INCITS). The ASA became the United States of America Standards Institute (USASI)[2]:211 and ultimately the American National Standards Institute (ANSI).
