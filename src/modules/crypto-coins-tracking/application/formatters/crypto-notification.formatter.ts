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
        const price = `$${coin.price.toLocaleString()}`;

        const trendLine = (label: string, percent?: number): string | null => {
          if (percent === undefined || percent === null) return null;

          const sign = percent > 0 ? '▲' : percent < 0 ? '▼' : '→';
          const signPrefix = percent > 0 ? '+' : '';
          return `• ${label}: ${sign} ${signPrefix}${percent.toFixed(1)}%`;
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
