'use client'

interface DownloadButtonProps {
  content: string
  filename: string
}

export default function DownloadButton({ content, filename }: DownloadButtonProps) {
  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      ⬇️ Download
    </button>
  )
}
