import { html, render, TemplateResult } from "lit-html";
import { MOCK } from "./MOCK";

// 支持的验证选项
enum RULES {
  必选
}

// 表单验证方法接口
interface Validate {
  (
    target: HTMLInputElement | HTMLSelectElement,
    rule: RULES,
    message?: string
  ): void;
}

// <label /> 视图渲染方法接口
interface Label {
  (label: string, guid: string): TemplateResult;
}

type ZComponents = (data: any) => TemplateResult;
type ZFactory = Record<
  "select" | "input" | "password" | "number" | "tel" | "checkbox",
  ZComponents
>;

const label: Label = (label, guid) => {
  return html`
    <label class="label" for=${guid}>${label}</label>
  `;
};

const validate: Validate = (
  { parentElement: parent, value },
  rule,
  message = "靓仔，你这个不能空着啊！"
) => {
  switch (rule) {
    case RULES.必选:
      parent.dataset.invalid = value.trim() ? "" : message;
      break;

    default:
      throw new Error(`尚未定义 ${rule} 类型的校验规则！`);
  }
};

const select = ({ name, guid, tags }) => {
  const change = ({ target }) => {
    validate(target, RULES.必选, "不中啊！怎么说也得选一个 -_-!");
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

const inputConstructor: ZComponents = ({ name, guid, suffix, type }) => {
  const blur = ({ target }) => {
    validate(target, RULES.必选);
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

const input = data => inputConstructor(data);

const password = data => inputConstructor(data);

const number = data => inputConstructor(data);

const tel = data => inputConstructor(data);

const checkbox = ({ friends }) => {
  const units = ({ id, name }) => html`
    <input id=${id} name=${id} type="checkbox" />

    ${name && label(name, id)}
  `;

  return html`
    <div class="field">
      ${Array.isArray(friends)
        ? friends.map(
            friend =>
              html`
                <div class="col-${friends.length}">${units(friend)}</div>
              `
          )
        : units(friends)}
    </div>
  `;
};

// 表单控件工厂
const Z: ZFactory = {
  select,
  input,
  password,
  number,
  tel,
  checkbox
};

const form = ({ data, id, onSubmit = formData => console.log(formData) }) => {
  const submit: EventListener = event => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    onSubmit(formData);
  };

  return html`
    <form class="form" id=${id} @submit=${submit}>
      ${data.map(input => Z[input.type](input))}

      <button class="button" type="submit">提交</button>
    </form>
  `;
};

render(form({ data: MOCK, id: "signup" }), document.getElementById("root"));
