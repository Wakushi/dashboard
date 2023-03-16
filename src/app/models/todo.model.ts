// Our template class to easily build Todo objects.
export class Todo {
        constructor(
          public id: number,
          public title: string,
          public description: string,
          public createdDate: Date,
          public type: string,
          public areIconDisplayed: boolean,
          public isPinned:boolean,
          public isDeleted:boolean
        ) {}
      
        // toggles the display of the delete confirmation icons of a Todo.
        toggleIconDisplay(): void {
          this.areIconDisplayed = !this.areIconDisplayed;
        }

        
}