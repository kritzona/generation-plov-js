import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class RealDom {
  private _elementMap: Map<symbol, HTMLElement> = new Map();

  constructor(private _rootElement: HTMLElement) {}

  private _domElementFactory(node: VirtualDomNode): HTMLElement {
    const { key, tagName } = node;

    const clearElement = (element: HTMLElement) => {
      const children = Array.from(element.childNodes);

      children.forEach((child) => child.remove());
    };

    let element;
    if (this._elementMap.get(key)) {
      element = this._elementMap.get(key);
    } else {
      element = document.createElement(tagName);

      this._elementMap.set(key, element);
    }

    clearElement(element);

    return element;
  }

  public mountRoot(node: VirtualDomNode) {
    this.mount(node, this._rootElement);
  }

  public mount(node: VirtualDomNode, parentElement?: HTMLElement) {
    const { props, children, component } = node;

    const element = this._domElementFactory(node);

    for (const [prop, value] of Object.entries(props)) {
      element.setAttribute(prop, value);
    }

    children.forEach((childNode) => {
      if (typeof childNode !== 'string') {
        this.mount(childNode, element);

        return;
      }

      const childTextElement = document.createTextNode(childNode);
      element.appendChild(childTextElement);
    });

    if (parentElement) {
      component && component.onMountStart();

      parentElement.appendChild(element);

      component && component.onMountEnd();
    }
  }
}

export default RealDom;
