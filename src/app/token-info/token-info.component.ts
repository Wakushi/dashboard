import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent {

  @Input() tokenInfo!: {
    tokenName:string,
    tokenImg:{ small:string },
    marketData: {
      currentPrice: { usd:number },
      high_24h: { usd:number },
      low_24h: { usd:number }
    }
  }

}
