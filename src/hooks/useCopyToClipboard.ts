import { useState } from 'react'

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const copy = async (value: string) => {
    setCopyError(false)
    try {
      const clipboard = typeof window !== 'undefined' ? window.navigator.clipboard : undefined
      if (!clipboard?.writeText) throw new Error('Clipboard API unavailable')
      await clipboard.writeText(value)
      setCopied(true)
      setCopyError(false)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), 2600)
    }
  }

  return { copied, copyError, copy }
}
