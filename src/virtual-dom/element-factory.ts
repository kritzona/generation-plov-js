import { ComponentConstructor } from '@/component/types';
import VirtualDomNode from './virtual-dom-node';

const createComponent = (
  Component: ComponentConstructor,
  props: Record<string, string>
): VirtualDomNode => {
  const component = new Component(props);

  const virtualDomNode = component.render();
  virtualDomNode.component = component;

  return virtualDomNode;
};

const elementFactory = (
  tagName: string | ComponentConstructor,
  props: Record<string, string>,
  children: VirtualDomNode[]
): VirtualDomNode => {
  if (typeof tagName !== 'string') {
    return createComponent(tagName, props);
  }

  return new VirtualDomNode(tagName, props, children);
};

export default elementFactory;
