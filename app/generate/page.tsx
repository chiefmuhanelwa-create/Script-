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

interface ErrorDetails {
  error: string
  details?: string
  fix?: string
  status?: number
}

export default function GeneratePage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ErrorDetails | null>(null)

  const handleGenerate = async (inputTopic: string) => {
    setIsLoading(true)
    setError(null)
    setTopic(inputTopic)

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: inputTopic }),
      })

      const data = await response.json()

      if (!response.ok) {
        // API returned detailed error
        setError({
          error: data.error || 'Failed to generate scripts',
          details: data.details,
          fix: data.fix,
          status: data.status || response.status
        })
        return
      }

      setScripts(data.scripts)
    } catch (err: any) {
      setError({
        error: 'Network Error',
        details: err.message || 'Could not connect to the server',
        fix: 'Check if the dev server is running (npm run dev)'
      })
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
          <div className="max-w-3xl mx-auto mb-8 p-6 bg-red-50 border-2 border-red-400 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">{error.error}</h3>
                {error.details && (
                  <p className="text-red-800 mb-3">{error.details}</p>
                )}
                {error.fix && (
                  <div className="bg-white p-4 rounded border border-red-200 mb-3">
                    <p className="font-semibold text-red-900 mb-1">💡 How to Fix:</p>
                    <p className="text-red-800">{error.fix}</p>
                  </div>
                )}
                {error.status && (
                  <p className="text-sm text-red-600">Error Code: {error.status}</p>
                )}
                <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  <p className="font-semibold mb-2">📋 Common Solutions:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Restart your dev server: Stop (Ctrl+C) and run <code className="bg-gray-200 px-1 rounded">npm run dev</code></li>
                    <li>Check .env.local exists and has ANTHROPIC_API_KEY</li>
                    <li>Verify API key at <a href="https://console.anthropic.com/settings/keys" target="_blank" className="text-blue-600 underline">console.anthropic.com</a></li>
                    <li>Check credits at <a href="https://console.anthropic.com/settings/billing" target="_blank" className="text-blue-600 underline">billing page</a></li>
                  </ul>
                </div>
              </div>
            </div>
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
