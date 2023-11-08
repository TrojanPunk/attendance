import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: "", redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: StudentTableComponent
      },
      {
        path: "view/:id",
        component: ViewComponent
      },
      {
        path: "edit/:id",
        component: EditComponent
      }
    ]
  },
  {
    path: "add-student",
    component: AddStudentComponent
  },
  {
    path: "attendance",
    component: AttendanceComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
