import React from 'react';
import { useGameStore } from './store/gameStore';
import { RouletteWheel } from './components/RouletteWheel';
import { BettingBoard } from './components/BettingBoard';
import { GameHistory } from './components/GameHistory';
import { CircleDollarSign } from 'lucide-react';

function App() {
  const { spin, isSpinning, currentBets, spinHistory } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CircleDollarSign className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Roulette Royale</h1>
          </div>
          <p className="text-gray-600">Place your bets and try your luck!</p>
        </div>

        <div className="mb-8">
          <RouletteWheel 
            isSpinning={isSpinning}
            lastNumber={spinHistory[0]?.number}
          />
        </div>

        <div className="mb-8">
          <BettingBoard />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => spin()}
            disabled={isSpinning || currentBets.length === 0}
            className={`px-8 py-3 text-xl font-bold text-white rounded-lg transition
              ${isSpinning || currentBets.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
              }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN!'}
          </button>
        </div>

        <GameHistory />
      </div>
    </div>
  );
}

export default App;