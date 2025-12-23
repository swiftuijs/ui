/**
 * detect viewport related context
 */
import { createStore } from 'plain-store'
import { isInBrowser, throttle } from 'src/common'
import { eventBus } from 'src/common/event-bus'


export interface IViewportInfo {
  /**
   * viewport width
   */
  width: number
  /**
   * viewport height
   */
  height: number
  /**
   * whether viewport is in landscape mode
   */
  landscape: boolean
}

export const viewportStore = createStore<IViewportInfo|null>(null)

if (isInBrowser) {
  const updateViewport = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const landscape = width > height
    const info = {
      width,
      height,
      landscape,
    }
    viewportStore.setStore(info)
    // Emit event for other stores to listen
    eventBus.emit('viewport:change', info)
  }
  window.addEventListener('resize', throttle(updateViewport), {
    passive: true,
  })
  updateViewport()
}
