import { Injectable, NgZone } from "@angular/core";
import { Todo } from "../models/todo.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { CryptoData } from "../interfaces/cryptoData.interface";
import { map } from "rxjs";
import { WeatherData } from "../models/weatherData.model";
import { OpenWeatherMapResponse } from "../interfaces/openWeatherMap.interface";
import { UnsplashData } from "../interfaces/unsplashData.interface";

// The decorator @Injectable allows this class to be used as a service.
// providedIn:'root' means that its data will be accessible by all our components.
@Injectable({
    providedIn:"root"
})

export class ToDoService {

    // We import the httpClient which unlocks the get() methods to fetch data from APIs.
    constructor(private http:HttpClient, private ngZone:NgZone){};

    // todos simulates the data from all the user's Todos.
    todos: Todo[] = [
        new Todo(1, "Learn", "Read : 'Learn Angular in 7 days'", new Date(), "Study", false, false, false,false),
        new Todo(2, "Cooking", "Buy vegetables for tomorrow's soup", new Date(), "Other", false, false, false,false),
        new Todo(3, "Call Simon", "06.XX.XX.XX.XX", new Date(), "Work", false, false, false,false)
      ];

    // pinnedTodo holds the Todo that the user pinned to his dashboard.  
    pinnedTodo:Todo[] = [
    
    ];

    // archivedTodo holds the archived Todos
    private _archivedTodos = new BehaviorSubject<Todo[]>([]);
    archivedTodos$ = this._archivedTodos.asObservable();

    //getTodoByID returns the todo that matches the id passed as its parameter.
    getTodoById(id:number) : Todo {
      const targetTodo = this.todos.filter(todo => todo.id === id)[0]
      return targetTodo
    }

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
          false,
          false
        );
        this.todos.unshift(newTodo);
    }

    // addArchivedTodo unshifts a todo to the archived array stored in a BehaviorSubject.
    addArchivedTodo(id:number):void {
      const archivedTodo: Todo = {
        ...this.getTodoById(id),
        toggleIconDisplay(){},
        isDeleted:false,
        isArchived:true
      };
      const currentArchives = this._archivedTodos.getValue();
      const updatedArchives =  [archivedTodo, ...currentArchives];
      this._archivedTodos.next(updatedArchives);
    }
    
    // deleteTodo() removes a todo from the todos[]
    // [No back-end] : This would use a DELETE request to delete the new Todo to a server (using its id)
    deleteTodo(id:number) : void {
      this.todos.forEach(todo => {
        if(todo.id === id){
          todo.isDeleted = true
        };
      });
      this.addArchivedTodo(id) 
      this.todos = this.todos.filter(todo => todo.id !== id);
    };

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

    // emptyArchives resets the archives array.
    emptyArchives():void {
      this._archivedTodos.next([])
    }

    // FETCH REQUESTS - - - - - - - - - - - - - - - - - -

    // We use a BehaviorSubject to cache the image received from the unsplash API.
    private unsplashImageSubject$ = new BehaviorSubject<UnsplashData | null>(null);

    // getDashboardImg() uses the unsplash API to get a random picture for the dashboard's background image.
    getDashboardImage(): Observable<UnsplashData | null> {
      if (!this.unsplashImageSubject$.value) {
        return this.http.get<UnsplashData & Record<string, unknown>>("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature").pipe(
          map((response: UnsplashData & Record<string, unknown>) => ({
            urls: { raw: response.urls?.raw || '' },
            user: { name: response.user?.name || '' }
          })),
          tap((imageData: UnsplashData) => {
            this.unsplashImageSubject$.next(imageData); // .next() assigns a new value to an Observable of type BehaviorSubject and triggers the subscriptions.
          }),
        );
      } else {
        return this.unsplashImageSubject$.asObservable(); // we use asObservable() to protect the Observable of origin (which already holds the UnsplashData)
      }
    }

    // getCryptoData() uses the coingecko API to get data (price, icon, 24h-high etc..) about a token.
    getCryptoData(): Observable<CryptoData> {
        return this.http.get<CryptoData>('https://api.coingecko.com/api/v3/coins/ethereum').pipe(
          map((data:CryptoData) => ({
            name:data.name,
            image: { small:data.image.small },
            market_data: { 
                current_price: { usd: data.market_data.current_price.usd }, 
                high_24h: { usd: data.market_data.high_24h.usd }, 
                low_24h: { usd: data.market_data.low_24h.usd } 
            }
          }))
        )
    }

    // userPosition serves as a template to receive the user position values 
    // from getWeather() so they can be used to call the openweathermap API.   
    userPosition = {
      lat:0,
      long:0
    };

    // getWeather() uses the OWM API to gather data relative to the user's pos.
    getWeather(): Observable<WeatherData> {
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
          this.http.get<OpenWeatherMapResponse>(
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${this.userPosition.lat}&lon=${this.userPosition.long}&units=metric`
          )
        ),
        map((data: OpenWeatherMapResponse) => ({
          iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temperature: Math.round(data.main.temp),
          city: data.name,
        })),
      )
    }
      
   

}