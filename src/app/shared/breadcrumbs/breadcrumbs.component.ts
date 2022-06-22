import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {filter, map, Subscription} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title: string = '';
  public tituloSubs$: Subscription;

  constructor(
    private _router: Router
  ) {

    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({ titulo}) => {
      this.title = titulo;
      document.title = `Admin Pro - ${this.title}`;
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta() {
    return this._router.events.pipe(
      filter( (event: any) => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
  }

}
