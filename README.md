# 环境

项目使用了 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)，作为服务器环境。其实，页面不依赖任何预编译工具，直接使用浏览器打开 `index.html` 也可以如预期工作。

# 建议的扩展

使用 VS Code 打开项目，会提示安装项目推荐的应用。这些扩展罗列在 `.vscode/extensions.json`.

# Todos

- [ ] 丰富、完善验证规则和机制，支持同一表单元素的多规则验证；
- [ ] 支持异步验证，如用户名是否被占用；
- [ ] 支持表单元素的关联显示和校验。

```typescript
import { html, render } from "https://unpkg.com/lit-html?module";

// 还是没有验证如果在子元素内调用 render, 还是所有子元素改变统一调用 app 跟元素的唯一 render. 例如 show 一个元素
// 亦或全局管理一个 state, 所有子元素更新这个 state
const header = ({ data = Math.random(), root }) => {
  const click = () => {
    render(template(data + 1), root);
  };

  const template = data => html`
    <h1 id="h1" @click=${click}>
      ${data}
    </h1>
  `;

  render(template(data), root);
};

header({ root: document.getElementById("root") });

```
