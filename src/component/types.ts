import Component from '@/component';

export type ComponentConstructor = new (...unknown) => Component<
  Record<string, unknown>,
  Record<string, unknown>
>;
