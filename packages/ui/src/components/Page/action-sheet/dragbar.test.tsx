import { useRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { eventBus } from '@/common'
import { DragBar } from './dragbar'

function Fixture({ detents = [200, 400, 700] }: { detents?: number[] }) {
  const container = useRef<HTMLDivElement>(null)
  return <div ref={container} data-testid="panel" style={{ height: 400 }}>
    <DragBar container={container} presentationDetents={detents} eventToChangeDetent="test-grabber" />
  </div>
}
function setup(detents?: number[]) {
  const view = render(<Fixture detents={detents} />)
  const panel = screen.getByTestId('panel')
  panel.getBoundingClientRect = () => ({ height: parseFloat(panel.style.height) } as globalThis.DOMRect)
  const change = vi.fn((height: number) => { panel.style.height = `${height}px` })
  eventBus.on('test-grabber', change)
  return { ...view, panel, change, button: screen.getByRole('button', { name: 'Adjust sheet height' }),
    clean: () => eventBus.off('test-grabber', change) }
}
function pointer(button: HTMLElement, type: string, y: number, id = 1, mouseButton = 0) {
  const event = new globalThis.Event(type, { bubbles: true })
  Object.assign(event, { pointerId: id, clientY: y, button: mouseButton })
  fireEvent(button, event)
}
describe('legacy sheet grabber', () => {
  it('cycles the closest detent using accessible button activation', () => {
    const { button, panel, clean } = setup()
    try {
      fireEvent.click(button)
      expect(panel.style.height).toBe('700px')
      fireEvent.click(button)
      expect(panel.style.height).toBe('200px')
      fireEvent.click(button)
      expect(panel.style.height).toBe('400px')
    } finally { clean() }
  })
  it('clamps dragging, ignores other pointers and consumes the resulting pointer click', () => {
    const { button, panel, change, clean } = setup()
    try {
      pointer(button, 'pointermove', 10)
      pointer(button, 'pointerdown', 400, 1, 2)
      pointer(button, 'pointermove', 10)
      expect(change).not.toHaveBeenCalled()
      pointer(button, 'pointerdown', 400)
      pointer(button, 'pointerdown', 300, 2)
      pointer(button, 'pointermove', 300, 2)
      pointer(button, 'pointerup', 300, 2)
      expect(panel.style.height).toBe('400px')
      pointer(button, 'pointermove', 398)
      expect(panel.style.height).toBe('400px')
      pointer(button, 'pointermove', -100)
      expect(panel.style.height).toBe('700px')
      pointer(button, 'pointerup', -100)
      expect(change).toHaveBeenCalledWith(700)
      fireEvent.click(button, { detail: 1 })
      expect(change).toHaveBeenCalledTimes(1)
      // Keyboard activation remains available after a drag.
      fireEvent.click(button, { detail: 0 })
      expect(panel.style.height).toBe('200px')
    } finally { clean() }
  })
  it('restores the starting height on cancellation or lost capture', () => {
    const { button, panel, clean } = setup()
    try {
      for (const end of ['pointercancel', 'lostpointercapture']) {
        pointer(button, 'pointerdown', 400)
        pointer(button, 'pointermove', 1000)
        expect(panel.style.height).toBe('200px')
        pointer(button, end, 1000)
        expect(panel.style.height).toBe('400px')
      }
    } finally { clean() }
  })
  it('does not cycle a single detent', () => {
    const { button, change, clean } = setup([400])
    try { fireEvent.click(button); expect(change).not.toHaveBeenCalled() } finally { clean() }
  })
})
