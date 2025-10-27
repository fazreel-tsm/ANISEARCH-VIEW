import { useEffect, useRef } from 'react'

export function useDebouncedEffect(fn: (signal?: AbortSignal) => void, deps: any[], wait = 250) {
  const handler = useRef<number | null>(null)
  const controller = useRef<AbortController | null>(null)

  useEffect(() => {
    if (handler.current) window.clearTimeout(handler.current)
    if (controller.current) {
      try {
        controller.current.abort()
      } catch (e) {
        // noop
      }
    }
    controller.current = new AbortController()
    handler.current = window.setTimeout(() => {
      fn(controller.current!.signal)
    }, wait)

    return () => {
      if (handler.current) window.clearTimeout(handler.current)
      if (controller.current) controller.current.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
