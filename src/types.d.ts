type StringObject = Record<string, string>;

type AnyObject = Record<string, unknown>;

type EmptyObject = Record<string, never>;

type isNullable<T> = T | null;

type MaybeEmptyObject<T extends AnyObject> = T | EmptyObject;
