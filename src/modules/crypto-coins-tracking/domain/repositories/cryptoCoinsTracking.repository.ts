import { CryptoCoinData } from '../entities/crypto-coin-data.entity';
import { CryptoCoins } from '../entities/crypto-coins.enum';

export interface CryptoCoinsTrackingRepository {
  trackCryptoCoins(data: CryptoCoinData[]): Promise<void>;
  getCryptoCoinFromDate(
    coin: CryptoCoins,
    daysAgo: number,
  ): Promise<CryptoCoinData | null>;
}
