import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentDataService } from 'src/shared/services/student-data.service';

@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrls: ['./dialog-animations-example-dialog.component.scss']
})
export class DialogAnimationsExampleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, public dialogRef: MatDialogRef<DialogAnimationsExampleDialogComponent>, private studentDataService: StudentDataService) { }

  deleteStudentRecord(): void { 
    this.studentDataService.deleteStudent(this.data.id).subscribe({
      next: (res) => {
        this.studentDataService.fetchSpecificDataFromAPI();
      },
      error: (err) => {
        console.log(err)
      }
    })
    
    this.dialogRef.close();
    
  } 
}
