import { CryptoTrendCalculator } from '../../domain/services/crypto-trend-calculator.service';

export type CoinWithTrend = {
  name: string;
  price: number;
  trend1d?: number;
  trend7d?: number;
  trend30d?: number;
};

export class CryptoNotificationFormatter {
  static formatWithTrends(coins: CoinWithTrend[]): string {
    return coins
      .map((coin) => {
        const emoji = '🪙';
        const price = `$${Math.floor(coin.price).toLocaleString()}`;

        const trendLine = (label: string, oldPrice?: number): string | null => {
          if (oldPrice === undefined || oldPrice === null) return null;

          const percent = CryptoTrendCalculator.percentageDifference(
            coin.price,
            oldPrice,
          );
          const sign = percent > 0 ? '▲' : percent < 0 ? '▼' : '→';
          const signPrefix = percent > 0 ? '+' : '';
          const oldPriceFormatted = `$${Math.floor(oldPrice).toLocaleString()}`;

          return `• ${label}: ${sign} ${signPrefix}${percent.toFixed(1)}% (${oldPriceFormatted})`;
        };

        const lines = [
          `${emoji} ${coin.name}: ${price}`,
          trendLine('1d', coin.trend1d),
          trendLine('7d', coin.trend7d),
          trendLine('30d', coin.trend30d),
        ].filter(Boolean);

        return lines.join('\n');
      })
      .join('\n\n');
  }
}
