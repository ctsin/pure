# 环境

项目使用了 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)，作为服务器环境。其实，页面不依赖任何预编译工具，直接使用浏览器打开 `index.html` 也可以如预期工作。

# 建议的扩展

使用 VS Code 打开项目，会提示安装项目推荐的应用。这些应用在 `.vscode/extensions.json`.

介绍一个模板字符串的技巧。

使用 `/*html*/` 标识模板字符串，将调用 `es6-string-html` 扩展高亮代码。但它不能自动格式化代码。

所以，当写了很多模板字符串的时候，可以临时解除 `html` 的注释，这将调用 `lit-html` 插件格式化。

```javascript
return /*html*/ `
  <div class="field">
    ${(first || last) && label(`${first} ${last}`, guid)}
    <div class="control" data-suffix="必要">
      <input class="input" id="${guid}" name="${guid}" type="password" />
    </div>
  </div>
`;
```
