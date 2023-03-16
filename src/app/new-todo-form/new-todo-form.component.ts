import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-new-todo-form',
  templateUrl: './new-todo-form.component.html',
  styleUrls: ['./new-todo-form.component.scss']
})
export class NewTodoFormComponent implements OnInit {

  todoForm!:FormGroup;
  todoPreview$!: Observable<Todo>;
  
  constructor(
    private formBuilder: FormBuilder,
    public todoService: ToDoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: [null],
      description: [null],
      type: "Work"
    })
    this.todoPreview$ = this.todoForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        id:0
      }))
    )
  }

  onSubmitTodo(event:any):void {
    event.preventDefault();
    this.todoService.addTodo(this.todoForm.value)
    this.router.navigateByUrl('todolist')
  }

  onCloseNewTodo(): void {
    this.router.navigateByUrl('todolist')
  }

}
