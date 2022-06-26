import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class RealDom {
  constructor(private _rootElement: HTMLElement) {}

  public mountRoot(node: VirtualDomNode) {
    this.mount(node, this._rootElement);
  }

  public mount(node: VirtualDomNode, parentElement: HTMLElement) {
    const { tagName, props, children, component } = node;

    const element = document.createElement(tagName);

    for (const [prop, value] of Object.entries(props)) {
      element.setAttribute(prop, value);
    }

    children.forEach((childNode) => this.mount(childNode, element));

    component && component.onMountStart();

    parentElement.appendChild(element);

    component && component.onMountEnd();
  }
}

export default RealDom;
