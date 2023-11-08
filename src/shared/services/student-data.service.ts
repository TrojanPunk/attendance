import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentData, StudentFormData } from '../models/interface';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  studentData : StudentData[] = [];
  attendanceData : any = []
  subject = new BehaviorSubject<StudentData[]>([]);

  constructor(private http: HttpClient) { }

  fetchSpecificDataFromAPI(): void{
    this.http.get<StudentData[]>(API_URL)
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
    return this.http.get(API_URL + `/${id}`)
  }

  postFormData(postData: StudentFormData): Observable<StudentData> {
    return this.http.post<StudentData>(API_URL, postData);
  }

  // PUT Data
  postAttendance(id: number, postAttendanceData: StudentData): Observable<StudentData> {
    return this.http.put<StudentData>(API_URL + `/${id}`, postAttendanceData);
  }

  putFormData(id: number, putStudentData: StudentData): Observable<StudentData> {
    return this.http.put<StudentData>(API_URL + `/${id}`, putStudentData);
  }

  // DELETE Data
  deleteStudent(id: number) {
    return this.http.delete(API_URL + `/${id}`);
  }


  // function that returns behaviourSubject
  // 1. maintain a variable that stores your response from the API
  // 2. if response exists, return the behaviour subject
  // 3. if response in that variable is null, fetch a new value and emit/next it
  // 4. ALWYAS return the behavioursubject
}
