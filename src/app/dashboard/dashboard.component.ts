import { Component, Input, OnInit } from '@angular/core';
import { interval, map, Observable, tap } from 'rxjs';
import { CryptoData } from '../interfaces/cryptoData.interface';
import { Todo } from '../models/todo.model';
import { WeatherData } from '../models/weatherData.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pinnedTodo!: Todo;
  currentTime$!:Observable<string>;
  tokenInfo!: CryptoData;
  weatherData$!: Observable<WeatherData>

  // customedBgLoaded helps defining the dashboard's background-img and remove the loader svg  
  // when the data from unsplash API is received.
  customedBgLoaded:boolean = false;

  imageUrlObj!: {
    urls:{
      raw:string
    },
    user:{
      name:string
    }
  };

  constructor(private todoService:ToDoService){};

  ngOnInit(): void {

    // This handles the display of the dashboard's background image.
    this.todoService.getDashboardBgImg().subscribe(
      (data:any) => {

        if(data.errors) { // sets a default image in case the API errors.
          this.imageUrlObj = { 
            urls:{ 
              raw:"https://images.unsplash.com/photo-1446034295857-c39f8844fad4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzg5NzMzNzc&ixlib=rb-4.0.3&q=80"
            },
            user:{
              name:'Mike H.'
            } 
          }
          this.customedBgLoaded = true
        } else {
          this.imageUrlObj = data
          this.customedBgLoaded = true  
        }  
      }
    )

    // currentTime$ is an Observable that emits every second, and will update the current time accordingly.
    this.currentTime$ = interval(1000).pipe(
      map(() => {
        return this.getCurrentTime();
      }),
    )

    // getCryptoData() uses the coingecko API to get data (price, icon, 24h-high etc..) about a token.
    this.todoService.getCryptoData().subscribe(
      (data => {
        this.tokenInfo = data;
      })
    )
    
    // getWeather() uses the OWM API to gather data relative to the user's pos.
    this.weatherData$ = this.todoService.getWeather()

    // Initialize the pinnedTodo obj we display on the dashboard template with data from todoService.
    this.pinnedTodo = this.todoService.pinnedTodo[0] || null

  }

  getCurrentTime() : string {
    return new Date().toLocaleTimeString("en-us", {timeStyle: "short"})
  }

  // deleteTodo() removes the selected pinned Todo from data (todo.service.ts).
  deletePinnedTodo() : void {
      this.todoService.deleteTodo(this.pinnedTodo.id)
      this.todoService.pinnedTodo = []
  }

  // handlePinnedTodo() handles the adding and removal of todos as pinnedTodo 
  handlePinnedTodo() : void {
    this.todoService.pinTodo(this.pinnedTodo)
  }

}
