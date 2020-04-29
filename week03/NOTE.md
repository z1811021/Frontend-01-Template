## 创建对象

```
    const person = {
        name: 'Jorge',
        age: 25,
        job: 'Coder',
        sayName: function(){
            console.log(this.name);
        }
    }
    console.log(person)
```


## 对象属性默认特性

#### 四中数据属性特性

[[Configurable]]  // 能否delete 默认true

[[Enumerable]] // 能否 for in  返回属性  默认true

[[Writable]] // 能否修改值 默认true

[[Value]] // 默认Undiefined

修改的话Object.defineProperty()


```
    const obj ={}
    Object.defineProperty(obj, 'name', {
      writable: false,
      value: 'gongdaye'
    })
    console.log(obj);
    obj['name'] = 'gongerye'
    console.log(obj);
    
    //{name: "gongdaye"}
    //{name: "gongdaye"}
```

#### 四种访问器属性特性

[[Configurable]]  // 能否delete 默认true

[[Enumerable]] // 能否 for in  返回属性  默认true

[[Get]] // 读取调用 默认undefined

[[Set]] // 写入调用 默认undefined

访问器属性必须用Object.defineProperty()定义


```
    let person = {
        name: 'Jorge',
        _age: 25,
        job: 'Coder',
        sayName: function(){
            console.log(this.name);
        }
    }
    Object.defineProperty(person, "age", {
        get: function(){
            return this._age;
        },
        set: function(val){
            if(val > 24 ) {
                this._age = val;
            }
        }
    })
    person.age = 26;
    console.log(person)

// {name: "Jorge", _age: 26, job: "Coder", sayName: ƒ}
```


读取的话Object.getOwnPropertyDescriptor


```
    let person = {
        _age: 25,
        job: 'Coder',
        sayName: function(){
            console.log(this.name);
        }
    }
    Object.defineProperties(person, {
        age:{
        get: function(){
            return this._age;
        },
        set: function(val){
            if(val > 24 ) {
                this._age = val;
            }
        }
    },
    name: {
        value: 'Jorge'
    }
    })
    const getVal = Object.getOwnPropertyDescriptor(person ,'name')
    const getVal2 = Object.getOwnPropertyDescriptor(person ,'age')
    console.log(getVal);
    console.log(getVal2);
    
    // {value: "Jorge", writable: false, enumerable: false, configurable: false}
    //{get: ƒ, set: ƒ, enumerable: false, configurable: false}
```
## 创建对象模式

#### 工厂模式
用函数封装特定接口


```
function createPerson(name, age, job) {
            let o = new Object();
            o.name = name;
            o.age = age;
            o.job = job,
                o.sayName = function () {
                    console.log(this.name);
                }
            return o;
        }
        const person1 = createPerson('Jorge', 25, 'Corder')
        console.log(person1)
```

**优点： 解决了创建多个相似对象的问题**

**缺点： 无法知道一个对象的类型**

## 构造函数

```
 function CreatePerson(name, age, job) {
            this.name = name;
            this.age = age;
            this.job = job,
            this.sayName = function () {
                    console.log(this);
                }
        }
        const person1 = new CreatePerson('Jorge', 25, 'Corder')
        console.log(person1)
```

```
console.log(person1 instanceof CreatePerson)
// true
```
**优点：  可以通过instanceof判断特定类型**

**缺点：每个方法都要在每个实例创建一次，如果把函数转移到构造函数外的话就没有封装性**


## 原型模式

```
    function CreatePerson() {}
    CreatePerson.prototype.name = 'Jorge';
    CreatePerson.prototype.age = 25;
    CreatePerson.prototype.job = 'Corder';
    CreatePerson.prototype.sayName = function () {
        console.log(this);
    }
    const person1 = new CreatePerson()
    console.log(person1)
    console.log(CreatePerson.prototype.isPrototypeOf(person1)); // 判断是否指向原型对象  true
    console.log(Object.getPrototypeOf(person1) === CreatePerson.prototype) // 判断是否是这个对象的原型
    console.log(Object.getPrototypeOf(person1)) // 返回原型
    console.log(person1.hasOwnProperty('name')) //判断是否来自实例 false
```


![image.png](https://upload-images.jianshu.io/upload_images/11567598-d6d0052c64c3a7e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果重写原型对象将会切断现有原型和实例的关系

```
        function CreatePerson() {

        }
        var friend = new CreatePerson(); // 之后重写就会切断
        CreatePerson.prototype = {
            name: 'DDW',
            sayName: function(){
                this.name;
            }
        }

        friend.sayName() // error
```


**优点：可以让所有对象共享属性和方法**

**缺点： 只适合函数不适合包含引用类型值的属性 例入数组**


```
        function CreatePerson() {

        }

        CreatePerson.prototype = {
            constructor: CreatePerson,
            name: 'DDW',
            nameList: ['ddw', 'Gong Da Ye'],
            sayName: function(){
                this.name;
            }
        }
        var friend1 = new CreatePerson();
        var friend2 = new CreatePerson();
        friend1.nameList.push('Er Da Ye')
        console.log(friend1.nameList)
        console.log(friend2.nameList)
        
        // ["ddw", "Gong Da Ye", "Er Da Ye"]
        //["ddw", "Gong Da Ye", "Er Da Ye"]
```
## 构造函数和原型模式

构造函数定义实例属性,原型定义方法和共享属性

```
        function CreatePerson(name) {
            this.name = name
            this. nameList = ['ddw', 'Gong Da Ye']
        }

        CreatePerson.prototype = {
            constructor: CreatePerson,
            sayName: function(){
                console.log(this.name);
            }
        }
        var friend1 = new CreatePerson();
        var friend2 = new CreatePerson();
        friend1.nameList.push('Er Da Ye')
        console.log(friend1.nameList)
        console.log(friend2.nameList)
        console.log(friend1.sayName === friend2.sayName) 
        // ["ddw", "Gong Da Ye", "Er Da Ye"]
        // ["ddw", "Gong Da Ye"]
        // true
```
## 动态原型
将所有信息放在构造函数中，尽在某些情况下初始化原型

```
        function CreatePerson(name) {
            this.name = name
            this.nameList = ['ddw', 'Gong Da Ye']
            if (typeof this.sayName !== 'function') {
                CreatePerson.prototype.sayName = function () { // 不能用字面量重写因为如果在已经创建的实例的情况下重写会切断实例与原型的关系
                    console.log(this.name);
                }
            }
        }
        var friend1 = new CreatePerson('ddw');
        friend1.sayName()
        // ddw
```
# 继承
在ES5中继承是通过原型链来继承的。

我们都知道每个构造函数都有有一个原型对象，原型对象都包含一个指向构造函数的指针，而是列都包含一个指向原型对象的指针。

```
        function DaGe() {
            this.type = 'Da Ge'
            this.beat = ()=>{
                console.log('Da Ge Hao')
            }
        }
        DaGe.prototype.bart = function () {
            return this.type;
        }

        function ErGe() {
            this.type = 'Er Ge'
            
        }
        ErGe.prototype.bart2 = function () {
            return this.type;
        }

        ErGe.prototype = new DaGe();
       
        const instance = new ErGe();

        console.log(instance.bart()); // 继承prototype返回type因为ErGe里有type所以为Er Ge
        console.log(instance.beat()); // 继承prototype返回type因为ErGe里没有beat()所以为Da Ge Hao
        console.log(instance.bart2()); // 报错因为此时指向DaGe并没有指向ErGe所以bart2并没有
```

上面的代码看似没有问题其实还是有一个不容易发现的问题。

当我们来判断prototype对象的constructor属性时出现了问题。

```
//在const instance = new ErGe(); 后添加
console.log(ErGe.prototype.constructor === DaGe) // true 

//因为已经继承了所以constructor指向了DaGe但是是有问题的

// 明明instance是通过构造函数ErGe生成的
所以我们必须在每一次替换了prototype对象

//我们要重新指回原构造函数
ErGe.prototype.constructor  = ErGe; 
```
最终代码如下

```
 function DaGe() {
            this.type = 'Da Ge'
            this.beat = ()=>{
                console.log('Da Ge Hao')
            }
        }
        DaGe.prototype.bart = function () {
            return this.type;
        }

        function ErGe() {
            this.type = 'Er Ge'
            
        }
        ErGe.prototype.bart2 = function () {
            return this.type;
        }

        ErGe.prototype = new DaGe();
        ErGe.prototype.constructor  = ErGe; 
        const instance = new ErGe();
        console.log(ErGe.prototype.constructor === DaGe) // true
        console.log(instance.bart()); // 继承prototype返回type因为ErGe里有type所以为Er Ge
        console.log(instance.beat()); // 继承prototype返回type因为ErGe里没有beat()所以为Da Ge Hao
        console.log(instance.bart2()); // 报错因为此时指向DaGe并没有指向ErGe所以bart2并没有
```
