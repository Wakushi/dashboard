import { Component, Input, OnInit } from '@angular/core';
import { interval, map, Observable, tap } from 'rxjs';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  imageUrlObj!: {
    urls:{
      raw:string
    }
  };

  customedBgLoaded:boolean = false;

  currentTime$!:Observable<string>;

  tokenInfo = {
    tokenName:'',
    tokenImg:{ small:'' },
    marketData: {
      currentPrice: { usd:0 },
      high_24h: { usd:0 },
      low_24h: { usd:0 }
    }
  };


  constructor(private todoService:ToDoService){};

  ngOnInit(): void {

    this.todoService.getDashboardBgImg().subscribe(

      // This handles the display of the dashboard's background image.

      (data:any) => {
        if(data.errors) {
          this.imageUrlObj = { 
            urls:{ 
              raw:"https://images.unsplash.com/photo-1446034295857-c39f8844fad4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg5NzMzNzc&ixlib=rb-4.0.3&q=80"
            } 
          }
          this.customedBgLoaded = true
        } else {
          this.imageUrlObj = data
          setTimeout(()=> {
            this.customedBgLoaded = true
          }, 300)
        }  
      }
    )

    this.currentTime$ = interval(1000).pipe(
      map(() => {
        return this.getCurrentTime();
      }),
    )

    this.todoService.getCryptoData().subscribe(
      (data => {
        console.log(data)
        this.tokenInfo = data
      })
    )

  }

  getCurrentTime() : string {
    return new Date().toLocaleTimeString("en-us", {timeStyle: "short"})
  }

}
