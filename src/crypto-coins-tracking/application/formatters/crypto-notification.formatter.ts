// modules/crypto-coins-tracking/application/formatters/crypto-notification.formatter.ts
import { CryptoCoinData } from 'src/crypto-coins-tracking/domain/entities/crypto-coin-data.entity';

export class CryptoNotificationFormatter {
  static format(coins: CryptoCoinData[]): string {
    return coins
      .map(
        (coin) => `Coin: ${coin.name}, Price: ${Math.floor(coin.priceInUSD)}.`,
      )
      .join('\n');
  }
}
