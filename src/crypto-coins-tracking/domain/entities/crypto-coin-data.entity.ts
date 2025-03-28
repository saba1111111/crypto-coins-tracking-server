import { CryptoCoins } from './crypto-coins.enum';

export class CryptoCoinData {
  constructor(
    public readonly name: CryptoCoins,
    public readonly priceInUSD: number,
    public readonly timestamp: Date,
  ) {}
}
