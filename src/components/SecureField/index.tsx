import { memo } from 'react'
import type { ITextFieldProps } from '../TextField'
import { TextField } from '../TextField'

/**
 * A control that displays a secure text input field.
 * 
 * SecureField is a specialized TextField for password input.
 * It automatically sets the input type to 'password'.
 * 
 * @example
 * ```tsx
 * <SecureField
 *   placeholder="Enter password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/securefield
 */
export type ISecureFieldProps = Omit<ITextFieldProps, 'type'>

export const SecureField = memo(function SecureField(props: ISecureFieldProps) {
  return <TextField {...props} type="password" />
})

