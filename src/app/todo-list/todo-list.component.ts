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
  
  // todoList is an array where the data from all our todos lives.
  todoList!: Todo[];

  // constructor is used to import the routing and our services.
  constructor(
    private todoService:ToDoService,
    private router: Router
  ) { }

  // ngOnInit() is called when the component loads, he it fills our todoList array with the data from our services. 
  ngOnInit(): void {
    this.todoList = this.todoService.todos 
  }

  // openAddTodo() sends the user to the 'form' component where he can create a new todo.
  openAddTodo(): void {
    this.router.navigateByUrl('newtodo')
  }

}
