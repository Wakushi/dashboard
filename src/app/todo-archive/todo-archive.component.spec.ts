import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoArchiveComponent } from './todo-archive.component';

describe('TodoArchiveComponent', () => {
  let component: TodoArchiveComponent;
  let fixture: ComponentFixture<TodoArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
