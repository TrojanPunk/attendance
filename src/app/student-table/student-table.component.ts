import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from 'src/shared/models/interface';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'number', 'email', 'actions'];
  allStudents: StudentData[] = [];
  hey: StudentData[] = [];
  loading: boolean = true;
  dataSource = new MatTableDataSource<StudentData>(this.allStudents);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.loading = true;
    this.dataSource.paginator = this.paginator;
    this.getStudentData();
    this.studentDataService.fetchSpecificDataFromAPI();
  }

  constructor(private studentDataService: StudentDataService, public dialog: MatDialog) { }

  getStudentData(): void {
    this.studentDataService.subject.subscribe(
      {
        next: (studentData) => {
          this.dataSource.data = studentData;
          this.loading = false;
        },

        error: (err) => {
          console.error(err)
        }
      })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    });
  }
}
