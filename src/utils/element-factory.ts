import { ComponentConstructor } from '@/component/types';
import VirtualDomComponentNode from '@/virtual-dom/nodes/virtual-dom-component-node';
import VirtualDomElementNode from '@/virtual-dom/nodes/virtual-dom-element-node';
import { VirtualDomNode, VirtualDomNodeChild } from '@/virtual-dom/types';

const elementFactory = (
  tagName: string | ComponentConstructor,
  props: StringObject,
  children: VirtualDomNodeChild[]
): VirtualDomNode => {
  if (typeof tagName === 'function') {
    return new VirtualDomComponentNode(tagName, props, children);
  }

  return new VirtualDomElementNode(tagName, props, children);
};

export default elementFactory;
