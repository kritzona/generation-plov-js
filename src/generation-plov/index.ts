import elementFactory from '@/utils/element-factory';
import VirtualDom from '@/virtual-dom';
import { VirtualDomNode } from '@/virtual-dom/types';

class GenerationPlov {
  private _virtualDom = new VirtualDom();

  constructor(
    private _rootNode: VirtualDomNode,
    private _rootElement: isNullable<HTMLElement>
  ) {
    if (!this._rootElement) {
      throw new Error('rootElement not found');
    }

    this._virtualDom.patch(this._rootNode);
    this._virtualDom.realDom.mount(this._rootElement);
  }

  public static elementFactory = elementFactory;
}

export default GenerationPlov;
