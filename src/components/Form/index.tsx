import { memo, type FormEvent } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Form component
 */
export interface IFormProps extends IBaseComponent {
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
 * Form provides a semantic container for form elements and handles form submission.
 * It automatically prevents default form submission behavior and calls the onSubmit handler.
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(event)
    }
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('form')],
  })

  return (
    <form
      {...commonProps}
      {...finalRestProps}
      onSubmit={handleSubmit}
      noValidate={isValid === false}
    />
  )
})

