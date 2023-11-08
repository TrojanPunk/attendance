import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from 'src/shared/models/interface';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'number', 'email', 'actions'];
  allStudents: StudentData[] = [];
  displayedStudents: StudentData[] = [];
  loading: boolean = true;
  dataSource = new MatTableDataSource<StudentData>(this.displayedStudents);
  searchForm: FormGroup = this.fb.group({ title: this.fb.control('') });

  title = 'reactive-form';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.loading = true;
    this.dataSource.paginator = this.paginator;
    this.getStudentData();
    this.studentDataService.fetchSpecificDataFromAPI();
  }

  constructor(private studentDataService: StudentDataService, public dialog: MatDialog, private fb: FormBuilder) { }

  getStudentData(): void {
    this.studentDataService.subject.subscribe(
      {
        next: (studentData) => {
          this.dataSource.data = studentData;
          this.displayedStudents = studentData;
          this.loading = false;
        },

        error: (err) => {
          console.error(err)
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  manipulateMobileNumber(number: number): string {
    let mobileNumber = number.toString();
    let first = mobileNumber.slice(0, 5);
    let second = mobileNumber.slice(5, 10);
    return '+91 ' + first + ' ' + second;
  }

  filterOnName(query: string) {
    const RETURN_ARRAY = this.dataSource.data.filter(student => student.name.toLowerCase().includes(query?.toLowerCase()))
    return RETURN_ARRAY;
  }

  logForm() {
    if (this.searchForm.valid) {
      this.displayedStudents = this.filterOnName(this.searchForm.value?.title);
    }

    else {
      this.displayedStudents = this.dataSource.data;
    }
    this.dataSource.paginator = this.paginator;
  }

  manipulateName(name: string) {
    return name.split(" ")[0];
  }

  // Sorting Functions
  sortAscending(key: string) {

    this.displayedStudents.sort(function (x, y) {
      let currX;
      let currY;

      switch (key) {
        case "name":
          currX = x.name;
          currY = y.name;
          break;

        case "id":
          currX = x.id;
          currY = y.id;
          break;

        case "email":
          currX = x.email;
          currY = y.email;
          break;

        case "number":
          currX = x.number;
          currY = y.number;
          break;
      }

      if (currX! < currY!) {
        return -1;
      }

      if (currX! > currY!) {
        return 1;
      }
      return 0;
    })
    this.getStudentData();
  }

  sortDescending(key: string) {
    this.displayedStudents.sort(function (x, y) {
      let currX;
      let currY;

      switch (key) {
        case "name":
          currX = x.name;
          currY = y.name;
          break;

        case "id":
          currX = x.id;
          currY = y.id;
          break;

        case "email":
          currX = x.email;
          currY = y.email;
          break;

        case "number":
          currX = x.number;
          currY = y.number;
          break;
      }

      if (currX! > currY!) {
        return -1;
      }

      if (currX! < currY!) {
        return 1;
      }
      return 0;
    })
    this.getStudentData();
  }
}
