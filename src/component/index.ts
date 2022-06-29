import subscribeOnChange from '@/utils/subscribe-on-change';
import VirtualDom from '@/virtual-dom';
import { VirtualDomNode } from '@/virtual-dom/types';

abstract class Component<
  P extends MaybeEmptyObject<AnyObject>,
  S extends MaybeEmptyObject<AnyObject>
> {
  private _virtualDom = new VirtualDom(this.render());

  private _initialProps: Partial<P> = {};

  private _props: Partial<P> = {};
  private _state: Partial<S> = {};

  constructor(props: P) {
    this._initialProps = props;
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

  public get baseElement(): HTMLElement {
    return this._virtualDom.realDom.baseElement;
  }

  public create(): void {
    this.onCreateStart();

    this.props = this._initialProps;

    this.onCreateEnd();
  }

  public mount(parentElement: HTMLElement) {
    this.onMountStart();

    this._virtualDom.realDom.mount(parentElement);

    this.onMountEnd();
  }

  public update() {
    this.onUpdateStart();

    this._virtualDom.update(this.render());

    this.onUpdateEnd();
  }

  protected onCreateStart(): void {
    return;
  }

  protected onCreateEnd(): void {
    return;
  }

  protected onMountStart(): void {
    return;
  }

  protected onMountEnd(): void {
    return;
  }

  protected onUpdateStart(): void {
    return;
  }

  protected onUpdateEnd(): void {
    return;
  }

  public abstract render(): VirtualDomNode;
}

export default Component;
