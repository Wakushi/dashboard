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

    todos:Todo[] = [
        {
            id:1,
            title:"Learn",
            description:"Read : 'Learn Angular in 7 days'",
            createdDate:new Date(),
            type:"Study"
            
        },
        {
            id:2,
            title:"Cooking",
            description:"Buy vegetables for tomorrow's soup",
            createdDate:new Date(),
            type:"Other"
        },
        {
            id:3,
            title:"Call Simon",
            description:"06.XX.XX.XX.XX",
            createdDate:new Date(),
            type:"Work"
        }
    ]

    addTodo(todo:Todo) : void {
        this.todos.unshift({
            ...todo,
            createdDate: new Date(),
            id: this.todos.length + 1
        })
    }

    deleteTodo(id:number) : void {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    getDashboardBgImg() : Observable<object> {
        return this.http.get<object>("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    }

    getCryptoData(): Observable<CryptoData> {
        return this.http.get<any>('https://api.coingecko.com/api/v3/coins/bitcoin').pipe(
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