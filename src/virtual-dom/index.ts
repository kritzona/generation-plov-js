import VirtualDomNode from './virtual-dom-node';

class VirtualDom {
  private _tree: VirtualDomNode | null = null;

  public get tree() {
    return this._tree;
  }

  public set tree(value: VirtualDomNode | null) {
    this._tree = value;
  }
}

export default VirtualDom;
