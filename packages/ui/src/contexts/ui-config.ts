import { createContext, useContext, useMemo, type CSSProperties } from 'react'

export type UITheme = 'light' | 'dark' | 'system'
export type UIThemeTokens = Partial<Record<`--sw-${string}`, string | number>>
export interface GlassOptions {
  enabled?: boolean
  /** Effect strength, clamped to 0…1. Zero is opaque. */
  intensity?: number
  variant?: 'regular' | 'clear'
  /** Auto adds SVG edge refraction in Chromium; css keeps the lightweight blurred material. */
  renderer?: 'auto' | 'css'
}
export type GlassPreference = boolean | GlassOptions
export interface GlassSurfaceProps { glass?: GlassPreference }
export interface UIConfiguration {
  theme?: UITheme
  accentColor?: string
  tokens: UIThemeTokens
  glass: Required<GlassOptions>
}

export const defaultGlass: Required<GlassOptions> = { enabled: false, intensity: 0.5, variant: 'regular', renderer: 'auto' }
export const UIConfigContext = /* @__PURE__ */ createContext<UIConfiguration>({ tokens: {}, glass: defaultGlass })
export function useUIConfig() { return useContext(UIConfigContext) }

export function resolveGlass(preference: GlassPreference | undefined, inherited: GlassOptions = defaultGlass): Required<GlassOptions> {
  const options: GlassOptions = typeof preference === 'boolean' ? { enabled: preference }
    : preference === undefined ? {} : { ...preference, enabled: preference.enabled ?? true }
  const intensity = options.intensity ?? inherited.intensity ?? defaultGlass.intensity
  return {
    enabled: options.enabled ?? inherited.enabled ?? defaultGlass.enabled,
    variant: options.variant ?? inherited.variant ?? defaultGlass.variant,
    renderer: options.renderer ?? inherited.renderer ?? defaultGlass.renderer,
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
export function useGlassAppearance(preference?: GlassPreference, defaultVariant?: GlassOptions['variant']) {
  const config = useUIConfig()
  const inherited = defaultVariant ? { ...config.glass, variant: defaultVariant } : config.glass
  const options = resolveGlass(preference, inherited)
  const enabled = options.enabled && options.intensity > 0
  const clear = options.variant === 'clear'
  const opacity = clear ? 0.32 - options.intensity * 0.18 : 0.84 - options.intensity * 0.22
  return useMemo(() => ({
    'data-glass': enabled ? 'on' : 'off',
    'data-glass-variant': options.variant,
    'data-glass-renderer': options.renderer,
    style: {
      '--sw-glass-blur': `${clear ? 0.5 + options.intensity * 2.5 : 8 + options.intensity * 20}px`,
      '--sw-glass-saturation': `${clear ? 110 + options.intensity * 20 : 110 + options.intensity * 60}%`,
      '--sw-glass-opacity': `${opacity * 100}%`,
      '--sw-glass-highlight': `${0.08 + options.intensity * 0.12}`,
      '--sw-glass-strength': options.intensity,
    } as CSSProperties,
  }), [enabled, clear, opacity, options.intensity, options.variant, options.renderer])
}
