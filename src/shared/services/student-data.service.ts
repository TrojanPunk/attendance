import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentData, StudentFormData } from '../models/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  studentData : StudentData[] = [];
  attendanceData : any = []
  subject = new BehaviorSubject<StudentData[]>([]);

  constructor(private http: HttpClient) { }

  fetchSpecificDataFromAPI(): void{
    this.http.get<StudentData[]>(`https://65389751a543859d1bb19c94.mockapi.io/attendance-tracker/student`)
    .subscribe({
      next: res => {
        this.subject.next(res);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  // GET data
  fetchSpecificStudentFromAPI(id: number): Observable<any> {
    return this.http.get(`https://65389751a543859d1bb19c94.mockapi.io/attendance-tracker/student/${id}`)
  }

  postFormData(postData: StudentFormData) {
    return this.http.post('https://65389751a543859d1bb19c94.mockapi.io/attendance-tracker/student', postData);
  }

  // PUT Data
  postAttendance(id: number, postAttendanceData: StudentData): Observable<any> {
    return this.http.put(`https://65389751a543859d1bb19c94.mockapi.io/attendance-tracker/student/${id}`, postAttendanceData)
  }

  // DELETE Data
  deleteStudent(id: number) {
    return this.http.delete(`https://65389751a543859d1bb19c94.mockapi.io/attendance-tracker/student/${id}`);
  }


  // function that returns behaviourSubject
  // 1. maintain a variable that stores your response from the API
  // 2. if response exists, return the behaviour subject
  // 3. if response in that variable is null, fetch a new value and emit/next it
  // 4. ALWYAS return the behavioursubject
}
