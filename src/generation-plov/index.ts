import RealDom from '@/real-dom';
import VirtualDom from '@/virtual-dom';
import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class GenerationPlov {
  private _virtualDom: VirtualDom;
  private _realDom: RealDom;

  constructor(
    private _rootNode: VirtualDomNode,
    private _rootElement: HTMLElement | null
  ) {
    if (!this._rootElement) {
      throw new Error('rootElement not found');
    }

    this._virtualDom = new VirtualDom(this._rootNode, this._onNodeUpdate);

    this._realDom = new RealDom(this._rootElement);
    if (this._virtualDom.tree) {
      this._realDom.mountRoot(this._virtualDom.tree);
    }
  }

  private _onNodeUpdate(node: VirtualDomNode) {
    this._realDom.mount(node);
  }
}

export default GenerationPlov;
