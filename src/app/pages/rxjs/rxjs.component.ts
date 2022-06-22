import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2),
    // ).subscribe({
    //   next: (next) => {
    //     console.log('Subs => ', next);

    //   },
    //   error: ( error ) => {
    //     console.warn('Error => ', error);

    //   },
    //   complete: () => {
    //     console.info('Obs Terminado');
    //   }
    // });

    //   next => {
    //   console.log('Subs: ', next);
    // }, error => {
    //   console.warn('Error: ', error);
    // }, () => {
    //   console.info('Obs terminado');
    // });

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
                  .pipe(
                    // take(10),
                    map(valor => valor + 1),
                    filter( valor => ( valor % 2 === 0) ? true : false),
                  );
  }


  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if ( i === 2 ) {
          // i = 0;
          // console.log('i = 2.......error');

          observer.error('i llego al valor de 2');
        }

      }, 1000);
    });

  }


}
