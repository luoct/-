### DOM
> Document Object Model （文档对象模型）
> 文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。


### 查看元素节点

+ `getElementsBy...`  
    查找的元素是实时的，会随界面的节点变化而改变
+ `querySelector`
    查找的元素不是实时的，节点集合不会随界面变化而改变



### DOM结构树
```js
       |-- Document -- HTMLDocument        |-- HTMLHeadElement
       |                                   |-- HTMLBodyElement
       |-- CharacterData -- Text/Comment   |-- HTMLTitleElement
Node --|                                   |-- HTMLDivElement
       |-- Element -- HTMLElement ---------|-- HTMLTableElement
       |                                   |-- HTMLInputElement
       |-- Attr                            |-- ...etc.


    // document的继承关系
    document.__proto__  ===  HTMLDocument.prototype
    HTMLDocument.prototype = {
        __proto__ : Document.prototype
    }

    document --> HTMLDocment.prototype --> Document.prototype bn

```


### 封装遍历节点的方法（解决兼容性问题）

1. 遍历元素节点树
    ```js
    ```

2. 封装函数，返回元素e的第n层祖先元素节点
    ```js
        function retParent(elem, n) {
            while(elem && n) {
                elem = elem.parentElement;
                n --;
            }
            return elem;
        }
    ```

3. 封装函数，返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点；n为负，返回前面的；n为0，返回自己。
    ```js
        function retSibling(elem, n) {
            while(elem && n) {
                if (n > 0) {
                    if (elem.nextElementSibling) {
                        elem = elem.nextElementSibling;
                    } else {
                        for (elem = elem.nextSibling; elem && elem.nodeType != 1; elem.nextSibling) ;
                    }
                    n --;
                } else {
                    if (elem.previousElementSibling) {
                        elem = elem.previousElementSibling;
                    } else {
                        for (elem = elem.previousSibling; elem && elem.nodeType != 1; elem.previousSibling) ;
                    }
                    n ++;
                }
            }
        }
    ```

4. 封装myChildren功能，解决以前部分浏览器的兼容性问题
    ```js
        Element.prototype.myChildren = function () {
            var child = this.childNodes;
            var len = child.length;
            var arr = [];
            for(var i = 0; i < len; i++) {
                if(child[i].nodeType == 1) {
                    arr.push(child[i]);
                }
            }
            return arr;
        }
    ```

5. 封装hasChildren方法（不可使用children属性）
    ```js
        Element.prototype.myChildren = function () {
            var child = this.childNodes;
            var len = child.length;
            var arr = [];
            for(var i = 0; i < len; i++) {
                if(child[i].nodeType == 1) {
                    return true;
                }
            }
            return false;
        }
    ```



### 封装几个常用的方法
```js
    // 获取屏幕滚动条位置
    function getScrollOffset() {
        if (window.pageXOffset) {
            return {
                x : window.pageXOffset,
                y : window.pageYOffset
            }
        } else {
            return {  // 兼容IE8及IE8以下的浏览器
                x : document.body.scrollLeft + document.documentElement.scrollLeft,
                y : document.body.scrollTop + document.documentElement.scrollTop
            }
        }
    }

    // 获取页面尺寸大小
    function getViewportOffset() {
        if (window.innerWidth) {
            return {
                w : window.innerWidth,
                h : window.innerHeight
            }
        } else {
            if (document.compatMode === 'BackCompat') {
                return {
                    w : document.body.clientWidth,
                    h : document.body.clientHeight
                }
            } else {
                return {
                    w : document.documentElement.clientWidth,
                    h : document.documentElement.clientHeight
                }
            }
        }
    }

    // 获取页面元素的当前样式
    function getStyle(elem, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null)[prop];
        } else {
            return elem.currentStyle[prop];
        }
    }
```