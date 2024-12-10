export type BetType = 'straight' | 'split' | 'corner' | 'street' | 'red' | 'black' | 'even' | 'odd';

export interface Bet {
  id: string;
  amount: number;
  type: BetType;
  numbers: number[];
  timestamp: Date;
}

export interface SpinResult {
  number: number;
  color: 'red' | 'black' | 'green';
  timestamp: Date;
}

export interface GameHistory {
  bet: Bet;
  result: SpinResult;
  winAmount: number;
}