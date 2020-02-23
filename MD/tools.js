
// 对象的深度拷贝
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";

    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {

            // 判断是不是引用类型
            if (origin[key] !== null && typeof(origin[key]) == 'object') {
                // 判断是数组还是对象
                if (toStr.call(origin[key]) == arrStr) {
                    target[key] = [];
                } else {
                    target[key] = {};
                }
                // 递归，循环判断引用类型里的值类型
                deepClone(origin[key], target[key]);
            } else {
                // 递归出口，原始值类型拷贝
                target[key] = origin[key];
            }

        }
    }
}



// 数组去重（原型链上编程）
Array.prototype.unique = function () {
    var temp = {};
    var arr = [];
    for (var i = 0; i<this.length; i ++) {        
        if (temp[this[i]] === undefined) {
            temp[this[i]] = 'abc';
            arr.push(this[i]);
        }
    }
    return arr;
}

//字符串去重（依赖于数组去重）（原型链上编程）
String.prototype.unique = function () {
    var arr = this.split("");
    return arr.unique().join("");
}


// arr.sort(sortBy); 规定排序顺序
var sortByAscend = function (a, b) {
    // 升序排序
    return a - b;
}
var sortByDescend = function (a, b) {
    // 降序排序
    return b - a;
}




// 数据类型判断
function type(target) {

    if (target === null) {
        return 'null';
    }

    if (typeof(target) == 'object') {
        return Object.prototype.toString.call(target);
    } else {
        return typeof(target);
    }

}


// 对象继承（圣杯模式）
var inherit = (function() {
    var Fn = function () {}
    // 形成闭包后，Fn就可以看作是一个私有变量。
    return function (Target, Origin) {
        Fn.prototype = Origin.prototype;
        Target.prototype = new Fn();
        Target.prototype.constructor = Target;
	// 定义Target真正的父级
        Target.prototype.uber = Origin.prototype;
    }
}());


        // 封装ajax方法
        function ajax(options) {
            let xhr = new XMLHttpRequest();
            let sendData = "";

            // 对传递的data对象处理成字符串的形式
            for (const key in options.data) {
                sendData = sendData + key + "=" +options.data[key] + "&";
            } 
            sendData = sendData.substring(0, sendData.length-1);        

            // 如果是GET提交
            if (options.type.toLowerCase()  == "get") {
                options.url = options.url + "?" + sendData;
                console.log(options.url)
                sendData = null;
            }

            xhr.open(options.type, options.url);

            // 如果是POST提交，设置一个请求头
            if (options.type.toLowerCase() == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            }

            // 设置一个提交前的调用的函数，可用于发送前对数据校验
            if (options.beforeSend) {
                let flag = options.beforeSend();
                if (!flag) { 
                    return;
                }
            }

            xhr.send(sendData);

            xhr.onreadystatechange = function () {
                if (xhr.readyState==4 && xhr.status==200) {
                    // 如果请求成功了
                    // 拿到响应的数据
                    let resData = xhr.responseText;

                    // 逻辑判断，并执行回调函数处理响应数据
                    options.success && options.success(resData);
                } else {
                    // 如果请求失败了
                    options.error && options.error();
                }
            }

            // 设置一个请求发送完成后调用对函数
            options.complete && options.complete();

        }
       