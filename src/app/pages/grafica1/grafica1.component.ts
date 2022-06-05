import { Component, OnInit } from '@angular/core';
import {ChartType} from "chart.js";
import {Color, Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  doughnutChartData1: MultiDataSet = [
    [250, 550, 200],
  ];
  doughnutChartData2: MultiDataSet = [
    [450, 650, 300],
  ];
  doughnutChartData3: MultiDataSet = [
    [750, 850, 500],
  ];

  doughnutChartTyPe: ChartType = 'doughnut';
  public colors: Color[] = [
    { backgroundColor: [ '#5446ba', '#3393d2', '#c52f56']}
  ];
  public colors1: Color[] = [
    { backgroundColor: [ '#332793', '#1f597e', '#d91246']}
  ];
  public colors2: Color[] = [
    { backgroundColor: [ '#514981', '#2a4657', '#ff5c85']}
  ];
  public colors3: Color[] = [
    { backgroundColor: [ '#2ba222', '#7364a8', '#850d30']}
  ];
  title: string = 'Sales 2018';
  title1: string = 'Sales 2019';
  title2: string = 'Sales 2021';
  title3: string = 'Sales 2022';


  constructor() { }

  ngOnInit(): void {
  }

}
