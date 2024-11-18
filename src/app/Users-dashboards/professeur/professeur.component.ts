import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid,
  NgApexchartsModule
} from 'ng-apexcharts';



export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}

@Component({
  selector: 'app-professeur',
  standalone: true,
  imports: [ NgApexchartsModule ,MatCardModule ],
  templateUrl: './professeur.component.html',
  styleUrl: './professeur.component.scss'
})
export class ProfesseurComponent {
  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions !: Partial<activeusercardChartOptions> | any;

  constructor() {
    // Original data for "entretien" counts by month for the year 2024
    const acceptedCounts = [0, 0, 8, 12, 15, 9, 7, 11, 14, 13, 6, 10];
    const refusedCounts = [0, 0, 1, 3, 2, 2, 1, 4, 3, 2, 1, 2];

    // Reverse the lists
    const reversedAcceptedCounts = [...acceptedCounts].reverse();
    const reversedRefusedCounts = [...refusedCounts].reverse();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.activeusercardChartOptions = {
      series: [
        {
          name: 'Accepted',
          data: reversedAcceptedCounts,
          color: "#03c9d7",
        },
        {
          name: 'Refused',
          data: reversedRefusedCounts,
          color: "#fb9678",
        },
      ],
      xaxis: {
        categories: months,
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 300,
      },
      legend: {
        show: true,  // Show the legend to distinguish between accepted and refused
      },
      tooltip: {
        theme: "dark"
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 8,
        },
      },
    }
  }}