/// <reference types="./react-patch.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type  IFn = (...rest: any[]) => any

/**
 * set partial properties to optional
 * 
 * @example
 * type T = {a: string, b: number}
 * type T1 = PartialOptional<T, 'a'> // {a?: string, b: number}
 */
type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>