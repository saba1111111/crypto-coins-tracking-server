import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CryptoCoinData } from 'src/crypto-coins-tracking/domain/entities/crypto-coin-data.entity';
import { CryptoCoins } from 'src/crypto-coins-tracking/domain/entities/crypto-coins.enum';
import { CryptoCoinsTrackingProviderService } from 'src/crypto-coins-tracking/domain/services/crypto-coins-tracking-provider.service';
import { CoinPaiCryptoCoin } from './coinapi-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoinapiProvider implements CryptoCoinsTrackingProviderService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getCryptoCoinsData(coins: CryptoCoins[]): Promise<CryptoCoinData[]> {
    const response = await firstValueFrom(
      this.http.get<CoinPaiCryptoCoin[]>('https://rest.coinapi.io/v1/assets', {
        params: {
          filter_asset_id: coins.join(','),
        },
        headers: {
          'X-CoinAPI-Key': this.configService.get<string>('COINAPI_KEY'),
          Accept: 'text/plain',
        },
      }),
    );

    if (!response.data) {
      return [];
    }

    const currentDate = new Date();
    return response.data.map(
      (cryptoCoin) =>
        new CryptoCoinData(
          cryptoCoin.asset_id as CryptoCoins,
          cryptoCoin.price_usd,
          currentDate,
        ),
    );
  }
}
