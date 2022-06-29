import RealDom from '@/real-dom';
import { VirtualDomNode } from './types';

class VirtualDom {
  private _tree: isNullable<VirtualDomNode> = null;

  private _realDom = new RealDom();

  public get tree(): isNullable<VirtualDomNode> {
    return this._tree;
  }

  public get realDom(): RealDom {
    return this._realDom;
  }

  public patch(node: VirtualDomNode) {
    this._tree = node;

    this._realDom.patchBaseElement(this._tree);
  }
}

export default VirtualDom;
