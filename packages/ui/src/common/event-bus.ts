/**
 * event bus for inner communication
 */

export const eventBus = {
  _events: {} as Record<string, Array<IFn>>,
  on(eventName: string, fn: IFn) {
    if (!this._events[eventName]) {
      this._events[eventName] = []
    }
    this._events[eventName].push(fn)
  },
  off(eventName: string, fn?: IFn) {
    if (!this._events[eventName]) return
    if (!fn) {
      delete this._events[eventName]
      return
    }
    this._events[eventName] = this._events[eventName].filter(f => f !== fn)
  },
  emit(eventName: string, ...args: unknown[]) {
    if (!this._events[eventName]) {
      return
    }
    this._events[eventName].forEach(fn => {
      try {
        fn(...args)
      } catch (error) {
        console.warn('event bus error', eventName, error)
      }
    })
  },
}