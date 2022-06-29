import VirtualDomComponentNode from '@/virtual-dom/nodes/virtual-dom-component-node';
import VirtualDomElementNode from '@/virtual-dom/nodes/virtual-dom-element-node';
import { VirtualDomNode } from '@/virtual-dom/types';

class RealDom {
  private _baseElement: isNullable<HTMLElement> = null;

  public get baseElement(): isNullable<HTMLElement> {
    return this._baseElement;
  }

  private _baseElementFactory(node: VirtualDomNode): HTMLElement {
    const { children, props } = node;

    const element = this._baseElement || this._domElementFactory(node);

    if (this._baseElement) {
      const childNodes = Array.from(element.childNodes);
      childNodes.forEach((node) => node.remove());
    }

    for (const [prop, value] of Object.entries(props)) {
      element.setAttribute(prop, value);
    }

    children.forEach((childNode) => {
      if (typeof childNode === 'string') {
        element.appendChild(document.createTextNode(childNode));

        return;
      }

      if (childNode instanceof VirtualDomElementNode) {
        element.appendChild(this._domElementFactory(childNode));
      }

      if (childNode instanceof VirtualDomComponentNode) {
        const { component } = childNode;

        component.mount(element);
      }
    });

    return element;
  }

  private _domElementFactory(node: VirtualDomNode): HTMLElement {
    let element: HTMLElement;

    const fallbackElement = document.createElement('div');

    if (node instanceof VirtualDomElementNode) {
      const { tagName } = node;

      element = document.createElement(tagName);
    } else if (node instanceof VirtualDomComponentNode) {
      const { component } = node;

      element = component.baseElement || fallbackElement;
    } else {
      element = fallbackElement;
    }

    return element;
  }

  public mount(parentElement: HTMLElement) {
    if (!this._baseElement) {
      return;
    }

    parentElement.appendChild(this._baseElement);
  }

  public patchBaseElement(node: VirtualDomNode) {
    this._baseElement = this._baseElementFactory(node);
  }
}

export default RealDom;
