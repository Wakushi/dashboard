import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CryptoData } from '../interfaces/cryptoData.interface';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent implements OnInit {

  constructor(private todoService:ToDoService){}

  tokenInfo$!:Observable<CryptoData>

  ngOnInit(): void {

    this.tokenInfo$ = this.todoService.getCryptoData()

  }


}
