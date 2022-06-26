class Subscriber {
  private _subscribers: (() => void)[] = [];

  public subscribe(subscriber: () => void) {
    this._subscribers.push(subscriber);
  }

  public notify() {
    this._subscribers.forEach((subscriber) => subscriber());
  }

  public clear() {
    this._subscribers = [];
  }
}

export default Subscriber;
