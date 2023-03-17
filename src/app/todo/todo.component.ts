import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {

  // We import the Todo Class and its methods to easily build Todo objects.
  @Input() todo!: Todo; 

  // We use the constructor to import our TodoService. 
  constructor(private todoService:ToDoService){}

  // deleteTodo() removes the selected Todo from data (todo.service.ts).
  deleteTodo() : void {
    this.todoService.deleteTodo(this.todo.id)
    this.todo.isDeleted = true
  }

  // handlePinnedTodo() handles the adding and removal of todos as pinnedTodo 
  handlePinnedTodo() : void {
    this.todoService.pinTodo(this.todo)
  }

}
