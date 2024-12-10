import { create } from 'zustand';
import { Bet, SpinResult, GameHistory } from '../types/game';
import { getNumberColor, calculateWinnings } from '../utils/roulette';

interface GameState {
  balance: number;
  currentBets: Bet[];
  spinHistory: SpinResult[];
  gameHistory: GameHistory[];
  isSpinning: boolean;
  addBet: (bet: Omit<Bet, 'id' | 'timestamp'>) => void;
  spin: () => Promise<void>;
  updateBalance: (amount: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  balance: 1000,
  currentBets: [],
  spinHistory: [],
  gameHistory: [],
  isSpinning: false,

  addBet: (bet) => {
    const { balance } = get();
    if (balance < bet.amount) return;

    const newBet: Bet = {
      ...bet,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    set((state) => ({
      currentBets: [...state.currentBets, newBet],
      balance: state.balance - bet.amount,
    }));
  },

  spin: async () => {
    const { currentBets } = get();
    if (currentBets.length === 0 || get().isSpinning) return;

    set({ isSpinning: true });

    // Simulate spin delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const winningNumber = Math.floor(Math.random() * 37);
    const result: SpinResult = {
      number: winningNumber,
      color: getNumberColor(winningNumber),
      timestamp: new Date(),
    };

    const gameHistory: GameHistory[] = currentBets.map((bet) => ({
      bet,
      result,
      winAmount: calculateWinnings(bet, winningNumber),
    }));

    const totalWinnings = gameHistory.reduce((sum, h) => sum + h.winAmount, 0);

    set((state) => ({
      spinHistory: [result, ...state.spinHistory],
      gameHistory: [...gameHistory, ...state.gameHistory],
      balance: state.balance + totalWinnings,
      currentBets: [],
      isSpinning: false,
    }));
  },

  updateBalance: (amount) => {
    set((state) => ({ balance: state.balance + amount }));
  },
}));