import { CryptoCoinData } from '../entities/crypto-coin-data.entity';

export interface CryptoCoinsTrackingRepository {
  trackCryptoCoins(data: CryptoCoinData[]): Promise<void>;
}
