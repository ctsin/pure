const Z = () => {
  /**
   * 渲染 <label /> 视图
   * @access private
   */
  const label = (label, htmlFor) => {
    return /*html*/ `
      <label class="label" for="${htmlFor}">${label}</label>
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

  const SELECT = ({ name: { first, last }, guid, tags }) => {
    $(document).on("change", `#${guid}`, ({ target }) => {
      const e = $.Event(`change.${guid}`);

      $(target).trigger(e);

      if (e.isDefaultPrevented()) return;

      validate(target, target.value.trim(), "不中啊！怎么说也得选一个 -_-!");
    });

    return /*html*/ `
      <div class="field">
        ${(first || last) && label(`${first} ${last}`, guid)}
        <div class="control">
          <select class="select" name="${guid}" id="${guid}">
            <option value="">请选择</option>
            ${tags.map(tag => {
              return /*html*/ `
                <option value="${tag}">${tag}</option>
              `;
            })}
          </select>
        </div>
      </div>
    `;
  };

  const INPUT = ({ name: { first, last }, guid }) => {
    $(document).on("focusout", `#${guid}`, ({ target }) => {
      const e = $.Event(`focusout.${guid}`);

      $(target).trigger(e);

      // 如果用户在自定义事件中阻止了默认行为，将终止组件余下逻辑。
      if (e.isDefaultPrevented()) return;

      validate(target, target.value.trim());
    });

    return /*html*/ `
      <div class="field">
        ${(first || last) && label(`${first} ${last}`, guid)}
        <div class="control">
          <input class="input" id="${guid}" name="${guid}" type="text" />
        </div>
      </div>
    `;
  };

  const PASSWORD = ({ name: { first, last }, guid }) => {
    return /*html*/ `
      <div class="field">
        ${(first || last) && label(`${first} ${last}`, guid)}
        <div class="control" data-suffix="必要">
          <input class="input" id="${guid}" name="${guid}" type="password" />
        </div>
      </div>
    `;
  };

  const CHECKBOX = ({ friends }) => {
    const units = ({ id, name }) => /*html*/ `
      <input id="${id}" name="${id}" type="checkbox" />
      ${name && label(`${name}`, id)}
    `;

    return /*html*/ `
      <div class="field">
        ${
          Array.isArray(friends)
            ? friends
                .map(friend => {
                  return /*html*/ `
                  <div class="col-${friends.length}">${units(friend)}</div>
                `;
                })
                .join("")
            : units(friends)
        }
      </div>
    `;
  };

  return { SELECT, INPUT, PASSWORD, CHECKBOX };
};

const render = () => {
  const inputs = Z();

  return /*html*/ `
    <form class="form ">
      ${MOCK.map(data => {
        return /*html*/ `
          ${inputs[data.type](data)}
        `;
      }).join("")}

      <button class="button" type="submit">提交</button>
    </form>
  `;
};

document.getElementById("root").innerHTML = render();

// 演示自定义事件能力
$("#a3539000-5f65-4e98-921e-28c7edc3093e").on(
  "focusout.a3539000-5f65-4e98-921e-28c7edc3093e",
  event => {
    // 阻止事件默认行为将终止第二个表单的验证，并有机会在这里执行自定义的验证。
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`正在监听自定义事件，事件目标`, event.target);
  }
);
