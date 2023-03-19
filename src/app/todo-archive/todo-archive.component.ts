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

  private subscription!: Subscription
  archivedTodos: Todo[] = []
  isModalDisplayed:boolean = false

  constructor(private todoService:ToDoService){}

  ngOnInit(): void {
    this.subscription = this.todoService.archivedTodos$.subscribe(
      (todos) => (this.archivedTodos = todos)
    )
  }

  toggleConfirmModal():void {
    this.isModalDisplayed = !this.isModalDisplayed
  }

  emptyArchives():void{
    this.todoService.emptyArchives()
    this.toggleConfirmModal()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
