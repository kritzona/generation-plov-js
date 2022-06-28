const subscribeOnChange = <T extends AnyObject>(
  target: Partial<T>,
  callback: () => void
): Partial<T> => {
  const proxy = new Proxy(target, {
    set(target, prop, value) {
      Object.defineProperty(target, prop, {
        value,
      });

      callback();

      return true;
    },
  });

  return proxy;
};

export default subscribeOnChange;
