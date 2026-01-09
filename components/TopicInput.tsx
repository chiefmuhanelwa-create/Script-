'use client'
import { useState } from 'react'

interface TopicInputProps {
  onGenerate: (topic: string) => void
  isLoading: boolean
}

export default function TopicInput({ onGenerate, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onGenerate(topic)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic (e.g., 'Brand deals', 'Tax mistakes', 'Finding your niche')"
          className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Scripts'}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        No questions asked. Just instant, ready-to-film scripts.
      </p>
    </form>
  )
}
