import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})


export class TodoListComponent implements OnInit {
  
  todoList!: Todo[];

  constructor(
    private todoService:ToDoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoList = this.todoService.todos 
  }

  openAddTodo(): void {
    this.router.navigateByUrl('newtodo')
  }

}
