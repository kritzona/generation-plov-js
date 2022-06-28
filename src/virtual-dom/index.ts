import VirtualDomElementNode from './virtual-dom-element-node';

class VirtualDom {
  private _tree: isNullable<VirtualDomElementNode> = null;

  constructor(
    rootNode: VirtualDomElementNode,
    private _onUpdate: (node: VirtualDomElementNode) => void
  ) {
    this.tree = rootNode;
  }

  public get tree() {
    return this._tree;
  }

  public set tree(value: isNullable<VirtualDomElementNode>) {
    this._tree = value;

    if (this._tree) {
      this._subscribeOnUpdate(this._tree);
    }
  }

  private _subscribeOnUpdate(node: VirtualDomElementNode) {
    const { component, children } = node;

    component && component.subscribeOnUpdate(() => this._updateNode(node));

    children.forEach((childNode) => {
      if (typeof childNode === 'string') {
        return;
      }

      this._subscribeOnUpdate(childNode);
    });
  }

  private _updateNode(node: VirtualDomElementNode) {
    node.update();

    this._onUpdate(node);
  }
}

export default VirtualDom;
