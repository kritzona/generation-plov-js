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

  public set tree(value: VirtualDomNode) {
    this._tree = value;
  }

  public get realDom(): RealDom {
    return this._realDom;
  }
}

export default VirtualDom;
