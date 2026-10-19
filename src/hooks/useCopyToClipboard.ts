import { useState } from 'react'

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (value: string) => {
    try {
      const clipboard = typeof window !== 'undefined' ? window.navigator.clipboard : undefined
      if (!clipboard?.writeText) throw new Error('Clipboard API unavailable')
      await clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return { copied, copy }
}
