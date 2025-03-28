import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TrackCryptoCoinsUseCase } from 'src/crypto-coins-tracking/application/use-cases/track-crypto-coins.use-case';

@Injectable()
export class TrackCryptoCoinsCron {
  constructor(private readonly trackPriceUseCase: TrackCryptoCoinsUseCase) {}

  @Cron('* * * * *')
  async handleCron() {
    console.log('Running cron job...');
    await this.trackPriceUseCase.execute();
  }
}
