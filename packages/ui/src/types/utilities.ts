// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFn = (...args: any[]) => any

export type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
