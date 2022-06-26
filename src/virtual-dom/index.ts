import VirtualDomNode from './virtual-dom-node';

class VirtualDom {
  constructor(private _tree: VirtualDomNode) {}

  public get tree() {
    return this._tree;
  }

  public set tree(value: VirtualDomNode) {
    this._tree = value;
  }
}

export default VirtualDom;
