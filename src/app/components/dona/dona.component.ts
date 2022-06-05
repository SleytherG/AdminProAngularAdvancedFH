import {Component, Input, OnInit} from '@angular/core';
import {Colors, Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title = '';
  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet = [];
  @Input() doughnutChartTyPe!: ChartType;
  @Input() colors: Colors[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
