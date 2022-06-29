import VirtualDomComponentNode from '@/virtual-dom/nodes/virtual-dom-component-node';
import VirtualDomElementNode from '@/virtual-dom/nodes/virtual-dom-element-node';
import { VirtualDomNode } from '@/virtual-dom/types';

class RealDom {
  private _baseElement: HTMLElement;

  constructor(node: VirtualDomNode) {
    this._baseElement = this._baseElementFactory(node);
  }

  public get baseElement(): HTMLElement {
    return this._baseElement;
  }

  private _baseElementFactory(node: VirtualDomNode): HTMLElement {
    const { children } = node;

    let element;
    if (node instanceof VirtualDomComponentNode) {
      const { component } = node;

      element = component.baseElement;
    } else {
      element = this._domElementFactory(node);
    }

    children.forEach((nodeChild) => {
      if (typeof nodeChild === 'string') {
        element.appendChild(document.createTextNode(nodeChild));

        return;
      }

      if (nodeChild instanceof VirtualDomElementNode) {
        element.appendChild(this._domElementFactory(nodeChild));
      }

      if (nodeChild instanceof VirtualDomComponentNode) {
        const { component } = nodeChild;

        component.mount(element);
      }
    });

    return element;
  }

  private _domElementFactory(node: VirtualDomNode): HTMLElement {
    const { props } = node;

    let element;

    if (node instanceof VirtualDomElementNode) {
      const { tagName } = node;

      element = document.createElement(tagName);

      for (const [prop, value] of Object.entries(props)) {
        element.setAttribute(prop, value);
      }
    } else if (node instanceof VirtualDomComponentNode) {
      const { component } = node;

      element = component.baseElement;
    } else {
      element = document.createElement('div');
    }

    return element;
  }

  public mount(parentElement: HTMLElement) {
    parentElement.appendChild(this._baseElement);
  }

  public updateBaseElement(node: VirtualDomNode) {
    this._baseElement = this._baseElementFactory(node);
  }
}

export default RealDom;
