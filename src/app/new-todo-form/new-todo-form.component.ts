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

  // We use FormGroup to build a reactive form.
  todoForm!:FormGroup;
  todoPreview$!: Observable<Todo>;
  
  // We import the formBuilder, our services and the router with our constructor.
  constructor(
    private formBuilder: FormBuilder,
    public todoService: ToDoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // We setup our reactive form to connect it to our template using [formGroup] and formControlName.
    this.todoForm = this.formBuilder.group({
      title: [null],
      description: [null],
      type: "Work"
    })

    // We use an Observable that emits Todo objects using valueChanges which detects input changes
    // and updates a Todo preview dynamically. 
    this.todoPreview$ = this.todoForm.valueChanges

  }
  
  // onSubmitTodo() uses our addTodo() methods by passing it the form's value as its parameter.
  // Then the user is 'redirected' (SPA) to the todolist component.
  onSubmitTodo(event:any):void {
    event.preventDefault();
    this.todoService.addTodo(this.todoForm.value)
    this.router.navigateByUrl('todolist')
  }

  // OnCloseTodo() simply 'redirects' (SPA) the user to the todolist component.
  onCloseNewTodo(): void {
    this.router.navigateByUrl('todolist')
  }

}
