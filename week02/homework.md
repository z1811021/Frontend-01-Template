- 写一个正则表达式 匹配所有 Number 直接量

```
/^(((0)|([1-9]\d*))?.?(\d*)((e|E)?(\+|\-)?(\d*))?)|((0|1)+)|([0-7])|(0(x|X)((\d)|([a-f])|([A-F]))+)$/
```

- 写一个 UTF-8 Encoding 的函数

```
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const returnArr = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            returnArr.push(hexVal);
            i += 2;
        } else returnArr.push(c.charCodeAt(0));
    }
    return returnArr;
}
```

- 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号