/**
 * detect viewport related context
 */
import { createStore } from 'plain-store'
import { isInBrowser, throttle } from 'src/common'


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
  }
  window.addEventListener('resize', throttle(updateViewport), {
    passive: true,
  })
  updateViewport()
}
