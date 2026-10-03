import { useMemo } from 'react'
import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'
import { UIConfigContext, useUIConfig, resolveGlass, themeStyle,
  type UITheme, type UIThemeTokens, type GlassPreference } from '@/contexts/ui-config'
import './style.scss'

export interface IUIProviderProps extends IBaseElementComponent<'div'> {
  /** CSS media queries resolve system theme without a hydration mismatch. */
  theme?: UITheme
  accentColor?: string
  tokens?: UIThemeTokens
  glass?: GlassPreference
}

/** Scoped, nestable appearance configuration; no document-wide side effects. */
export function UIProvider({ theme, accentColor, tokens, glass, children, ...props }: IUIProviderProps) {
  const parent = useUIConfig()
  const config = useMemo(() => ({
    theme: theme ?? parent.theme ?? 'system',
    accentColor: accentColor ?? parent.accentColor,
    tokens: { ...parent.tokens, ...tokens },
    glass: resolveGlass(glass, parent.glass),
  }), [theme, accentColor, tokens, glass, parent])
  const { commonProps, restProps } = standardizeProps(props, {
    className: prefixClass('ui-provider'), style: themeStyle(config),
  })
  return <UIConfigContext.Provider value={config}>
    <div {...commonProps} {...restProps} data-theme={config.theme}>{children}</div>
  </UIConfigContext.Provider>
}
export { useUIConfig } from '@/contexts/ui-config'
export type { UITheme, UIThemeTokens, GlassOptions, GlassPreference } from '@/contexts/ui-config'
