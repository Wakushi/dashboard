import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {

  @Input() todo!: Todo;

  isDeleted: boolean = false;

  constructor(private todoService:ToDoService){}

  deleteTodo() : void {
    this.todoService.deleteTodo(this.todo.id)
    this.isDeleted = true
  }

  addToPinnedTodos() : void {
    this.todoService.pinTodo(this.todo)
    console.log(this.todoService.pinnedTodos)
  }

}
