import Component from '@/component';

export type ComponentConstructor = new (...unknown) => AnyComponent;

export type AnyComponent = Component<AnyObject, AnyObject>;
