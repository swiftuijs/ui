// Web timing inspired by Apple's purposeful, brief and interruptible motion.
// Cubic curves approximate settling; they are not SwiftUI physics springs.
export const motion = {
  duration: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.35s',
    enter: '0.32s',
    exit: '0.2s',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0.32, 0.72, 0, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  transition: {
    fast: '0.15s cubic-bezier(0.2, 0, 0, 1)',
    normal: '0.25s cubic-bezier(0.2, 0, 0, 1)',
    slow: '0.35s cubic-bezier(0.32, 0.72, 0, 1)',
  },
} as const
