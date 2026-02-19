import { Flame, Skull, Circle, CircleDot, Disc } from 'lucide-react';

export default function CookScaleLegend() {
  return (
    <div className="card bg-gradient-to-r from-blue-50 to-red-50 mb-16">
      <h2 className="text-3xl font-bold text-center mb-6">The Cooked Scale</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
          <div className="mb-2"><Circle className="w-12 h-12 text-green-600 mx-auto" strokeWidth={3} /></div>
          <div className="font-bold text-lg mb-1">0-20: Raw</div>
          <p className="text-sm">Easy semester, manageable workload</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
          <div className="mb-2"><CircleDot className="w-12 h-12 text-yellow-600 mx-auto" strokeWidth={3} /></div>
          <div className="font-bold text-lg mb-1">21-35: Lightly Toasted</div>
          <p className="text-sm">Some challenges but doable</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
          <div className="mb-2"><Disc className="w-12 h-12 text-orange-500 mx-auto" strokeWidth={2} /></div>
          <div className="font-bold text-lg mb-1">36-50: Medium</div>
          <p className="text-sm">Moderate difficulty, balanced</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-300">
          <div className="mb-2"><Disc className="w-12 h-12 text-red-500 mx-auto fill-current" /></div>
          <div className="font-bold text-lg mb-1">51-65: Well Done</div>
          <p className="text-sm">Challenging semester ahead</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
          <div className="mb-2"><Flame className="w-12 h-12 text-cook-red mx-auto" /></div>
          <div className="font-bold text-lg mb-1">66-80: Extra Crispy</div>
          <p className="text-sm">Very difficult, plan accordingly</p>
        </div>
        <div className="bg-red-200 p-4 rounded-lg border-2 border-red-500">
          <div className="mb-2"><Skull className="w-12 h-12 text-gray-800 mx-auto" /></div>
          <div className="font-bold text-lg mb-1">81-100: Absolutely Burnt</div>
          <p className="text-sm">Extremely hard—good luck!</p>
        </div>
      </div>
    </div>
  );
}
