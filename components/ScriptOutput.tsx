'use client'
import { useState } from 'react'
import CopyButton from './CopyButton'
import DownloadButton from './DownloadButton'

interface Script {
  platform: string
  duration: string
  content: string
}

interface ScriptOutputProps {
  scripts: Script[]
  topic: string
}

export default function ScriptOutput({ scripts, topic }: ScriptOutputProps) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: 'Instagram Reel', icon: '📱' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'YouTube', icon: '▶️' },
    { name: 'Carousel', icon: '📊' },
    { name: 'Thread', icon: '🐦' }
  ]

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 min-w-[120px] px-4 py-4 font-semibold transition-colors ${
              activeTab === index
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Script Content */}
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {tabs[activeTab].name} Script
          </h3>
          <div className="flex gap-3">
            <CopyButton content={scripts[activeTab]?.content || ''} />
            <DownloadButton
              content={scripts[activeTab]?.content || ''}
              filename={`${topic}-${tabs[activeTab].name}.txt`}
            />
          </div>
        </div>

        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-6 rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto">
            {scripts[activeTab]?.content || 'Loading...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
