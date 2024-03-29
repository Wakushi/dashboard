
// This interface is a template for the data received from the getCryptoData()
export interface CryptoData {
    name:string;
    image: { small:string };
    market_data: { 
        current_price: { usd:number }, 
        high_24h: { usd:number }, 
        low_24h: { usd:number } 
    };

}