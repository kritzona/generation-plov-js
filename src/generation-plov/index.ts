import elementFactory from '@/utils/element-factory';
import RealDom from '@/real-dom';
import VirtualDom from '@/virtual-dom';
import VirtualDomElementNode from '@/virtual-dom/nodes/virtual-dom-element-node';

class GenerationPlov {
  private _virtualDom: VirtualDom;
  private _realDom: RealDom;

  constructor(
    private _rootNode: VirtualDomElementNode,
    private _rootElement: isNullable<HTMLElement>
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

  private _onNodeUpdate = (node: VirtualDomElementNode) => {
    this._realDom.mount(node);
  };

  public static elementFactory = elementFactory;
}

export default GenerationPlov;
