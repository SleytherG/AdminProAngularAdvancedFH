import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progreso1: number = 30;
  progreso2: number = 40;
  btnColor1: string = 'btn-primary';
  btnColor2: string = 'btn-info';

  get getPorcentaje1() {
    return `${this.progreso1}%`;
  }

  get getPorcentaje2() {
    return `${this.progreso2}%`;
  }

  changeProgreso1( valor: number) {
    this.progreso1 = valor;
  }

  changeProgreso2( valor: number) {
    this.progreso2 = valor;
  }

}
