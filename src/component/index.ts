import VirtualDomNode from '@/virtual-dom/virtual-dom-node';
import subscribeOnChange from './subscribe-on-change';

abstract class Component<
  P extends Record<string, unknown>,
  S extends Record<string, unknown>
> {
  private _props: Partial<P> = {};
  private _state: Partial<S> = {};

  constructor(props: P) {
    this.props = props;
  }

  protected get props() {
    return this._props;
  }

  protected set props(value: Partial<P>) {
    this._props = subscribeOnChange<P>(value, () => this.update());
  }

  protected get state() {
    return this._state;
  }

  protected set state(value: Partial<S>) {
    this._state = subscribeOnChange<S>(value, () => this.update());
  }

  protected update(): void {
    this.render();
  }

  protected abstract onCreateStart(): void;

  protected abstract onCreateEnd(): void;

  protected abstract onMountStart(): void;

  protected abstract onMountEnd(): void;

  protected abstract onUpdateStart(): void;

  protected abstract onUpdateEnd(): void;

  public abstract render(): VirtualDomNode;
}

export default Component;
