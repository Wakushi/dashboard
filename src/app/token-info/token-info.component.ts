import { Component, Input } from '@angular/core';
import { CryptoData } from '../interfaces/cryptoData.interface';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent {

  // This @Input decorator is used to bring our CryptoData class 
  // to help our template to display the required information. 
  
  @Input() tokenInfo!: CryptoData

}
