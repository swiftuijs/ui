import { expect, it, vi } from 'vitest'
import { createFrameUpdate } from './frame-update'

it('measures the latest event state once per frame and cancels pending work', () => {
  let nextFrame: (time: number) => void = () => {}
  const request = vi.fn((callback: typeof nextFrame) => { nextFrame = callback; return 7 })
  const cancel = vi.fn()
  vi.stubGlobal('requestAnimationFrame', request)
  vi.stubGlobal('cancelAnimationFrame', cancel)
  let position = 0
  const update = vi.fn(() => position)
  try {
    const task = createFrameUpdate(update)
    for (let i = 0; i < 100; i++) { position = i; task.schedule() }
    expect(request).toHaveBeenCalledOnce()
    expect(update).not.toHaveBeenCalled()
    nextFrame(0)
    expect(update).toHaveReturnedWith(99)
    task.schedule()
    expect(request).toHaveBeenCalledTimes(2)
    task.cancel()
    expect(cancel).toHaveBeenCalledWith(7)
  } finally { vi.unstubAllGlobals() }
})
