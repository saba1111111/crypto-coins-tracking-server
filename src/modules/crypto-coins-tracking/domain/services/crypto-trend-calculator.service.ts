export class CryptoTrendCalculator {
  static percentageDifference(current: number, previous: number): number {
    if (previous === 0) return 0;
    const percent = ((current - previous) / previous) * 100;
    return parseFloat(percent.toFixed(2));
  }
}
