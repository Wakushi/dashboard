import { Component, Input, OnInit } from '@angular/core';
import { interval, map, Observable, tap } from 'rxjs';
import { CryptoData } from '../interfaces/cryptoData.interface';
import { UnsplashData } from '../interfaces/unsplashData.interface';
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
  unsplashImage$!: Observable<UnsplashData>

  constructor(private todoService:ToDoService){};

  ngOnInit(): void {

    // This handles the display of the dashboard's background image.
    this.unsplashImage$ = this.todoService.getDashboardImage()

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
