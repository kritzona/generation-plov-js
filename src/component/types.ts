import Component from '@/component';

export type ComponentConstructor = new (...unknown) => Component<
  AnyObject,
  AnyObject
>;
