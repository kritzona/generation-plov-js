class VirtualDomNode {
  private _key = Symbol('key');

  constructor(
    private _tagName: string,
    private _props: Record<string, string>,
    private _children: VirtualDomNode[]
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
}

export default VirtualDomNode;
