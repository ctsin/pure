import { html, render } from "https://unpkg.com/lit-html?module";
import { MOCK } from "./MOCK.js";

const Z = () => {
  /**
   * 表单验证规则
   * @readonly
   * @enum {string}
   */
  const RULES = {
    REQUIRED: "required"
  };

  /**
   * 渲染 <label /> 视图
   * @access private
   */
  const label = (label, guid) => {
    return html`
      <label class="label" for=${guid}>${label}</label>
    `;
  };

  /**
   * 验证表单方法
   * @access private
   * @param {HTMLElement} target - 触发验证的表单控件
   * @param {string} rule - 用于验证表单的条件；
   * @param {string} [message] - 验证失败时的错误提示
   */
  const validate = (
    { parentElement: parent, value },
    rule,
    message = "靓仔，你这个不能空着啊！"
  ) => {
    switch (rule) {
      case RULES.REQUIRED:
        parent.dataset.invalid = value.trim() ? "" : message;
        break;

      default:
        throw new Error(`尚未定义 ${rule} 类型的校验规则！`);
    }
  };

  const select = ({ name, guid, tags }) => {
    const change = ({ target }) => {
      validate(target, RULES.REQUIRED, "不中啊！怎么说也得选一个 -_-!");
    };

    return html`
      <div class="field">
        ${name && label(name, guid)}

        <div class="control" data-invalid>
          <select @change=${change} class="select" name=${guid} id=${guid}>
            <option value="">请选择</option>
            ${tags.map(
              tag =>
                html`
                  <option value=${tag}>${tag}</option>
                `
            )}
          </select>
        </div>
      </div>
    `;
  };

  const input = ({ name, guid, suffix, type }) => {
    const blur = ({ target }) => {
      validate(target, RULES.REQUIRED);
    };

    return html`
      <div class="field">
        ${name && label(name, guid)}

        <div class="control" data-suffix=${suffix ? suffix : ""} data-invalid>
          <input
            @blur=${blur}
            class="input"
            id=${guid}
            name=${guid}
            type=${type.toLowerCase() === "input" ? "text" : type}
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
      <input id=${id} name=${id} type="checkbox" />

      ${name && label(name, id)}
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
    number,
    tel,
    checkbox,
    password
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
    <form class="form" id=${id} @submit=${submit}>
      ${data.map(input => inputs[input.type](input))}

      <button class="button" type="submit">提交</button>
    </form>
  `;
};

render(form(MOCK, { id: "signup" }), document.getElementById("root"));
