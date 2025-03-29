import { Inject, Injectable } from '@nestjs/common';

import { CryptoNotificationFormatter } from '../formatters/crypto-notification.formatter';
import { RepositoryTokens } from '../../domain/repositories/repository-tokens';
import { CryptoCoinsTrackingRepository } from '../../domain/repositories/cryptoCoinsTracking.repository';
import { CryptoCoinsTrackingProviderService } from '../../domain/services/crypto-coins-tracking-provider.service';
import { NotificationProviderService } from '../../domain/services/notification-provider.service';
import { ServiceTokens } from '../../domain/services/service-tokens';
import { CryptoCoins } from '../../domain/entities/crypto-coins.enum';

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
