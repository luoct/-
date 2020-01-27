# 01_CSS

### CSS选择器优先级
!important > 行间样式 > id > class/属性选择器 > 标签选择器 > 通配符

css权重：
|  选择器         | 权重     |
|  ----          | ----     |
| !important     | infinity |
| 行间样式        | 1000     |
| id              | 100     |
| class/属性/伪类  | 10      |
| 标签/伪元素      | 1       |
| 通配符           | 0       |

+ 进制是256

---



### css选择器的解析顺序

浏览器css匹配核心算法的规则是以 right-to-left 方式匹配节点的。  
这样做是为了使规则能够快、准、狠地与render树上的节点匹配，通俗地将就是 就近原则。

如果从左向右需要遍历所有的分支直到最后的叶子节点，如果发现不符合规则则会返回上一级节点。会有很多失败查找  
而从右向左，只要发现最右边选择器不匹配，就可以直接舍弃了，避免了许多无效匹配。

![在这里插入图片描述]()



---
### 提升css选择器性能

理解了CSS选择器从右到左匹配的机制后，明白只要当前选择器的左边还有其他选择器，样式系统就会继续向左移动，直到找到和规则匹配的选择器，或者因为不匹配而退出。我们把最右边选择器称之为关键选择器。

1. 避免使用通用选择器
```css
    /* Not recommended */
    .class * { ... }
```

2. 避免使用tag限制class
```css
    /* Not recommended */
    div.class { ... }
```

3. 避免使用tag和class限制id
```css
    /* Not recommended */
    div#id { ... }
```

4. 避免使用多层标签选择器。用class代替，减少css查找
```css
    /* Not recommended */
    div ul li a { ... }
```

5. 避免使用子选择器

```css
    /* Recommended */
    .list .item { ... }
    /* Much to recommended */
    .list-item { ... }
```
6. 使用继承(#)  


---
### BFC ( block format context 块级格式化上下文)  
它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。  

触发一个盒子的BFC
```
    position: absolute;
    display: inline-block;
    float: left/right;
    overflow: hidden;
```




---
### margin塌陷和margin合并
```html
    <style>
        .wrapper {
            width: 100px;
            height: 100px;
            background: red;
            margin-left: 100px;
            margin-top: 100px;
        }
        .content {
            width: 100px;
            height: 100px;
            background: black;
            margin-left: 50px;  /* 正常效果 */
            margin-top: 50px;  /* 无效 */
            /* margin-top: 150px;  当值大于父级margin-top当值时，带动父级一起生效 */
        }
    </style>
    
    <div class="wrapper">
        <div class="content"></div>
    </div>
```

__这就是margin塌陷：锤子方向的margin取父子的最大值。__  

解决方法：
1. 给父级一个border-top，不推荐使用。
2. 让该元素变成BFC元素

---

```html
    <style>
        .box1 {
            width: 100px;
            height: 100px;
            background: red;
            margin-bottom: 100px;
        }
        .box2 {
            width: 100px;
            height: 100px;
            background: red;
            margin-top: 100px;
        }
    </style>

    <div class="box1"></div>
    <div class="box2"></div>
```
实际效果：两个box间垂直方向间隔不是200px，而是100px。  

__这就是margin合并：兄弟结构垂直方向的margin是合并计算的__   
可通过BFC解决：把两个兄弟结构或者其中一个放在一个BFC的父级中。  
注意：实际开发中不能随意再加结构，所以在开发中一般不解决该问题，只设置一个元素的margin值。


---
### 浮动 float：left/right;  
浮动元素会产生浮动流，块级元素看不到它们，  
产生了BFC的元素和文本类属性的元素（inline-）以及文本都能看到浮动元素。  

清除浮动：
1. 在父级元素的逻辑最后清除浮动。（只用块级元素才能使用clear）
    ```html
        <style>
            .wrapper::before {
                content: "";
                display: block;  /* 只有块级元素才能使用clear */
                clear: both;
            }
            .wrapper {
                border: 1px solid black;
            }
            .content {
                float: left;
                width: 100px;
                height: 100px;
                background: red;
            }
        </style>


        <div class="wrapper">
            <div class="content"></div>
            <div class="content"></div>
            <div class="content"></div>
        </div>
    ```
2. 使父级变成BFC元素或display: inline-block;  
( 扩展：position: absolute; 和float: left; css时执行内部把元素转换为inline-block; )


---
### 定位 position
1. position: absolute;  
脱离原来的位置进行定位，最近的有有定位的父级进行定位，如果没有，则相对于文档进行定位
2. position: relative;  
保留原来的位置进行定位，相对自己原来的位置进行定位



