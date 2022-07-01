import { HttpClient } from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interace';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form';
import {Router} from "@angular/router";

declare const google: any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone : NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    // google.accounts.id.initialize({
    //   client_id: "1089833323681-i2segif0nkcokj75kr87nmkb4621jv5o.apps.googleusercontent.com",
    //   cookiepolicy: 'single_host_origin'
    // });

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
      catchError( error => of(false))
    );
  }



  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${ base_url }/usuarios` , formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }

  login( formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }

  logingGoogle( token : string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('forevergulio@gmail.com', () => {
      this._ngZone.run(() => {
        this._router.navigate(['/auth/login']);
      })
    })
  }
}
