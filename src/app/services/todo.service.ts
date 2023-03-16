import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";

@Injectable({
    providedIn:"root"
})

export class ToDoService {

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

}