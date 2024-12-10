import React from 'react';
import { useGameStore } from '../store/gameStore';
import { BetType } from '../types/game';
import { NUMBERS, RED_NUMBERS, BLACK_NUMBERS } from '../utils/roulette';

export const BettingBoard: React.FC = () => {
  const { addBet, balance, isSpinning } = useGameStore();
  const [betAmount, setBetAmount] = React.useState(10);

  const handleBet = (type: BetType, numbers: number[]) => {
    if (isSpinning || balance < betAmount) return;
    addBet({ type, numbers, amount: betAmount });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-green-800 rounded-lg shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-white">
          <span className="font-bold">Balance: </span>
          <span className="text-yellow-400">${balance}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-white">Bet Amount:</label>
          <input
            type="number"
            min="1"
            max={balance}
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-24 px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-13 gap-1 mb-4">
        {NUMBERS.map((number) => (
          <button
            key={number}
            onClick={() => handleBet('straight', [number])}
            className={`aspect-square p-2 text-white font-bold rounded ${
              number === 0
                ? 'bg-green-600 col-span-1'
                : RED_NUMBERS.includes(number)
                ? 'bg-red-600'
                : 'bg-black'
            }`}
            disabled={isSpinning || balance < betAmount}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleBet('red', RED_NUMBERS)}
            className="flex-1 bg-red-600 text-white py-2 rounded"
            disabled={isSpinning || balance < betAmount}
          >
            Red
          </button>
          <button
            onClick={() => handleBet('black', BLACK_NUMBERS)}
            className="flex-1 bg-black text-white py-2 rounded"
            disabled={isSpinning || balance < betAmount}
          >
            Black
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleBet('even', NUMBERS.filter(n => n !== 0 && n % 2 === 0))}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
            disabled={isSpinning || balance < betAmount}
          >
            Even
          </button>
          <button
            onClick={() => handleBet('odd', NUMBERS.filter(n => n % 2 === 1))}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
            disabled={isSpinning || balance < betAmount}
          >
            Odd
          </button>
        </div>
      </div>
    </div>
  );
};