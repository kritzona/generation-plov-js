import { AnyComponent, ComponentConstructor } from '@/component/types';
import { VirtualDomNode, VirtualDomNodeChild } from '../types';

class VirtualDomComponentNode implements VirtualDomNode {
  private _key = Symbol('virtual-dom-component-node');

  private _component: AnyComponent;

  constructor(
    private _Component: ComponentConstructor,
    private _props: StringObject,
    private _children: VirtualDomNodeChild[]
  ) {
    this._component = this._componentFactory();
  }

  private _componentFactory(): AnyComponent {
    const component = new this._Component({
      ...this._props,
      children: this._children,
    });

    component.create();

    return component;
  }

  public get key(): symbol {
    return this._key;
  }

  public get component(): AnyComponent {
    return this._component;
  }

  public get props(): StringObject {
    return this._props;
  }

  public get children(): VirtualDomNodeChild[] {
    return this._children;
  }

  public patch(props: StringObject, children: VirtualDomNodeChild[]): void {
    this._props = { ...props };
    this._children = [...children];
  }
}

export default VirtualDomComponentNode;
