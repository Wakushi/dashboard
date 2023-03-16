import { Component, Input, OnInit } from '@angular/core';
import { interval, map, Observable, tap } from 'rxjs';
import { CryptoData } from '../interfaces/cryptoData.interface';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pinnedTodo!: Todo;
  customedBgLoaded:boolean = false;
  currentTime$!:Observable<string>;
  tokenInfo!: CryptoData;

  imageUrlObj!: {
    urls:{
      raw:string
    }
  };

  constructor(private todoService:ToDoService){};

  ngOnInit(): void {

    // This handles the display of the dashboard's background image.
    this.todoService.getDashboardBgImg().subscribe(
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
        this.tokenInfo = data;
      })
    )

    this.pinnedTodo = this.todoService.pinnedTodo[0] || null

  }

  getCurrentTime() : string {
    return new Date().toLocaleTimeString("en-us", {timeStyle: "short"})
  }

  deletePinnedTodo() : void {
      this.todoService.deleteTodo(this.pinnedTodo.id)
      this.todoService.pinnedTodo = []
  }

  unPinTodo() : void {
    this.todoService.pinnedTodo = []
  }

  Debugging() : void {
    console.log(this.pinnedTodo)
  }

}
