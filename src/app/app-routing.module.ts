import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTodoFormComponent } from './new-todo-form/new-todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path:"", component: DashboardComponent},
  {path:"todolist", component: TodoListComponent},
  {path:"newtodo", component: NewTodoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
