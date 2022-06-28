import VirtualDomElementNode from '@/virtual-dom/virtual-dom-element-node';

class RealDom {
  private _elementMap: Map<symbol, HTMLElement> = new Map();

  constructor(private _rootElement: HTMLElement) {}

  private _removeTails(node: VirtualDomElementNode): void {
    const { key, children } = node;

    this._elementMap.delete(key);

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomElementNode) {
        this._removeTails(childNode);
      }
    });
  }

  private _getElementOrGenerate(node: VirtualDomElementNode): HTMLElement {
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

  private _domElementFactory(node: VirtualDomElementNode): HTMLElement {
    const { props, children } = node;

    const element = this._getElementOrGenerate(node);

    for (const [prop, value] of Object.entries(props)) {
      element.setAttribute(prop, value);
    }

    const childElements = Array.from(element.childNodes);
    childElements.forEach((element) => element.remove());

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomElementNode) {
        this._removeTails(childNode);
      }
    });

    return element;
  }

  public mountRoot(node: VirtualDomElementNode) {
    this.mount(node, this._rootElement);
  }

  public mount(node: VirtualDomElementNode, parentElement?: HTMLElement) {
    const { children, component } = node;

    const element = this._domElementFactory(node);

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomElementNode) {
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
