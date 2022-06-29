import RealDom from '@/real-dom';
import { VirtualDomNode } from './types';

class VirtualDom {
  private _tree: VirtualDomNode;

  private _realDom: RealDom;

  constructor(node: VirtualDomNode) {
    this._tree = node;

    this._realDom = new RealDom(this._tree);
  }

  public get tree(): VirtualDomNode {
    return this._tree;
  }

  public get realDom(): RealDom {
    return this._realDom;
  }

  public update(node: VirtualDomNode) {
    this._tree = node;

    this._realDom.updateBaseElement(node);
  }
}

export default VirtualDom;
