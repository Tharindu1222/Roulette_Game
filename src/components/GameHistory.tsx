import React from 'react';
import { useGameStore } from '../store/gameStore';

export const GameHistory: React.FC = () => {
  const { spinHistory, gameHistory } = useGameStore();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Last 10 Numbers</h2>
        <div className="flex gap-2">
          {spinHistory.slice(0, 10).map((spin, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                spin.color === 'red'
                  ? 'bg-red-600'
                  : spin.color === 'black'
                  ? 'bg-black'
                  : 'bg-green-600'
              }`}
            >
              {spin.number}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Betting History</h2>
        <div className="space-y-2">
          {gameHistory.slice(0, 10).map((history, index) => (
            <div
              key={index}
              className="p-2 bg-gray-100 rounded flex justify-between items-center"
            >
              <div>
                <span className="font-bold">Bet: </span>
                <span>${history.bet.amount} on {history.bet.type}</span>
              </div>
              <div>
                <span className="font-bold">Result: </span>
                <span className={`font-bold ${
                  history.winAmount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {history.winAmount > 0 ? `+$${history.winAmount}` : `-$${history.bet.amount}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};