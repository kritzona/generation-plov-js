import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

abstract class Component {
  public abstract render(): VirtualDomNode;
}

export default Component;
