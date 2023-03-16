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
  areIconDisplayed: boolean = false;

  constructor(private todoService:ToDoService){}

  toggleIconDisplay() : void {
    this.areIconDisplayed = !this.areIconDisplayed
  }

  deleteTodo() : void {
    this.todoService.deleteTodo(this.todo.id)
    this.isDeleted = true
  }

}
