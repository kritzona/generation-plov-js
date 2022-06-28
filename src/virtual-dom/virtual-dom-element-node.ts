import Component from '@/component';
import { VirtualDomNode, VirtualDomNodeChild } from './types';

class VirtualDomElementNode implements VirtualDomNode {
  private _key = Symbol('virtual-dom-element-key');

  private _component: isNullable<Component<AnyObject, AnyObject>> = null;

  constructor(
    private _tagName: string,
    private _props: StringObject,
    private _children: VirtualDomNodeChild[]
  ) {}

  public get key() {
    return this._key;
  }

  public get component() {
    return this._component;
  }

  public set component(value: isNullable<Component<AnyObject, AnyObject>>) {
    this._component = value;
  }

  public get tagName() {
    return this._tagName;
  }

  public get props() {
    return this._props;
  }

  public get children() {
    return this._children;
  }

  public update() {
    if (!this._component) {
      return;
    }

    const node = this._component.render();

    this._tagName = node.tagName;
    this._props = node.props;
    this._children = node.children;
  }

  public patch(props: StringObject, children: VirtualDomNodeChild[]): void {
    this._props = { ...props };
    this._children = [...children];
  }
}

export default VirtualDomElementNode;
