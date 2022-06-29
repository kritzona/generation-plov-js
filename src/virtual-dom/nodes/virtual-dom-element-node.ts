import { VirtualDomNode, VirtualDomNodeChild } from '../types';

class VirtualDomElementNode implements VirtualDomNode {
  private _key = Symbol('virtual-dom-element-key');

  constructor(
    private _tagName: string,
    private _props: StringObject,
    private _children: VirtualDomNodeChild[]
  ) {}

  public get key() {
    return this._key;
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

  public patch(props: StringObject, children: VirtualDomNodeChild[]): void {
    this._props = { ...props };
    this._children = [...children];
  }
}

export default VirtualDomElementNode;
