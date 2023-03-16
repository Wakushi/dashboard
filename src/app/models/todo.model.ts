export class Todo {
        constructor(
          public id: number,
          public title: string,
          public description: string,
          public createdDate: Date,
          public type: string,
          public areIconDisplayed: boolean,
          public isPinned:boolean
        ) {}
      
        toggleIconDisplay(): void {
          this.areIconDisplayed = !this.areIconDisplayed;
        }

        
}