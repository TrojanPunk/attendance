import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssignAttendance } from 'src/shared/models/interface';
import { DAYS, MONTHS } from 'src/shared/constants/constant';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'status'];
  allAttendance: AssignAttendance[] = [];
  STUDENT_ID: string | null = '';
  dataSource = new MatTableDataSource<AssignAttendance>(this.allAttendance);
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.loading = true;
    this.dataSource.paginator = this.paginator;
    this.getStudentId()
    console.log(this.STUDENT_ID)
    this.getStudentData()
  }

  constructor(private studentDataService: StudentDataService, private activatedRoute: ActivatedRoute) { }

  getStudentId(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      console.log(params.get('id'));
      this.STUDENT_ID = params.get('id');
    });
  }

  getStudentData() {
    this.studentDataService.fetchSpecificStudentFromAPI(Number(this.STUDENT_ID)!).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.attendance;
        this.loading = false;
        console.log('datasource', this.dataSource.data)
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Call completed!');
      }
    });
  }

  dateManipulation(fetchDate: Date): string {
    let date: Date = new Date(fetchDate)
    let dateString: string[] = date.toString().split(" ");
    let dayName: string = dateString[0];
    let month: string = dateString[1];
    let day: string = dateString[2];
    let year: string = dateString[3];    

    return DAYS[dayName] + ', ' + day + ' ' + MONTHS[month] + ' ' + year;
  }

  // Sort by Date
  sortAscendingByDate() {
    this.dataSource.data.sort(function (x, y) {
      if (x.date.toString() < y.date.toString()) {
        return -1;
      }

      if (x.date.toString() > y.date.toString()) {
        return 1;
      }
      return 0;
    })
    this.getStudentData();
  }

  sortDescendingByDate() {
    this.dataSource.data.sort(function (x, y) {
      if (x.date.toString() > y.date.toString()) {
        return -1;
      }

      if (x.date.toString() < y.date.toString()) {
        return 1;
      }
      return 0;
    })
    this.getStudentData();
  }
}