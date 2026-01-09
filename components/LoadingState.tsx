export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Spinner */}
        <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Generating Your Scripts...
        </h3>
        <p className="text-gray-600">
          Creating 5 platform-optimized scripts with hooks, timing, and production notes
        </p>

        {/* Progress Messages */}
        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <p className="animate-pulse">✓ Analyzing your topic</p>
          <p className="animate-pulse delay-100">✓ Crafting viral hooks</p>
          <p className="animate-pulse delay-200">✓ Structuring content flow</p>
          <p className="animate-pulse delay-300">✓ Optimizing for platforms</p>
        </div>
      </div>
    </div>
  )
}
