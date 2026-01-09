'use client'
import { useState } from 'react'
import TopicInput from '@/components/TopicInput'
import ScriptOutput from '@/components/ScriptOutput'
import LoadingState from '@/components/LoadingState'

interface Script {
  platform: string
  duration: string
  content: string
}

export default function GeneratePage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (inputTopic: string) => {
    setIsLoading(true)
    setError('')
    setTopic(inputTopic)

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: inputTopic }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate scripts')
      }

      const data = await response.json()
      setScripts(data.scripts)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      console.error('Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            NOCHILL Viral Script Generator
          </h1>
          <p className="text-xl text-gray-600">
            Drop a topic. Get 5 ready-to-film scripts. No questions asked.
          </p>
        </div>

        {/* Input */}
        <div className="flex justify-center mb-12">
          <TopicInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Script Output */}
        {!isLoading && scripts.length > 0 && (
          <div className="flex justify-center">
            <ScriptOutput scripts={scripts} topic={topic} />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && scripts.length === 0 && !error && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">
              Enter a topic above to generate your viral scripts ⬆️
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
