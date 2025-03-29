import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('crypto_prices')
export class CryptoCoinTrackingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coin: string;

  @Column('float')
  priceUsd: number;

  @CreateDateColumn()
  timestamp: Date;
}
