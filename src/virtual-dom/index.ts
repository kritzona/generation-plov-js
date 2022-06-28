import { VirtualDomNode } from './types';

class VirtualDom {
  private _tree: isNullable<VirtualDomNode> = null;

  constructor(rootNode: VirtualDomNode) {
    this.tree = rootNode;
  }

  public get tree() {
    return this._tree;
  }

  public set tree(value: isNullable<VirtualDomNode>) {
    this._tree = value;
  }
}

export default VirtualDom;
