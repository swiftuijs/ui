import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

import {
  tokenCssVariables,
  tokens,
} from './index'

describe('tokens', () => {
  it('exports the design token source of truth', () => {
    expect(tokens).toMatchInlineSnapshot(`
      {
        "colors": {
          "background": {
            "primary": "#FFFFFF",
            "secondary": "#F2F2F7",
            "tertiary": "#FFFFFF",
          },
          "blue": {
            "base": "#007AFF",
            "dark": "#0051D5",
            "light": "#5AC8FA",
          },
          "gray": {
            "base": "#8E8E93",
            "dark": "#636366",
            "light": "#C7C7CC",
            "lighter": "#E5E5EA",
          },
          "label": {
            "primary": "#000000",
            "secondary": "#8E8E93",
            "tertiary": "#C7C7CC",
          },
          "separator": {
            "default": "#C6C6C8",
            "opaque": "#38383A",
          },
        },
        "motion": {
          "duration": {
            "fast": "0.15s",
            "normal": "0.25s",
            "slow": "0.35s",
          },
          "easing": {
            "standard": "ease-out",
          },
          "transition": {
            "fast": "0.15s ease-out",
            "normal": "0.25s ease-out",
            "slow": "0.35s ease-out",
          },
        },
        "spacing": {
          "2xl": "24px",
          "3xl": "32px",
          "lg": "16px",
          "md": "12px",
          "sm": "8px",
          "xl": "20px",
          "xs": "4px",
        },
        "typography": {
          "fontFamily": {
            "sans": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
          },
          "fontSize": {
            "body": "17px",
            "callout": "16px",
            "caption1": "12px",
            "caption2": "11px",
            "footnote": "13px",
            "headline": "17px",
            "largeTitle": "34px",
            "subheadline": "15px",
            "title1": "28px",
            "title2": "22px",
            "title3": "20px",
          },
          "fontWeight": {
            "bold": 700,
            "medium": 500,
            "regular": 400,
            "semibold": 600,
          },
          "lineHeight": {
            "normal": 1.4,
            "relaxed": 1.6,
            "tight": 1.2,
          },
        },
      }
    `)
  })

  it('defines CSS custom properties that mirror token keys in Sass', () => {
    expect(tokenCssVariables).toMatchInlineSnapshot(`
      {
        "colors.background.primary": "--sw-color-background-primary",
        "colors.background.secondary": "--sw-color-background-secondary",
        "colors.background.tertiary": "--sw-color-background-tertiary",
        "colors.blue.base": "--sw-color-blue-base",
        "colors.blue.dark": "--sw-color-blue-dark",
        "colors.blue.light": "--sw-color-blue-light",
        "colors.gray.base": "--sw-color-gray-base",
        "colors.gray.dark": "--sw-color-gray-dark",
        "colors.gray.light": "--sw-color-gray-light",
        "colors.gray.lighter": "--sw-color-gray-lighter",
        "colors.label.primary": "--sw-color-label-primary",
        "colors.label.secondary": "--sw-color-label-secondary",
        "colors.label.tertiary": "--sw-color-label-tertiary",
        "colors.separator.default": "--sw-color-separator-default",
        "colors.separator.opaque": "--sw-color-separator-opaque",
        "motion.duration.fast": "--sw-motion-duration-fast",
        "motion.duration.normal": "--sw-motion-duration-normal",
        "motion.duration.slow": "--sw-motion-duration-slow",
        "motion.easing.standard": "--sw-motion-easing-standard",
        "motion.transition.fast": "--sw-motion-transition-fast",
        "motion.transition.normal": "--sw-motion-transition-normal",
        "motion.transition.slow": "--sw-motion-transition-slow",
        "spacing.2xl": "--sw-spacing-2xl",
        "spacing.3xl": "--sw-spacing-3xl",
        "spacing.lg": "--sw-spacing-lg",
        "spacing.md": "--sw-spacing-md",
        "spacing.sm": "--sw-spacing-sm",
        "spacing.xl": "--sw-spacing-xl",
        "spacing.xs": "--sw-spacing-xs",
        "typography.fontFamily.sans": "--sw-typography-font-family-sans",
        "typography.fontSize.body": "--sw-typography-font-size-body",
        "typography.fontSize.callout": "--sw-typography-font-size-callout",
        "typography.fontSize.caption1": "--sw-typography-font-size-caption1",
        "typography.fontSize.caption2": "--sw-typography-font-size-caption2",
        "typography.fontSize.footnote": "--sw-typography-font-size-footnote",
        "typography.fontSize.headline": "--sw-typography-font-size-headline",
        "typography.fontSize.largeTitle": "--sw-typography-font-size-large-title",
        "typography.fontSize.subheadline": "--sw-typography-font-size-subheadline",
        "typography.fontSize.title1": "--sw-typography-font-size-title1",
        "typography.fontSize.title2": "--sw-typography-font-size-title2",
        "typography.fontSize.title3": "--sw-typography-font-size-title3",
        "typography.fontWeight.bold": "--sw-typography-font-weight-bold",
        "typography.fontWeight.medium": "--sw-typography-font-weight-medium",
        "typography.fontWeight.regular": "--sw-typography-font-weight-regular",
        "typography.fontWeight.semibold": "--sw-typography-font-weight-semibold",
        "typography.lineHeight.normal": "--sw-typography-line-height-normal",
        "typography.lineHeight.relaxed": "--sw-typography-line-height-relaxed",
        "typography.lineHeight.tight": "--sw-typography-line-height-tight",
      }
    `)

    const commonStylesheet = fs.readFileSync(path.resolve(process.cwd(), 'src/style/common.scss'), 'utf8')

    for (const cssVariable of Object.values(tokenCssVariables)) {
      expect(commonStylesheet).toContain(`${cssVariable}:`)
    }
  })

  it('does not override page-level html or body theme surfaces', () => {
    const commonStylesheet = fs.readFileSync(path.resolve(process.cwd(), 'src/style/common.scss'), 'utf8')

    expect(commonStylesheet).not.toMatch(/\bhtml,\s*body\s*\{/s)
    expect(commonStylesheet).not.toMatch(/\bbody\s*\{[^}]*background-color:/s)
    expect(commonStylesheet).not.toMatch(/\bbody\s*\{[^}]*color:/s)
    expect(commonStylesheet).not.toMatch(/\bhtml\s*\{[^}]*font-family:/s)
  })

  it('supports explicit theme switching through data-theme attributes', () => {
    const commonStylesheet = fs.readFileSync(path.resolve(process.cwd(), 'src/style/common.scss'), 'utf8')

    expect(commonStylesheet).toContain("[data-theme='light']")
    expect(commonStylesheet).toContain("[data-theme='dark']")
    expect(commonStylesheet).toContain(':root.dark')
    expect(commonStylesheet).toContain('.dark')
    expect(commonStylesheet).toMatch(/(:root\.dark|\[data-theme='dark'\]|\.dark)[\s\S]*color-scheme:\s*dark;/)
    expect(commonStylesheet).toContain('--sw-color-background-primary: #000000;')
    expect(commonStylesheet).toContain('--sw-color-label-primary: #FFFFFF;')
  })
})
