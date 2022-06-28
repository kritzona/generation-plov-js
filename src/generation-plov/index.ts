import elementFactory from '@/utils/element-factory';
import { VirtualDomNode } from '@/virtual-dom/types';

class GenerationPlov {
  constructor(
    private _rootNode: VirtualDomNode,
    private _rootElement: isNullable<HTMLElement>
  ) {
    if (!this._rootElement) {
      throw new Error('rootElement not found');
    }
  }

  public static elementFactory = elementFactory;
}

export default GenerationPlov;
