import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { AttendanceRecords, StudentData } from 'src/shared/models/interface';
import { AttendanceComponent } from '../attendance/attendance.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  studentData: StudentData[] = [];
  dates: string[] = [];
  count: number[] = [];
  studentAttendanceRecord: Record<string, number> = { "2023-01-01": 0 };

  title = 'angular-chart';
  constructor(private studentDataService: StudentDataService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getStudentData()
  }

  getStudentData(): void {
    this.studentDataService.subject.subscribe(
      {
        next: (res) => {
          this.studentData = res;
          console.log(res)
          this.chartDisplay();
        },

        error: (err) => {
          console.error(err)
        }
      })
  }

  chartDisplay() {
    this.dates = this.getChartData()[0];
    this.count = this.getChartData()[1];
    console.log(this.dates, this.count)
    
    // Bar chart

    console.log(typeof(this.dates), typeof(this.count ));
    const barCanvasEle: any = document.getElementById('bar_chart')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Attendance',
          data: this.count,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getChartData(): [string[], number[]] {

    for (let i = 0; i < this.studentData.length; i++) {
      const ELEMENT = this.studentData[i];

      for (let j = 0; j < ELEMENT.attendance.length; j++) {
        const DATE = ELEMENT.attendance[j];
        const CURR_DATE = DATE.date;
        const STATUS = DATE.status;

        if (!this.studentAttendanceRecord.hasOwnProperty(CURR_DATE.toString())) {
          this.studentAttendanceRecord[CURR_DATE.toString()] = 0;
        }

        else {
          this.studentAttendanceRecord[CURR_DATE.toString()] += (STATUS == '1') ? 1 : 0;
        }
      }
    }

    this.dates = Object.keys(this.studentAttendanceRecord);
    this.count = Object.values(this.studentAttendanceRecord);
    return [this.dates, this.count]
  }
}
