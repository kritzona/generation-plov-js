import { ComponentConstructor } from '@/component/types';
import VirtualDomElementNode from '@/virtual-dom/nodes/virtual-dom-element-node';

const componentFactory = (
  Component: ComponentConstructor,
  props: StringObject
): VirtualDomElementNode => {
  const component = new Component(props);
  component.create();

  const virtualDomNode = component.render();
  virtualDomNode.component = component;

  return virtualDomNode;
};

const elementFactory = (
  tagName: string | ComponentConstructor,
  props: StringObject,
  children: (VirtualDomElementNode | string)[]
): VirtualDomElementNode => {
  if (typeof tagName !== 'string') {
    return componentFactory(tagName, props);
  }

  return new VirtualDomElementNode(tagName, props, children);
};

export default elementFactory;
