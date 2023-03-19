import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-archive',
  templateUrl: './todo-archive.component.html',
  styleUrls: ['./todo-archive.component.scss']
})
export class TodoArchiveComponent implements OnInit {

  archivedTodos: Todo[] = []
  private subscription!: Subscription

  constructor(private todoService:ToDoService){}

  ngOnInit(): void {
    this.subscription = this.todoService.archivedTodos$.subscribe(
      (todos) => (this.archivedTodos = todos)
    )
  }

  emptyArchives():void{
    this.todoService.emptyArchives()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
