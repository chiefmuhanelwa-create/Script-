'use client'
import { useState } from 'react'

interface CopyButtonProps {
  content: string
}

export default function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      {copied ? '✓ Copied!' : '📋 Copy'}
    </button>
  )
}
