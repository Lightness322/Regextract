export type TypeSetStateFunction<T> = (value: T | ((prevVar: T) => T)) => void
