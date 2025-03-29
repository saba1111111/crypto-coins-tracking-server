import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoCoinTrackingEntity } from './crypto-coin-tracking.entity';
import { CryptoCoinData } from '../../domain/entities/crypto-coin-data.entity';
import { CryptoCoinsTrackingRepository } from '../../domain/repositories/cryptoCoinsTracking.repository';

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
