import { ComponentConstructor } from '@/component/types';
import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

const componentFactory = (
  Component: ComponentConstructor,
  props: Record<string, string>
): VirtualDomNode => {
  const component = new Component(props);
  component.create();

  const virtualDomNode = component.render();
  virtualDomNode.component = component;

  return virtualDomNode;
};

const elementFactory = (
  tagName: string | ComponentConstructor,
  props: Record<string, string>,
  children: (VirtualDomNode | string)[]
): VirtualDomNode => {
  if (typeof tagName !== 'string') {
    return componentFactory(tagName, props);
  }

  return new VirtualDomNode(tagName, props, children);
};

export default elementFactory;
