import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCoinTrackingEntity } from './infrastructure/database/crypto-coin-tracking.entity';
import { RepositoryTokens } from './domain/repositories/repository-tokens';
import { CryptoCoinsTrackingTypeormRepository } from './infrastructure/database/crypto-coin-tracking.repository';
import { TrackCryptoCoinsUseCase } from './application/use-cases/track-crypto-coins.use-case';
import { HttpModule } from '@nestjs/axios';
import { ServiceTokens } from './domain/services/service-tokens';
import { CoinapiProvider } from './infrastructure/providers/coinapi/coinapi.provider';
import { NodeMailerProvider } from './infrastructure/providers/nodemailer/nodemailer.provider';
import { TrackCryptoCoinsCron } from './interface/scheduler/track-crypto-coins.cron';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CryptoCoinTrackingEntity])],
  controllers: [],
  providers: [
    {
      provide: RepositoryTokens.CRYPTO_COINS_TRACKER_REPOSITORY,
      useClass: CryptoCoinsTrackingTypeormRepository,
    },
    {
      provide: ServiceTokens.CRYPTO_COINS_TRACKER_PROVIDER,
      useClass: CoinapiProvider,
    },
    {
      provide: ServiceTokens.NOTIFICATION_PROVIDER,
      useClass: NodeMailerProvider,
    },
    TrackCryptoCoinsUseCase,
    TrackCryptoCoinsCron,
  ],
  exports: [],
})
export class CryptoCoinTrackerModule {}
