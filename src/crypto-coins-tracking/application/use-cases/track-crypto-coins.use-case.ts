import { Inject, Injectable } from '@nestjs/common';
import { CryptoCoins } from 'src/crypto-coins-tracking/domain/entities/crypto-coins.enum';
import { CryptoCoinsTrackingRepository } from 'src/crypto-coins-tracking/domain/repositories/cryptoCoinsTracking.repository';
import { RepositoryTokens } from 'src/crypto-coins-tracking/domain/repositories/repository-tokens';
import { CryptoCoinsTrackingProviderService } from 'src/crypto-coins-tracking/domain/services/crypto-coins-tracking-provider.service';
import { NotificationProviderService } from 'src/crypto-coins-tracking/domain/services/notification-provider.service';
import { ServiceTokens } from 'src/crypto-coins-tracking/domain/services/service-tokens';
import { CryptoNotificationFormatter } from '../formatters/crypto-notification.formatter';

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
      const coins = await this.provider.getCryptoCoinsData([
        CryptoCoins.BITCOIN,
        CryptoCoins.ETHEREUM,
        CryptoCoins.SOLANA,
      ]);

      await this.repository.trackCryptoCoins(coins);
      const message = CryptoNotificationFormatter.format(coins);

      await this.notifier.notify({
        to: 'sabapachulia123@gmail.com',
        topic: 'Hi Champ, daily crypto coins data. Great day! :)',
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
