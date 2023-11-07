import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ViewComponent } from './view/view.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { DialogAnimationsExampleDialogComponent } from './dialog-animations-example-dialog/dialog-animations-example-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
    AddStudentComponent,
    AttendanceComponent,
    ViewComponent,
    StudentTableComponent,
    DialogAnimationsExampleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
