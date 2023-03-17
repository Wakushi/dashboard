import { Injectable, NgZone } from "@angular/core";
import { Todo } from "../models/todo.model";
import { HttpClient } from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { CryptoData } from "../interfaces/cryptoData.interface";
import { map } from "rxjs";

// The decorator @Injectable allows this class to be used as a service.
// providedIn:'root' means that its data will be accessible by all our components.
@Injectable({
    providedIn:"root"
})

export class ToDoService {

    // We import the httpClient which unlocks the get() methods to fetch data from APIs.
    constructor(private http:HttpClient, private ngZone:NgZone){}

    // todos simulates the data from all the user's Todos.
    todos: Todo[] = [
        new Todo(1, "Learn", "Read : 'Learn Angular in 7 days'", new Date(), "Study", false, false, false),
        new Todo(2, "Cooking", "Buy vegetables for tomorrow's soup", new Date(), "Other", false, false, false),
        new Todo(3, "Call Simon", "06.XX.XX.XX.XX", new Date(), "Work", false, false, false)
      ];

    // pinnedTodo holds the Todo that the user pinned to his dashboard.  
    pinnedTodo:Todo[] = [
    
    ]

    // addTodo() generates a new Todo using the user inputs from NewTodoFormComponent and adds it to the todos[].
    // [No back-end] : This would use a POST request to send the new Todo to a server.
    addTodo(todo: Todo): void {
        const newTodo = new Todo(
          this.todos.length + 1,
          todo.title,
          todo.description,
          new Date(),
          todo.type,
          false,
          false,
          false
        );
        this.todos.unshift(newTodo);
      }
    
    // deleteTodo() removes a todo from the todos[]
    // [No back-end] : This would use a DELETE request to delete the new Todo to a server (using its id)
    deleteTodo(id:number) : void {
      this.todos.forEach(todo => {
        if(todo.id === id){
          todo.isDeleted = true
        }
      })
      this.todos = this.todos.filter(todo => todo.id !== id)
    }

    // pinTodo() handles the adding and removal of todos as pinnedTodo
    pinTodo(todo:Todo) : void {
        if(todo.isPinned){
          todo.isPinned = false
          this.pinnedTodo = []
        } else {
          this.todos.forEach(todo => todo.isPinned = false)
          this.pinnedTodo = []
          todo.isPinned = true
          this.pinnedTodo.push(todo)
        }  
    }

    // FETCH REQUESTS - - - - - - - - - - - - - - - - - -

    // getDashboardImg() uses the unsplash API to get a random picture for the dashboard's background image.
    getDashboardBgImg() : Observable<object> {
        return this.http.get<object>("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    }

    // getCryptoData() uses the coingecko API to get data (price, icon, 24h-high etc..) about a token.
    getCryptoData(): Observable<CryptoData> {
        return this.http.get<any>('https://api.coingecko.com/api/v3/coins/ethereum').pipe(
          map((data) => ({
            tokenImg: { small: data.image.small },
            tokenName: data.name,
            marketData: {
              currentPrice: { usd: data.market_data.current_price.usd },
              high_24h: { usd: data.market_data.high_24h.usd },
              low_24h: { usd: data.market_data.low_24h.usd },
            },
          })),
        )
    }

    // userPosition serves as a template to receive the user position values 
    // from getWeather() so they can be used to call the openweathermap API.   
    userPosition = {
      lat:0,
      long:0
    };

    // getWeather() uses the OWM API to gather data relative to the user's pos.
    getWeather(): Observable<object> {
        return new Observable(observer => {
          navigator.geolocation.getCurrentPosition(position => {
            this.ngZone.run(() => {
              this.userPosition.lat = position.coords.latitude;
              this.userPosition.long = position.coords.longitude;
              observer.next();
              observer.complete();
            });
          });
        }).pipe(
          switchMap(() =>
            this.http.get<object>(
              `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${this.userPosition.lat}&lon=${this.userPosition.long}&units=metric`
            )
          ),
          map((data: any) => ({
            iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            temperature: Math.round(data.main.temp),
            city: data.name,
          })),
        );
    }
      
   

}