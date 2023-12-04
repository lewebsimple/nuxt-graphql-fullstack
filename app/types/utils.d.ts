declare global {
  type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
  type SinglePropertyType<T> = { [K in keyof T]: { [P in K]: T[K] } }[keyof T];
}

export { type PartialBy, type SinglePropertyType };
