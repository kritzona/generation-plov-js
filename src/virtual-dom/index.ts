import VirtualDomNode from './virtual-dom-node';

class VirtualDom {
  private _tree: VirtualDomNode | null = null;

  constructor(
    rootNode: VirtualDomNode,
    private _onUpdate: (node: VirtualDomNode) => void
  ) {
    this.tree = rootNode;
  }

  public get tree() {
    return this._tree;
  }

  public set tree(value: VirtualDomNode | null) {
    this._tree = value;

    if (this._tree) {
      this._subscribeOnUpdate(this._tree);
    }
  }

  private _subscribeOnUpdate(node: VirtualDomNode) {
    const { component, children } = node;

    component && component.subscribeOnUpdate(() => this._updateNode(node));

    children.forEach((childNode) => {
      if (typeof childNode === 'string') {
        return;
      }

      this._subscribeOnUpdate(childNode);
    });
  }

  private _updateNode(node: VirtualDomNode) {
    node.update();

    this._onUpdate(node);
  }
}

export default VirtualDom;
