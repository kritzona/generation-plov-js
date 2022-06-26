import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class RealDom {
  private _elementMap: Map<symbol, HTMLElement> = new Map();

  constructor(private _rootElement: HTMLElement) {}

  private _elementFactory(node: VirtualDomNode): HTMLElement {
    const { key, tagName } = node;

    let element;
    if (this._elementMap.get(key)) {
      element = this._elementMap.get(key);
    } else {
      element = document.createElement(tagName);

      this._elementMap.set(key, element);
    }

    return element;
  }

  public mountRoot(node: VirtualDomNode) {
    this.mount(node, this._rootElement);
  }

  public mount(node: VirtualDomNode, parentElement: HTMLElement) {
    const { props, children, component } = node;

    const element = this._elementFactory(node);

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
