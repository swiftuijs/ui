import { useEffect, useState, type RefObject } from 'react'
import { afterAnimations } from '@/common/motion'

/** Keep a floating surface mounted for its closed-state animation; reopen cancels removal. */
export function useMotionPresence(open: boolean, ref: RefObject<HTMLElement | null>) {
  const [present, setPresent] = useState(open)
  useEffect(() => {
    if (ref.current) ref.current.inert = !open
    if (open) { setPresent(true); return }
    if (!ref.current) { setPresent(false); return }
    return afterAnimations(ref.current, () => setPresent(false))
  }, [open, ref])
  return open || present
}
