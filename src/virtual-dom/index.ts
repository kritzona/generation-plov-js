import VirtualDomComponentNode from '@/virtual-dom/nodes/virtual-dom-component-node';
import RealDom from '@/real-dom';
import { VirtualDomNode, VirtualDomNodeChild } from './types';

class VirtualDom {
  private _tree: isNullable<VirtualDomNode> = null;

  private _realDom = new RealDom();

  public get tree(): isNullable<VirtualDomNode> {
    return this._tree;
  }

  public get realDom(): RealDom {
    return this._realDom;
  }

  public init(node: VirtualDomNodeChild) {
    if (typeof node === 'string') {
      return;
    }

    const { children } = node;

    if (node instanceof VirtualDomComponentNode) {
      node.init();
    }

    children.forEach((childNode) => {
      if (childNode instanceof VirtualDomComponentNode) {
        childNode.init();
      }
    });

    this._apply(node);
  }

  public patch(node: VirtualDomNode) {
    this._apply(node);
  }

  private _apply(node: VirtualDomNode) {
    this._tree = node;

    this._realDom.patchBaseElement(this._tree);
  }
}

export default VirtualDom;
