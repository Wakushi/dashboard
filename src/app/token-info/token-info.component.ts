import { Component, Input } from '@angular/core';
import { CryptoData } from '../interfaces/cryptoData.interface';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent {

  @Input() tokenInfo!: CryptoData

}
