import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoCoinsTrackingRepository } from 'src/crypto-coins-tracking/domain/repositories/cryptoCoinsTracking.repository';
import { Repository } from 'typeorm';
import { CryptoCoinTrackingEntity } from './crypto-coin-tracking.entity';
import { CryptoCoinData } from 'src/crypto-coins-tracking/domain/entities/crypto-coin-data.entity';

@Injectable()
export class CryptoCoinsTrackingTypeormRepository
  implements CryptoCoinsTrackingRepository
{
  constructor(
    @InjectRepository(CryptoCoinTrackingEntity)
    private readonly repo: Repository<CryptoCoinTrackingEntity>,
  ) {}

  async trackCryptoCoins(coins: CryptoCoinData[]): Promise<void> {
    const records = coins.map((p) =>
      this.repo.create({
        coin: p.name,
        priceUsd: p.priceInUSD,
        timestamp: p.timestamp,
      }),
    );

    await this.repo.save(records);
  }
}
