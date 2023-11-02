import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentData } from 'src/shared/models/interface';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentData: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private studentDataService: StudentDataService, private router: Router) {  }

  ngOnInit(): void {
    this.studentData = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      number: ['']
    })
  }

  addStudent(): void {
    const POST_DATA: StudentData = this.studentData.getRawValue();
    this.studentDataService.postFormData(POST_DATA).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/dashboard'])
        },
        error: error => alert('error' + error)
      },
    );
  }
}