import type { ITransitionConfig } from '@/types/transition'
import { isViewTransitionSupported } from './view-transition'

/**
 * Transition mode: CSS animations or View Transitions API
 */
export type TransitionMode = 'css' | 'view-transition'

/**
 * Transition manager for handling different transition types
 */
export class TransitionManager {
  /**
   * Get transition mode based on config and browser support
   * 
   * @param config - Transition configuration
   * @returns 'view-transition' if supported and configured, otherwise 'css'
   */
  static getTransitionMode(config?: ITransitionConfig): TransitionMode {
    if (!config || !config.type) {
      return 'css'
    }
    
    if (config.type === 'view-transition' && isViewTransitionSupported()) {
      return 'view-transition'
    }
    
    return 'css'
  }

  /**
   * Apply transition configuration to an element
   * 
   * @param element - HTML element to apply transition to
   * @param config - Transition configuration
   */
  static applyTransitionConfig(
    element: HTMLElement,
    config?: ITransitionConfig
  ): void {
    if (!config) return

    // Set view-transition-name if specified
    if (config.viewTransitionName) {
      element.style.viewTransitionName = config.viewTransitionName
    } else {
      // Remove view-transition-name if not specified
      element.style.viewTransitionName = ''
    }

    // CSS animations, not `transition: all`, perform navigation.
    if (config.duration !== undefined && Number.isFinite(config.duration)) {
      element.style.setProperty('--sw-page-duration', `${Math.max(0, config.duration)}ms`)
    } else element.style.removeProperty('--sw-page-duration')
    if (config.easing) element.style.setProperty('--sw-page-easing', config.easing)
    else element.style.removeProperty('--sw-page-easing')
    if (config.direction && config.direction !== 'auto') element.dataset.transitionDirection = config.direction
    else delete element.dataset.transitionDirection

  }

  /**
   * Get default transition config for page type
   * 
   * @param pageType - Type of page ('page' | 'actionsheet')
   * @returns Default transition configuration
   */
  static getDefaultTransition(pageType: 'page' | 'actionsheet'): ITransitionConfig {
    if (pageType === 'actionsheet') {
      return {
        type: 'slide',
        duration: 320,
      }
    }
    
    return {
      type: 'slide',
      duration: 350,
      easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
    }
  }

  /**
   * Merge user config with defaults
   * 
   * @param userConfig - User-provided transition config
   * @param defaultConfig - Default config for page type
   * @returns Merged configuration
   */
  static mergeTransitionConfig(
    userConfig?: ITransitionConfig,
    defaultConfig?: ITransitionConfig
  ): ITransitionConfig {
    if (!userConfig && !defaultConfig) {
      return { type: 'slide' }
    }
    
    if (!userConfig) return defaultConfig!
    if (!defaultConfig) return userConfig
    
    return {
      ...defaultConfig,
      ...userConfig,
      // Direction should be explicitly set if provided
      direction: userConfig.direction ?? defaultConfig.direction,
    }
  }
}

