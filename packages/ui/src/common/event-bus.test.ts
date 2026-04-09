import { describe, it, expect, beforeEach, vi } from 'vitest'
import { eventBus } from './event-bus'

describe('event-bus', () => {
  beforeEach(() => {
    // Clear all events before each test
    eventBus._events = {}
  })

  describe('on', () => {
    it('should register an event handler', () => {
      const handler = () => {}
      eventBus.on('test', handler)
      expect(eventBus._events['test']).toContain(handler)
    })

    it('should register multiple handlers for the same event', () => {
      const handler1 = () => {}
      const handler2 = () => {}
      eventBus.on('test', handler1)
      eventBus.on('test', handler2)
      expect(eventBus._events['test']).toHaveLength(2)
      expect(eventBus._events['test']).toContain(handler1)
      expect(eventBus._events['test']).toContain(handler2)
    })
  })

  describe('off', () => {
    it('should remove a specific handler', () => {
      const handler1 = () => {}
      const handler2 = () => {}
      eventBus.on('test', handler1)
      eventBus.on('test', handler2)
      eventBus.off('test', handler1)
      expect(eventBus._events['test']).toHaveLength(1)
      expect(eventBus._events['test']).not.toContain(handler1)
      expect(eventBus._events['test']).toContain(handler2)
    })

    it('should remove all handlers when no handler is specified', () => {
      const handler1 = () => {}
      const handler2 = () => {}
      eventBus.on('test', handler1)
      eventBus.on('test', handler2)
      eventBus.off('test')
      expect(eventBus._events['test']).toBeUndefined()
    })

    it('should do nothing if event does not exist', () => {
      eventBus.off('nonexistent')
      expect(eventBus._events['nonexistent']).toBeUndefined()
    })

    it('should do nothing if handler does not exist', () => {
      const handler1 = () => {}
      const handler2 = () => {}
      eventBus.on('test', handler1)
      eventBus.off('test', handler2)
      expect(eventBus._events['test']).toHaveLength(1)
      expect(eventBus._events['test']).toContain(handler1)
    })
  })

  describe('emit', () => {
    it('should call all registered handlers', () => {
      let callCount = 0
      const handler1 = () => { callCount++ }
      const handler2 = () => { callCount++ }
      eventBus.on('test', handler1)
      eventBus.on('test', handler2)
      eventBus.emit('test')
      expect(callCount).toBe(2)
    })

    it('should pass arguments to handlers', () => {
      let receivedArgs: unknown[] = []
      const handler = (...args: unknown[]) => {
        receivedArgs = args
      }
      eventBus.on('test', handler)
      eventBus.emit('test', 'arg1', 'arg2', 123)
      expect(receivedArgs).toEqual(['arg1', 'arg2', 123])
    })

    it('should do nothing if event does not exist', () => {
      expect(() => {
        eventBus.emit('nonexistent')
      }).not.toThrow()
    })

    it('should handle errors in handlers gracefully', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const handler1 = () => {
        throw new Error('test error')
      }
      const handler2 = () => {}
      eventBus.on('test', handler1)
      eventBus.on('test', handler2)
      expect(() => {
        eventBus.emit('test')
      }).not.toThrow()
      expect(consoleWarnSpy).toHaveBeenCalledWith('event bus error', 'test', expect.any(Error))
      consoleWarnSpy.mockRestore()
    })
  })
})

