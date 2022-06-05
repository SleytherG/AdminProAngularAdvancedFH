import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss'],
})
export class IncrementadorComponent implements OnInit{
  @Input('valor') progreso: number = 30;
  @Input() btnColors: string = '';
  @Output() valorSalida = new EventEmitter<number>();

  get getPorcentaje() {
    return this.progreso + '%';
  }

  ngOnInit() {
    this.btnColors = `btn ${ this.btnColors }`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor <= 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( newValue: number) {
    if ( newValue >= 100 ) {
      newValue = 100;
      this.progreso = 100;
    } else if( newValue <= 0 ) {
      newValue = 0;
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.valorSalida.emit( newValue );

  }
}
