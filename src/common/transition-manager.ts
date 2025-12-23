import type { ITransitionConfig } from 'src/types/transition'
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

    // Apply custom duration and easing if provided
    if (config.duration || config.easing) {
      const duration = config.duration ? `${config.duration}ms` : undefined
      const easing = config.easing
      
      if (duration || easing) {
        element.style.transition = [
          duration ? `all ${duration}` : undefined,
          easing ? easing : undefined
        ].filter(Boolean).join(' ')
      }
    }
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
        type: 'fade',
        duration: 200,
      }
    }
    
    return {
      type: 'slide',
      duration: 300,
      easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
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

