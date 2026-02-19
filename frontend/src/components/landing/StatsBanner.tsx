export default function StatsBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      <div className="card text-center bg-white/80 backdrop-blur">
        <div className="text-4xl font-black text-cook-red mb-2">5+</div>
        <div className="text-sm text-gray-600">Data Sources</div>
        <div className="text-xs text-gray-500 mt-1">RMP, Reddit, Reviews</div>
      </div>
      <div className="card text-center bg-white/80 backdrop-blur">
        <div className="text-4xl font-black text-cook-red mb-2">100%</div>
        <div className="text-sm text-gray-600">AI-Powered</div>
        <div className="text-xs text-gray-500 mt-1">Claude Sonnet 4.5</div>
      </div>
      <div className="card text-center bg-white/80 backdrop-blur">
        <div className="text-4xl font-black text-cook-red mb-2">98%</div>
        <div className="text-sm text-gray-600">Test Pass Rate</div>
        <div className="text-xs text-gray-500 mt-1">46 automated tests</div>
      </div>
      <div className="card text-center bg-white/80 backdrop-blur">
        <div className="text-4xl font-black text-cook-red mb-2">&lt;2s</div>
        <div className="text-sm text-gray-600">Analysis Speed</div>
        <div className="text-xs text-gray-500 mt-1">Instant results</div>
      </div>
    </div>
  );
}
