export interface VirtualDomNode {
  get key(): symbol;

  get props(): StringObject;

  get children(): VirtualDomNodeChild[];

  patch(
    props: VirtualDomNode['props'],
    children: VirtualDomNode['children']
  ): void;
}

export type VirtualDomNodeChild = VirtualDomNode | string;
