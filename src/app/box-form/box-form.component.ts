import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.css']
})
export class BoxFormComponent implements AfterViewInit{
  @ViewChild('chartCanvas', { static: false })
  chartCanvas!: ElementRef;

  box1Value: number | any;
  box2Value: number | any;
  validationMessage: string | any;

  private chart: Chart | any;

  updateValues() {
    if (this.box1Value && !this.box2Value) {
      this.box2Value = 100 - this.box1Value;
    } else if (!this.box1Value && this.box2Value) {
      this.box1Value = 100 - this.box2Value;
    }

    const total = this.box1Value + this.box2Value;
    this.validationMessage = total > 100 ? 'Total cannot exceed 100%' : '';
  }

  createChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.box1Value, this.box2Value];
      this.chart.update();
    }
  }

  ngAfterViewInit() {
    // Create the chart when the view has initialized
    const chartCanvas = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: ['Box 1', 'Box 2'],
        datasets: [{
          data: [this.box1Value, this.box2Value],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        }],
      },
    });
  }
}