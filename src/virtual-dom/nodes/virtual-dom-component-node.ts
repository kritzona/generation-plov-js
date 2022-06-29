import { AnyComponent, ComponentConstructor } from '@/component/types';
import { VirtualDomNode, VirtualDomNodeChild } from '../types';

class VirtualDomComponentNode implements VirtualDomNode {
  private _key = Symbol('virtual-dom-component-node');

  private _component: isNullable<AnyComponent> = null;

  constructor(
    private _Component: ComponentConstructor,
    private _props: StringObject,
    private _children: VirtualDomNodeChild[]
  ) {}

  public get key(): symbol {
    return this._key;
  }

  public get component(): isNullable<AnyComponent> {
    return this._component;
  }

  public get props(): StringObject {
    return this._props;
  }

  public get children(): VirtualDomNodeChild[] {
    return this._children;
  }

  public init() {
    this._component = this._componentFactory();
  }

  public patch(props: StringObject, children: VirtualDomNodeChild[]): void {
    this._props = { ...props };
    this._children = [...children];
  }

  private _componentFactory(): AnyComponent {
    const component = new this._Component({
      ...this._props,
      children: this._children,
    });

    component.create();

    return component;
  }
}

export default VirtualDomComponentNode;
