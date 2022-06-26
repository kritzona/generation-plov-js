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
    private _children: VirtualDomNode[]
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

  public get props() {
    return this._props;
  }

  public get children() {
    return this._children;
  }
}

export default VirtualDomNode;
