import Component from '@/component';

class VirtualDomNode {
  private _key = Symbol('key');
  private _component: Component<
    Record<string, unknown>,
    Record<string, unknown>
  > | null = null;

  constructor(
    private _tagName: string,
    private _props: Record<string, string>,
    private _children: (VirtualDomNode | string)[]
  ) {}

  public get key() {
    return this._key;
  }

  public get component() {
    return this._component;
  }

  public set component(
    value: Component<Record<string, unknown>, Record<string, unknown>> | null
  ) {
    this._component = value;
  }

  public get tagName() {
    return this._tagName;
  }

  public set tagName(value: string) {
    this._tagName = value;
  }

  public get props() {
    return this._props;
  }

  public set props(value: Record<string, string>) {
    this._props = value;
  }

  public get children() {
    return this._children;
  }

  public set children(value: (VirtualDomNode | string)[]) {
    this._children = value;
  }
}

export default VirtualDomNode;
