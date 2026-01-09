import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-8">
            <span className="text-orange-600 font-semibold">🔥 NOCHILL Tools</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Viral Script Generator
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-4">
            Drop a topic. Get 5 ready-to-film scripts.
          </p>
          <p className="text-xl text-gray-600 mb-12">
            No questions asked. Just instant, viral-ready content.
          </p>

          {/* CTA Button */}
          <Link
            href="/generate"
            className="inline-block px-12 py-5 bg-orange-500 text-white text-xl font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Generate Scripts Now →
          </Link>

          {/* Trust Indicators */}
          <div className="mt-8 text-sm text-gray-500">
            <p>✓ 60-second Instagram Reels</p>
            <p>✓ 15-second TikTok Scripts</p>
            <p>✓ 3-minute YouTube Shorts</p>
            <p>✓ 10-slide Carousels</p>
            <p>✓ Twitter/X Threads</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Instant Generation
            </h3>
            <p className="text-gray-600">
              Get 5 platform-optimized scripts in under 30 seconds. No waiting, no back-and-forth.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Film
            </h3>
            <p className="text-gray-600">
              Complete with hooks, timing markers, visual directions, and B-roll suggestions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Multi-Platform
            </h3>
            <p className="text-gray-600">
              One topic becomes content for Instagram, TikTok, YouTube, and Twitter.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Topic</h3>
              <p className="text-gray-600">
                Type in any content idea, problem, or topic you want to create about.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generates Scripts</h3>
              <p className="text-gray-600">
                Our AI creates 5 complete, ready-to-film scripts optimized for each platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy & Film</h3>
              <p className="text-gray-600">
                Copy your favorite script, download it, and start filming immediately.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/generate"
              className="inline-block px-10 py-4 bg-orange-500 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Try It Free Now
            </Link>
          </div>
        </div>

        {/* NOCHILL Frameworks */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Powered by NOCHILL Frameworks
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Battle-tested systems for African content creators
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🧠 R×A×C×U^B Hook Formula
              </h3>
              <p className="text-sm text-gray-600">
                Scientific hook scoring system. Target viral score: 300+. Every hook evaluated for Relevance, Awareness, Clarity, Uniqueness, and Broadened appeal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                💰 PAIDS Monetization
              </h3>
              <p className="text-sm text-gray-600">
                Every script aligns with revenue strategy: Products (40%), Ads (20%), Information (25%), Deals (10%), Services (5%).
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                📖 SEEDS Story Structure
              </h3>
              <p className="text-sm text-gray-600">
                Setup → Escalation → Emotion → Discovery → Summary. Proven flow that keeps viewers watching to the end.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🌍 African Creator Context
              </h3>
              <p className="text-sm text-gray-600">
                Optimized for low CPMs (R18-R120 vs $145-R270), load shedding, data costs, and payment friction unique to African creators.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                😰 Shadow Fears Integration
              </h3>
              <p className="text-sm text-gray-600">
                Taps into deep pain points: Family shame, time anxiety, imposter syndrome, generational poverty, and permanent failure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🤝 Ubuntu Philosophy
              </h3>
              <p className="text-sm text-gray-600">
                "I am because we are." Scripts built for collective success and generational wealth. For children's children.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-600">
          <p className="mb-2 text-lg font-semibold">You understand? Because you understand.</p>
          <p className="text-xl font-bold text-orange-600 mb-4">🌍 For children's children.</p>
          <p className="text-sm">NOCHILL PTY LTD • PAIDS • SEEDS • 4E • R×A×C×U^B • Ubuntu</p>
        </div>
      </div>
    </div>
  )
}
