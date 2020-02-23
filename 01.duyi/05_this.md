### `call`和`apply`

> 作用：改变`this`指向  
> 区别：传参不同
+ `call`需要把实参按照实参的个数传进去
+ `apply`需要传一个数组`arguments`
```js
    fn(); ==> fn.call();
    call(obj, argument1, argument2, argument3);
    apply(obj, arguments);
    // arguments = [ arguments[0], arguments[1], arguments[2] ];
```
```js
    function Person(name) {
        this.name = name;
    }

    var person = new Person('libai');

    var obj = {}

    Person.call(obj, 'dufu');  // 把Person里的this指向改变为obj
    console.log(obj);  // {name : "dufu"}
```
```js
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;        
    }

    function Student(name, age, gender, tel, grade) {
        Person.call(this, name, age, gender);
        // 把Person里的this指向改变为Student里的this
        // this.name = name;
        // this.age = age;
        // this.gender = gender;
        this.tel = tel;
        this.grade = grade;
    }
```

### `this` 指向

1. 函数预编译过程：this ==> window
```js
    function test() {
        var a = 123;
        function b() {}
    }
    
    AO = {
        arguments : [],
        this : window,
        a : undefined,
        b : function () {}
    }
    test();

    AO = {
        arguments : [],
        this : Object.create(test.prototype),
        a : undefined,
        b : function () {}
    }
    new test();
```
2. 全局作用域里：this ==> window
3. obj.fn();对象里的方法：this ==> obj

```js
    var name = '222';
    var a = {
        name : '111';
        say : function () {
            console.log(this.name);
        }
    }
    var fn = a.say;
    fn();  // 222
    a.say();  // 111

    var b = {
        name : '333';
        say : function (fn) {  // fn传的只是引用（地址）
            fn();  // 这里没人调用，走预编译过程
        }
    }
    b.say(a.say);  // 222
    b.say = a.say;
    b.say();  // 333
```

__箭头函数的`this`绑定的是上一层作用域__