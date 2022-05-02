function render(node, renderAs = "dom", path = []) {
  const { name, props, children } = node;
  //   * 客户端
  if (renderAs === "dom") {
    const element = document.createElement(name);
    if (props && props.onClick) {
      element.addEventListener("click", props.onClick);
    }
    if (typeof children === "string") {
      element.innerHTML = children;
    } else if (Array.isArray(children)) {
      children.forEach((child, i) => {
        element.appendChild(
          render(child, renderAs, path.concat(i))
        );
      });
    }
    return element;
    // * 服务端
  } else if (renderAs === "html") {
    let childrenStr = "";
    if (typeof children === "string") {
      childrenStr = children;
    } else {
      childrenStr = children
        .map((child, i) => {
          return render(child, renderAs, path.concat(i));
        })
        .join("");
    }
    return `<${name} id='node-${path.join(
      "-"
    )}'>${childrenStr}</${name}>`;
  } else if (renderAs === "rehydrate") {
    if (props && props.onClick) {
      document
        .getElementById(`node-${path.join("-")}`)
        .addEventListener("click", props.onClick);
    }
    if (Array.isArray(children)) {
      children.forEach((child, i) => {
        render(child, renderAs, path.concat(i));
      });
    }
  } else {
    throw "not supported renderAs type";
  }
}

const element = render(
  {
    name: "div",
    props: {
      onClick: () => {
        window.alert("123");
      },
    },
    children: [
      {
        name: "ul",
        children: [
          {
            name: "li",
            children: "Apple",
          },
          {
            name: "li",
            children: "Tesla",
          },
        ],
      },
    ],
  },
  "dom"
);

document.getElementById("root").appendChild(element);
