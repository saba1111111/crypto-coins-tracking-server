import { Inject, Injectable } from '@nestjs/common';

import {
  CoinWithTrend,
  CryptoNotificationFormatter,
} from '../formatters/crypto-notification.formatter';
import { RepositoryTokens } from '../../domain/repositories/repository-tokens';
import { CryptoCoinsTrackingRepository } from '../../domain/repositories/cryptoCoinsTracking.repository';
import { CryptoCoinsTrackingProviderService } from '../../domain/services/crypto-coins-tracking-provider.service';
import { NotificationProviderService } from '../../domain/services/notification-provider.service';
import { ServiceTokens } from '../../domain/services/service-tokens';
import { CryptoCoins } from '../../domain/entities/crypto-coins.enum';
import { CryptoTrendCalculator } from '../../domain/services/crypto-trend-calculator.service';
import { CryptoCoinData } from '../../domain/entities/crypto-coin-data.entity';

@Injectable()
export class TrackCryptoCoinsUseCase {
  constructor(
    @Inject(RepositoryTokens.CRYPTO_COINS_TRACKER_REPOSITORY)
    private readonly repository: CryptoCoinsTrackingRepository,
    @Inject(ServiceTokens.CRYPTO_COINS_TRACKER_PROVIDER)
    private readonly provider: CryptoCoinsTrackingProviderService,
    @Inject(ServiceTokens.NOTIFICATION_PROVIDER)
    private readonly notifier: NotificationProviderService,
  ) {}

  async execute() {
    try {
      const coins = await this.fetchAndStoreCoins();
      const coinsWithTrends = await this.buildCoinsWithTrend(coins);
      const message =
        CryptoNotificationFormatter.formatWithTrends(coinsWithTrends);
      await this.sendNotification(message);
    } catch (error) {
      console.error(error);
    }
  }

  private async fetchAndStoreCoins(): Promise<CryptoCoinData[]> {
    const coins = await this.provider.getCryptoCoinsData([
      CryptoCoins.BITCOIN,
      CryptoCoins.ETHEREUM,
      CryptoCoins.SOLANA,
    ]);

    await this.repository.trackCryptoCoins(coins);
    return coins;
  }

  private async buildCoinsWithTrend(
    coins: CryptoCoinData[],
  ): Promise<CoinWithTrend[]> {
    const result: CoinWithTrend[] = [];

    for (const coin of coins) {
      const current = coin.priceInUSD;

      const price1d = await this.repository.getCryptoCoinFromDate(coin.name, 1);
      const price7d = await this.repository.getCryptoCoinFromDate(coin.name, 7);
      const price30d = await this.repository.getCryptoCoinFromDate(
        coin.name,
        30,
      );

      result.push({
        name: coin.name,
        price: current,
        trend1d: price1d
          ? CryptoTrendCalculator.percentageDifference(
              current,
              price1d.priceInUSD,
            )
          : undefined,
        trend7d: price7d
          ? CryptoTrendCalculator.percentageDifference(
              current,
              price7d.priceInUSD,
            )
          : undefined,
        trend30d: price30d
          ? CryptoTrendCalculator.percentageDifference(
              current,
              price30d.priceInUSD,
            )
          : undefined,
      });
    }

    return result;
  }

  private async sendNotification(message: string): Promise<void> {
    await this.notifier.notify({
      to: 'sabapachulia123@gmail.com',
      topic: 'Hi Champ, daily crypto coins data. Great day! :)',
      message,
    });
  }
}
