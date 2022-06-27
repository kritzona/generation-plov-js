import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class RealDom {
  private _elementMap: Map<symbol, HTMLElement> = new Map();

  constructor(private _rootElement: HTMLElement) {}

  private _removeTails(node: VirtualDomNode): void {
    const { key, children } = node;

    this._elementMap.delete(key);

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomNode) {
        this._removeTails(childNode);
      }
    });
  }

  private _getElementOrGenerate(node: VirtualDomNode): HTMLElement {
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

  private _domElementFactory(node: VirtualDomNode): HTMLElement {
    const { props, children } = node;

    const element = this._getElementOrGenerate(node);

    for (const [prop, value] of Object.entries(props)) {
      element.setAttribute(prop, value);
    }

    const childElements = Array.from(element.childNodes);
    childElements.forEach((element) => element.remove());

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomNode) {
        this._removeTails(childNode);
      }
    });

    return element;
  }

  public mountRoot(node: VirtualDomNode) {
    this.mount(node, this._rootElement);
  }

  public mount(node: VirtualDomNode, parentElement?: HTMLElement) {
    const { children, component } = node;

    const element = this._domElementFactory(node);

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomNode) {
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
