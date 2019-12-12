# 建议的扩展

使用 VS Code 打开项目，会提示安装项目推荐的应用。这些扩展罗列在 `.vscode/extensions.json`.

# Todos

- [ ] 丰富、完善验证规则和机制，支持同一表单元素的多规则验证；
- [ ] 支持异步验证，如用户名是否被占用；
- [ ] 支持表单元素的关联显示和校验。

# Reminded

If the GitHub Pages url is `USERNAME.github.io`, config Parcel as following:
```sh
parcel build index.html
```

Else
```sh
parcel build index.html --public--url /YOUR_REPO_NAME
```
