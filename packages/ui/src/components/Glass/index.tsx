import { forwardRef } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'
import { useGlassAppearance, type GlassSurfaceProps } from '@/contexts/ui-config'
import './style.scss'

export interface IGlassProps extends IBaseElementComponent<'div'>, GlassSurfaceProps {}
/** A material surface for custom controls; inherits UIProvider configuration. */
export const Glass = forwardRef<HTMLDivElement, IGlassProps>(function Glass({ glass, ...props }, ref) {
  const appearance = useGlassAppearance(glass)
  const { commonProps, restProps, children } = standardizeProps(props, {
    className: prefixClass('glass'), style: appearance.style,
  })
  return <div {...appearance} {...commonProps} {...restProps} ref={ref}>{children}</div>
})
