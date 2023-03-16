export interface CryptoData {
    tokenImg: { small:string };
    tokenName: string;
    marketData: {
        currentPrice: { usd: number };
        high_24h: { usd: number };
        low_24h: { usd: number };
    }
}