import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { AttendanceDetails, IdData, StudentData } from 'src/shared/models/interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  attendanceData: FormGroup = this.fb.group({});
  ids: IdData[] = [];
  studentData: StudentData[] = [];
  //oneStudentData: StudentData[] = [];
  oneStudentData = new BehaviorSubject<StudentData>(
    {"id": 0,
    "name": "string",
    "number": 1,
    "email": "string",
    "attendance" : [{"date": new Date("2023-01-01"), "status": "absent", "id": 0}]}
  );

  constructor(private http: HttpClient, private studentDataService: StudentDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.studentDataService.fetchSpecificDataFromAPI();
    this.getStudentIds()
    this.attendanceData = this.fb.group({
      id: [''],
      status: [''],
      date: ['']
    })
  }

  getStudentIds() {
    console.log(this.studentDataService.subject)
    this.studentDataService.subject.subscribe({
      next: (res) => {
        this.studentData = res;
        this.studentData.map((record) => {
          this.ids.push({'id': record.id, 'name': record.name})
        })
      }
    })
  }

  markAttendance(): void {
    const POST_DATA: AttendanceDetails = this.attendanceData.getRawValue();
    const ID: number = POST_DATA.id;

    
    this.oneStudentData.subscribe(
      data => {
        console.log('data', data);
        console.log('post', POST_DATA);
        
        if (JSON.stringify(POST_DATA) != '{}') {
          this.oneStudentData.value['attendance'].push({"date": POST_DATA.date, "status": POST_DATA.status, "id": POST_DATA.id});
          console.log(this.oneStudentData);
        }

        this.studentDataService.postAttendance(ID, this.oneStudentData.value).subscribe(
          {
            next: (response) => {
              this.router.navigate([`dashboard/view/${ID}`]);
          },
            error: error => alert('error' + error)
          },
        );
      }
    );    

    this.getStudentData(ID);

  }

  getStudentData(id: number): void {
    this.studentDataService.fetchSpecificStudentFromAPI(id).subscribe(
      {
        next: (res) => {
          this.oneStudentData.next(res);
          console.log('oneStudentData', this.oneStudentData);
        },

        error: (err) => {
          console.error(err);
        }
    })
  }
}
