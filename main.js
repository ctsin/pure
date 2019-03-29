import { html, render } from "https://unpkg.com/lit-html?module";
import { MOCK } from "./MOCK.js";

const Z = () => {
  /**
   * 渲染 <label /> 视图
   * @access private
   */
  const label = (label, guid) => {
    return html`
      <label class="label" for="${guid}">${label}</label>
    `;
  };

  /**
   * 验证表单方法
   * @access private
   * @param {HTMLElement} target - 触发验证的表单控件
   * @param {boolean} condition - true: 表单验证通过；false: 表单验证失败；
   * @param {string} message - 验证失败时的错误提示
   */
  const validate = (
    target,
    condition,
    message = "靓仔，你这个不能空着啊！"
  ) => {
    const parent = target.parentNode;

    if (condition) {
      parent.classList.remove("invalid");
      parent.dataset.invalid = "";
    } else {
      parent.classList.add("invalid");
      parent.dataset.invalid = message;
    }
  };

  const select = ({ name, guid, tags }) => {
    const change = ({ target }) => {
      validate(target, target.value.trim(), "不中啊！怎么说也得选一个 -_-!");
    };

    return html`
      <div class="field">
        ${name && label(name, guid)}

        <div class="control">
          <select @change=${change} class="select" name="${guid}" id="${guid}">
            <option value="">请选择</option>
            ${tags.map(
              tag => html`
                <option value="${tag}">${tag}</option>
              `
            )}
          </select>
        </div>
      </div>
    `;
  };

  const input = ({ name, guid, type }) => {
    const blur = ({ target }) => {
      validate(target, target.value.trim());
    };

    return html`
      <div class="field">
        ${name && label(name, guid)}

        <div class="control">
          <input
            @blur=${blur}
            class="input"
            id="${guid}"
            name="${guid}"
            type="${type.toLowerCase() === "input" ? "text" : type}"
          />
        </div>
      </div>
    `;
  };

  const password = data => input(data);

  const number = data => input(data);

  const tel = data => input(data);

  const checkbox = ({ friends }) => {
    const units = ({ id, name }) => html`
      <input id="${id}" name="${id}" type="checkbox" />

      ${name && label(`${name}`, id)}
    `;

    return html`
      <div class="field">
        ${Array.isArray(friends)
          ? friends.map(friend => {
              return html`
                <div class="col-${friends.length}">${units(friend)}</div>
              `;
            })
          : units(friends)}
      </div>
    `;
  };

  return {
    select,
    input,
    password,
    number,
    tel,
    checkbox
  };
};

const form = (data, { id, onSubmit = formData => console.log(formData) }) => {
  const inputs = Z();

  const submit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    onSubmit(formData);
  };

  return html`
    <form class="form" id="${id}" @submit=${submit}>
      ${data.map(input => {
        return inputs[input.type](input);
      })}

      <button class="button" type="submit">提交</button>
    </form>
  `;
};

render(form(MOCK, { id: "signup" }), document.getElementById("root"));
