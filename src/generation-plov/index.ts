import RealDom from '@/real-dom';
import VirtualDom from '@/virtual-dom';
import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class GenerationPlov {
  private _virtualDom: VirtualDom;
  private _realDom: RealDom;

  constructor(rootNode: VirtualDomNode, rootElement: HTMLElement | null) {
    if (!rootElement) {
      throw new Error('rootElement not found');
    }

    this._virtualDom = new VirtualDom(rootNode, (node) => {
      this._realDom.mount(node);
    });

    this._realDom = new RealDom(rootElement);
    this._realDom.mountRoot(this._virtualDom.tree);
  }
}

export default GenerationPlov;
