import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StudentData } from 'src/shared/models/interface';
import { StudentDataService } from 'src/shared/services/student-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  studentData: FormGroup = this.fb.group({});
  STUDENT_ID: string | null = '';
  currentStudent: StudentData = {id: 0, name: '', email: '', number: 0, attendance: []};

  constructor(private fb: FormBuilder, private studentDataService: StudentDataService, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.getStudentId();
    this.getStudentData();
    this.studentData = this.fb.group({
      // id: ['', Validators.required],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10), this.validateNumber]]
    })

    this.studentData.valueChanges.subscribe((formData: StudentData) => {
      if (this.currentStudent.id !== 0 && formData.name === null) {
        this.studentData.patchValue(this.currentStudent);
      }
    });
  }

  addStudent(): void {
    const PUT_DATA: StudentData = this.studentData.getRawValue();
    PUT_DATA.id = Number(this.STUDENT_ID);
    this.studentDataService.putFormData(Number(PUT_DATA.id), PUT_DATA).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },  
        error: error => alert('error' + error)
      },
    );
  }

  validateNumber(control: AbstractControl) : {[key: string] : boolean} | null {
    if (!/^\d+$/.test(control.value)) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }

  getStudentId(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      this.STUDENT_ID = params.get('id');
    });
  }

  getStudentData() {
    this.studentDataService.fetchSpecificStudentFromAPI(Number(this.STUDENT_ID)).subscribe({
      next: (res) => {
        this.currentStudent = res;
        this.studentData.patchValue(this.currentStudent);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }
}
