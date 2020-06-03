## 选择器

### 简单选择器
- .class
- #id
- tagname
- \*
- [attr=v]
- :
- ::
- :not

### 复合选择器
- <简单选择器><简单选择器><简单选择器>
- *和div必须写在最前面

### 复杂选择器
- <复合选择器>space<复合选择器>
- <复合选择器> > <复合选择器>
- <复合选择器> + <复合选择器>
- <复合选择器> || <复合选择器>
- <复合选择器> ~ <复合选择器>

### 选择器列表
- ,


## 选择器优先级

- inline最高
- #第二
- .第三
- 其他第四
- \* 和not不参与
- 选择器优先级跟顺序无关

```
div#a.b .c[x=x] // 0 3 1 1
#a:not(#b) // 0 2 0 0
*.a // 0 0 1 0
div.a // 0 0 1 1
```
## 伪类
### 链接/行为
- :any-link
- :link :visitied
- :hover
- :active
- :focus
- :target 
### 树结构
- :empty
- :nth-child()
- :nth-last-child()
- :first-child() :last-child() :only-child()
### 逻辑
- :not
- :where :has
## 伪元素
- :: before
- :: after
- :: first-letter
- :: first-line