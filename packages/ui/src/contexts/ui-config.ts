import { createContext, useContext, type CSSProperties } from 'react'

export type UITheme = 'light' | 'dark' | 'system'
export type UIThemeTokens = Partial<Record<`--sw-${string}`, string | number>>
export interface GlassOptions {
  enabled?: boolean
  /** Effect strength, clamped to 0…1. Zero is opaque. */
  intensity?: number
  variant?: 'regular' | 'clear'
}
export type GlassPreference = boolean | GlassOptions
export interface GlassSurfaceProps { glass?: GlassPreference }
export interface UIConfiguration {
  theme?: UITheme
  accentColor?: string
  tokens: UIThemeTokens
  glass: Required<GlassOptions>
}

export const defaultGlass: Required<GlassOptions> = { enabled: false, intensity: 0.5, variant: 'regular' }
export const UIConfigContext = /* @__PURE__ */ createContext<UIConfiguration>({ tokens: {}, glass: defaultGlass })
export function useUIConfig() { return useContext(UIConfigContext) }

export function resolveGlass(preference: GlassPreference | undefined, inherited = defaultGlass): Required<GlassOptions> {
  const options: GlassOptions = typeof preference === 'boolean' ? { enabled: preference }
    : preference === undefined ? {} : { ...preference, enabled: preference.enabled ?? true }
  const intensity = options.intensity ?? inherited.intensity
  return {
    enabled: options.enabled ?? inherited.enabled,
    variant: options.variant ?? inherited.variant,
    intensity: Number.isFinite(intensity) ? Math.max(0, Math.min(1, intensity)) : 0.5,
  }
}
export function themeStyle(config: UIConfiguration): CSSProperties {
  return {
    ...(config.accentColor ? {
      '--sw-accent-color': config.accentColor,
      '--sw-color-action-fill': config.accentColor,
      '--sw-color-switch-on': config.accentColor,
    } : {}),
    ...config.tokens,
  } as CSSProperties
}
export function useGlassAppearance(preference?: GlassPreference) {
  const config = useUIConfig()
  const options = resolveGlass(preference, config.glass)
  const enabled = options.enabled && options.intensity > 0
  const opacity = options.variant === 'regular' ? 0.96 - options.intensity * 0.12 : 0.88 - options.intensity * 0.16
  return {
    'data-glass': enabled ? 'on' : 'off',
    'data-glass-variant': options.variant,
    style: {
      '--sw-glass-blur': `${8 + options.intensity * 20}px`,
      '--sw-glass-saturation': `${110 + options.intensity * 60}%`,
      '--sw-glass-opacity': `${opacity * 100}%`,
      '--sw-glass-highlight': `${0.08 + options.intensity * 0.12}`,
    } as CSSProperties,
  }
}
