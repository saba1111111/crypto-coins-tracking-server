import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CryptoCoinTrackingEntity } from './crypto-coin-tracking.entity';
import { CryptoCoinData } from '../../domain/entities/crypto-coin-data.entity';
import { CryptoCoinsTrackingRepository } from '../../domain/repositories/cryptoCoinsTracking.repository';
import { CryptoCoins } from '../../domain/entities/crypto-coins.enum';

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

  async getCryptoCoinFromDate(
    coin: string,
    daysAgo: number,
  ): Promise<CryptoCoinData | null> {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    const result = await this.repo.findOne({
      where: {
        coin,
        timestamp: LessThanOrEqual(targetDate),
      },
      order: {
        timestamp: 'DESC',
      },
    });

    if (!result) return null;

    return new CryptoCoinData(
      result.coin as CryptoCoins,
      result.priceUsd,
      result.timestamp,
    );
  }
}
