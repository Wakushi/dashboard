import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CryptoData } from "../interfaces/cryptoData.interface";
import { map } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class ToDoService {

    constructor(private http:HttpClient){}

    todos: Todo[] = [
        new Todo(1, "Learn", "Read : 'Learn Angular in 7 days'", new Date(), "Study", false, false),
        new Todo(2, "Cooking", "Buy vegetables for tomorrow's soup", new Date(), "Other", false, false),
        new Todo(3, "Call Simon", "06.XX.XX.XX.XX", new Date(), "Work", false, false)
      ];

    pinnedTodos:Todo[] = [
    
    ]

    addTodo(todo: Todo): void {
        const newTodo = new Todo(
          this.todos.length + 1,
          todo.title,
          todo.description,
          new Date(),
          todo.type,
          false,
          false
        );
        this.todos.unshift(newTodo);
      }

    deleteTodo(id:number) : void {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    pinTodo(todo:Todo) : void {
        if(this.pinnedTodos.length > 0){
            if(todo.id === this.pinnedTodos[0].id){
                this.pinnedTodos = []
            } else {
                this.pinnedTodos = []
                this.pinnedTodos.push(todo)
            }
        } else {
            this.pinnedTodos.push(todo)
        }
      
    }

    getDashboardBgImg() : Observable<object> {
        return this.http.get<object>("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    }

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

}