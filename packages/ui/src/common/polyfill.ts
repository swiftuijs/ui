import { globalObject } from './fn-utils'

// safari does not support requestIdleCallback
globalObject.requestIdleCallback = globalObject.requestIdleCallback || globalObject.requestAnimationFrame || setTimeout