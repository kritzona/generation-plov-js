import VirtualDomNode from './virtual-dom-node';

class VirtualDom {
  constructor(
    private _tree: VirtualDomNode,
    private _onUpdate: (node: VirtualDomNode) => void
  ) {}

  public get tree() {
    return this._tree;
  }

  public set tree(value: VirtualDomNode) {
    this._tree = value;
  }

  private _subscribeOnUpdate(node: VirtualDomNode) {
    const { component, children } = node;

    component && component.subscribeOnUpdate(() => this._updateNode(node));

    children.forEach((childNode) => this._subscribeOnUpdate(childNode));
  }

  private _updateNode(node: VirtualDomNode) {
    this._onUpdate(node);
  }
}

export default VirtualDom;
