import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentDataService } from 'src/shared/services/student-data.service';

@Component({
  selector: 'app-already-exists',
  templateUrl: './already-exists.component.html',
  styleUrls: ['./already-exists.component.scss']
})
export class AlreadyExistsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogRef: MatDialogRef<AlreadyExistsComponent>, private studentDataService: StudentDataService) { }

  closeDialog(): void {   
    this.dialogRef.close();
  }
}
