export interface VirtualDomNode {
  get key(): symbol;

  get props(): StringObject;

  get children(): VirtualDomNodeChild[];
}

export type VirtualDomNodeChild = VirtualDomNode | string;
