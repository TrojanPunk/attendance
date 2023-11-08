import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { AttendanceDetails, IdData, StudentData } from 'src/shared/models/interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AlreadyExistsComponent } from '../already-exists/already-exists.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendanceData: FormGroup = this.fb.group({});
  ids: IdData[] = [];
  studentData: StudentData[] = [];
  currentStudent!: StudentData;
  //oneStudentData: StudentData[] = [];
  // oneStudentData = new BehaviorSubject<StudentData>(
  //   {
  //     "id": 0,
  //     "name": "string",
  //     "number": 1,
  //     "email": "string",
  //     "attendance": [{ "date": new Date("2023-01-01"), "status": "absent", "id": 0 }]
  //   }
  // );

  constructor(private studentDataService: StudentDataService, public dialog: MatDialog, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.studentDataService.fetchSpecificDataFromAPI();
    this.getStudentIds()
    this.attendanceData = this.fb.group({
      id: ['', [Validators.required]],
      status: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  getStudentIds() {
    this.studentDataService.subject.subscribe({
      next: (res) => {
        this.studentData = res;
        this.studentData.map((record) => {
          this.ids.push({ 'id': record.id, 'name': record.name })
        })
      }
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AlreadyExistsComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  markAttendance(): void {
    const POST_DATA: AttendanceDetails = this.attendanceData.getRawValue();
    const ID: number = POST_DATA.id;


    this.studentDataService.fetchSpecificStudentFromAPI(ID).subscribe({
      next: (data) => {
        this.currentStudent = data;

        // check if attendance for selected date already exists
        const attendanceExists = data.attendance.find((a: any) => a.date.toString() === POST_DATA.date.toString());
        if (attendanceExists) {
          this.openDialog('0ms', '0ms');
          return
        }

        // add new attendance record
        if (JSON.stringify(POST_DATA) != '{}') {
          this.currentStudent.attendance.push({
            "date": POST_DATA.date,
            "status": POST_DATA.status,
            "id": POST_DATA.id
          });
        }

        // update student data with new attendance record
        this.studentDataService.postAttendance(ID, this.currentStudent).subscribe({
          next: (response) => {
            this.router.navigate([`/dashboard/view/${ID}`]);
          },
          error: error => alert('Error: ' + error)
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.getStudentData(ID);

  }

  getStudentData(id: number): void {
    this.studentDataService.fetchSpecificStudentFromAPI(id).subscribe(
      {
        next: (res) => {
          this.studentData = res;
        },

        error: (err) => {
          console.error(err);
        }
      })
  }
}