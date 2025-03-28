import { CryptoCoinData } from '../entities/crypto-coin-data.entity';
import { CryptoCoins } from '../entities/crypto-coins.enum';

export interface CryptoCoinsTrackingProviderService {
  getCryptoCoinsData(coins: CryptoCoins[]): Promise<CryptoCoinData[]>;
}
