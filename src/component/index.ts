import subscribeOnChange from '@/utils/subscribe-on-change';
import VirtualDom from '@/virtual-dom';
import { VirtualDomNode } from '@/virtual-dom/types';

abstract class Component<
  P extends MaybeEmptyObject<AnyObject>,
  S extends MaybeEmptyObject<AnyObject>
> {
  private _virtualDom: VirtualDom = new VirtualDom();

  private _props: Partial<P> = {};
  private _state: Partial<S> = {};

  constructor(props: P) {
    this._props = props;
  }

  protected get props(): Partial<P> {
    return this._props;
  }

  protected set props(value: Partial<P>) {
    this._props = subscribeOnChange<P>(value, () => this.update());
  }

  protected get state(): Partial<S> {
    return this._state;
  }

  protected set state(value: Partial<S>) {
    this._state = subscribeOnChange<S>(value, () => this.update());
  }

  public get baseElement(): isNullable<HTMLElement> {
    return this._virtualDom.realDom.baseElement;
  }

  public create(): void {
    this.onCreateStart();

    this._virtualDom.patch(this.render());

    this.onCreateEnd();
  }

  public mount(parentElement: HTMLElement): void {
    this.onMountStart();

    this._virtualDom.realDom.mount(parentElement);

    this.onMountEnd();
  }

  public update(): void {
    this.onUpdateStart();

    this._virtualDom.patch(this.render());

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
