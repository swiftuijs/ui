import { memo, type FormEvent } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * Props for Form component
 */
export interface IFormProps extends Omit<IBaseElementComponent<'form'>, 'onSubmit' | 'noValidate'> {
  /**
   * Form submission handler
   * @param event - Form submit event
   */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  /**
   * Form validation state
   */
  isValid?: boolean
}

/**
 * A container for grouping form controls.
 * 
 * Form provides a semantic container for form elements and delegates submission to the native form element.
 * 
 * @example
 * ```tsx
 * <Form onSubmit={(e) => {
 *   e.preventDefault()
 *   console.log('Form submitted')
 * }}>
 *   <TextField placeholder="Name" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/form
 */
export const Form = memo(function Form(props: IFormProps) {
  const { onSubmit, isValid, ...restProps } = props

  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: [prefixClass('form')],
  })

  return (
    <form
      {...commonProps}
      {...finalRestProps}
      onSubmit={onSubmit}
      noValidate={isValid === false}
    >
      {children}
    </form>
  )
})
